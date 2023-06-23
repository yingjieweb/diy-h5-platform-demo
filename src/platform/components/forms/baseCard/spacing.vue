<template>
  <div class="diy-form">
    <div class="head">卡片编辑区域</div>
    <h3 class="h3-title">上下间距</h3>
    <el-form
      :model="formData"
      ref="form"
      label-width="130px"
      label-position="left"
      :rules="rules"
    >
      <el-form-item label="高度" prop="height">
        <el-input
          v-model.number="formData.height"
          placeholder="请输入高度"
        ></el-input>
      </el-form-item>
      <el-form-item label="背景颜色" prop="bgColor">
        <el-color-picker v-model="formData.bgColor"></el-color-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import formMix from "../form-mix";
const houseCountValid = (rule, value, callback) => {
  if (value !== "" && value <= 0) {
    callback(new Error("必须是正整数"));
  } else {
    callback();
  }
};

export default {
  mixins: [formMix],
  data() {
    return {
      formData: {
        height: "",
        bgColor: "",
      },
      rules: {
        height: [
          { required: true, message: "请输入高度", trigger: "blur" },
          { validator: houseCountValid, trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    postParams() {
      return {
        type: "spacing",
        height: this.formData.height,
        bgColor: this.formData.bgColor,
      };
    },
  },
  created() {
    if (this.propFormData.type) {
      const { height, bgColor } = this.propFormData;
      this.formData = {
        height,
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
