<template>
<div class="bg" :style="{'background-image':`url(${pic})`}">
  <div class="play">
    <div class="container" v-if="mp3">
      <div class="pl_list">
        <!-- 左侧列表区域 -->
        <div class="left">
          <!-- 操作区 -->
          <PlayBar :items="items"></PlayBar>
          <!--列表区域 -->
          <List :content="content" :header="header" isShowOrder="true" isShowCheckBox="true"></List>
        </div>
        <!-- 右侧歌词区域 -->
        <PlayText class="playText" :text="content"></PlayText>
      </div>      
      <!-- 播放设置区域 -->
      <PlayControl :plays="content" :music="mp3"></PlayControl>
    </div>
  </div>
</div>
</template>
<script>
import PlayBar from "@/components/PlayBar.vue";
import List from "@/components/List.vue";
import PlayControl from "@/components/PlayControl.vue";
import PlayText from "@/components/PlayText.vue";
export default {
  name: "Play",
  components: { PlayBar, List, PlayControl, PlayText},
  data() {
    return {
      //操作区域的数据
      items: [
        { icon: "icon-shoucang", name: "收藏" },
        { icon: "icon-tianjia", name: "添加到" },
        { icon: "icon-xiazai", name: "下载" },
        { icon: "icon-weibiaoti6", name: "删除" },
        { icon: "icon-qingkong", name: "清空列表" }
      ],
      //list播放列表
      header:{order:"序号",name: "歌曲", artist: "歌手", time: "时长" },
      content:null,
      mp3:"",//音乐路径
      pic:""
    };
  },
  created() {
    //初始化播放页面数据
    var key = Object.keys(this.$route.query)[0];
    var val = this.$route.query[key];
    switch (key) {
    case "id":
      //首页新歌
      this.getListById(`http://127.0.0.1:3000/song/detail?ids=${val}`);
      break;
    case "ids":
      //首页热门推荐
      this.getListByIds(`http://127.0.0.1:3000/playlist/detail?id=${val}`);
      break;
    case "keyWords":
      //搜索框查询
      this.getListBySearch(`http://localhost:3000/search?keywords=${val}`);
      break;
    }
  },
  watch: {
    "$route.query.keyWords"() {
      var keyWords = this.$route.query.keyWords;
      this.getListBySearch(`http://localhost:3000/search?keywords=${keyWords}`);
    },
    //修改背景图片
    listenPic(){
      this.pic = this.$store.state.pic;
    }
  },
  computed:{
    listenPic(){
      return this.$store.state.pic;
    }
  },
  methods: {
    //搜索框查询
    getListBySearch(url) {
      var flag = Object.prototype.toString.call(this.content)=="[object Null]";
      var arrs = [];
      var urlIds = [];
      this.$axios.get(url).then(data => {
        var arr = data.data.result.songs;
        for (let index = 0; index < arr.length; index++) {
          var obj = {};
          obj.id = arr[index].id;
          obj.album = arr[index].album.name;
          obj.name = arr[index].name;
          obj.artist = arr[index].artists[0].name;
          obj.picUrl = arr[index].artists[0].img1v1Url;
          var m = parseInt(arr[index].duration / (1000 * 60));
          var s = parseInt(arr[index].duration / 1000 - m * 60);
          if (s < 10) {
            s = "0" + s;
          }
          obj.time = m + ":" + s;
          arrs.push(obj); 
          urlIds.push(arr[index].id);
        }
          this.content = arrs;  
      }).then(()=>{
        this.getMp3AndLyrics(urlIds); 
      });
    },
    //歌单查询
    getListByIds(url){
      var arrs = [];
      var urlIds = [];
      this.$axios.get(url).then((data)=>{
        var arr = data.data.playlist.tracks;
        for (let index = 0; index < arr.length; index++) {
          var obj = {};
          obj.id = arr[index].id;
          obj.album = arr[index].al.name;
          obj.name = arr[index].name;
          obj.artist = arr[index].ar[0].name;
          obj.picUrl = arr[index].al.picUrl;
          var m = parseInt(arr[index].dt / (1000 * 60));
          var s = parseInt(arr[index].dt / 1000 - m * 60);
          if (s < 10) {
            s = "0" + s;
          }
          obj.time = m + ":" + s;
          arrs.push(obj);
          urlIds.push(arr[index].id);
        }
        this.content = arrs;       
      }).then(()=>{        
        this.getMp3AndLyrics(urlIds); 
      });
    },
    //单曲查询
    getListById(url){
      var arrs = [];
      var urlIds = [];
      this.$axios.get(url).then((data)=>{
        var arr = data.data.songs;
        for (let index = 0; index < arr.length; index++) {
          var obj = {};
          obj.id = arr[index].id;
          obj.album = arr[index].al.name;
          obj.name = arr[index].name;
          obj.artist = arr[index].ar[0].name;
          obj.picUrl = arr[index].al.picUrl;
          var m = parseInt(arr[index].dt / (1000 * 60));
          var s = parseInt(arr[index].dt / 1000 - m * 60);
          if (s < 10) {
            s = "0" + s;
          }
          obj.time = m + ":" + s;
          arrs.push(obj);
          urlIds.push(arr[index].id);
        }
        this.content = arrs;
      }).then(()=>{
        this.getMp3AndLyrics(urlIds); 
      }); 
    },
    //查询歌曲信息和歌词信息
    getMp3AndLyrics(id){
      this.$axios.get(`http://127.0.0.1:3000/song/url?id=${id.toString()}`).then(data=>{
        //设置默认的播放
        if(this.$store.state.flag){
          this.$store.commit("setFlag",false);
        }else{
          this.$store.commit("setFlag",true);
        }
        this.$store.commit('setId',this.content[0].id);
        this.$store.commit('setIndex',0);
        this.$store.commit('setIsPlay',false);
        this.mp3 = data.data.data;
      });
    }
  },
};
</script>
<style scoped>
.bg{
  width: 100%;
  height: 699px;
  overflow: hidden;
  background-size: 100%;
  background-repeat: no-repeat;
}
.play {
  background-color: #333;
  opacity: 0.9;
}
.container{
  height: 699px;
}
.container .pl_list {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.container .pl_list .left {
  width: 70%;
}
.playText {
  width: 30%;
  height: 575px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>