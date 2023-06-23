<template>
  <div class="diy-form">
    <div class="head">卡片编辑区域</div>
    <h3 class="h3-title">标题</h3>
    <el-form
      :model="formData"
      label-position="left"
      ref="form"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="formData.title"
          class="input-width"
          maxlength="10"
          placeholder="请输入标题"
        ></el-input>
        <span class="grey-text"
          >{{ (formData.title && formData.title.length) || 0 }}/10</span
        >
      </el-form-item>
      <el-form-item label="字体样式">
        <el-radio-group v-model="formData.isBold">
          <el-radio :label="true">加粗</el-radio>
          <el-radio :label="false">不加粗</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标题样式">
        <el-radio-group v-model="formData.style">
          <el-radio :label="0">居左</el-radio>
          <el-radio :label="1">居中</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="tip">居左标题建议图标尺寸为 56*56px</div>
      <div class="tip">居中标题建议图标为 750*100px</div>
      <el-form-item label="缩略图">
        <image-upload
          class="ib"
          v-model="formData.imgUrl"
          :beforeUpload="beforeUpload"
        ></image-upload>
      </el-form-item>
      <el-form-item label="跳转链接" prop="link">
        <el-input
          v-model="formData.link"
          placeholder="请输入跳转链接"
        ></el-input>
      </el-form-item>
      <el-form-item label="字体颜色" prop="color">
        <el-color-picker v-model="formData.color"></el-color-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import formMix from "../form-mix";
const checkLink = (rule, value, callback) => {
  let pattern = /(^https:\/\/)/g;
  if (value.length && !pattern.test(value)) {
    callback("请检查链接格式");
  } else {
    callback();
  }
};

export default {
  mixins: [formMix],
  data() {
    return {
      formData: {
        type: "headTitle",
        title: "",
        isBold: true,
        style: 0, // 0 居左 ， 1 居中
        imgUrl: "",
        link: "",
        color: "#000000",
      },
      rules: {
        title: [{ required: true, message: "请输入文本", trigger: "blur" }],
        color: [{ required: true, message: "请选择颜色", trigger: "blur" }],
        link: [{ validator: checkLink, trigger: "blur" }],
      },
    };
  },
  created() {
    if (this.propFormData.type) {
      const { title, isBold, style, imgUrl, link, color } = this.propFormData;
      this.formData = {
        type: "headTitle",
        title,
        isBold,
        style, // 0 居左 ， 1 居中
        imgUrl,
        link,
        color,
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
  .upload-text {
    color: #606266;
    margin-bottom: 10px;
  }
  .input-width {
    width: 170px;
  }
  .flex-box {
    display: flex;
    align-items: center;
  }
  .ib {
    margin-bottom: 10px;
  }
  .tip {
    color: #c0c4cc;
    margin-bottom: 10px;
  }
  .grey-text {
    color: #909399;
  }
}
</style>
