<template>
  <div class="overview-wrapper">
    <div
      class="overview-part"
      :style="{ 'padding-top': baseInfo.title ? '0' : '20px' }"
    >
      <div
        class="title"
        v-if="baseInfo.title"
        :style="{
          color: baseInfo.titleColor,
          background: baseInfo.titleBgColor,
        }"
      >
        {{ baseInfo.title }}
      </div>
      <div
        v-for="item in overViewList"
        :key="item.id"
        class="item-container"
        :class="{ select: currentSelect == item.id, error: item.error }"
        @click="selectBox(item.id, item.compName)"
      >
        <!-- 基础卡片 -->
        <template v-if="baseCardList.includes(item.type)">
          <baseCards :item="item"></baseCards>
        </template>
        <!-- 删除按钮 -->
        <el-popconfirm title="删除模块？" @confirm="delItem(item.id)">
          <div
            class="del-btn el-icon-delete-solid"
            slot="reference"
            v-show="currentSelect == item.id"
          ></div>
        </el-popconfirm>
      </div>
    </div>
    <div class="sort-box-part">
      <sort
        :list="overViewList"
        :currentSelect="currentSelect"
        @delItem="delItem"
        @selectBox="selectBox"
        @sort="sort"
      ></sort>
    </div>
  </div>
</template>

<script>
import { baseCardList } from "../../constants";
import baseCards from "./components/baseCards/index.vue";
import sort from "./sort";

export default {
  components: {
    sort,
    baseCards,
  },
  props: {
    overViewList: {
      type: Array,
      default: () => [],
    },
    currentSelect: {
      type: [String, Number],
      default: "",
    },
    baseInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      baseCardList,
    };
  },
  methods: {
    selectBox(id, compName) {
      this.$emit("selectBox", id, compName);
    },
    delItem(id) {
      this.$emit("delItem", id);
    },
    sort(list) {
      this.$emit("sort", list);
    },
  },
};
</script>

<style lang="scss" scoped>
.overview-wrapper {
  display: flex;
  max-height: 100vh;
  overflow-x: visible;
}
.overview-part {
  width: 375px;
  max-height: 100vh;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  padding-bottom: 20px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
  .title {
    height: 26px;
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    line-height: 26px;
    text-align: center;
    padding: 10px 0;
    border-radius: 6px 6px 0 0;
  }
  .item-container {
    padding: 10px 0;
    box-sizing: border-box;
    border: 1px solid #ffffff;
    cursor: pointer;
    position: relative;
    &.select {
      border: 1px solid #409eff;
      &:hover {
        border: 1px solid #409eff;
      }
    }
    &.error {
      border: 1px solid #f56c6c !important;
      &:hover {
        border: 1px dashed #f56c6c !important;
      }
    }
    &:hover {
      border: 1px dashed #409eff;
    }
    .del-btn {
      border-radius: 50%;
      background: #e5e5e5;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -12px;
      right: 0;
      width: 24px;
      height: 24px;
    }
  }
}
.sort-box-part {
  margin-left: 10px;
  position: sticky;
  top: 0;
}
</style>
