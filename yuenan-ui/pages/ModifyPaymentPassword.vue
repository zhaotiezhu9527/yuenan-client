<template>
  <view class="page">
    <u-navbar
      placeholder
      :title="$t('alterPayPwd')"
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
        <label>{{ $t("oldPayPwd") }}</label>
        <input
          type="password"
          v-model="oldPwd"
          class="input-text"
          :placeholder="$t('inputPayPwd')"
        />
      </view>
      <view class="from-input">
        <label>{{ $t("newPayPwd") }}</label>
        <input
          v-model="newPwd"
          type="password"
          class="input-text"
          :placeholder="$t('inputNewPayPwd')"
        />
      </view>
      <view class="from-input">
        <label>{{ $t("confirmPwd") }}</label>
        <input
          v-model="password"
          type="text"
          class="input-text"
          :placeholder="$t('confirmLoginPwd')"
        />
      </view>
      <u-button
        class="btn-class"
        color="#f6d658"
        block
        @click="login"
        :loading="loading"
      >
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
        return this.$base.show(this.$t("inputPayPwd"));
      } else if (!this.newPwd || this.newPwd.length < 6) {
        return this.$base.show(this.$t("inputNewPayPwd"));
      } else if (this.oldPwd === this.newPwd) {
        return this.$base.show(this.$t("NoTwoPayPwd"));
      } else if (this.password != this.newPwd) {
        return this.$base.show(this.$t("twoPwd"));
      }
      const DATA_OBJ = {
        oldPwd: this.oldPwd,
        newPwd: this.newPwd,
      };
      this.loading = true;
      this.$api
        .user_updatePayPwd(DATA_OBJ)
        .then((res) => {
          if (res.data.code == 0) {
            this.$base.show(res.data.msg);
            this.newPwd = "";
            this.oldPwd = "";
            this.password = "";
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
  padding-top: 54rpx;
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
