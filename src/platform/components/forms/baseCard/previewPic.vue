<template>
  <div class="diy-form">
    <div class="head">卡片编辑区域</div>
    <h3 class="h3-title">群码卡片</h3>
    <el-form
      :model="formData"
      ref="form"
      label-position="left"
      inline
      :rules="rules"
    >
      <el-form-item label="侧间距">
        <el-radio-group v-model="formData.margin">
          <el-radio :label="true">有</el-radio>
          <el-radio :label="false">无</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="upload-text">上传图片</div>
      <div class="tip">建议图片宽度为750px，高度为200-950px</div>
      <div class="flex-box">
        <el-form-item prop="showPicUrl">
          <image-upload
            class="ib"
            v-model="formData.showPicUrl"
            :beforeUpload="beforeUpload"
          ></image-upload>
        </el-form-item>
        <div class="grey-text">显示图</div>
      </div>
      <div class="flex-box">
        <el-form-item prop="previewPicUrl">
          <image-upload
            class="ib"
            v-model="formData.previewPicUrl"
            :beforeUpload="beforeUpload"
          ></image-upload>
        </el-form-item>
        <div class="grey-text">预览图</div>
      </div>
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
        margin: true,
        showPicUrl: "",
        previewPicUrl: "",
      },
      rules: {
        showPicUrl: [
          { required: true, message: "请上传图片", trigger: "change" },
        ],
        previewPicUrl: [
          { required: true, message: "请上传图片", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    postParams() {
      return Object.assign({ type: "previewPic" }, this.formData);
    },
  },
  created() {
    if (this.propFormData.type) {
      // 存在type 代表是编辑的场景
      const { margin, showPicUrl, previewPicUrl } = this.propFormData;
      this.formData = { margin, showPicUrl, previewPicUrl };
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
    // margin-right: 20px;
    display: inline-block;
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
