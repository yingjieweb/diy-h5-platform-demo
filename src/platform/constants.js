export const ENUM_CARD = {
  base: 0,
  onePic: 1,
  twoPic: 2,
  triPic: 3,
  windows: 4, // 橱窗位
  headTitle: 5,
  paragraph: 6,
  spacing: 7, // 间距卡片
  swiper: 8, // 轮播图
  previewPic: 9, // 预览图（群码卡片）
};

export const MapEnumToComName = {
  1: "单列图片",
  2: "双列图片",
  3: "三列图片",
  4: "橱窗位", // 橱窗位
  5: "标题",
  6: "文本段落",
  7: "上下间距",
  8: "轮播图",
  9: "群码卡片",
};

export const baseCard = {
  url: "https://t1.focus-img.cn/applet/2021-08-20/094db21fed1b4934a95ac343cdf8defb.jpg",
  text: "配置基础信息",
  type: ENUM_CARD.base,
};

export const contentCardList = [
  {
    title: "基础卡片",
    key: 0,
    cards: [
      {
        url: "https://t1.focus-img.cn/applet/2021-08-20/6a6953fbd9a042208dce5d754881802a.jpg",
        text: "单列图片",
        type: ENUM_CARD.onePic,
      },
      {
        url: "https://t1.focus-img.cn/applet/2021-10-20/e87f6b3710b64011b6e87fd43364ee1a.jpg",
        text: "群码卡片",
        type: ENUM_CARD.previewPic,
      },
      {
        url: "https://t1.focus-img.cn/applet/2021-08-20/670e94f3cc2945af9a93403c99795324.jpg",
        text: "双列图片",
        type: ENUM_CARD.twoPic,
      },
      {
        url: "https://t1.focus-img.cn/applet/2021-08-20/4af87913add84adcaee692ee0c8cb4ad.jpg",
        text: "三列图片",
        type: ENUM_CARD.triPic,
      },
      {
        url: "https://t1.focus-img.cn/applet/2021-09-26/b4294aea88f84c2ca968cb9c2a7934b2.jpg",
        text: "轮播图",
        type: ENUM_CARD.swiper,
      },
      {
        url: "https://t1.focus-img.cn/applet/2021-08-20/ede195af054f450e877138c7d2dbac63.jpg",
        text: "橱窗位",
        type: ENUM_CARD.windows,
      },
      {
        url: "https://t1.focus-img.cn/applet/2021-08-20/91689959d05140e6b099ab6a81feb953.jpg",
        text: "标题",
        type: ENUM_CARD.headTitle,
      },
      {
        url: "https://t1.focus-img.cn/applet/2021-08-20/1a0b4aa2d76c4720a21a15615040811d.jpg",
        text: "文本段落",
        type: ENUM_CARD.paragraph,
      },
      {
        url: "https://t1.focus-img.cn/applet/2021-09-07/ff4346e2a38f47f7a9919d0a6a58c8f4.jpg",
        text: "上下间距",
        type: ENUM_CARD.spacing,
      },
    ],
  },
];

const getCardList = (min, max) => {
  const arr = [];
  // eslint-disable-next-line guard-for-in
  for (const i in ENUM_CARD) {
    const item = ENUM_CARD[i];
    if (item >= min && item <= max) {
      arr.push(item);
    }
  }
  return arr;
};

export const baseCardList = getCardList(1, 99);
