<template>
  <ul class="playBar">
    <li v-for="item in items" :key="item.name"><i class="iconfont" :class="item.icon"></i>{{item.name}}</li>    
  </ul>  
</template>
<script>
  export default {
    name:"PlayBar",
    props:['items']
  }
</script>
<style scoped>
.playBar{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content:space-between;
  padding: 30px 0 10px;
  color: #999;
}
.playBar li{
  width: 18%;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  border: 0.5px solid rgba(255,255,255,.2);
  border-radius: 5px;
}
.playBar li i{
  margin-right: 5px;
}
.playBar li:hover{
  color: #fff;
  border-color: #fff;
}  
</style>