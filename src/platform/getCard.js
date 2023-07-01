import { ENUM_CARD, MapEnumToComName } from "./constants";

// 基础卡片
import pic from "./components/forms/baseCard/pic";
import headTitle from "./components/forms/baseCard/headTitle";
import paragraph from "./components/forms/baseCard/paragraph";
import spacing from "./components/forms/baseCard/spacing";
import swiper from "./components/forms/baseCard/swiper";

const otherMap = new Map([
  [ENUM_CARD.headTitle, headTitle],
  [ENUM_CARD.paragraph, paragraph],
  [ENUM_CARD.spacing, spacing],
  [ENUM_CARD.swiper, swiper],
]);

const comRules = [
  {
    match(key) {
      const keys = [
        ENUM_CARD.onePic,
        ENUM_CARD.twoPic,
        ENUM_CARD.triPic,
        ENUM_CARD.windows,
      ];
      return keys.includes(key);
    },
    action() {
      return pic;
    },
  },
  {
    match(key) {
      return !!otherMap.get(key);
    },
    action(key) {
      return otherMap.get(key);
    },
  },
];

function vForm(key, type, props = {}, ow = {}) {
  let com;
  for (let i = 0; i < comRules.length; i++) {
    const rule = comRules[i];
    if (rule.match(type)) {
      com = rule.action(type);
      break;
    }
  }
  return {
    com,
    props: Object.assign(
      {
        uniqueKey: key,
        propFormData: {},
      },
      props
    ),
    refCom: `refCom${key}`,
    error: false,
    ow,
    type,
    compName: MapEnumToComName[type], // 这个是预览区每个组件的名字
    id: key,
  };
}

export const actInfoMap = new Map([
  [
    ENUM_CARD.onePic,
    function (key) {
      return vForm(
        key,
        ENUM_CARD.onePic,
        { type: ENUM_CARD.onePic },
        { pics: [] }
      );
    },
  ],
  [
    ENUM_CARD.twoPic,
    function (key) {
      return vForm(
        key,
        ENUM_CARD.twoPic,
        { type: ENUM_CARD.twoPic },
        { pics: [] }
      );
    },
  ],
  [
    ENUM_CARD.triPic,
    function (key) {
      return vForm(
        key,
        ENUM_CARD.triPic,
        { type: ENUM_CARD.triPic },
        { pics: [] }
      );
    },
  ],
  [
    ENUM_CARD.swiper,
    function (key) {
      return vForm(
        key,
        ENUM_CARD.swiper,
        { type: ENUM_CARD.swiper },
        { pics: [] }
      );
    },
  ],
  [
    ENUM_CARD.windows,
    function (key) {
      // 橱窗位
      return vForm(
        key,
        ENUM_CARD.windows,
        { type: ENUM_CARD.windows },
        { pics: [] }
      );
    },
  ],
  [
    ENUM_CARD.headTitle,
    function (key) {
      // 标题
      return vForm(key, ENUM_CARD.headTitle, undefined, {
        isBold: true,
        style: 0,
      });
    },
  ],
  [
    ENUM_CARD.paragraph,
    function (key) {
      // 段落
      return vForm(key, ENUM_CARD.paragraph);
    },
  ],
  [
    ENUM_CARD.spacing,
    function (key) {
      // 间距
      return vForm(key, ENUM_CARD.spacing);
    },
  ],
]);
