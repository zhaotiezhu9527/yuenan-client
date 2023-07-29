<template>
  <view class="page">
    <u-navbar
      placeholder
      :title="$t('bankCardNumTitle')"
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
      <view v-if="bindStatus" class="card-box">
        <view class="card">
          <view class="card-name">{{ bankName }}</view>
          <view class="card-text">{{ $t("bankName") }}</view>
          <view class="card-num">{{ bankCardNum }}</view>
        </view>
      </view>
      <view v-else>
        <view class="usdt-title">{{ $t("addBank") }}</view>
        <view class="from-input">
          <image class="img" src="../static/img/bind_02.png" mode="widthFix" />
          <input
            type="text"
            v-model="realName"
            class="input-text"
            :placeholder="$t('inputRealName')"
          />
        </view>
        <view class="from-input">
          <image class="img" src="../static/img/bind_03.png" mode="widthFix" />
          <input
            type="text"
            v-model="idCardNo"
            class="input-text"
            :placeholder="$t('inputidCardNo')"
          />
        </view>
        <view class="from-input">
          <image class="img" src="../static/img/bind_01.png" mode="widthFix" />
          <input
            type="text"
            class="input-text"
            v-model="bankName"
            :placeholder="$t('inputBank')"
          />
        </view>
        <view class="from-input">
          <image class="img" src="../static/img/bind_01.png" mode="widthFix" />
          <input
            type="text"
            v-model="bankCardNum"
            class="input-text"
            :placeholder="$t('inputBankCardNum')"
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
      bankName: "", //银行名称
      bankCardNum: "", //银行卡号
      realName: "", //真实姓名
      idCardNo: "", //身份证号
      loading: false,
      bindStatus: "", //银行卡绑定状态
    };
  },
  onShow() {
    this.getInfo();
  },
  methods: {
    // 绑定银行卡
    changeBind() {
      if (!this.bankName) {
        return this.$base.show(this.$t("inputBank"));
      } else if (!this.bankCardNum) {
        return this.$base.show(this.$t("inputBankCardNum"));
      } else if (!this.realName) {
        return this.$base.show(this.$("inputRealName"));
      } else if (!this.idCardNo) {
        return this.$base.show(this.$("inputidCardNo"));
      }
      this.loading = true;
      this.$api
        .user_bindBank({
          realName: this.realName,
          idCardNo: this.idCardNo,
          bankName: this.bankName,
          cardNo: this.bankCardNum,
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
          this.bindStatus = res.data.data.bankName;
          this.bankName = res.data.data.bankName;
          this.bankCardNum = res.data.data.bankCardNum;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  .usdt-title {
    margin: 60rpx 50rpx;
    color: #4b80af;
    font-weight: 500;
    font-size: 40rpx;
  }
  .from-input {
    margin: 40rpx;
    height: 64rpx;
    display: flex;
    align-items: center;
    .input-text {
      height: 64rpx;
      font-size: 28rpx;
      margin-left: 10rpx;
    }
    .img {
      width: 36rpx;
    }
  }
  .card-box {
    margin: 40rpx 30rpx;
    .card {
      padding: 30rpx 20rpx;
      height: 320rpx;
      background-image: linear-gradient(#689cd9, #5584c2);
      color: #333;
      .card-name {
        font-size: 28rpx;
      }
      .card-text {
        font-size: 12px;
        line-height: 160rpx;
      }
      .card-num {
        font-size: 50rpx;
        font-weight: 600;
      }
    }
  }
}
</style>
