import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VueAwesomeSwiper from "vue-awesome-swiper";
import NProgress from "nprogress";
import VModal from 'vue-js-modal'

// require styles
import "swiper/swiper.min.css";
import "../node_modules/nprogress/nprogress.css";
import http from "./components/shared/service/http";

Vue.use(VueAwesomeSwiper);
Vue.use(VModal);

Vue.config.productionTip = false;

Vue.prototype.$http = http

router.beforeResolve((to, from, next) => {

  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});
// eslint-disable-next-line no-unused-vars
let vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
