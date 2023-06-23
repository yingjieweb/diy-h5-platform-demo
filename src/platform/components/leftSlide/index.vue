<template>
  <div class="left-slide">
    <h3 class="h3-title">页面基础配置</h3>
    <div class="card-list">
      <card :data="baseCard" @click="handleClick(baseCard)"></card>
    </div>
    <h3 class="h3-title">内容卡片选择区域</h3>
    <div class="card-list">
      <div class="module" v-for="item in contentCardList" :key="item.key">
        <div class="module-title">
          <i class="icon2018 icon">&#xe906;</i>
          <div class="text">{{ item.title }}</div>
        </div>
        <card
          v-for="card in item.cards"
          :key="card.type"
          :data="card"
          @click="handleClick(card)"
        ></card>
      </div>
    </div>
  </div>
</template>

<script>
import card from "./card.vue";
import { baseCard, contentCardList } from "../../constants";

export default {
  components: {
    card,
  },
  data() {
    return {
      baseCard: baseCard,
      contentCardList: contentCardList,
    };
  },
  methods: {
    handleClick(data) {
      this.$emit("selectCard", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.left-slide {
  width: 220px;
  max-height: 100vh;
  box-sizing: border-box;
  padding: 15px 15px 15px 20px;
  margin-right: 10px;
  border-radius: 6px;
  background: #f9fafc;
  overflow-y: scroll;
  .h3-title {
    height: 22px;
    font-size: 16px;
    font-weight: 600;
    color: #303133;
    line-height: 22px;
    margin-bottom: 20px;
  }
  .card-list {
    .module {
      .module-title {
        display: flex;
        align-items: center;
        height: 22px;
        margin-bottom: 20px;
        .icon {
          color: #6d7278;
          font-size: 12px;
          margin-right: 8px;
        }
        .text {
          height: 22px;
          font-size: 16px;
          color: #303133;
          line-height: 22px;
        }
      }
    }
  }
}
</style>
