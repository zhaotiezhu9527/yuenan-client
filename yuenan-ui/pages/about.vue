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
      height="104rpx"
      titleStyle="color:#000;font-weight:500;font-size:32rpx;"
    >
    </u-navbar>
    <view class="wrap pb-100">
      <image class="image" mode="widthFix" src="../static/img/about.png" />
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
.image {
  width: 100vw;
}
.text {
  font-size: 50rpx;
}
</style>
