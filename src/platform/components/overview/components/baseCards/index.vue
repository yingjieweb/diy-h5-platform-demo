<template>
  <div>
    <div
      class="one-pic"
      v-if="item.type == ENUM_CARD.onePic"
      :class="item.ow.margin ? 'showMargin' : ''"
    >
      <img
        :src="
          (item.ow.pics && item.ow.pics[0] && item.ow.pics[0].imgUrl) ||
          DefaultImgMap.pic1
        "
        class="one-pic-img"
      />
      <div
        class="one-pic-text str-limit"
        v-if="item.ow.pics && item.ow.pics[0] && item.ow.pics[0].text"
        :class="item.ow.margin ? 'showMargin' : ''"
      >
        {{ item.ow.pics && item.ow.pics[0] && item.ow.pics[0].text }}
      </div>
    </div>
    <!-- 两张图 -->
    <div class="two-pic" v-if="item.type == ENUM_CARD.twoPic">
      <div
        class="two-pic-item"
        v-for="(pic, pIndex) in item.ow.pics"
        :key="pIndex"
      >
        <img :src="pic.imgUrl || DefaultImgMap.pic2" />
        <div class="text str-limit" v-if="pic.text">{{ pic.text }}</div>
      </div>
    </div>
    <!-- 三张图 -->
    <div class="tri-pic" v-if="item.type == ENUM_CARD.triPic">
      <img
        v-for="(pic, pIndex) in item.ow.pics"
        :key="pIndex"
        :src="pic.imgUrl || DefaultImgMap.pic2"
        class="item"
      />
    </div>
    <!-- 轮播图 -->
    <div class="swiper-box" v-if="item.type == ENUM_CARD.swiper">
      <div
        class="sketch"
        v-if="item.ow.pics.filter((it) => it.imgUrl).length < 2"
      >
        <img
          src="https://t1.focus-img.cn/applet/2021-09-26/ecd47658c4fb4889ad2281abe06105ec.jpg"
          class="swiper-item"
        />
      </div>
      <el-carousel
        v-else
        arrow="never"
        height="120px"
        indicator-position="none"
        :interval="2000"
      >
        <div v-for="(item, index) in item.ow.pics" :key="index">
          <el-carousel-item>
            <img :src="item.imgUrl" class="swiper-item" />
          </el-carousel-item>
        </div>
      </el-carousel>
    </div>
    <!-- 橱窗位 -->
    <div class="windows" v-if="item.type == ENUM_CARD.windows">
      <img
        :src="(item.ow.pics[0] && item.ow.pics[0].imgUrl) || DefaultImgMap.pic2"
        class="left-img"
      />
      <div class="right">
        <img
          :src="
            (item.ow.pics[1] && item.ow.pics[1].imgUrl) || DefaultImgMap.pic2
          "
          class="right-img"
        />
        <img
          :src="
            (item.ow.pics[2] && item.ow.pics[2].imgUrl) || DefaultImgMap.pic2
          "
          class="right-img"
        />
      </div>
    </div>
    <!-- 标题 -->
    <div class="head-title" v-if="item.type == ENUM_CARD.headTitle">
      <div class="style1" v-if="item.ow.style == 0">
        <img class="icon" v-if="item.ow.imgUrl" :src="item.ow.imgUrl" />
        <div
          class="text"
          :class="{ bold: item.ow.isBold }"
          :style="{ color: item.ow.color }"
        >
          {{ item.ow.title || "自定义标题" }}
        </div>
      </div>
      <div class="style2" v-else>
        <img class="icon" v-if="item.ow.imgUrl" :src="item.ow.imgUrl" />
        <div
          class="text"
          :class="{ bold: item.ow.isBold }"
          :style="{ color: item.ow.color }"
        >
          {{ item.ow.title || "自定义标题" }}
        </div>
      </div>
    </div>
    <!-- 文本 -->
    <div
      class="paragraph"
      :style="{ background: item.ow.bgColor }"
      v-if="item.type == ENUM_CARD.paragraph"
    >
      <div class="text" :style="{ color: item.ow.color }">
        {{ item.ow.text || "自定义段落" }}
      </div>
    </div>
    <!-- 间距 -->
    <div class="spacing" v-if="item.type == ENUM_CARD.spacing">
      <div
        v-if="item.ow.height"
        :style="{
          height: item.ow.height / 2 + 'px',
          background: item.ow.bgColor,
        }"
      ></div>
      <div v-else>自定义间距</div>
    </div>
    <!-- 群码卡片 预览图 -->
    <div
      class="preview-pic"
      v-if="item.type == ENUM_CARD.previewPic"
      :class="item.ow.margin ? 'showMargin' : ''"
    >
      <img
        :src="(item.ow && item.ow.showPicUrl) || DefaultImgMap.pic1"
        class="one-pic-img"
      />
    </div>
  </div>
</template>

<script>
import { ENUM_CARD } from "../../../../constants";
const DefaultImgMap = {
  pic1: "http://t1.focus-img.cn/applet/2021-08-21/3791f04bc8674275982cb901b1bee6cf.jpg",
  pic2: "http://t1.focus-img.cn/applet/2021-08-21/ff6629a26cfa4806b2196a8e2e3f5667.jpg",
  pic3: "https://t1.focus-img.cn/applet/2021-08-24/7f3b962c0e16483b876cfb5d72d78ed9.jpg",
  pic4: "//t1.focus-img.cn/applet/2021-08-24/6f0817c7ad064d179a2cab827188ea39.jpg", // 双列直播
  pic5: "//t1.focus-img.cn/applet/2021-08-24/666b2f3d78ea4aad9329fc9cd7db2cf6.jpg",
};

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      ENUM_CARD,
      DefaultImgMap: Object.freeze(DefaultImgMap),
    };
  },
};
</script>

<style lang="scss" scoped>
.one-pic,
.preview-pic {
  height: 173px;
  overflow: hidden;
  position: relative;
  &.showMargin {
    padding: 0 15px;
  }
  .one-pic-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .one-pic-text {
    height: 23px;
    font-size: 16px;
    font-weight: 500;
    line-height: 23px;
    box-sizing: border-box;
    color: #ffffff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 10px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
    &.showMargin {
      left: 15px;
      right: 15px;
    }
  }
}
.two-pic {
  height: 125px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  &-item {
    width: 168px;
    height: 125px;
    position: relative;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    .text {
      width: 100%;
      height: 23px;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      line-height: 23px;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0 10px;
      box-sizing: border-box;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
    }
  }
}
.tri-pic {
  height: 81px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  .item {
    width: 108px;
    height: 81px;
    object-fit: cover;
  }
}
.windows {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  .left-img {
    width: 168px;
    height: 140px;
    object-fit: cover;
  }
  .right {
    width: 168px;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-img {
      width: 168px;
      height: 65px;
      object-fit: cover;
    }
  }
}
.head-title {
  .style1 {
    height: 23px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    .icon {
      width: 20px;
      height: 20px;
      object-fit: cover;
      margin-right: 5px;
    }
    .text {
      height: 23px;
      font-size: 16px;
      color: #000;
      line-height: 23px;
      &.bold {
        font-weight: 700;
      }
    }
  }
  .style2 {
    height: 50px;
    position: relative;
    .icon {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 23px;
      font-size: 16px;
      color: #000;
      line-height: 23px;
      &.bold {
        font-weight: 700;
      }
    }
  }
}
.paragraph {
  padding: 10px 15px;
  .text {
    color: #000;
    word-break: break-all;
  }
}
.spacing {
  padding: 10px 0;
  background: #f5f5f6;
}
.swiper-box {
  .sketch {
    height: 120px;
  }
  .swiper-item {
    height: 120px;
    width: 100%;
    object-fit: cover;
  }
}
.str-limit {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
