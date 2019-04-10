<template>
  <li class="cloumn">
    <div class="ban">
      <div class="left" :style="{'background-position-x':title.bgPosition}">
        <p class="title">巅峰榜</p>
        <p class="title">{{title.title}}</p>
        <p class="title">巅峰指数<span>★★★★★</span></p>
      </div>
      <div class="right" :style="{color:title.color}">
        <p class="title">巅峰榜</p>
        <p class="title">巅峰指数<span>★★★★★</span></p>
        <HotLi :list="title"></HotLi>
      </div>
    </div>
  </li>
</template>
<script>
	import HotLi from '@/components/HotLi.vue';
  export default {
    name:"Hot",
    components:{HotLi},
    props:['title']
  }
</script>
<style scoped>
.cloumn{
  width: 220px;
  height: 500px;
  margin: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  perspective: 300px;
  position: relative;
  backface-visibility: hidden;
} 
.cloumn .ban{
  width: 220px;
  height: 100%;
  transform-origin: 50% 50% -110px;
  transform-style: preserve-3d;
  z-index: 10;
  transition: transform .3s;
  color: #cb6f88;  
}
.cloumn:hover .ban{
  transform: rotateY(-90deg);
}
.cloumn .ban .left,  
.cloumn .ban .right{
  width: 220px;
  height: 500px;
  transform-origin: 50% 50% -110px;
  box-shadow: 3px 11px 10px 1px #a5a1a1; 
}
.cloumn .ban .left{
  position: relative;
  background: url('../assets/images/hot/bg_index_top.jpg') 0px 0px no-repeat; 
}
.cloumn .ban .left .title:nth-child(1){
  position: absolute;
  font-size: 30px;
  top: 10%;
  left: 50%;
  transform: translate(-50%);
  color:#fff;
}
.cloumn .ban .left .title:nth-child(2){
  font-size: 30px;
  width: 50px;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%);
  color:#fff;
}
.cloumn .ban .left .title:nth-child(3){
  position: absolute;
  font-size: 16px;
  width: 180px;
  top: 90%;
  left: 50%;
  transform: translate(-50%);
  color:#fff;
}
.cloumn .ban .left .title:nth-child(3) span{
  margin-left: 10px;
  color: red;
  font-size: 20px;
  vertical-align: middle;
}
.cloumn .ban .right{
  position: absolute;
  top: 0;
  left: 0;
  background-color: #d8edf2;
  transform: rotateY(90deg);
}
.cloumn .ban .right .title{
  font-size: 20px;
  text-align: center;
  margin: 15px 0 0;
}
.cloumn .ban .right .title:nth-child(2){
  font-size: 16px;
  margin: 10px 0 15px; 
}  
</style>