<template>
  <div class="diy-form">
    <div class="head">卡片编辑区域</div>
    <h3 class="h3-title">页面基础配置</h3>
    <el-form
      :model="formData"
      ref="form"
      label-width="130px"
      label-position="left"
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
          >{{ (formData.title && formData.title.length) || 0 }}/12</span
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
      <el-form-item label="页面右下角悬浮">
        <el-radio-group v-model="formData.rightBtn">
          <el-radio :label="0">不显示</el-radio>
          <el-radio :label="1">分享按钮</el-radio>
          <el-radio :label="2">自定义</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="formData.rightBtn == 2">
        <el-form-item prop="inletImg">
          <image-upload
            class="ib"
            v-model="formData.inletImg"
            :beforeUpload="beforeUpload"
          ></image-upload>
        </el-form-item>
        <el-form-item prop="inletLink">
          <el-input
            v-model="formData.inletLink"
            class="input-width"
            placeholder="请输入跳转链接"
          ></el-input>
        </el-form-item>
      </template>
      <el-form-item label="页面背景颜色" prop="bgColor">
        <el-color-picker v-model="formData.bgColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="分享卡片标题">
        <el-input
          v-model="formData.shareTitle"
          class="input-width"
          maxlength="28"
          placeholder="请输入分享卡片标题"
        ></el-input>
        <span class="grey-text"
          >&nbsp;{{
            (formData.shareTitle && formData.shareTitle.length) || 0
          }}/28</span
        >
      </el-form-item>
      <el-form-item label="分享卡片图片">
        <el-radio-group v-model="formData.shareCardMode">
          <el-radio :label="0">默认</el-radio>
          <el-radio :label="1">自定义</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="formData.shareCardMode == 1" prop="shareCardBg">
        <image-upload
          class="ib"
          v-model="formData.shareCardBg"
          :beforeUpload="beforeUpload"
        ></image-upload>
      </el-form-item>
      <el-form-item label="页面分享海报">
        <image-upload
          class="ib"
          v-model="formData.sharePoster"
          :beforeUpload="beforeUploadSharePoster"
        ></image-upload>
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
const checkLink = (rule, value, callback) => {
  let pattern = /(^https:\/\/)/g;
  if (!value) {
    callback("请输入跳转链接");
  } else if (value.length && !pattern.test(value)) {
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
        title: "",
        titleColor: "#000000",
        titleBgColor: "#ffffff",
        bgColor: "#f5f5f6",
        shareTitle: "",
        shareCardMode: 0,
        shareCardBg: "",
        sharePoster: "",
        cityId: 1,
        rightBtn: 0,
        inletImg: "",
        inletLink: "",
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        titleBgColor: [
          { required: true, message: "请选择颜色", trigger: "blur" },
        ],
        bgColor: [{ validator: checkColor, trigger: "blur" }],
        shareCardBg: [
          { required: true, message: "请上传图片", trigger: "blur" },
        ],
        inletImg: [{ required: true, message: "请上传图片", trigger: "blur" }],
        inletLink: [{ validator: checkLink, trigger: "blur" }],
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
      const {
        title,
        titleColor,
        titleBgColor,
        bgColor,
        shareTitle,
        shareCardMode,
        shareCardBg,
        sharePoster,
        cityId = 1,
        rightBtn = 0,
        inletImg = "",
        inletLink = "",
      } = this.propFormData;
      this.formData = {
        title,
        titleColor: titleColor || "#000000",
        titleBgColor,
        bgColor,
        shareTitle,
        shareCardMode,
        shareCardBg,
        sharePoster,
        cityId,
        rightBtn,
        inletImg,
        inletLink,
      };
    }
    const cityId = 1;
    this.formData.cityId = Number(cityId);
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
  .ib {
    margin-top: 10px;
  }
  .grey-text {
    color: #909399;
  }
}
</style>
