import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

/**==================引入自定义文件================= */
//1.公共文件
import './assets/css/common.css';
import './assets/css/iconfont/iconfont.css';
import store from './store/index.js';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
