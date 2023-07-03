<template>
  <view class="page">
    <u-navbar
      placeholder
      :title="$t('onlineService')"
      :border="false"
      autoBack
      fixed
      safe-area-inset-top
      bgColor="#f6d658"
      leftIconColor="#fff"
      leftIconSize="32"
      height="52px"
      titleStyle="color:#000;font-weight:500;font-size:32rpx;"
    >
    </u-navbar>
    <view class="wrap">
      <view>
        <!-- <web-view :src="config.online_service"></web-view> -->
        <iframe :src="config.online_service" class="online"> </iframe>
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
  async onShow() {
    await this.$onLaunched;
    this.config = uni.getStorageSync("system_config");
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.online {
  width: 100%;
  height: calc(100vh - 102px + var(--status-bar-height));
  border: none;
}
</style>
