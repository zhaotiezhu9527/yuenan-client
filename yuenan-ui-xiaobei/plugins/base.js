import Vue from "vue";
import * as store from "plugins/store.js";
Vue.prototype.$store = store;
import i18n from "./lang/index";
Vue.prototype._i18n = i18n;
let langType = 'vi_VN'
let that = i18n.vm.messages[uni.getStorageSync("lang") || langType];

//设置缓存内容
export const storage = (name, value) => {
  uni.setStorage({
    key: name,
    data: value,
  });
};
//通用提示
export const show = (title, icon = "none") => {
  uni.showToast({
    title: title,
    duration: 2000,
    icon: icon,
  });
};
//loading
export const loading = (title) => {
  uni.showLoading({
    title: title,
  });
};
const PATH_URL =
  process.env.NODE_ENV === "development"
    // ? "http://192.168.4.85:9522/" //本地测试
    ? "http://vca2738.top/api/" //测试
	  // : "https://www.acv6666.top/xiaoai-qtapi-prod/"; //app打包地址测试
	  : "/api/"; 
	  // : "/yuenan-qtapi-test/"; 

export const upload = (params) => {
  let header = {
    token: uni.getStorageSync("token"),
  };
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: PATH_URL + "api_common/upload/uploading",
      filePath: params.filePath,
      name: params.name,
      header: header,
      formData: params.formData,
      success: (uploadFileRes) => {
        resolve(uploadFileRes);
      },
    });
  });
};
//请求
export const request = (params) => {
  let str = params.method.toUpperCase();
  if (str == "POST") {
    params.header = {
      lang: langType,
      "Content-Type":
        params["Content-Type"] === undefined
          ? "application/x-www-form-urlencoded;charset=UTF-8"
          : params["Content-Type"],
      token: uni.getStorageSync("token"),
    };
  } else {
    params.header = {
      lang: langType,
      token: uni.getStorageSync("token"),
    };
  }
  if (params.loading) {
    uni.showLoading({
      title: that.loading,
      mask: true,
    });
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url: PATH_URL + params.url,
      data: params.data,
      method: str,
      header: params.header,
      sslVerify: false,
      success: (res) => {
        uni.hideLoading();
        if (res.data.code == -2) {
          uni.redirectTo({
            url: "/pages/login",
          });
          uni.removeStorageSync("token");
        } else if (res.data.code != 0) {
          uni.showToast({
            title: res?.data?.msg || that.web,
            duration: 2000,
            icon: "none",
          });
        }
        resolve(res);
      },
      fail: () => {
        show(that.web);
        uni.hideLoading();
      },
    });
  });
};
//返回上一页
export const BackPage = (url) => {
  if (
    url === "/pages/index" ||
    url === "/pages/investor" ||
    url === "/pages/personal" ||
    url === "/pages/about" ||
    url === "/"
  ) {
    uni.switchTab({
      url,
    });
    return false;
  }
  if (url && url !== "/pages/index") {
    uni.redirectTo({ url });
    return false;
  }
  if (getCurrentPages().length < 2 && "undefined" !== typeof __wxConfig) {
    let path = "/" + __wxConfig.pages[0];
    return uni.redirectTo({ url: path });
  }
  uni.switchTab({
    url: "/pages/index",
  });
};

const gettimeFn = (value) => {
  return value < 10 ? "0" + value : value;
};

export const getdateTimeFn = (time) => {
  let data = {};
  let defaultTimeStamp = time;
  let dayA = defaultTimeStamp % (24 * 3600);
  let hourA = dayA % 3600;
  let minuteA = hourA % 60;
  let day = Math.floor(defaultTimeStamp / (24 * 3600));
  let hour = Math.floor(dayA / 3600);
  let minute = Math.floor(hourA / 60);
  let second = Math.floor(minuteA);
  data = {
    day: gettimeFn(day),
    hour: gettimeFn(hour),
    minute: gettimeFn(minute),
    second: gettimeFn(second),
  };
  return data;
};
