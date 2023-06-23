<template>
  <div class="diy-form">
    <div class="head">卡片编辑区域</div>
    <h3 class="h3-title">轮播图</h3>
    <el-form :model="formData" ref="form" label-position="left" inline>
      <div class="upload-text">上传图片</div>
      <div class="tip">支持2-6张图片</div>
      <div class="tip">建议图片宽度为690px，高度为230px</div>
      <div class="flex-box" v-for="(item, index) in formData.pics" :key="index">
        <el-form-item :prop="'pics.' + index + '.imgUrl'" :rules="rules.imgUrl">
          <image-upload
            class="ib"
            v-model="item.imgUrl"
            :beforeUpload="beforeUpload"
          ></image-upload>
        </el-form-item>
        <div class="right">
          <el-form-item
            label="链接"
            :prop="'pics.' + index + '.link'"
            :rules="rules.link"
          >
            <el-input
              v-model="item.link"
              class="input-width"
              placeholder="请输入链接"
            ></el-input>
          </el-form-item>
          <el-button
            type="danger"
            v-if="formData.pics.length > 2"
            size="mini"
            @click="delItem(index)"
            plain
            >删除</el-button
          >
        </div>
      </div>
      <div class="btn-box">
        <el-button
          v-if="formData.pics.length < 6"
          type="primary"
          size="mini"
          @click="addItem"
          plain
          >添加</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import formMix from "../form-mix";
import { ENUM_CARD } from "../../../constants";

const checkLink = (rule, value, callback) => {
  let pattern = /(^https:\/\/)/g;
  if (value.length && !pattern.test(value)) {
    callback("请检查链接格式");
  } else {
    callback();
  }
};
const emptyPic = () => ({
  imgUrl: "",
  text: "",
  link: "",
});

export default {
  mixins: [formMix],
  props: {
    type: {
      type: Number,
      default: ENUM_CARD.swiper,
    },
  },
  data() {
    return {
      formData: {
        pics: [],
      },
      ENUM_CARD,
      rules: {
        imgUrl: [{ required: true, message: "请上传图片", trigger: "change" }],
        link: [{ validator: checkLink, trigger: "blur" }],
      },
    };
  },
  computed: {
    postParams() {
      const params = {
        type: "swiper",
        pics: this.formData.pics,
      };
      return params;
    },
  },
  created() {
    if (this.propFormData.type) {
      // 存在type 代表是编辑
      this.formData = {
        pics: this.propFormData.pics,
      };
    } else {
      this.formData.pics = [emptyPic(), emptyPic()];
    }
  },
  methods: {
    delItem(index) {
      this.formData.pics.splice(index, 1);
    },
    addItem() {
      this.formData.pics.push(emptyPic());
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
    display: inline-block;
  }
  .tip {
    color: #c0c4cc;
    margin-bottom: 10px;
  }
}
</style>
