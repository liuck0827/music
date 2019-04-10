<template>
  <div class="textContainer">
    <div class="picContainer">
      <img class="pic" :src="src">
    </div>
    <ul class="musicInfo">
      <li>歌曲名:<span>{{title.name}}</span></li>
      <li>歌手名:<span>{{title.artist}}</span></li>
      <li>专辑名:<span>{{title.album}}</span></li>
    </ul>
    <div class="lyContainer">
      <ul class="lyrics">
        <li>{{title.name}}</li>
        <li v-for="(p,index) in lrc" :key="index">{{p}}</li>
      </ul> 
    </div>
  </div>
</template>
<script>
  export default {
    name:"PlayText",
    props:['text'],
    data(){
      return {
        src:"../assets/images/play/player_cover.png",
        title:"",
        lrc:""
      }
    },
    created(){
      this.title = this.text[this.$store.state.index];
    },
    watch:{
      listenPic(){
        this.src = this.$store.state.pic;
      },
       listenIndex(){
        this.title = this.text[this.$store.state.index];
        this.lrc = this.handleLRC(this.$store.state.lrc)
      }
    },
    computed:{
      listenPic(){
        return this.$store.state.pic;
      },
      listenIndex(){
        return this.$store.state.index;
      }
    },
    methods:{
      handleLRC(lrc){
        var arr = lrc.split("\n");
        console.log(arr);
        return arr;
      }
    }
  }
</script>
<style scoped>
.textContainer{
  padding: 30px 20px 30px;
  text-align: center;
  position: relative;
}
.textContainer .pic{
  position: absolute;
  top: 30px;
  left: 70px;
  width: 186px;
  height: 186px;
}
.textContainer .picContainer::after{
  display: block;
  content: "";
  width: 201px;
  height: 180px;
  margin: 0 auto 20px;
  background: url('../assets/images/play/album_cover_player.png') 0px 0px no-repeat;
}  
.textContainer .musicInfo{
  padding: 0 50px;
  text-align: left;
  margin-bottom: 20px;
  color: rgba(155, 155, 155, 0.8)
}
.textContainer .musicInfo li{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.textContainer .musicInfo li span{
  padding: 0 10px;
}
.textContainer .musicInfo li span:hover{
  color: #fff;
  cursor: pointer;
}
.textContainer .lyContainer{
  height: 270px;
  overflow: hidden;
  padding: 0 20px;
  position: relative;
  color: rgba(155, 155, 155, 0.8)
}
.textContainer .lyrics{
  width: 90%;
  position: absolute;
  top: 0;
  left: 5%;
}
.textContainer .lyrics li{
  width: 100%;
  line-height: 30px;
} 
</style>