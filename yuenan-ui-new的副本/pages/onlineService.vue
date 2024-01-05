<template>
  <view class="page">
    <u-navbar
      placeholder
      :title="$t('onlineService')"
      :border="false"
      autoBack
      fixed
      safe-area-inset-top
      bgColor="#4b80af"
      leftIconColor="#fff"
      leftIconSize="32"
      height="104rpx"
      titleStyle="color:#ffffff;font-weight:500;font-size:32rpx;"
    >
    </u-navbar>
    <view class="wrap">
      <view>
        <!-- <web-view :src="config.online_service"></web-view> -->
        <!-- <iframe :src="config.online_service" class="online"> </iframe> -->
        <!-- <iframe src="https://t.me/wmeijin" class="online"> </iframe> -->
        <a class="cskh-a" href="https://t.me/wmeijin">CSKH</a>
      </view>
      <!-- <web-view :src="config.online_service"></web-view> -->
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      config: {}, //配置
    };
  },
  onShow() {
    this.systemFn();
  },
  methods: {
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
.online {
  width: 100%;
  height: calc(100vh - 102px + var(--status-bar-height));
  border: none;
}
.cskh-a{
  display: block;
  /* padding: 10px 20px; */
  width: 200rpx;
  text-align: center;
  margin: 40rpx auto;
  background-color: #4c72a6;
  border-radius: 10rpx;
  color: #fff;
  height: 80rpx;
  line-height: 80rpx;
  text-decoration: none;
}
</style>
