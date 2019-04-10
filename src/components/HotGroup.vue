<template>
  <ul class="hotGroup">
    <Hot :lists="listsGroup" v-for="(item,index) in listsGroup.order" :key="item" :title="{title:item,bgPosition:listsGroup.bgPosition[index],color:listsGroup.color[index],list:listsGroup.lists[index],ids:listsGroup.ids}"></Hot>    
  </ul>
</template>
<script>
	import Hot from '@/components/Hot.vue';
  export default {
    name:"HotGroup",
    components:{Hot},
    props:['listsGroup']
  }
</script>
<style scoped>
.hotGroup{
  width: 100%;
  display: flex;
  align-items: center;
}  
</style>