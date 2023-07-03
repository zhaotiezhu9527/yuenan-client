<template>
  <view class="page">
    <u-navbar
      placeholder
      :title="$t('investment')"
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
    <view class="cardStyle">
      <view class="card">
        <view class="item">
          <view>{{ $t("availableBalance") }} ({{ $t("money") }})</view>
          <view>{{ infos.balance }}{{ $t("money") }}</view>
        </view>
        <view class="item">
          <view>{{ $t("investableAmount") }} ({{ $t("money") }})</view>
          <view>{{ items.projectAmount }}{{ $t("money") }}</view>
        </view>
      </view>
    </view>
    <view class="amount">
      <view class="li">
        <view class="name">{{ $t("minAmount") }}</view>
        <view class="txt">
          <text>{{ items.minAmount }}</text>
          {{ $t("money") }}
        </view>
      </view>
      <view class="li">
        <view class="name">{{ $t("investmentAmount") }}</view>
        <view class="txt images">
          <image
            class="img"
            @click="subtract()"
            src="../static/img/jian.png"
            mode="widthFix"
          />
          <u-input
            class="uinput"
            v-model="form.amount"
            type="number"
            border="none"
            :placeholder="$t('inputAmout')"
          />
          <image
            class="img"
            @click="add()"
            src="../static/img/jia.png"
            mode="widthFix"
          />
        </view>
      </view>
      <view class="li end">
        <view>
          <u-button class="btns" color="#f34133" @click="fullthrow">
            {{ $t("fullthrow") }}
          </u-button>
        </view>
      </view>
    </view>
    <view class="pwd">
      {{ $t("start") }}<text>{{ items.minAmount }}</text
      >{{ $t("money") }}，{{ $t("add") }}<text>{{ items.minAmount }}</text
      >{{ $t("money") }}，<text class="other">{{ $t("fullthrow") }}</text
      >{{ $t("be") }}{{ $t("availableBalance")
      }}<text> {{ infos.balance }} </text>{{ $t("money")
      }}{{ $t("multiple") }}。
    </view>
    <view class="input">
      <view>{{ $t("payPwd") }}</view>
      <u-input
        v-model="form.pwd"
        :maxlength="6"
        border="none"
        type="password"
        :placeholder="$t('inputPayPwd')"
      />
    </view>
    <u-button
      class="btn-class"
      :loading="loading"
      color="#f6d658"
      block
      @click="investor"
    >
      {{ $t("investment") }}
    </u-button>
  </view>
</template>
<script>
export default {
  data() {
    return {
      items: {},
      infos: {},
      loading: false,
      form: {
        amount: "",
        pwd: "",
        projectId: 0,
      },
    };
  },
  onLoad(e) {
    this.form.projectId = e.id;
    // 获取产品详情
    this.dataFn(e.id);
  },
  methods: {
    change() {
      uni.navigateTo({
        url: "/pages/content",
      });
    },
    dataFn(id) {
      // 投资提交完成，则再一次获取信息
      Promise.all([this.$api.user_info(), this.$api.project_info(id)]).then(
        (res) => {
          if (res[0].data.code == 0) {
            this.infos = res[0].data.data;
            this.$base.storage("infos", res[0].data.data);
          }
          if (res[1].data.code == 0) {
            this.items = res[1].data.data;
          }
        }
      );
    },
    // 立即投资
    investor() {
      if (!this.form.amount) {
        this.$base.show(this.$t("inputAmout"));
        return false;
      } else if (Number(this.form.amount) < Number(this.items.minAmount)) {
        this.$base.show(this.$t("greaterminAmount"));
        return false;
      } else if (Number(this.form.amount) > Number(this.items.projectAmount)) {
        this.$base.show(this.$t("greaterprojectAmount"));
        return false;
      } else if (!this.form.pwd && this.form.pwd + "".length < 6) {
        this.$base.show(this.$t("inputConfigPayPwd"));
        return false;
      }
      this.loading = true;
      this.$api
        .order_execute(this.form)
        .then(({ data }) => {
          if (data.code == 0) {
            this.$base.show(this.$t("investmentSuccess"));
            this.form = {
              amount: "",
              pwd: "",
              projectId: this.items.projectId,
            };
            setTimeout(() => {
              this.dataFn(this.items.projectId);
            }, 2000);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 一键全投
    fullthrow() {
      this.form.amount = Number(this.infos.balance);
    },
    // 加减
    add() {
      if (!this.items.projectAmount) return false;
      this.form.amount =
        Number(this.form.amount) + Number(this.items.minAmount);
      if (this.items.minAmount >= this.infos.balance) {
        this.fullthrow();
        return false;
      } else if (this.form.amount < this.items.minAmount) {
        this.form.amount = this.items.minAmount;
        return false;
      }
      if (this.form.amount > Number(this.items.projectAmount)) {
        this.form.amount = Number(this.items.projectAmount);
      } else if (this.form.amount >= Number(this.infos.balance)) {
        this.form.amount = Number(this.infos.balance);
      }
      this.form.amount = this.form.amount.toFixed(3);
    },
    subtract() {
      if (!this.items.projectAmount) return false;
      this.form.amount -= this.items.minAmount;
      if (this.items.minAmount >= this.infos.balance) {
        this.fullthrow();
        return false;
      } else if (this.form.amount <= this.items.minAmount) {
        this.form.amount = this.items.minAmount;
        return false;
      }
      this.form.amount = this.form.amount.toFixed(3);
    },
  },
};
</script>
<style scoped lang="scss">
view,
text {
  font-weight: 500;
}
.cardStyle {
  padding: 40rpx 30rpx;
  .card {
    background-color: #f6d658;
    border-radius: 10rpx;
    padding: 40rpx;
    box-sizing: border-box;
    display: flex;
    color: #333;
    justify-content: center;
    .item {
      width: 50%;
      text-align: center;
      view:nth-child(1) {
        font-size: 26rpx;
      }
      view:nth-child(2) {
        padding-top: 40rpx;
        font-size: 32rpx;
      }
    }
  }
}
.amount {
  padding: 0 30rpx;
  .li {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20rpx;
    font-size: 32rpx;
    &:nth-child(1) {
      border-bottom: 2rpx solid #d3d3d3;
    }
    &:nth-child(2) {
      align-items: center;
    }
    text {
      color: #4c80b0;
    }
    &.end {
      padding-top: 20rpx;
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
    .images {
      width: 60%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 2rpx solid #d3d3d3;
      .img {
        width: 64rpx;
        height: 64rpx;
      }
      /deep/.uinput {
        padding: 28rpx 0 !important;
        .uni-input-input,
        .input-placeholder {
          text-align: center;
        }
      }
    }
    .btns {
      padding: 0 60rpx;
      border-radius: 10rpx;
    }
  }
}
.pwd {
  font-size: 28rpx;
  padding: 50rpx 0 20rpx;
  margin: 0 30rpx;
  box-sizing: border-box;
  border-bottom: 2rpx solid #d3d3d3;
  color: #ababab;
  text {
    color: #4c80b0;
    &.other {
      color: #000;
    }
  }
}
.input {
  display: flex;
  padding: 28rpx 40rpx;
  justify-content: space-between;
  > view {
    font-size: 32rpx;
    color: #000;
    font-weight: 500;
  }
  /deep/.u-input__content {
    .uni-input-input,
    .input-placeholder {
      text-align: right;
    }
  }
}
</style>
