<template>
  <div class="card" @click="handleClick">
    <img class="card-img" :src="data.url" />
    <div class="card-text">
      {{ data.text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: inline-flex;
  width: 90px;
  height: 60px;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 8px;
  &:hover {
    background: rgb(217, 236, 255);
  }
  .card-img {
    width: 40px;
    height: 30px;
    margin-bottom: 10px;
  }
  .card-text {
    height: 17px;
    font-size: 12px;
    color: #303133;
    line-height: 17px;
  }
}
</style>
