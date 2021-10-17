import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import {Toast} from "vant"

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue ()
//安装插件
Vue.use(Toast)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
