<template>
  <view class="page">
    <u-navbar
      placeholder
      :title="$t('idCard')"
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
        <label>{{ $t("name") }}</label>
        <input
          type="text"
          :disabled="!bindStatus"
          v-model="realName"
          class="input-text"
          :placeholder="$t('inputRealName')"
        />
      </view>
      <view class="from-input">
        <label>{{ $t("idCardNo") }}</label>
        <input
          type="text"
          :disabled="!bindStatus"
          v-model="idCardNo"
          class="input-text"
          :placeholder="$t('inputidCardNo')"
        />
      </view>
      <u-button
        v-if="bindStatus"
        class="btn-class"
        block
        @click="changeBind"
        :loading="loading"
      >
        {{ $t("idCard") }}
      </u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      idCardNo: "", //身份证号
      realName: "", //真实姓名
      bindStatus: false, //是否实名
    };
  },
  onShow() {
    this.getInfo();
  },
  methods: {
    //用户列表数据
    getInfo() {
      this.$api.user_info().then((res) => {
        if (res.data.code == 0) {
          if (!res.data.data.idCard || res.data.data.idCard === null) {
            this.bindStatus = true;
          } else {
            this.bindStatus = false;
          }
          this.idCardNo = res.data.data.idCard;
          this.realName = res.data.data.realName;
        }
      });
    },
    // 实名认证
    changeBind() {
      if (!this.realName) {
        return this.$base.show(this.$t("inputRealName"));
      } else if (!this.idCardNo) {
        return this.$base.show(this.$t("inputidCardNo"));
      }
      this.loading = true;
      this.$api
        .user_realName({
          realName: this.realName,
          idCardNo: this.idCardNo,
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
    }
    .input-text {
      flex: 1;
      text-align: right;
    }
  }
}
</style>
