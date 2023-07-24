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
      bgColor="#f6d658"
      height="104rpx"
      titleStyle="color:#000;font-weight:500;font-size:32rpx;"
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
          <image class="img" :src="item.img" />
          <text class="txt">{{ item.name }}</text>
        </view>
      </view>
      <view class="notice">
        <u-notice-bar
          color="#ffffff"
          bgColor="#e15241"
          scrollable
          fontSize="28rpx"
          :text="config.home_notice || ''"
        />
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
                ><text>{{ item.minAmount }}</text>
                {{ $t("money") }}
              </view>
              <view class="con">{{ $t("minAmount") }}</view></view
            >
          </view>
          <view class="investor">
            <view class="con">
              <text>
                {{ $t("scale") }}：{{ item.projectAmount }}{{ $t("money") }}
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
              activeColor="#f6d658"
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
        {
          name: this.$t("calculator"),
          img: img4,
          path: "/pages/RevenueRecords",
        },
        { name: this.$t("sign"), img: img3 },
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
      }
    });
    this.systemFn();
  },
  methods: {
    change({ name, path, url }) {
      if ([this.$t("investmentProject"), this.$t("about")].includes(name)) {
        uni.switchTab({
          url: path,
        });
      } else if (name === this.$t("calculator")) {
        uni.navigateTo({
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
      } else if ([this.$t("topUpUSDT")].includes(name)) {
        uni.navigateTo({
          url: "/pages/onlineService",
        });
      } else if ([this.$t("onlineService")].includes(name)) {
        uni.navigateTo({
          url: "/pages/onlineService",
        });
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
    width: 100%;
    display: block;
    margin: 0 auto;
  }
}
.page {
  background-color: #fafafa;
}
.banner {
  height: 280rpx;
  background: #f6d658;
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
    width: 70rpx;
    height: 70rpx;
    display: block;
    margin: auto;
  }
  .item {
    padding-top: 40rpx;
    width: 25%;
    float: left;
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
  border-radius: 10rpx;
  overflow: hidden;
  /deep/.uicon-volume {
    font-size: 32rpx !important;
    line-height: 32rpx !important;
  }
}
.empty2 {
  padding-top: 40rpx;
  background-color: #fff;
}
</style>
