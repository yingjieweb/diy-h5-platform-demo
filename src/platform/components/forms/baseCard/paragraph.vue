<template>
  <div class="diy-form">
    <div class="head">卡片编辑区域</div>
    <h3 class="h3-title">文本段落</h3>
    <el-form
      :model="formData"
      ref="form"
      label-width="130px"
      label-position="left"
      :rules="rules"
    >
      <el-form-item label="内容" prop="text">
        <el-input
          v-model="formData.text"
          :autosize="{ minRows: 2, maxRows: 10 }"
          type="textarea"
          placeholder="请输入段落内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="文本颜色" prop="color">
        <el-color-picker v-model="formData.color"></el-color-picker>
      </el-form-item>
      <el-form-item label="背景颜色" prop="bgColor">
        <el-color-picker v-model="formData.bgColor"></el-color-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import formMix from "../form-mix";

export default {
  mixins: [formMix],
  data() {
    return {
      formData: {
        text: "",
        color: "#000000",
        bgColor: "#ffffff",
      },
      rules: {
        text: [{ required: true, message: "请输入文本", trigger: "blur" }],
        color: [{ required: true, message: "请选择颜色", trigger: "blur" }],
        bgColor: [{ required: true, message: "请选择颜色", trigger: "blur" }],
      },
    };
  },
  computed: {
    postParams() {
      return {
        type: "paragraph",
        color: this.formData.color,
        text: this.formData.text,
        bgColor: this.formData.bgColor,
      };
    },
  },
  created() {
    if (this.propFormData.type) {
      const { text, color, bgColor } = this.propFormData;
      this.formData = {
        text,
        color,
        bgColor,
      };
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
  .input-width {
    width: 170px;
  }
  .ib {
    margin-top: 10px;
  }
}
</style>
