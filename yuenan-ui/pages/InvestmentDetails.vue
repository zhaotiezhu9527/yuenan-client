<template>
  <view class="page">
    <u-navbar
      placeholder
      :title="$t('investmentInfos')"
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
      <view class="details-text">
        <view>
          {{ $t("investmentAmount") }}：{{ detailsData.amount
          }}{{ $t("money") }}
        </view>
        <view>
          {{ $t("forecastReturnAmount") }}：{{ detailsData.forecastReturnAmount
          }}{{ $t("money") }}
        </view>
        <view> {{ $t("orderTime") }}：{{ detailsData.orderTime }} </view>
        <view>
          {{ $t("forecastReturnTime") }}：{{ detailsData.forecastReturnTime }}
        </view>
        <view> {{ $t("amountType") }}：{{ $t("InterestRebate") }} </view>
      </view>
      <table class="table-data">
        <tr>
          <th width="15%">{{ $t("receivableAmount") }}</th>
          <th width="15%">{{ $t("receivableInterest") }}</th>
          <th>{{ $t("receivableTime") }}</th>
          <th>{{ $t("returnTime") }}</th>
          <th width="15%">{{ $t("receivablelimit") }}</th>
          <th width="13%">{{ $t("pay") }}</th>
          <th width="10%">{{ $t("status") }}</th>
        </tr>
        <tr>
          <td>{{ detailsData.amount }}</td>
          <td>{{ detailsData.forecastReturnAmount }}</td>
          <td class="text-left">{{ detailsData.forecastReturnTime }}</td>
          <td class="text-left">{{ detailsData.returnTime }}</td>
          <td>{{ detailsData.amount + detailsData.forecastReturnAmount }}</td>
          <td>
            {{
              detailsData.status === 1
                ? detailsData.amount + detailsData.forecastReturnAmount
                : 0
            }}
          </td>
          <td class="text-left">
            {{
              detailsData.status === 1 ? $t("complete") : $t("loadingAmount")
            }}
          </td>
        </tr>
      </table>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      detailsData: {
        amount: "", //投资金额
        forecastReturnAmount: "", //预期收益
        orderTime: "", //投资时间
        returnTime: "", //到期时间
        forecastReturnTime: "", //到期时间，应收时间
        status: 0, //状态，0待收益 1已完成
      }, //注单详情数据
    };
  },
  onLoad(option) {
    this.getData(option.orderNo);
  },
  methods: {
    getData(orderNo) {
      this.$api
        .order_detail({
          orderNo: orderNo,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.detailsData = res.data.data;
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  .details-text {
    margin-top: 30rpx;
    margin-left: 20rpx;
    line-height: 70rpx;
    font-size: 28rpx;
  }
  .text {
    margin-left: 20rpx;
  }
  .table-data {
    width: 100%;
    border-collapse: collapse;
    font-size: 24rpx;
    text-align: center;
    border-top: 1px solid #bbb;
    th {
      height: 50rpx;
      text-align: center;
      background-color: #f0f0f0;
    }
    th,
    td {
      border-right: 1px solid #bbb;
      border-bottom: 1px solid #bbb;
    }
    .text-left {
      text-align: left;
    }
  }
}
</style>
