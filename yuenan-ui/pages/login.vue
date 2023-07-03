<template>
  <view class="page">
    <u-navbar
      placeholder
      :title="$t('login')"
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
      <view class="logo">
        <image
          class="img"
          mode="widthFix"
          src="../static/img/login_logo.png"
        />
      </view>
      <view class="from">
        <u-form ref="uForm" labelPosition="left" labelWidth="124">
          <u-form-item :label="$t('account')">
            <u-input
              type="text"
              :placeholder="$t('loginAccount')"
              clearable
              border="none"
              v-model="userPhone"
            ></u-input>
          </u-form-item>
          <u-form-item :label="$t('password')">
            <u-input
              type="password"
              :placeholder="$t('loginPass')"
              clearable
              border="none"
              v-model="password"
            ></u-input>
          </u-form-item>
        </u-form>
        <view class="btns">
          <u-button
            class="custom-style"
            color="#f6d658"
            block
            @click="login"
            :loading="loading"
          >
            {{ $t("login") }}
          </u-button>
          <view class="register" @click="register"> {{ $t("register") }} </view>
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
      loading: false,
    };
  },
  methods: {
    changeLang(e) {
      this.$i18n.locale = e;
      uni.setStorageSync("lang", e);
    },
    register() {
      uni.navigateTo({
        url: "/pages/register",
      });
    },
    login() {
      if (!this.userPhone) {
        return this.$base.show(this.$t("loginAccount"));
      } else if (!this.password) {
        return this.$base.show(this.$t("loginPass"));
      }
      const DATA_OBJ = {
        loginPwd: this.password,
        userName: this.userPhone,
      };
      this.loading = true;
      this.$api
        .user_login(DATA_OBJ)
        .then((res) => {
          if (res.data.code == 0) {
            // 记录token过期时间
            uni.setStorageSync("dateTime", new Date().getTime());
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
  },
};
</script>

<style scoped lang="scss">
view,
text {
  font-size: 32rpx;
}
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
  padding: 40rpx 0;
  .custom-style {
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    font-size: 32rpx;
    height: 88rpx;
  }
  .register {
    color: #f6d658;
    font-size: 32rpx;
    margin-top: 40rpx;
  }
}
.from {
  padding: 40rpx;
  width: 100%;
  box-sizing: border-box;
  .image {
    height: 60rpx;
  }
}
</style>
