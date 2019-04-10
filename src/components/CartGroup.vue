<template>
  <ul class="goods">
    <Cart  v-for="good in goodsList" :key="good.img" :goods="good"></Cart>
  </ul>
</template>
<script>
	import Cart from '@/components/Cart.vue';
  export default {
    name:"CartGroup",
    components:{Cart},
    props:['goodsList']
  }
</script>
<style scoped>
.goods{
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  flex-basis: 1 1 auto;
}   
</style>