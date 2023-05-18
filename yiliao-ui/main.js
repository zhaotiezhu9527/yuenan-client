import Vue from "vue";
import App from "./App";

import UniRouteGuards from "uniapp-route-guards";
Vue.use(UniRouteGuards);
const guard = new UniRouteGuards();
// 自定义路由拦截白名单
const WHILE_LIST = [
  "/",
  "/pages/index",
  "/pages/trades",
  "/pages/about",
  "/pages/contact",
  "/pages/register",
  "/pages/setloginpwd",
  "/pages/info",
];

// 跳过路由白名单拦截
guard.beforeEach((to, from, next) => {
  let url = "";
  if (to.url) {
    url = to.url.split("?")[0];
  }
  let token = uni.getStorageSync("token");
  if (!WHILE_LIST.includes(url) && !token) {
    return next("/pages/login");
  }
  next();
});

guard.afterEach((to, from, next) => {});

import Vant from "vant";

import tabs from "./components/tabs.vue";
Vue.component("Tabs", tabs);

Vue.use(Vant);

import base from "plugins/base.js";
import api from "plugins/api.js";
import store from "plugins/store.js";

Vue.prototype.$api = api;
Vue.prototype.$base = base;
Vue.prototype.$store = store;

Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
});
// #ifdef H5
app.$mount();
// #endif
// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
