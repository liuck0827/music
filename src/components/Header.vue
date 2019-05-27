<template>
<div>
  <!-- 头部 -->
  <div class="header">
    <div class="container clearfix">
      <!-- logo -->
      <div class="float-left logo">
      <router-link to="/">西柚音乐</router-link>
      </div>
      <!-- nav -->
      <ul class="float-left clearfix nav">
        <li class="float-left">发现音乐</li>
        <li class="float-left">我的音乐</li>
        <li class="float-left">朋友</li>
        <li class="float-left">商城</li>
        <li class="float-left">音乐人</li>
        <li class="float-left">下载客服端</li>
      </ul>
      <!-- search -->
      <div class="float-left search"  @keyup="search">
        <input type="text" placeholder="音乐/电台/用户" v-model="keyWords">
      </div>
      <!-- video -->
      <div class="float-left video">
        <a class="v" href="#">视频投稿</a>
      </div>
      <!-- login -->
      <div class="float-right login">
        <a href="#" class="l">登录</a>
        <ul class="methods">
          <li><i></i><a href="#">手机账户登录</a></li>
          <li><i></i><a href="#">微信登录</a></li>
          <li><i></i><a href="#">QQ登录</a></li>
          <li><i></i><a href="#">新浪微博登录</a></li>
          <li><i></i><a href="#">网易邮箱账户登录</a></li>
        </ul>
      </div>
    </div>
  </div> 
</div>
</template>
<script>
/**============导入组件=============== */
export default {
  name:"Header",
  data(){
    return {
      keyWords:""
    }
  },
  methods:{
    search(e){
      if(e.keyCode==13){
        var keyWords = this.keyWords;
        if(keyWords){
          this.$router.push({path:"Play",query:{keyWords}});
        }else{
          alert("查询内容不能为空");
        }
      }
    }
  }
}
</script>
<style scoped>
.header{
  width: 100%;
  height: 70px;
  background-color: #232323;
  color: #aaa;
}
/*==========logo========== */
.header .logo{
  width: 176px;
  height: 70px;
  background: url('../assets/images/header/topbar.png');  
}
.header .logo a{
  display: block;
  line-height: 70px;
  text-align: center;
  text-indent: -9999px;
}
/*==========nav========== */
.header .nav li{
  padding: 0 19px;
  line-height: 70px;
  text-align: center;
  cursor: pointer;
}
.header .nav li:hover{
  background-color: #000;
  color: #fff;
}
/*==========search========== */
.header .search{
  margin-left: 50px;
  line-height: 70px;
}
.header .search input{
  width: 158px;
  height: 32px;
  padding-left:8px; 
  border-radius:16px;
  text-indent:20px; 
  background: #fff url('../assets/images/header/topbar.png') 0px -99px no-repeat; 
}
/*==========video========== */
.header .video{
  width: 96px;
  text-align: center;
  margin: 22px 0 0 30px;
}
.header .video .v{
  display: inline-block;
  width: 100%;
  height: 32px;
  line-height: 32px;
  border-radius: 16px;
  font-size: 14px;
  padding-left: 20px;
  background: url("../assets/images/header/topbar.png") 0px -140px no-repeat;
}
.header .video .v:hover{
  color: #fff;
  background: url("../assets/images/header/topbar.png") -100px -140px no-repeat;
}
/*==========login========== */
.header .login{
  width: 168px;
  height: 70px;
  line-height: 70px;
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
  transition: all .3s;
  z-index: 100;
}
.header .login:hover{
  height: 360px;
}
.header .login .l{
  display:block;
  width: 80px;
  /* margin: 0 auto; */
  font-size: 14px;
  text-align: center;
  background: url('../assets/images/header/topbar.png') -170px -28px no-repeat;
}
.header .login .methods{
  position: absolute;
  top: 70px;
  right: 0px;
  width: 168px;
  color: #bbb;
  z-index: 100;
}
.header .login .methods li{
  height: 38px;
  line-height: 38px;
  border-top: 1px solid #222;
  padding-left: 19px;
  background-color: #2a2a2a;
}
.header .login .methods li:first-child{
  border-top: 0px;
}
.header .login .methods li:last-child{
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
}
.header .login .methods li:hover{
  background-color: #000;
  color: #fff;
}
.header .login .methods li i{
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  vertical-align: middle;
}
.header .login .methods li:nth-child(1) i{
  background: url("../assets/images/header/toplist.png") 0px 0px no-repeat;
}
.header .login .methods li:nth-child(2) i{
  background: url("../assets/images/header/toplist.png") -20px -22px no-repeat;
}
.header .login .methods li:nth-child(3) i{
  background: url("../assets/images/header/toplist.png") -20px -42px no-repeat;
}
.header .login .methods li:nth-child(4) i{
  background: url("../assets/images/header/toplist.png") 0px -22px no-repeat;
}
.header .login .methods li:nth-child(5) i{
  background: url("../assets/images/header/toplist.png") 0px -42px no-repeat;
}

</style>