<template>
  <view class="page">
    <u-navbar
      placeholder
      :title="$t('register')"
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
      <view class="logo">
        <image
          class="img"
          mode="widthFix"
          src="../static/img/login_logo.png"
        />
      </view>
      <view class="form">
        <u-form ref="uForm" labelPosition="left" labelWidth="124">
          <u-form-item>
            <template #label>
              <image
                class="img"
                src="../static/img/user3.png"
                mode="widthFix"
              />
            </template>
            <u-input
              type="text"
              :placeholder="$t('registerAccount')"
              clearable
              border="none"
              v-model="userPhone"
            >
            </u-input>
          </u-form-item>
          <u-form-item>
            <template #label>
              <image
                class="img"
                src="../static/img/pass2.png"
                mode="widthFix"
              />
            </template>
            <u-input
              type="password"
              :placeholder="$t('loginPass')"
              clearable
              border="none"
              v-model="password"
            ></u-input>
          </u-form-item>
          <u-form-item>
            <template #label>
              <image
                class="img"
                src="../static/img/pass2.png"
                mode="widthFix"
              />
            </template>
            <u-input
              type="password"
              :placeholder="$t('confirmLoginPwd')"
              clearable
              border="none"
              v-model="confirmLoginPwd"
            ></u-input>
          </u-form-item>
          <u-form-item>
            <template #label>
              <image
                class="img2"
                src="../static/img/money2.png"
                mode="widthFix"
              />
            </template>
            <u-input
              type="password"
              :placeholder="$t('inputPayPwd')"
              clearable
              border="none"
              v-model="payPwd"
            ></u-input>
          </u-form-item>
          <u-form-item>
            <template #label>
              <image
                class="img2"
                src="../static/img/user2.png"
                mode="widthFix"
              />
            </template>
            <u-input
              type="number"
              :placeholder="$t('inviteCode')"
              clearable
              border="none"
              v-model="inviteCode"
            ></u-input>
          </u-form-item>
        </u-form>
      </view>
      <view class="btns">
        <u-button
          class="btn-class"
          color="#f6d658"
          block
          @click="login"
          :loading="loading"
        >
          {{ $t("register") }}
        </u-button>
        <view class="register" @click="register">
          {{ $t("returnLogin") }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      userPhone: "",
      icon: "",
      show: false,
      columns: [],
      loading: false,
      confirmLoginPwd: "", //确认登录密码
      payPwd: "", //支付密码
      inviteCode: "", //邀请码id
    };
  },
  onLoad() {},
  methods: {
    login() {
      if (!this.userPhone || this.userPhone.length < 6) {
        return this.$base.show(this.$t("loginAccount"));
      } else if (!this.password || this.password.length < 6) {
        return this.$base.show(this.$t("loginPass"));
      } else if (this.password != this.confirmLoginPwd) {
        return this.$base.show(this.$t("twoPwd"));
      } else if (!this.payPwd || this.payPwd.length < 6) {
        return this.$base.show(this.$t("payPwd"));
      } else if (!this.inviteCode || this.inviteCode.length < 6) {
        return this.$base.show(this.$t("inviteCode"));
      }
      const DATA_OBJ = {
        loginPwd: this.password,
        userName: this.userPhone,
        confirmLoginPwd: this.confirmLoginPwd,
        payPwd: this.payPwd,
        inviteCode: this.inviteCode,
      };
      this.loading = true;
      this.$api
        .user_register(DATA_OBJ)
        .then((res) => {
          if (res.data.code == 0) {
            uni.setStorage({
              key: "token",
              data: res.data.token,
              success: function () {
                uni.switchTab({ url: "/pages/personal" });
              },
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    navigateToFn() {
      uni.navigateTo({
        url: "/pages/login",
      });
    },
    register() {
      if (uni.getStorageSync("token")) {
        uni.removeStorage({
          key: "token",
          success: (res) => {
            this.navigateToFn();
          },
        });
      } else {
        this.navigateToFn();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  justify-content: center;
  padding-top: 60rpx;
  .img {
    width: 50%;
  }
}
.btns {
  text-align: center;
  padding: 40rpx 0 0;

  .register {
    color: #f6d658;
    font-size: 32rpx;
    margin-top: 40rpx;
  }
}
.form {
  padding: 40rpx 40rpx 0;
  width: 100%;
  box-sizing: border-box;
  .img {
    width: 44rpx;
    margin-right: 24rpx;
  }
  .img2 {
    margin-right: 28rpx;
    width: 40rpx;
  }
}
</style>
