<template>
  <view class="page">
    <u-navbar
      placeholder
      :title="$t('AccountSafe')"
      :border="false"
      autoBack
      fixed
      safe-area-inset-top
      bgColor="#f6d658"
      leftIconColor="#fff"
      leftIconSize="32"
      height="104rpx"
      titleStyle="color:#000;font-weight:500;font-size:32rpx;"
    >
    </u-navbar>
    <view class="wrap">
      <view class="content">
        <view class="list">
          <view class="image">
            <image class="icon-img2" src="../static/img/phone.png" />
          </view>
          <label>{{ $t("userName") }}</label>
          <view class="right-text">{{ infos.userName }}</view>
        </view>
        <view class="list margintop10 borderBottom">
          <view class="image">
            <image class="icon-img" src="../static/img/mine_func_code.png" />
          </view>
          <label>{{ $t("inviteCodeText") }}</label>
          <view class="right-text">{{ infos.inviteCode }}</view>
        </view>
        <view class="list margintop10 borderBottom" @click="goRealName">
          <view class="image">
            <image class="icon-img" src="../static/img/admin.png" />
          </view>
          <label>{{ $t("idCard") }}</label>
          <view class="right-text">{{
            infos.idCard ? $t("yesIdCard") : $t("noIdCard")
          }}</view>
        </view>
        <view class="list borderBottom" @click="goChangeLoginPassword">
          <view class="image">
            <image class="icon-img" src="../static/img/pass.png" />
          </view>
          <label>{{ $t("alterLoginPwd") }}</label>
        </view>
        <view class="list" @click="goModifyPaymentPassword">
          <view class="image">
            <image class="icon-img2" src="../static/img/key.png" />
          </view>
          <label>{{ $t("alterPayPwd") }}</label>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      infos: {},
    };
  },
  onShow() {
    this.getData();
  },
  methods: {
    goRealName() {
      uni.navigateTo({
        url: "/pages/RealName",
      });
    },
    goModifyPaymentPassword() {
      uni.navigateTo({
        url: "/pages/ModifyPaymentPassword",
      });
    },
    goChangeLoginPassword() {
      uni.navigateTo({
        url: "/pages/ChangeLoginPassword",
      });
    },
    getData() {
      this.$api.user_info().then(({ data }) => {
        if (data.code == 0) {
          this.infos = data.data;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  background-color: #f7f8fa;
  min-height: 100vh;
  .content {
    padding-top: 14rpx;
    color: #557fab;
    .list {
      display: flex;
      padding: 28rpx 20rpx;
      background-color: #fff;
      font-size: 28rpx;
      align-items: center;
      .image {
        margin-right: 20rpx;
      }
      .image,
      .icon-img {
        width: 40rpx;
        height: 40rpx;
      }
      .icon-img2 {
        width: 36rpx;
        height: 36rpx;
      }
      label {
        flex: 1;
      }
      .right-text {
        text-align: right;
      }
    }
  }
}
</style>
