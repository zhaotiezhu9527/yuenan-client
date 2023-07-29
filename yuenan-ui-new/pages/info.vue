<template>
  <view class="page">
    <u-navbar
      placeholder
      :title="$t('investmentInfos')"
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
      <view class="list">
        <view class="view">
          <image class="img" :src="items.img" mode="widthFix" />
          <view class="name">
            <text>{{ items.projectName }}</text>
          </view>
          <view class="rate">
            <view class="li">
              <view class="con">{{ $t("scale") }}</view>
              <view class="num">
                <text>{{ items.projectAmount.toLocaleString() }} </text>
                {{ $t("money") }}
              </view>
            </view>
            <view class="li">
              <view class="con">{{ $t("share") }}</view>
              <view class="num"
                ><text>{{
                  (items.minAmount * (items.incomeRate / 100)).toLocaleString()
                }}</text
                >{{ $t("money") }}</view
              >
            </view>
            <view class="li">
              <view class="con">{{ $t("period") }}</view>
              <view class="num"
                ><text>{{ items.limitTime }}</text
                >{{ $t("limitTime") }}</view
              >
            </view>
          </view>
          <view class="investor">
            <view class="con">
              <text>{{ $t("shareType") }}：{{ $t("InterestRebate") }}</text>
              <text>
                {{ $t("minAmount") }}：{{ items.minAmount.toLocaleString() }}{{ $t("money") }}
              </text>
              <text>
                {{ $t("organization") }}：{{ items.guaranteeCompany }}
              </text>
              <text>{{ $t("risk") }}</text>
            </view>
          </view>
          <view class="progress">
            <view class="number">{{ items.schedule }}%</view>
            <u-line-progress
              height="60"
              :percentage="scheduleFn(items.schedule)"
              :showText="false"
              activeColor="#2196f3"
            ></u-line-progress>
          </view>
        </view>
      </view>
      <view class="tabs">
        <view class="name">{{ $t("investmentInfos") }}</view>
        <u-row class="row">
          <u-col class="col" span="4">{{ $t("projectName") }}</u-col>
          <u-col class="col" span="8">{{ items.projectName }}</u-col>
        </u-row>
        <u-row class="row">
          <u-col class="col" span="4">{{ $t("itemAmount") }}:</u-col>
          <u-col class="col" span="8">
            <view>
              <text class="main-c">{{ items.projectAmount.toLocaleString() }}</text
              >{{ $t("money") }}{{ $t("rmb") }}
            </view>
          </u-col>
        </u-row>
        <u-row class="row">
          <u-col class="col" span="4">{{ $t("everyday") }}:</u-col>
          <u-col class="col" span="8">
            <text class="main-c">
              {{ $t("day") }}{{ items.incomeRate }}%{{ $t("breakEven") }}
            </text>
          </u-col>
        </u-row>
        <u-row class="row">
          <u-col class="col" span="4">{{ $t("investmentAmount") }}:</u-col>
          <u-col class="col" span="8">
            <text class="main-c"
              >{{ $t("start") }}{{ items.minAmount.toLocaleString() }}{{ $t("money") }}</text
            >
          </u-col>
        </u-row>
        <u-row class="row">
          <u-col class="col" span="4">{{ $t("deadline") }}:</u-col>
          <u-col class="col" span="8">
            <text class="main-c">
              {{ $t("byStages") }}{{ items.limitTime }}{{ $t("limitTime") }}
            </text>
          </u-col>
        </u-row>
        <u-row class="row">
          <u-col class="col" span="4">{{ $t("calculate") }}:</u-col>
          <u-col class="col" span="8">
            <text class="main-c">{{ $t("dayShare") }}</text>
          </u-col>
        </u-row>
        <u-row class="row">
          <u-col class="col" span="4">{{ $t("repaymentType") }}:</u-col>
          <u-col class="col" span="8">{{ $t("dayRebate") }}</u-col>
        </u-row>
        <u-row class="row">
          <u-col class="col" span="4">{{ $t("cutoffTime") }}:</u-col>
          <u-col class="col" span="8">{{ $t("investmentDetail") }} </u-col>
        </u-row>
        <u-row class="row">
          <u-col class="col" span="4">{{ $t("investableAmount2") }}:</u-col>
          <u-col class="col" span="8">{{ $t("investableAmountInfos") }}</u-col>
        </u-row>
        <u-row class="row">
          <u-col class="col" span="4">{{ $t("safety") }}:</u-col>
          <u-col class="col" span="8">
            {{ items.guaranteeCompany }}{{ $t("brushstroke") }}
            <text class="main-c">{{ $t("oneHundred") }}</text>
            {{ $t("safetyInfos") }}
          </u-col>
        </u-row>
        <u-row class="row">
          <u-col class="col" span="4">{{ $t("summarize") }}:</u-col>
          <u-col class="col" span="8">
            <view>
              {{ $t("raise")
              }}<text class="main-c"
                >{{ items.projectAmount.toLocaleString() }}{{ $t("money") }}</text
              >
              {{ $t("rmb") }}，{{ $t("raiseInfos") }}
            </view>
          </u-col>
        </u-row>
      </view>
    </view>
    <view class="btn">
      <u-button
        class="btn-class"
        :class="items.status === 1 ? 'custom-style' : ''"
        block
        @click="change(items)"
      >
        {{ $t("immediately") }}
      </u-button>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      items: {},
    };
  },
  onLoad(e) {
    // 获取产品详情
    this.$api.project_info(e.id).then(({ data }) => {
      if (data.code == 0) {
        this.items = data.data;
      }
    });
  },
  methods: {
    scheduleFn(page) {
      return (Number(page) > 100 ? 100 : Number(page)) || 0;
    },
    change(item) {
      if (item.status === 0) {
        uni.navigateTo({
          url: `/pages/content?id=${this.items.projectId}`,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
view,
text {
  font-weight: 500;
}
.list {
  .img{
    width: 100%;
    margin: auto;
  }
  .view {
    padding: 20rpx;
    box-sizing: border-box;
    background-color: #fff;
  }
  .name {
    display: flex;
    align-items: center;
    padding-bottom: 16rpx;
    text {
      font-size: 32rpx;
    }
  }
  .rate {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40rpx 0;
    background-color: #f4f4f4;
    .li {
      width: calc(100% / 3);
      text-align: center;
    }
    .con,
    .num {
      font-size: 24rpx;
    }
    .num {
      padding-top: 20rpx;
    }
    .con {
      color: #a0a0a1;
    }
    text {
      color: #4c7eaf;
    }
  }
  .investor {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .con {
      display: flex;
      justify-content: center;
      flex-direction: column;
      text {
        text-align: left;
        font-size: 24rpx;
        padding-bottom: 25rpx;
        font-weight: 500;
        &:nth-child(1) {
          padding-top: 25rpx;
        }
      }
    }
  }
  .progress {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    /deep/.u-line-progress,
    /deep/.u-line-progress__background {
      border-radius: 10rpx !important;
    }
    /deep/.u-line-progress__line {
      border-radius: 10rpx;
    }

    .number {
      position: absolute;
      color: #fff;
      font-size: 26rpx;
      width: 100rpx;
      text-align: right;
      z-index: 2;
    }
  }
}
.tabs {
  padding: 40rpx 20rpx 120rpx;
  padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
  padding-bottom: env(120rpx + constant(safe-area-inset-bottom));
  .name {
    text-align: center;
    color: #4c7eaf;
    font-size: 32rpx;
  }
  .row {
    display: flex;
    justify-content: inherit !important;
    align-items: inherit !important;
    &:nth-child(2) {
      margin-top: 30rpx;
      .col {
        border-top: 2rpx solid #000;
      }
    }
  }
  .col {
    border: 2rpx solid #000;
    padding: 15rpx 30rpx;
    font-size: 24rpx;
    line-height: 1.5;
    border-top: 0;
    &:nth-child(1) {
      border-right: 0;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    &:nth-child(2) {
      padding: 14rpx 30rpx !important;
    }
  }
}
.btn {
  .btn-class {
    width: 100%;
  }
  padding: 10rpx 20rpx;
  padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
  padding-bottom: env(10rpx + constant(safe-area-inset-bottom));
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
}
.main-c {
  color: red;
}
</style>
