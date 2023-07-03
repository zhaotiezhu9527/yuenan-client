<template>
  <view class="page">
    <u-navbar
      placeholder
      :title="$t('BindUSDT')"
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
      <view v-if="bindStatus">
        <view class="bind-title">{{ $t("usdtAddr") }}</view>
        <view class="bind-text">{{ addr }}</view>
      </view>
      <view v-else>
        <view class="usdt-title">{{ $t("inputUsdtAddr") }}</view>
        <view class="from-input">
          <input
            type="text"
            class="input-text"
            v-model="addr"
            :placeholder="$t('inputUsdtAddr')"
          />
        </view>
        <u-button
          class="btn-class"
          block
          @click="changeBind"
          :loading="loading"
        >
          {{ $t("submitBind") }}
        </u-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      addr: "", //usdt地址
      bindStatus: "", //是否绑定地址
    };
  },
  onShow() {
    this.getInfo();
  },
  methods: {
    // 绑定银行卡
    changeBind() {
      if (!this.addr) {
        return this.$base.show(this.$t("inputUsdtAddr"));
      }
      this.loading = true;
      this.$api
        .user_bindUSDT({
          addr: this.addr,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.getInfo();
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //用户列表数据
    getInfo() {
      this.$api.user_info().then((res) => {
        if (res.data.code == 0) {
          this.bindStatus = res.data.data.walletAddr;
          this.addr = res.data.data.walletAddr;
          this.$base.storage("infos", res.data.data);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  .bind-title {
    margin: 40rpx 0;
    font-size: 36rpx;
    text-align: center;
    font-weight: 500;
  }
  .bind-text {
    text-align: center;
    color: #f6d658;
    font-size: 28rpx;
    font-weight: 500;
  }
  .usdt-title {
    margin: 60rpx 50rpx;
    color: #f6d658;
    font-weight: 500;
    font-size: 40rpx;
  }
  .from-input {
    margin: 40rpx;
    height: 90rpx;
    .input-text {
      height: 64rpx;
      border-bottom: 1px solid #bbb;
      font-size: 24rpx;
      font-weight: 500;
    }
  }
}
</style>
