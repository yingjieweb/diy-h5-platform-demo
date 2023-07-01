<template>
  <div class="diy-form">
    <div class="head">卡片编辑区域</div>
    <h3 class="h3-title">{{ h3Ttile }}</h3>
    <el-form :model="formData" ref="form" label-position="right" inline>
      <el-form-item label="侧间距" v-if="type == ENUM_CARD.onePic">
        <el-radio-group v-model="formData.margin">
          <el-radio :label="true">有</el-radio>
          <el-radio :label="false">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="upload-text">上传图片</div>
      <div class="tip">{{ sizeTip }}</div>
      <div
        class="upload-form-item"
        v-for="(item, index) in formData.pics"
        :key="index"
      >
        <el-form-item label="图片链接" :prop="'pics.' + index + '.imgUrl'">
          <el-input
            v-model="item.imgUrl"
            class="input-width"
            placeholder="请输入图片链接"
          ></el-input>
        </el-form-item>
        <el-form-item label="跳转链接" :prop="'pics.' + index + '.link'">
          <el-input
            v-model="item.link"
            class="input-width"
            placeholder="请输入链接"
          ></el-input>
        </el-form-item>
        <el-form-item label="展示文本" v-if="type < 3">
          <el-input
            v-model="item.text"
            class="input-width"
            placeholder="请输入文本"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import formMix from "../form-mix";
import { ENUM_CARD } from "../../../constants";

export default {
  mixins: [formMix],
  props: {
    type: {
      type: Number,
      default: ENUM_CARD.onePic,
    },
  },
  data() {
    return {
      formData: {
        margin: true,
        pics: [],
      },
      ENUM_CARD,
    };
  },
  computed: {
    h3Ttile() {
      const map = {
        1: "单列图片",
        2: "双列图片",
        3: "三列图片",
        4: "橱窗位",
      };
      return map[this.type];
    },
    postParams() {
      const typeMap = {
        1: "onePic",
        2: "twoPic",
        3: "triPic",
        4: "windows",
      };
      const params = {
        type: typeMap[this.type],
        pics: this.formData.pics,
      };
      if (this.type == 1) params.margin = this.formData.margin;
      return params;
    },
    accept() {
      return this.type == 1
        ? "image/jpeg, image/png, image/gif"
        : "image/jpeg, image/png";
    },
    sizeTip() {
      const map = {
        2: "建议图片宽度为335px，高度为250px",
        3: "建议图片宽度为216px，高度为162px",
        4: "左边大图建议尺寸宽335px、高280px，右边小图宽335px、高130px",
      };
      return map[this.type] || "建议图片宽度为750px，高度为200-950px";
    },
  },
  created() {
    if (this.propFormData.type) {
      // 存在type 代表是编辑
      this.formData = {
        margin: this.propFormData.margin,
        pics: this.propFormData.pics,
      };
    } else {
      const list = [];
      const map = {
        1: 1,
        2: 2,
        3: 3,
        4: 3,
      };
      for (let i = 0; i < map[this.type]; i++) {
        list.push({
          imgUrl: "",
          text: "",
          link: "",
        });
      }
      this.formData.pics = list;
    }
  },
};
</script>

<style lang="scss" scoped>
.diy-form {
  .head {
    height: 22px;
    font-size: 16px;
    font-weight: 600;
    color: #303133;
    line-height: 22px;
    text-align: center;
    margin-bottom: 20px;
  }
  .h3-title {
    height: 22px;
    font-size: 16px;
    font-weight: 600;
    color: #303133;
    line-height: 22px;
    margin-bottom: 35px;
  }
  .upload-text {
    color: #606266;
    margin-bottom: 10px;
  }
  .upload-form-item {
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  .tip {
    color: #c0c4cc;
    margin-bottom: 10px;
  }
  .input-width {
    width: 330px;
  }
}
</style>
