<template>
  <view class="page">
    <u-navbar
      placeholder
      :title="$t('investor')"
      :border="false"
      autoBack
      fixed
      leftIconSize="0"
      safe-area-inset-top
      bgColor="#4b80af"
      height="104rpx"
      titleStyle="color:#ffffff;font-weight:500;font-size:32rpx;"
    >
    </u-navbar>
    <view class="wrap pb-100">
      <view class="list" v-if="shopGoods.length">
        <view
          class="view"
          v-for="(item, index) in shopGoods"
          :key="index"
          @click="routePath(item)"
        >
          <image class="goods-img" :src="item.img" mode="widthFix" />
          <view class="name">
            <text>
              <!-- {{ $t("projectName2") }} -->
            </text>
            <text>{{ item.projectName }}</text>
          </view>
          <view class="rate">
            <view class="li">
              <view class="num"
                ><text>{{ item.incomeRate }}</text>
                %
              </view>
              <view class="con">{{ $t("incomeRate") }}</view>
            </view>
            <view class="li">
              <view class="num">
                <text>{{ item.limitTime }}</text>
                {{ $t("limitTime") }}
              </view>
              <view class="con">{{ $t("deadline") }}</view></view
            >
            <view class="li">
              <view class="num">
                <text>{{ item.minAmount.toLocaleString() }}</text>
                {{ $t("money") }}
              </view>
              <view class="con">{{ $t("minAmount") }}</view>
            </view>
          </view>
          <view class="investor">
            <view class="con">
              <text>
                {{ $t("scale") }}:{{ item.projectAmount.toLocaleString() }}{{ $t("money") }}
              </text>
              <text>{{ $t("interest") }}</text>
            </view>
            <view class="btn">{{ $t("investment") }}</view>
            <!-- <view class="btn gray-btn" v-else-if="item.status == 1">{{ $t("investment") }}</view> -->
          </view>
          <view class="progress">
            <view class="txt">{{ $t("progress") }}：</view>
            <u-line-progress
              :percentage="scheduleFn(item.schedule)"
              :showText="false"
              activeColor="#2196f3"
            />
            <view class="number">{{ item.schedule }}%</view>
          </view>
        </view>
      </view>

      <u-empty class="empty" :text="$t('nodata')" v-else />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      shopGoods: [],
      loading: false,
    };
  },
  onShow() {
    this.dataFn();
  },
  methods: {
    dataFn() {
      this.loading = true;
      this.$api
        .project_list()
        .then(({ data }) => {
          if (data.code == 0) {
            this.shopGoods = data.data;
          } else {
            this.$base.show(data.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    routePath(item) {
      // if(item.status === 0){
      this.$api.project_info(item.projectId).then(({ data }) => {
        if (data.code == 0) {
          uni.navigateTo({
            url: `/pages/info?id=${item.projectId}`,
          });
        }
      });
      // }
    },
    guaranteeCompanyFn(name) {
      return name ? name.charAt(name.length - 1) : "-";
    },
    scheduleFn(page) {
      return (Number(page) > 100 ? 100 : Number(page)) || 0;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../static/list.scss";
.scroll {
  height: calc(100vh - 210rpx + var(--status-bar-height));
}
.page {
  background-color: #fafafa;
}
.goods-img {
  display: block;
  margin: auto;
  width: 100%;
}
</style>
