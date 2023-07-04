<template>
  <div class="diy-form">
    <div class="head">卡片编辑区域</div>
    <h3 class="h3-title">页面基础配置</h3>
    <el-form
      :model="formData"
      ref="form"
      label-width="110px"
      label-position="right"
      :rules="rules"
    >
      <el-form-item label="页面标题" prop="title">
        <el-input
          v-model="formData.title"
          class="input-width"
          maxlength="12"
          placeholder="请输入页面标题"
        ></el-input>
        <span class="grey-text"
          >&nbsp;{{ (formData.title && formData.title.length) || 0 }}/12</span
        >
      </el-form-item>
      <el-form-item label="标题文字颜色">
        <el-radio-group v-model="formData.titleColor">
          <el-radio label="#000000">黑</el-radio>
          <el-radio label="#ffffff">白</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标题背景颜色" prop="titleBgColor">
        <el-color-picker v-model="formData.titleBgColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="页面背景颜色" prop="bgColor">
        <el-color-picker v-model="formData.bgColor"></el-color-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import formMix from "./form-mix";

function checkColor(rule, value, callback) {
  if (["#fff", "#ffffff", "#FFF", "#FFFFFF"].includes(value)) {
    callback(new Error("页面背景色不可以设为白色"));
  } else {
    callback();
  }
}

export default {
  mixins: [formMix],
  data() {
    return {
      formData: {
        title: "",
        titleColor: "#000000",
        titleBgColor: "#ffffff",
        bgColor: "#f5f5f6",
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        titleBgColor: [
          { required: true, message: "请选择颜色", trigger: "blur" },
        ],
        bgColor: [{ validator: checkColor, trigger: "blur" }],
      },
    };
  },
  computed: {
    postParams() {
      const params = this.deepClone(this.formData);
      params.type = "base";
      return params;
    },
  },
  created() {
    if (this.propFormData.type) {
      const { title, titleColor, titleBgColor, bgColor } = this.propFormData;
      this.formData = {
        title,
        titleColor: titleColor || "#000000",
        titleBgColor,
        bgColor,
      };
    }
  },
  methods: {
    beforeUploadSharePoster(file) {
      return new Promise((resolve) => {
        const isImage = file.type.indexOf("image") === 0;
        const size = file.size / 1024 / 1024 < 1;
        if (!isImage) {
          this.notifyMsg("注意", "图片格式不正确!", "error");
          return resolve(false);
        }
        if (!size) {
          this.notifyMsg("注意", "上传图片大小不能超过 1MB!", "error");
          return resolve(false);
        }
        const img = new Image();
        const url = window.URL || window.webkitURL;
        img.src = url.createObjectURL(file);
        const that = this;
        img.onload = function () {
          if (this.width != 590 || this.height != 930) {
            that.notifyMsg("注意", "图片尺寸不正确!", "error");
            resolve(false);
          } else {
            resolve(true);
          }
        };
      });
    },
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
  .grey-text {
    color: #909399;
  }
}
</style>
