<template>
  <view class="page">
    <u-navbar
      placeholder
      :title="$t('alterLoginPwd')"
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
      <view class="from-input">
        <label>{{ $t("oldPwd") }}</label>
        <input
          type="password"
          v-model="oldPwd"
          class="input-text"
          :placeholder="$t('loginPass')"
        />
      </view>
      <view class="from-input">
        <label>{{ $t("newPwd") }}</label>
        <input
          type="password"
          v-model="newPwd"
          class="input-text"
          :placeholder="$t('loginNewPass')"
        />
      </view>
      <view class="from-input">
        <label>{{ $t("confirmPwd") }}</label>
        <input
          type="password"
          v-model="password"
          class="input-text"
          :placeholder="$t('confirmLoginPwd')"
        />
      </view>
      <u-button class="btn-class" block @click="login" :loading="loading">
        {{ $t("sucAlter") }}
      </u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      newPwd: "",
      oldPwd: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (!this.oldPwd) {
        return this.$base.show(this.$t("loginPass"));
      } else if (!this.newPwd || this.newPwd.length < 6) {
        return this.$base.show(this.$t("loginNewPass"));
      } else if (this.oldPwd === this.newPwd) {
        return this.$base.show(this.$t("NoTwoLoginPwd"));
      } else if (this.password != this.newPwd) {
        return this.$base.show(this.$t("twoPwd"));
      }
      const DATA_OBJ = {
        oldPwd: this.oldPwd,
        newPwd: this.newPwd,
      };
      this.loading = true;
      this.$api
        .user_updatePwd(DATA_OBJ)
        .then((res) => {
          if (res.data.code == 0) {
            this.$base.show(res.data.msg);
            uni.removeStorage({
              key: "token",
              success: function (res) {
                this.newPwd = "";
                this.oldPwd = "";
                this.password = "";
                uni.redirectTo({
                  url: "/pages/login",
                });
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
.wrap {
  .from-input {
    margin: 40rpx;
    display: flex;
    height: 90rpx;
    label {
      width: 200rpx;
      margin-right: 20rpx;
      font-weight: 500;
    }
    .input-text {
      flex: 1;
      text-align: right;
    }
  }
}
</style>
