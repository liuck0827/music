<template>
 <!-- 导航栏 -->
  <div class="navbar">
    <div class="container">
      <ul class="nav clearfix">
        <li class="float-left"><a href="#" class="nav-item active">推荐</a></li>
        <li class="float-left"><a href="#" class="nav-item">歌单</a></li>
        <li class="float-left"><a href="#" class="nav-item">排行榜</a></li>
        <li class="float-left"><a href="#" class="nav-item">主播电台</a></li>
        <li class="float-left"><a href="#" class="nav-item">歌手</a></li>
        <li class="float-left"><a href="#" class="nav-item">新碟上架</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
 export default {
   name:"Navbar"
 }
</script>
<style scoped>
  /**=====================navbar===========================*/
  .navbar{
    width: 100%;
    height: 36px;
    background-color: #C20C0C;
  }
  .navbar .container{
    display: flex;
    height: 100%;
    justify-content: center;
  }
  .navbar .container .nav{
    line-height: 36px;
    text-align: center;
  }
  .navbar .container .nav li{
    padding: 0 30px;  
    color: #fff; 
  }
  .navbar .container .nav li .nav-item{
    padding: 3px 15px;
    border-radius: 13px;
  }
  .navbar .container .nav li:hover .nav-item{
    border: .3px solid rgb(78, 78, 78);
    background-color: #9B0909;
  }
  .active{
    border: .3px solid rgb(78, 78, 78);
    background-color: #9B0909;
  }  
</style>