<template>
  <div class="sort-box">
    <div class="title">缩略图</div>
    <div class="list" ref="sort-list">
      <div
        class="item"
        v-for="item in list"
        :data-id="item.id"
        :key="item.id"
        :class="{ select: currentSelect == item.id }"
        @click="selectBox(item)"
      >
        <div class="left">
          <div class="el-icon-menu"></div>
          <div class="text" :title="item.compName" v-if="item.id != editId">
            {{ item.compName }}
          </div>
          <input
            class="text-input"
            autofocus
            :ref="'input' + item.id"
            v-else
            @keydown.enter="clearEditId(item)"
            v-model="item.compName"
            @blur.stop="clearEditId(item)"
          />
        </div>
        <div
          class="el-icon-edit-outline edit-icon"
          v-if="currentSelect == item.id && item.id != editId"
          @click="clickEdit(item)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from "sortablejs";

export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    currentSelect: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      editId: "",
      originName: "",
    };
  },
  mounted() {
    this.initTabSort();
  },
  methods: {
    handleDel(item) {
      this.$emit("delItem", item.id);
    },
    selectBox(item) {
      this.$emit("selectBox", item.id, item.compName);
    },
    initTabSort() {
      const s = new Sortable(this.$refs["sort-list"], {
        onEnd: () => {
          const sortList = s.toArray();
          this.$emit("sort", sortList);
        },
        animation: 300,
      });
    },
    clickEdit(item) {
      this.editId = item.id;
      this.originName = item.compName;
      const inputId = "input" + item.id;
      this.$nextTick(() => {
        const input = this.$refs[inputId][0];
        input.focus();
      });
    },
    clearEditId(item) {
      this.editId = "";
      item.compName = item.compName || this.originName;
      this.originName = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.sort-box {
  width: 180px;
  height: 100%;
  max-height: 100vh;
  box-sizing: border-box;
  padding: 8px 0;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  font-size: 14px;
  user-select: none;
  overflow-y: scroll;
  .title {
    text-align: center;
  }
  .list {
    margin-top: 10px;
    padding-left: 4px;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 5px;
      cursor: move;
      color: #606266;
      margin-bottom: 5px;
      &.select {
        background: rgba(41, 182, 176, 0.12);
      }
      &:hover {
        background: rgba(41, 182, 176, 0.12);
      }
      .left {
        display: flex;
        align-items: center;
        .text {
          margin-left: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 125px;
        }
        .text-input {
          margin-left: 5px;
          width: 140px;
          border: none;
          border-radius: 4px;
          height: 30px;
          line-height: 30px;
        }
      }
      .edit-icon {
        cursor: pointer;
      }
    }
  }
}
</style>
