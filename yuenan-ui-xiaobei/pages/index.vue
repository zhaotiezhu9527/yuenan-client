<template>
  <view class="page">
    <u-navbar
      placeholder
      :border="false"
      autoBack
      :title="config.jiancheng"
      fixed
      leftIconSize="0"
      safe-area-inset-top
      bgColor="#4b80af"
      height="104rpx"
      titleStyle="color:#ffffff;font-weight:500;font-size:32rpx;"
    >
    </u-navbar>
    <view class="wrap pb-100">
      <view class="banner">
        <u-swiper :list="list2" class="my-swipe" indicator> </u-swiper>
      </view>
      <view class="content">
        <view
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="change(item)"
        >
          <image class="img" mode="heightFix" :src="item.img" />
          <text class="txt">{{ item.name }}</text>
        </view>
      </view>
      <view class="notice">
        <!-- <u-notice-bar
            color="#ffffff"
            bgColor="#e15241"
            scrollable
            fontSize="28rpx"
            :text="config.home_notice || ''"
          /> -->
        <view class="notice__inner">
          <view
            class="notice__box"
            :style="{ animation: `roll ${nav.length}s linear infinite` }"
          >
            <view
              class="notice__item"
              v-for="(item, index) in nav"
              :key="index"
            >
              <text>{{ item.split("-")[0] }} {{ "  " }}</text>
              <text>{{ $t("calculator") }} {{ "  " }}</text>  :
              <text>{{ "  " }} +{{ $u.priceFormat(item.split("-")[1]) }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="list">
        <view
          class="view"
          v-for="(item, index) in shopGoods"
          :key="index"
          @click="routePath(item)"
        >
          <image class="goods-img" :src="item.img" mode="widthFix" />
          <view class="name">
            <text></text>
            <text>{{ item.projectName }}</text>
          </view>
          <view class="rate">
            <view class="li">
              <view class="num"
                ><text>{{ item.incomeRate }}</text>
                %
              </view>
              <view class="con">{{ $t("incomeRate") }}</view>
            </view>
            <view class="li">
              <view class="num">
                <text>{{ item.limitTime }}</text>
                {{ $t("limitTime") }}
              </view>
              <view class="con">{{ $t("deadline") }}</view></view
            >
            <view class="li">
              <view class="num"
                >
                <text>{{ $u.priceFormat(item.minAmount) }}</text>
                {{ $t("money") }}
              </view>
              <view class="con">{{ $t("minAmount") }}</view></view
            >
          </view>
          <view class="investor">
            <view class="con">
              <text>
                {{ $t("scale") }}:{{ $u.priceFormat(item.projectAmount) }}{{ $t("money") }}
              </text>
              <text>{{ $t("interest") }}</text>
            </view>
            <view class="btn">{{ $t("investment") }}</view>
            <!-- <view class="btn gray-btn" v-else-if="item.status == 1">{{ $t("investment") }}</view> -->
          </view>
          <view class="progress">
            <view class="txt">{{ $t("progress") }}：</view>
            <u-line-progress
              :percentage="scheduleFn(item.schedule)"
              :showText="false"
              activeColor="#2196f3"
            ></u-line-progress>
            <view class="number">{{ item.schedule }}%</view>
          </view>
        </view>
        <u-empty class="empty2" :text="$t('nodata')" v-if="!shopGoods.length" />
      </view>
    </view>
  </view>
</template>

<script>
import img0 from "../static/img/func_icon_touzi.png";
import img1 from "../static/img/func_icon_guanyu.png";
import img2 from "../static/img/func_icon_jisuan.png";
import img3 from "../static/img/func_icon_qiandao.png";
import img4 from "../static/img/func_icon_chongzhi.png";
import img5 from "../static/img/func_icon_tixian.png";
import img6 from "../static/img/func_icon_zhuce.png";
import img7 from "../static/img/func_icon_kefu.png";
import banner1 from "../static/img/banner_13.jpg";
import banner2 from "../static/img/banner_14.jpg";
import banner3 from "../static/img/banner_15.jpg";
import banner4 from "../static/img/banner_16.jpg";
export default {
  data() {
    return {
      list: [
        {
          name: this.$t("investmentProject"),
          img: img0,
          path: "/pages/investor",
        },
        { name: this.$t("about"), img: img1, path: "/pages/about" },
        { name: this.$t("calculator"), img: img2, path: "/pages/personal" },
        { name: this.$t("sign"), img: img3 },
        {
          name: this.$t("topup"),
          img: img4,
          path: "/pages/preview",
        },
        // {
        //   name: this.$t("topUpUSDT"),
        //   img: img4,
        //   path: "/pages/preview",
        // },
        { name: this.$t("mywithdraw"), img: img5, path: "/pages/withdraw" },
        {
          name: this.$t("freeRegistration"),
          img: img6,
          path: "/pages/register",
        },
        {
          name: this.$t("onlineService"),
          img: img7,
          path: "/pages/preview",
        },
        // {
        //   name: this.$t("comingSoon"),
        //   img: img2,
        // },
      ],
      list2: [banner1, banner2, banner3, banner4],
      shopGoods: [],
      config: {},
      infos: {},
      nav: [
        // "0984****274 " + this.$t("calculator") + " : +19,769,980",
        // "0984****153 " + this.$t("calculator") + " : +136,111,370",
        // "0984****141 " + this.$t("calculator") + " : +49,633,420",
        // "0984****566 " + this.$t("calculator") + " : +146,852,670",
        // "0984****519 " + this.$t("calculator") + " : +193,164,960",
        // "0984****891 " + this.$t("calculator") + " : +70,294,260",
        // "0984****627 " + this.$t("calculator") + " : +71,123,430",
        // "0984****021 " + this.$t("calculator") + " : +73,687,040",
        // "0984****319 " + this.$t("calculator") + " : +142,689,960",
        // "0984****392 " + this.$t("calculator") + " : +4,263,350",
        // "0984****887 " + this.$t("calculator") + " : +176,432,880",
        // "0984****204 " + this.$t("calculator") + " : +48,791,500",
        // "0984****000 " + this.$t("calculator") + " : +35,728,690",
        // "0984****486 " + this.$t("calculator") + " : +1,418,870",
        // "0984****067 " + this.$t("calculator") + " : +77,063,500",
        // "0984****198 " + this.$t("calculator") + " : +75,847,270",
        // "0984****708 " + this.$t("calculator") + " : +70,938,810",
        // "0984****597 " + this.$t("calculator") + " : +166,879,420",
        // "0984****915 " + this.$t("calculator") + " : +190,048,500",
        // "0984****599 " + this.$t("calculator") + " : +137,505,710",
        // "0984****834 " + this.$t("calculator") + " : +31,763,320",
        // "0984****194 " + this.$t("calculator") + " : +99,301,220",
        // "0984****677 " + this.$t("calculator") + " : +157,189,030",
        // "0984****979 " + this.$t("calculator") + " : +25,066,050",
        // "0984****008 " + this.$t("calculator") + " : +45,961,250",
        // "0984****213 " + this.$t("calculator") + " : +186,106,610",
        // "0984****165 " + this.$t("calculator") + " : +63,526,450",
        // "0984****815 " + this.$t("calculator") + " : +126,407,410",
        // "0984****929 " + this.$t("calculator") + " : +119,038,210",
        // "0984****813 " + this.$t("calculator") + " : +28,991,530",
        // "0984****064 " + this.$t("calculator") + " : +4,081,690",
        // "0984****156 " + this.$t("calculator") + " : +176,740,170",
        // "0984****731 " + this.$t("calculator") + " : +92,106,310",
        // "0984****247 " + this.$t("calculator") + " : +68,664,040",
        // "0984****487 " + this.$t("calculator") + " : +123,137,370",
        // "0984****635 " + this.$t("calculator") + " : +129,541,980",
        // "0984****157 " + this.$t("calculator") + " : +178,954,460",
        // "0984****567 " + this.$t("calculator") + " : +122,291,300",
        // "0984****588 " + this.$t("calculator") + " : +5,458,360",
        // "0984****987 " + this.$t("calculator") + " : +166,984,240",
        // "0984****273 " + this.$t("calculator") + " : +104,561,170",
        // "0984****664 " + this.$t("calculator") + " : +187,626,210",
        // "0984****234 " + this.$t("calculator") + " : +102,262,420",
        // "0984****151 " + this.$t("calculator") + " : +157,706,520",
        // "0984****681 " + this.$t("calculator") + " : +81,071,480",
        // "0984****508 " + this.$t("calculator") + " : +1,810,200",
        // "0984****343 " + this.$t("calculator") + " : +54,232,190",
        // "0984****743 " + this.$t("calculator") + " : +30,727,630",
        // "0984****507 " + this.$t("calculator") + " : +192,328,850",
      ],
    };
  },
  async onLoad() {
    await this.$onLaunched;
    // this.config = uni.getStorageSync("system_config");
    this.infos = uni.getStorageSync("infos");
  },
  onShow() {
    // 获取产品列表
    this.$api.project_list().then(({ data }) => {
      if (data.code == 0) {
        this.shopGoods = data.data;
        // 测试数据
        if (this.nav.length > 3) {
          let that = JSON.parse(JSON.stringify(this.nav));
          this.nav = [...this.nav, ...that.splice(0, 3)];
        }
      }
    });
    this.systemFn();
  },
  methods: {
    change({ name, path, url }) {
      if (
        [
          this.$t("investmentProject"),
          this.$t("about"),
          this.$t("calculator"),
        ].includes(name)
      ) {
        uni.switchTab({
          url: path,
        });
      } else if (name === this.$t("freeRegistration")) {
        uni.navigateTo({
          url: path,
        });
      } else if (name === this.$t("sign")) {
        this.$api.user_sign().then(({ data }) => {
          if (data.code == 0) {
            this.$base.show(data.msg + "~");
          }
        });
      } else if ([this.$t("topup")].includes(name)) {
        // uni.navigateTo({
        //   url: "/pages/onlineService",
        // });
        window.open(this.config.online_service);
      } else if ([this.$t("onlineService")].includes(name)) {
        // uni.navigateTo({
        //   url: "/pages/onlineService",
        // });
        window.open(this.config.online_service);
      } else if ([this.$t("mywithdraw")].includes(name)) {
        if (!this.infos.bankCardNum && !this.infos.walletAddr) {
          return this.$base.show(this.$t("inputwalletType"));
        } else {
          uni.navigateTo({
            url: "/pages/withdraw",
          });
        }
      } else if (name === this.$t("comingSoon")) {
        return this.$base.show(this.$t("comingSoon"));
      }
    },
    routePath(item) {
      // if(item.status === 0){
      this.$api.project_info(item.projectId).then(({ data }) => {
        if (data.code == 0) {
          uni.navigateTo({
            url: `/pages/info?id=${item.projectId}`,
          });
        }
      });
      // }
    },
    guaranteeCompanyFn(name) {
      return name ? name.charAt(name.length - 1) : "-";
    },
    scheduleFn(page) {
      return (Number(page) > 100 ? 100 : Number(page)) || 0;
    },
    systemFn() {
      this.$api.system_config().then(({ data }) => {
        if (data.code == 0) {
          this.config = data.data;
          this.nav = data.data.phones.split(",")
          console.log(this.nav[0].split('-')[0])
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../static/list.scss";
.list {
  background-color: #fff;
  .goods-img {
    display: block;
    margin: auto;
    width: 100%;
  }
}
.page {
  background-color: #fafafa;
}
.banner {
  height: 280rpx;
  background: #4b80af;
  width: 100vw;
  border-bottom-left-radius: 50rpx;
  border-bottom-right-radius: 50rpx;
  padding: 20rpx 30rpx 0;
  box-sizing: border-box;
}
/deep/.u-swiper,
/deep/.u-swiper__wrapper,
.my-swipe {
  height: 350rpx !important;
  border-radius: 20rpx !important;
  .u-swiper__wrapper__item__wrapper__image {
    height: 100% !important;
    border-radius: 20rpx !important;
  }
}
.content {
  padding: 100rpx 0 0 0;
  overflow: hidden;
  .img {
    height: 65rpx;
    display: block;
    margin: auto;
  }
  .item {
    padding-top: 40rpx;
    width: 25%;
    float: left;
    font-weight: 600;
  }
  .txt {
    padding-top: 10rpx;
    font-size: 24rpx;
    display: block;
    width: 100%;
    text-align: center;
  }
}
.notice {
  margin: 30rpx 30rpx 0;
  overflow: hidden;
  height: 180rpx;
  border-radius: 16rpx;
  background-color: #e15241;
  .notice__inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 28rpx;
    color: #fff;
  }
  .notice__box {
    animation: roll 10s linear infinite;
  }
  .notice__item {
    width: 100%;
    height: 60rpx;
    line-height: 60rpx;
    padding: 0 40rpx;
    white-space: nowrap;
  }
}
.empty2 {
  padding-top: 40rpx;
  background-color: #fff;
}
</style>
