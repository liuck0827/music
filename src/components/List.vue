<template>
  <div class="list">
    <div class="list-header">
      <div class="checkContainer">
        <input type="checkbox" @click="checkAll" :checked="isCheckedAll">
      </div>
      <p v-for="(key,index) in header" :key="key+index">{{index=="order"?"":key}}</p>
    </div>
    <ul class="list-content">
      <!-- <audio :src="src" @canplay="canPlay" @ended="endPlay"></audio> -->
      <li class="list-item" v-for="(item,index) in content" :key="index" @click="clickLi(index)">
        <div class="checkContainer">
          <input type="checkbox" :checked="isChecked[index]">
        </div>
        <p class="index" :class="{'active':isActive[index]}">{{index+1}}</p>
        <p class="name">{{content[index].name}}</p>
        <p class="artist">{{content[index].artist}}</p>
        <p class="time">{{content[index].time}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name:"List",
  props:{
    header:{},
    content:{},
    isShowOrder:{},
    isShowCheckBox:{},
  },
  data(){
    return {
      defaultWidth:['5%','3%','70%','15%','8%'],
      isActive:[],//显示播放的图标
      isChecked:[],//显示选中
      isCheckedAll:false,
      click:{
        count: 0,//判断双击还是单击
        id:0//定时器
      },
    }
  },
  created(){
    //处理content中的数据
    this.handleConten();
  },
  mounted(){
    this.getPs();
    this.getLis();
  },
  watch:{
    //监听播放状态
    listenIsPlay(){
      this.$set(this.isActive,this.$store.state.index,this.$store.state.isPlay);
      if(!this.$store.state.isPlay){
        this.pause = true;//暂停
      }else{
        this.pause = false;
      }
    },
    //监听歌曲index的切换
    listenIndex(){
      //修改图片显示
      this.changIsActive(this,this.$store.state.index);
      //修改歌曲
      this.$store.commit('setPic',this.content[this.$store.state.index].picUrl);
      this.$store.commit('setId',this.content[this.$store.state.index].id);
    },
    content(){
      this.handleConten();
      //修改播放
      this.$store.commit('setIsPlay',false);
      this.$store.commit('setIndex',0);
    },
  },
  computed:{
    listenIsPlay(){
      return this.$store.state.isPlay;
    },
    listenIndex(){
      return this.$store.state.index;
    }
  },
  methods:{
    //选中所有的歌曲
    checkAll(){
      //选中
      if(this.isCheckedAll){
        //修改选择的状态
        this.isCheckedAll = false;
      }else{//未选中
        this.isCheckedAll = true;
      }
      this.changeLisChecked(this.isCheckedAll);
    },
    //根据全选修改列表
    changeLisChecked(flag){
      for (let index = 0; index < this.isChecked.length; index++) {
        this.$set(this.isChecked,index,flag);        
      }
    },
    //给li中的项目添加宽度
    getPs(){
      //获取p的数组
      var ps = document.querySelectorAll('.list-header p');
      var input = document.querySelector('.list-header .checkContainer');
      input.style.width = this.defaultWidth[0];
      for (let index = 0; index < ps.length; index++) {
        ps[index].style.width = this.defaultWidth[index+1];
      }
    },
    //给li中的项目添加宽度
    getLis(){
      //获取p的数组
      var lis = document.querySelectorAll('li.list-item');
      for (let index = 0; index < lis.length; index++) {
        var input = lis[index].querySelector('.checkContainer');
        input.style.width = this.defaultWidth[0];
        var ps = lis[index].querySelectorAll('p');
        for (let index = 0; index < ps.length; index++) {
          ps[index].style.width = this.defaultWidth[index+1];          
        }
      }
    },
    //处理content中的数据
    handleConten(){
      var content = this.content
      var isChecked = [];//多选框数据
      var isActive = [];//播放动态图片
      for (let index = 0; index < content.length; index++) {
        isChecked.push(false);
        isActive.push(false); 
      }
      this.isChecked = isChecked;
      this.isActive = isActive;
    },
    //点击多选框选中
    clickLi(ind){
      this.click.count++;
      var that = this;
      clearTimeout(this.click.id);
      this.click.id = setTimeout(function(){
        //双击列表项
        if(that.click.count>1){
          that.dbClick(that,ind);
        }else{//单击
          that.singleClick(ind,that);
        }
        that.click.count=0;
      },200)
    },
    //判断checkbox是否全选中
    CheckedAll(arr){
      var count = 0;
      for (let index = 0; index < arr.length; index++) {
        if(arr[index]){
          count++;
        }else{
          break;
        }
      }
      if(count==arr.length){
        return true;
      }
      return false;
    },
    //单击列表项
    singleClick(ind,obj){
      //获取当前点击多选框的状态
      var now = obj.isChecked[ind];     
      //选中
      if(now){
        //将当前多选框设置为不选中
        obj.$set(obj.isChecked,ind,false);
        obj.isCheckedAll = false;
      }else{//未选中,点击之后是选中状态
        //将当前多选框设置为不选中
        obj.$set(obj.isChecked,ind,true);
        //判断列表是否所有的都是选中状态
        obj.isCheckedAll = obj.CheckedAll(obj.isChecked);
      }
    },
    //双击列表项
    dbClick(obj,index){
      //查询歌词
      obj.getLyrics(obj,index);       
    },
    changIsActive(obj,index){
      for (let i = 0; i < obj.isActive.length; i++) {
        if(index==i){
          obj.$set(obj.isActive,i,true);
          obj.$store.commit('setIndex',index);
          //修改显示播放
          obj.$store.commit('setIsPlay',true); 
          obj.$store.commit('setId',this.content[index].id);
        }else{
          obj.$set(obj.isActive,i,false);        
        }
      }
    },
    //获取歌词
    getLyrics(obj,index){
      var id = obj.content[index].id
      this.$axios(`http://127.0.0.1:3000/lyric?id=${id}`).then(data=>{
        this.$store.commit("setLRC",data.data.lrc.lyric);
        //修改播放图标
        obj.changIsActive(obj,index);
      });
    }
 
  }  
}
</script>
<style scoped>
.list{
  width: 100%; 
  color:rgba(225,225,225,0.8);
}
.list .list-header{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-top: 15px;
  line-height: 30px;
  font-size: 16px;
  background-color: #232323;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.list .list-header .checkContainer input{
  margin-left: 30%;
}  
.list .list-content{
  height: 460px;
  overflow-y: scroll;  
}
.list .list-content::-webkit-scrollbar{
  width: 8px;
  border-radius: 30px;
}
.list .list-content::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background: rgba(153, 153, 153, 0.2);
}
.list .list-content::-webkit-scrollbar-track {/*滚动条里面轨道*/
  border-radius: 30px;
}
.list .list-content::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.8) !important;
}
.list .list-content .list-item{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-top: 15px;
  line-height: 30px;
  font-size: 16px;
  border-bottom: 1px solid #474747;
}
.list .list-content .list-item:hover{
  background-color: rgb(72,72,72);
  color: #fff;
  opacity: 1;
}
.list .list-content .list-item .checkContainer input{
  text-align: center;
  position: relative;
  left: 30%;
  height: 12px;
  line-height: 12px;
}
.list .list-content .list-item .checkContainer input::before{
  content:"";
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color:rgb(115,115,115);
  border: 1px solid #CACDCF 
}
.list .list-content .list-item .checkContainer input:checked::before{
  content: "\2713";
  background-color: #16bf74;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #16bf74;
  font-weight: bold;
  text-align: center;
}
.active{
  background: url('../assets/images/play/wave.gif') 0px 8px no-repeat;
  text-indent: -999px;
}      

</style>