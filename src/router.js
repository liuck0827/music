import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue';
/**============自定义模块================= */
import Index from './views/Index.vue'
import Play from './views/Play.vue'
import Test from '@/components/Test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'home',component: Home,children:[
      {path:'/',component: Index},
      {path: '/Play',component: Play},
    ]},
    {path: '/Test',name: 'test',component: Test}
  ]
})
