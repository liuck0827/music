<template>
  <ul class="rowGroup" :newList="newList">
    <Row v-for="(list,index) in newList" :key="index" :list="list"></Row>
  </ul>
</template>
<script>
  import Row from "@/components/Row.vue";
  export default {
    name:"RowGroup",
    components:{Row},
    props:['newList']
  }
</script>
<style scoped>
.rowGroup{
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}   
</style>