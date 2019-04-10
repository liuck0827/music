<template>
  <ul class="hotLi" :list="list" @click="toPlay">
    <li class="li" v-for="(item,index) in list.list" :key="item.first">
      <div class="order">{{index+1}}</div>
      <div class="intro">
        <p class="music_name">{{item.first}}</p>
        <p class="artist">{{item.second}}</p>
      </div>
    </li>
  </ul>
</template>
<script>
  export default {
    name:"HotLi",
    props:["list"],
    methods:{
      toPlay(e){
        var flag = e.target.nodeName=="P";
        if(flag){
          var keyWords = e.target.innerHTML;
          this.$router.push({path:"Play",query:{keyWords}});
        }
      }
    }
  }
</script>
<style scoped>
.hotLi{
  width: 100%;
  margin-top: 30px;
}  
.hotLi .li{
  margin: 0 0 15px 40px;
  position: relative;
  cursor: pointer;
}
.hotLi .li .order{
  position: absolute;
  top: 0px;
  left:-10px;
}
.hotLi .li .intro{
  margin-left: 5px;
  width: 80%;
}
.hotLi .li .intro .music_name,
.hotLi .li .intro .artist{
  margin-bottom: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
}
.hotLi .li .intro .artist{
  margin-left: 15px;
}
.hotLi .li .intro .music_name:hover,
.hotLi .li .intro .artist:hover{
  color: #ff5722;
}
</style>