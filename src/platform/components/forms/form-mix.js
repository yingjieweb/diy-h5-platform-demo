export default {
  props: {
    uniqueKey: {
      type: [String, Number],
      default: "",
    },
    propFormData: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    formData: {
      deep: true,
      handler(newVal) {
        this.$emit("changeForm", this.uniqueKey, newVal);
      },
    },
  },
  methods: {
    beforeUpload(file) {
      const isImage = file.type.indexOf("image") === 0;
      const size = file.size / 1024 / 1024 < 1;
      if (!isImage) {
        this.notifyMsg("注意", "图片格式不正确!", "error");
        return false;
      }
      if (!size) {
        this.notifyMsg("注意", "上传图片大小不能超过 1MB!", "error");
        return false;
      }
      return true;
    },
    notifyMsg(title = "成功", message = "成功", type = "success") {
      this.$notify({
        title,
        message,
        type,
      });
    },
    validate() {
      return new Promise((reslove) => {
        this.$refs.form.validate((valid) => {
          reslove(valid);
        });
      });
    },
    collectFormData() {
      return JSON.parse(JSON.stringify(this.postParams || this.formData));
    },
    deepClone(origin) {
      return JSON.parse(JSON.stringify(origin));
    },
  },
};
