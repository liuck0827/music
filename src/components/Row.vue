<template>
  <li class="row" @click="toPlay(list.id)">
    <img class="img" :src="list.picUrl">
    <div class="pl_btn"></div>
    <div class="pix_info">
      <a class="music_name" href="javascript:;" :title="list.name">{{list.name}}</a>
      <a class="artist" href="javascript:;">{{list.artist}}</a>
    </div>
    <P class="time">{{list.time}}</P>
  </li>
</template>
<script>
  export default {
    name:"Row",
    props:["list"],
    methods:{
      toPlay(id){
        this.$router.push({path:"Play",query:{id}});
      }
    }
  }
</script>
<style scoped>
.row{
  display: flex;
  width: 30%;
  margin: 0 15px;
  padding: 15px 0;
  border-bottom:1px solid #e7e4e4;
  position: relative;
}
.row:hover{
  background-color: #f5f5f5;
}
.row img{
  width: 100px;
  height: 100px;
}

.row .pl_btn{
  position: absolute;
  top: 12%;
  left: 1%;
  width: 100px;
  height: 100px;
  background: url("../assets/images/cart/iconall.png") -8px -394px no-repeat;
  transform: scale(0);
  transition: transform .3s;
}
.row:hover .pl_btn{
  transform: scale(0.5);
}  
.row .pix_info{
  margin: 25px 0 0 20px;
  font-size: 14px;
} 
.row .pix_info .music_name,
.row .pix_info .artist{
  display: block;
  margin-top: 5px;
  width: 190px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.row .pix_info .music_name:hover,
.row .pix_info .artist:hover{
  color: #f46262;
}
.row .time{
  position: absolute;
  top: 40%;
  right: 0;
}
</style>