<template>
  <div class="playControl">
    <audio :src="src" @canplay="canPlay" @ended="ended"></audio>
    <!-- 开始按钮 -->
    <ul class="playStart">
      <li class="left" @click="clickLeft"></li>
      <li @click="startOrStop" :class="{'play':playStart.isPlay,'middle':!playStart.isPlay}"></li>
      <li class="right" @click="clickRight"></li>
    </ul>
    <!-- 进度条 -->
    <div class="playProgress">
      <div class="info">
        <p class="music"><span>{{playProgress.music.name}}</span><span>-</span><span>{{playProgress.music.artist}}</span></p>
        <p class="time">{{playProgress.time}}/{{playProgress.music.time}}</p>
      </div>
      <ul class="progress">
        <li class="bg"></li>
        <li class="circle" :style="{'left':playProgress.left,'background-color':playProgress.bgColor}"></li>
        <li class="played" :style="{'width':playProgress.width,'background-color':playProgress.bgColor}"></li>
        <li id="mask" class="mask"  @click="clickProgress"  @mousemove="mousemove"  @mousedown="mousedown" @mouseup="mouseup" @mouseleave="mouseleave"></li>
      </ul>
    </div>
    <!-- 播放设置 -->
    <ul class="playSet">
      <li @click="changeModel" :style="{'background-position':playSet.modelBgPosition}"></li>
      <li></li>
      <li></li>
      <li>
        <span>999<sup>+</sup></span>
      </li>
      <li @click="changePageShow" :style="{'background-position':playSet.pageBgPosition}"></li>
    </ul>
    <!-- 声音设置 -->
    <div class="playVoice">
      <div class="voice_pic" @click="muted" :class="{'voice':!playVoice.muted,'muted':playVoice.muted}"></div>
      <ul class="progress">
        <li class="bg"></li>
        <li id="circle" class="circle"  :style="{'left':playVoice.left,'background-color':playVoice.bgColor}"></li>
        <li class="played" :style="{'width':playVoice.width,'background-color':playVoice.bgColor}"></li>
        <li id="mask" class="mask" @click="clickVoice"  @mousemove="move"  @mousedown="down" @mouseup="up" @mouseleave="leave"></li>
      </ul>
    </div>  
  </div>
</template>
<script>
export default {
  name:"PlayControl",
  props:['plays','music'],
  data(){
    return {
      //音频相关
      src:"",
      audio:{},
      //playStart相关
      playStart:{
        isPlay:false,//播放的状态，默认为暂停        
      },
      //playProgress相关
      playProgress:{
        left:"0%",
        width:"0%",
        bgColor:"#fff",
        circleWidth:12,
        isChoose:false,
        mousePosition:0,
        totalWidth:0,
        time:"00:00",
        count:0,
        id:0,
      },
      //playSet相关
      playSet:{
        playModelNum:0,//播放模式选择,默认为0。
        modelBgPosition:"9px -206px",
        showPage:0,//播放页面显示  
        pageBgPosition:"0px -281px",
        flag:0
      },
      //playVoice相关
      playVoice:{
        left:"30%",
        width:"30%",
        bgColor:"#fff",
        circleWidth:12,
        isChoose:false,
        mousePosition:0,
        totalWidth:0,
        muted:false,
        nowLeft:"30%",
        nowWidth:"30%",
      },
    }
  },
  created(){
    this.playProgress.music = this.plays[0];    
  },
  mounted(){
    //初始化进度条的长度
    this.playProgress.totalWidth = document.querySelector('ul.progress').clientWidth;      
    this.playVoice.totalWidth = document.querySelector('.playVoice ul.progress').clientWidth;      
    this.audio = document.querySelector('audio');
    this.getMusic();
  },
  watch:{
    //监听开始按钮
    listenIsPlay(){
      if(this.$store.state.isPlay){
        this.audio.play();
        this.startTimer();
      }else{
        this.audio.pause();
      }
      this.playStart.isPlay = this.$store.state.isPlay;
    },
    listenIndex(){
      //修改进度条显示
      this.playProgress.music = this.plays[this.$store.state.index];
      //修改音频的src
      this.getMusic();     
      //初始化播放
      this.initProgress();
      this.closeTimer();
      this.startTimer(); 
    },
    listenFlag(){
      //修改进度条显示
      this.playProgress.music = this.plays[this.$store.state.index];
      //修改音频的src
      this.src = this.music[this.$store.state.index].url;
    }
  },
  computed:{
    listenIsPlay(){
      return this.$store.state.isPlay;
    },
    listenMusic(){
      return this.$store.state.music;
    },
    listenIndex(){
      return this.$store.state.index;
    },
    listenFlag(){
      return this.$store.state.flag;
    }
  },
  methods:{
    /**================audio相关的功能==================== **/
    canPlay(){
      //修改显示的图片
      this.$store.commit('setPic',this.plays[this.$store.state.index].picUrl);
      if(this.playStart.isPlay){
        this.audio.play();
      }
    },
    //播放结束
    ended(){
      clearInterval(this.playProgress.id);
      this.initProgress();
      switch (this.playSet.flag) {
        case 0:
          this.$store.commit('setIndex',this.$store.state.index+1);
          break;
        case 1:
          this.$store.commit('setIndex',this.$store.state.index+1);
          break;
        case 2:
          this.$store.commit('setIndex',this.$store.state.index+1);
          if(this.$store.state.index>this.plays.length){
            this.$store.commit('setIndex',0);
          }
          break;
        case 3:
          this.audio.play();
          break;
      }
    },
    getMusic(){
      for (let index = 0; index < this.music.length; index++) {
        var id = this.music[index].id;
        if(id==this.$store.state.id){
          this.src = this.music[index].url;
          break;
        }        
      }
    },
    /**================playStart播放相关的功能==================== **/
    //开始播放
    startOrStop(){
      if(this.playStart.isPlay){//点击后,暂停状态
        this.$store.commit('setIsPlay',false);
      }else{//点击后,播放状态
        this.$store.commit('setIsPlay',true);      
      }
    },
    //上一曲
    clickLeft(){
      var index = this.$store.state.index;
      //点击是第一首
      if(index>0){
        //1.修改index
        index--;
        this.$store.commit("setIndex",index);
      }
    },
    //下一曲
    clickRight(){
      var index = this.$store.state.index;
      //点击不是最后一首
      if(index<this.plays.length-1){
        index++;
        this.$store.commit("setIndex",index);
      }
    },
    /**================playProgress播放相关的功能==================== **/
    //点击进度条
    clickProgress(e){
      //获取鼠标的位置
      this.playProgress.mousePosition = e.offsetX;
      this.playProgress.left = (this.playProgress.mousePosition-this.playProgress.circleWidth/2)+"px";
      this.playProgress.width = 100*(this.playProgress.mousePosition/this.playProgress.totalWidth)+"%";        
      this.audio.currentTime = parseFloat(this.playProgress.width)*this.audio.duration/100;
    },
    //鼠标按下时间
    mousedown(e){
      //获取鼠标的位置
      var x = e.offsetX>=parseInt(this.playProgress.left) && e.offsetX<=(parseInt(this.playProgress.left)+this.playProgress.circleWidth);
      if(x){
        this.playProgress.bgColor = "#16bf74";
        this.playProgress.isChoose = true;
      }
    },
    mouseup(){
      this.playProgress.bgColor = "#fff";
      this.playProgress.isChoose = false;
    },
    mousemove(e){
      e.preventDefault();
      if(this.playProgress.isChoose){
        this.playProgress.mousePosition= e.offsetX;
        this.playProgress.left = 100*(this.playProgress.mousePosition-this.playProgress.circleWidth/2)/this.playProgress.totalWidth+"%";
        this.playProgress.width = 100*(this.playProgress.mousePosition/this.playProgress.totalWidth)+"%";
        this.audio.currentTime = parseFloat(this.playProgress.width)*this.audio.duration/100;

      }
    },
    mouseleave(){
      this.playProgress.bgColor = "#fff";
      this.playProgress.isChoose = false; 
    },
    //初始化进度条
    initProgress(){
      this.playProgress.left = "0%";
      this.playProgress.width = "0%";
      this.playProgress.count = 0;
      this.playProgress.time = "00:00";
    },
    //设置进度条的位置
    startTimer(){
      var that = this;       
      //启动定时器
      this.playProgress.id = setInterval(()=>{
        that.playProgress.left = 100*that.audio.currentTime/that.audio.duration + "%";
        that.playProgress.width = 100*that.audio.currentTime/that.audio.duration + "%";
        //设置时间        
        that.setTime();
      },1000);
    },
    // //关闭定时器
    closeTimer(){
      clearInterval(this.playProgress.id);
    },
    //设置时间
    setTime(){
      var time = Math.ceil(this.audio.currentTime);
      var m = "00"
      var s = "00"
      if(time<10){
        s = "0"+time;
      }else if(time<60){
        s = time;
      }else{
        m = "0"+parseInt(time/60);
        s = time%60;
        if(s<10){
          s="0"+ s;
        }
      }
      this.playProgress.time = m + ":" +s;
    },
    /**================playSet播放相关的功能==================== **/
    //选择播放的模式0:顺序;1:列表;2:列表循环;3:单曲
    changeModel(){
      this.playSet.flag = (++this.playSet.playModelNum)%4;
      switch (this.playSet.flag) {
        case 0:
          this.playSet.modelBgPosition = "9px -206px";
          break;
        case 1:
          this.playSet.modelBgPosition = "9px -258px";
          break;
        case 2:
          this.playSet.modelBgPosition = "9px -72px";
          break;
        case 3:
          this.playSet.modelBgPosition = "9px -233px";
          break;
      }
    },
    //选择播放页面显示。0：列表;1:歌词
    changePageShow(){
      this.playSet.showPage++;
      var flag = this.playSet.showPage%2;
      switch (flag) {
        case 0:
          this.playSet.pageBgPosition = "0px -281px";
          break;        
        case 1:
          this.playSet.pageBgPosition = "0px -310px";
          break;
      }
    },
    /**================playVoice播放相关的功能==================== **/
    //点击进度条
    clickVoice(e){
      //获取鼠标的位置
      this.playVoice.mousePosition = e.offsetX;
      this.playVoice.left = (this.playVoice.mousePosition-this.playVoice.circleWidth/2)+"px";
      this.playVoice.width = 100*(this.playVoice.mousePosition/this.playVoice.totalWidth)+"%";        
      this.playVoice.nowLeft = 100*(this.playVoice.mousePosition/this.playVoice.totalWidth)+"%";        
      this.playVoice.nowWidth = 100*(this.playVoice.mousePosition/this.playVoice.totalWidth)+"%";        
      this.audio.volume = parseFloat(this.playVoice.width)/100; 
    },
    //鼠标按下时间
    down(e){
      //获取鼠标的位置
      var x = e.offsetX>=parseInt(this.playVoice.left) && e.offsetX<=(parseInt(this.playVoice.left)+this.playVoice.circleWidth);
      if(x){
        this.playVoice.bgColor = "#16bf74";
        this.playVoice.isChoose = true;
      }
    },
    up(){
      this.playVoice.bgColor = "#fff";
      this.playVoice.isChoose = false;
    },
    move(e){
      e.preventDefault();
      if(this.playVoice.isChoose){
        this.playVoice.mousePosition= e.offsetX;
        this.playVoice.left = 100*(this.playVoice.mousePosition-this.playVoice.circleWidth/2)/this.playVoice.totalWidth+"%";
        this.playVoice.width = 100*(this.playVoice.mousePosition/this.playVoice.totalWidth)+"%";
        this.playVoice.nowLeft = 100*(this.playVoice.mousePosition/this.playVoice.totalWidth)+"%";
        this.playVoice.nowWidth = 100*(this.playVoice.mousePosition/this.playVoice.totalWidth)+"%";
        this.audio.volume = parseFloat(this.playVoice.width)/100; 
      }
    },
    leave(){
      this.playVoice.bgColor = "#fff";
      this.playVoice.isChoose = false; 
    },
    muted(){

      if(this.playVoice.muted){
        this.audio.muted = false;
        this.playVoice.muted = false;
        this.playVoice.left = this.playVoice.nowLeft;
        this.playVoice.width = this.playVoice.nowWidth;
      }else{
        this.audio.muted = true;
        this.playVoice.muted = true;
        this.playVoice.left = "0%";
        this.playVoice.width = "0%";
      }
    }
  }  
}
</script>
<style scoped>
.playControl{
  width: 100%;
  margin: 35px 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/**=======================playStart===================*/   
.playStart{
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.playStart li{
  width: 15%;
  height: 30px;
  background-image: url('../assets/images/playControl/player.png');
  background-repeat: no-repeat;
  cursor: pointer;
  opacity: 0.5;
}
.playStart .left{
  background-position: 8px -29px;
  height: 23px;
}
.middle{
  background-position: 4px 0px;
}
.play{
  background-position: -26px 0px;
}
.playStart .right{
  background-position: 8px -51px;
  height: 23px;
}
.playStart li:hover{
  opacity: 1;
}
/**=======================playProgress===================*/ 
.playProgress{
  width: 45%;
  position: relative;
  color: #fff;
  display: flex;
  flex-direction: column;
}
.playProgress .info{
  width: 100%;
  height: 14px;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(225, 225, 225, 0.5);
  cursor: pointer;
}
.playProgress .info .music span:nth-child(2){
  margin: 0 5px;
}
.playProgress .info .music span:nth-child(1):hover,
.playProgress .info .music span:nth-child(3):hover{
  color: #fff;
}
.playProgress .progress{
  position: relative;
  margin-top: 15px; 
}
.playProgress .progress .bg{
  width: 100%;
  height: 4px;
  background-color: #fff;
  border-radius: 10px;
  opacity: 0.5;
} 
.playProgress .progress .circle{
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: -4px;
  left: 0px;
  z-index: 5;
} 
.playProgress .progress .circle:hover{
  cursor: pointer;
} 
.playProgress .progress .played{
  width: 0%;
  height: 4px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 0px;
  left: 0;
} 
.playProgress .progress .mask{
  width: 100%;
  height: 12px;
  border-radius: 10px;
  position: absolute;
  top: -4px;
  left: 0;
  opacity: 1;
  z-index: 10;
} 
/**=======================playSet===================*/   
.playSet{
  width: 23%;
  display: flex;
  justify-content: space-between;
  color: #fff;
}
.playSet li{
  width: 15%;
  height: 28px;
  background: url('../assets/images/playControl/player.png') 0px 0px no-repeat;
  opacity: 0.5;
  cursor: pointer;
}
.playSet li:nth-child(1){
  height: 24px;
}
.playSet li:nth-child(2){
  width: 10%;
  height: 25px;  background-position: 3px -94px;
}
.playSet li:nth-child(3){
  width: 10%;
  height: 25px;
  background-position: 2px -118px;
}
.playSet li:nth-child(4){
  width: 10%;
  background-position: 2px -428px;
  position: relative;
}

.playSet li:nth-child(4) span{
  position: absolute;
  top: -8px;
  right: -14px;
  font-size: 12px;
}
.playSet li:nth-child(5){
  width: 27%;
  height: 30px;
}
.playSet li:nth-child(1):hover,
.playSet li:nth-child(2):hover,
.playSet li:nth-child(3):hover,
.playSet li:nth-child(4):hover,
.playSet li:nth-child(5):hover{
  opacity: 1;
}
.playSet li:nth-child(4):hover{
  background-position: 2px -488px;
  color: #31c27c;
}
/**=======================playVoice===================*/
.playVoice{
  width: 12%;
  height: 25px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}
.playVoice .voice_pic{
  width: 20%;
  height: 100%;
  background-image: url("../assets/images/playControl/player.png");
  background-repeat: no-repeat;
  opacity: 0.5;
}
.voice{
  background-position: 0px -142px;
}
.muted{
  background-position: 0px -180px;
}
.playVoice .voice_pic:hover{
  opacity: 1;
}
.playVoice .progress{
  width: 80%;
  position: relative;
}
.playVoice .progress .bg{
  width: 100%;
  height: 4px;
  background-color: #fff;
  border-radius: 10px;
  opacity: 0.5;
} 
.playVoice .progress .circle{
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: -4px;
  left: 0px;
  z-index: 5;
} 
.playVoice .progress .circle:hover{
  cursor: pointer;
} 
.playVoice .progress .played{
  width: 0%;
  height: 4px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 0px;
  left: 0;
} 
.playVoice .progress .mask{
  width: 100%;
  height: 12px;
  border-radius: 10px;
  position: absolute;
  top: -4px;
  left: 0;
  opacity: 1;
  z-index: 10;
}
</style>