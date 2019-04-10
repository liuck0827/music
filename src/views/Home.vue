<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>   
</template>

<script>
/**==============导入组件=============== */
import Header from '@/components/Header.vue';
export default {
  name: 'home',
  components: {Header}
}
</script>
