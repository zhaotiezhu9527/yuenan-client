<template>
  <view class="page">
    <u-navbar
      placeholder
      :title="$t('investmentRecords')"
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
      <view class="title">
        <view class="title-remark">{{ $t("projectName") }}</view>
        <view class="line"></view>
        <view class="title-amount">{{ $t("investmentAmount") }}</view>
        <view class="line"></view>
        <view class="title-time">{{ $t("status") }}</view>
        <view class="line"></view>
        <view class="title-time">{{ $t("detail") }}</view>
        <view class="line"></view>
        <!-- <view class="title-time">合同</view> -->
      </view>
      <u-list @scrolltolower="load" v-if="isArray" class="scroll">
        <u-list-item v-for="(item, index) in list" :key="index">
          <view class="content">
            <view class="table-title">
              {{ item.projectName }} {{ $t("InterestRebate") }}
            </view>
            <view class="line"></view>
            <view class="table-money green-text">{{ item.amount }}</view>
            <view class="line"></view>
            <view class="table-time">{{
              item.status ? $t("complete") : $t("loadingAmount")
            }}</view>
            <view class="line"></view>
            <view class="table-time">
              <label
                class="blue-text"
                @click="goInvestmentDetails(item.orderNo)"
              >
                {{ $t("look") }}
              </label>
            </view>

            <view class="line"></view>
            <!-- <view class="table-time">
              <label class="grey-text" @click="goContract(item.orderNo)">
                {{ $t("look") }}
              </label>
            </view> -->
          </view>
        </u-list-item>
        <view class="loading" v-if="loading">{{ $t("loading") }}...</view>
        <view class="nomore" v-if="finished">{{ $t("finished") }}</view>
      </u-list>
      <u-empty class="empty" :text="$t('nodata')" v-else />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [], //列表数据
      loading: false,
      finished: false,
      isArray: false,
      page: 0,
    };
  },
  onLoad() {
    this.list = [];
    uni.showLoading();
    this.page = 1;
    this.dataFn();
  },
  methods: {
    goInvestmentDetails(num) {
      uni.navigateTo({
        url: "/pages/InvestmentDetails?orderNo=" + num,
      });
    },
    goContract(num) {
      uni.navigateTo({
        url: "/pages/contract?orderNo=" + num,
      });
    },
    load() {
      if (this.loading || this.finished) return false;
      this.page++;
      this.dataFn(this.page);
    },
    dataFn(page = 1, limit = 20) {
      this.loading = true;
      this.$api
        .invest_list({ page, limit })
        .then((res) => {
          if (res.data.code == 0) {
            const vim = res.data.page;
            this.list = this.list.concat(vim.list);
            this.isArray = vim.totalCount ? true : false;
            if (this.page >= vim.totalPage) {
              this.finished = true;
            }
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
@import "../static/record.scss";
</style>
