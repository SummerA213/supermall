import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import {Toast} from "vant"
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue ()
//安装插件
//弹窗
Vue.use(Toast)
//懒加载插件
Vue.use(VueLazyload,{
  loading:require('assets/img/common/z.png')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
