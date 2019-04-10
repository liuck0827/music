import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state={//要设置的全局访问的state对象
  pic:"",//歌手图片
  isPlay:"",//歌曲播放状态
  index:0,//当前列表播放的下标
  id:"123",//歌曲信息
  lrc:"",
  flag:"",//是否从新查询
};
const getters = {
  //歌手图片
  getPic(state){
    return state.pic;
  },
  //播放状态
  getIsPlay(state){
    return state.isPlay;
  },
  //当前播放的下标
  getIndex(state){
    return state.index;
  },
  //歌曲信息
  getId(state){
    return state.id;
  },
  //标识是否查询
  getDuration(state){
    return state.duration;
  },
  //音乐
  getMp3(state){
    return state.mp3;
  },
  getTime(state){
    return state.time;
  },
  getFlag(state){
    return state.flag;
  },
  getLRC(state){
    return state.lrc;
  },
};
const mutations = {
  setPic(state,pic){
    state.pic = pic;
  },
  setIsPlay(state,flag){
    state.isPlay = flag;
  },
  setIndex(state,index){
    state.index = index;
  },
  setId(state,id){
    state.id = id;
  },
  setDuration(state,duration){
    state.duration = duration;
  },
  setMp3(state,mp3){
    state.mp3 = mp3;
  },
  setTime(state,time){
    state.time = time;
  },
  setFlag(state,flag){
    state.flag = flag;
  },
  setLRC(state,lrc){
    state.lrc = lrc;
  },
}
const store = new Vuex.Store({
    state,
    getters,
    mutations
 });
export default store;