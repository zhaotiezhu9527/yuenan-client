<template>
  <view class="page">
    <u-navbar
      placeholder
      :title="$t('aboutTitle')"
      :border="false"
      autoBack
      fixed
      leftIconSize="0"
      safe-area-inset-top
      bgColor="#f6d658"
      height="52px"
      titleStyle="color:#000;font-weight:500;font-size:32rpx;"
    >
    </u-navbar>
    <view class="wrap">
      <scroll-view scroll-y class="scroll">
        <image
          class="image"
          mode="widthFix"
          src="../static/img/about.png"
        />
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.scroll {
  height: calc(100vh - 210rpx + var(--status-bar-height));
}
.image {
  width: 100vw;
}
.text {
  font-size: 50rpx;
}
</style>
