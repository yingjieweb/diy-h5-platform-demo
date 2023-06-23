<template>
  <div class="platform">
    <left-slide @selectCard="handleSelectCard"></left-slide>
    <overview
      :overViewList="formList"
      :baseInfo="baseForm.ow"
      :currentSelect="selectFrom.id"
      @selectBox="setSelectForm"
      @delItem="handleDelItem"
      @sort="handleSort"
    ></overview>
    <div class="right-form">
      <base-info
        :uniqueKey="baseForm.id"
        v-if="loaded"
        :propFormData="baseForm.props.propFormData"
        v-show="selectFrom.id == 'base'"
        :ref="baseForm.ref"
        @changeForm="handleChangeBase"
      ></base-info>
      <component
        v-for="formItem in formList"
        :key="formItem.id"
        v-show="selectFrom.id == formItem.id"
        :ref="formItem.refCom"
        :is="formItem.com"
        v-bind="formItem.props"
        :cardName="currentCardName"
        @changeForm="handleChangeForm"
      >
      </component>
    </div>
  </div>
</template>

<script>
import { ENUM_CARD } from "./constants";
import { actInfoMap } from "./getCard";
import leftSlide from "./components/leftSlide/index.vue";
import overview from "./components/overview/index";
import baseInfo from "./components/forms/baseInfo";

let key = 1; // 赋予每个模块的唯一标识

export default {
  components: {
    leftSlide,
    baseInfo,
    overview,
  },
  data() {
    return {
      selectFrom: {
        id: "base",
      },
      formList: [],
      baseForm: {
        id: "base",
        ref: "refBase",
        ow: {},
        props: {
          propFormData: {},
        },
      },
      type: "",
      behavior: "",
      cityId: 1,
      id: "",
      loaded: false,
      currentSelectIndex: 0, // 定位标识符
      curTab: "",
      currentCardName: "", // 标记楼盘卡片
    };
  },
  created() {
    const cityId = 1;
    this.cityId = Number(cityId);
    this.type = "cityList"; // 标识来源
    this.behavior = "create";
    this.curTab = "list";
    this.loaded = true;
  },
  methods: {
    setSelectForm(id, compName) {
      this.currentSelectIndex = this.getCurrentIndex(id);
      this.selectFrom = { id };
      this.currentCardName = compName; // 标记楼盘卡片
    },
    handleSelectCard(data) {
      this.$nextTick(() => {
        this.currentCardName = data.text; // 标记楼盘卡片
      });
      if (data.type == ENUM_CARD.base) {
        this.setSelectForm("base");
      } else {
        const formInfo = this.getFormInfo(data.type, key);
        // 在当前所选卡片的下发插入新的卡片
        this.formList.splice(this.currentSelectIndex + 1, 0, formInfo);
        this.setSelectForm(key);
        key++;
      }
    },
    getFormInfo(type, key) {
      const action = actInfoMap.get(type);
      return action.call(this, key);
    },
    handleChangeForm(uniqueKey, data) {
      const it = this.formList.find((item) => item.id == uniqueKey);
      it && (it.ow = data);
    },
    handleDelItem(uniqueKey) {
      const index = this.formList.findIndex((item) => item.id == uniqueKey);
      this.formList.splice(index, 1);
      let target = index >= 1 ? index - 1 : index;
      if (this.formList.length > 0) {
        this.setSelectForm(this.formList[target].id);
      } else {
        this.setSelectForm("base");
      }
    },
    validateBase() {
      const baseForm = this.$refs[this.baseForm.ref];
      return baseForm.validate();
    },
    validateAll() {
      return new Promise((resolve) => {
        // 对所有的form进行遍历，判断哪些存在问题
        const refComs = this.formList.map((item, index) => {
          return {
            pos: index,
            refCom: item.refCom,
          };
        });
        const recurision = (refComs) => {
          const stackOne = refComs.pop();
          const com = this.$refs[stackOne.refCom][0];
          if (com.validate) {
            com.validate().then((v) => {
              const res = v;
              this.formList[stackOne.pos].error = !res;
              if (!res) {
                resolve(false);
              }
              if (refComs.length > 0) {
                recurision(refComs);
              } else {
                resolve(true);
              }
            });
          } else if (refComs.length > 0) {
            recurision(refComs);
          } else {
            resolve(true);
          }
        };
        if (refComs.length) {
          recurision(refComs);
        } else {
          resolve(true);
        }
      });
    },
    getAllFormData() {
      const base = this.$refs[this.baseForm.ref].collectFormData(); // 页面基础信息
      const refComs = this.formList.map((item, index) => {
        return {
          pos: index,
          refCom: item.refCom,
          compName: item.compName,
        };
      });
      const list = [];
      while (refComs.length) {
        const stackOne = refComs.shift();
        const com = this.$refs[stackOne.refCom][0];
        if (com.collectFormData) {
          const formData = com.collectFormData();
          formData.compName = stackOne.compName;
          list.push(formData);
        }
      }
      return [base, ...list];
    },
    handleSort(idList) {
      const listBak = this.formList;
      const newList = [];
      for (let i = 0; i < idList.length; i++) {
        const it = listBak.find((item) => item.id == idList[i]);
        if (it) newList.push(it);
      }
      this.formList = newList;
    },
    handleChangeBase(key, data) {
      this.baseForm.ow = data;
    },
    setBaseForm(baseInfo) {
      this.baseForm = {
        id: "base",
        ref: "refBase",
        ow: {},
        props: {
          propFormData: baseInfo,
        },
      };
    },
    setFormList(content) {
      content.forEach((item) => {
        const formInfo = this.getFormInfo(ENUM_CARD[item.type], key);
        formInfo.props.propFormData = item;
        formInfo.ow = item;
        if (item.compName) formInfo.compName = item.compName;
        this.formList.push(formInfo);
        key++;
      });
      console.log("this.formList", this.formList);
    },
    getCurrentIndex(selectId) {
      return this.formList.findIndex((item) => item.id == selectId);
    },
  },
};
</script>

<style lang="scss" scoped>
.platform {
  height: 100%;
  box-sizing: border-box;
  padding: 24px;
  display: flex;
  .right-form {
    width: 460px;
    padding: 15px 20px;
    margin-left: 10px;
    border-radius: 6px;
    background: #f9fafc;
    box-sizing: border-box;
    overflow-y: auto;
  }
}
</style>
