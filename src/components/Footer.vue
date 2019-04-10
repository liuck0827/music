<template>
  <div class="footer">
    <div class="container clearfix">
      <div class="copy float-left">
        <ul class="about clearfix">
          <li class="float-left"><a class="item" href="#" target="_blank">关于网易</a></li>
          <li class="float-left"><a class="item" href="#" target="_blank">客户服务</a></li>
          <li class="float-left"><a class="item" href="#" target="_blank">服务条款</a></li>
          <li class="float-left"><a class="item" href="#" target="_blank">网站导航</a></li>
          <li class="float-left"><a class="item" href="#" target="_blank">意见反馈</a></li>
        </ul>
        <p class="right">
          <span>网易公司版权所有©1997-2019</span>
          <span>杭州乐读科技有限公司运营：</span>
          <a href="#" class="code">浙网文[2018]3506-263号</a>
        </p>
        <p class="contact">
          <span>违法和不良信息举报电话：0571-89853516</span>
          <span>举报邮箱：</span>
          <a href="#" class="email">ncm5990@163.com</a>
        </p>
      </div>
      <ul class="enter float-left clearfix">
        <li class="float-left"><a href="#" class="pic"></a><p class="title">用户认证</p></li>
        <li class="float-left"><a href="#" class="pic"></a><p class="title">独立音乐人</p></li>
        <li class="float-left"><a href="#" class="pic"></a><p class="title">赞赏</p></li>
        <li class="float-left"><a href="#" class="pic"></a><p class="title">视频奖励</p></li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name:"Footer"
  }
</script>
<style scoped>
.footer{
  background-color: #333;
  color: #999;
  border: 1px solid transparent;
}
.footer .container{
  padding: 20px 0 30px 0;
} 
.footer .copy .about{
  display: flex;
  align-items: flex-start;
  width: 100%;
}
.footer .copy .about li{
  height: 20px;
}
.footer .copy .about li:not(:last-of-type){
  padding-right: 20px;
}
.footer .copy .about li:not(:first-of-type) .item::before{
  content: "|";
  display: inline-block;
  color: #c2c2c2;
  margin-right: 15px;
  font-size: 12px;
  line-height: 20px;
  vertical-align: middle;
}
.footer .copy .about li:hover .item,
.footer .copy .right .code:hover,
.footer .copy .contact .email:hover{
  color: #ff5722;
}
.footer .copy .right,
.footer .copy .contact{
  margin-top: 10px;
}
.footer .copy .right span,
.footer .copy .contact span{
  font-size: 14px;
}
.footer .copy .right span:first-child,
.footer .copy .contact span:first-child{
  margin-right: 12px;
}
.footer .copy .right .code,
.footer .copy .contact .email{
  color: #ddd;
}
.footer .enter{
  margin: 21px 0 0 120px;
}
.footer .enter li{
  width: 60px;
  height: 70px;
  text-align: center;
  color: #666;
  margin: 0 15px;
  cursor: pointer;
}
.footer .enter li .pic{
  display: block;
  width: 50px;
  height: 45px;
  margin:0 auto;
  background: url('../assets/images/footer/foot_enter_new.png') 0px 0px no-repeat;
  background-size: 110px 450px;
}
.footer .enter li:nth-child(1) .pic{
  background-position: -63px -101px;
}
.footer .enter li:nth-child(2) .pic{
  background-position: 0px 0px;
}
.footer .enter li:nth-child(3) .pic{
  background-position: -60px -50px;
}
.footer .enter li:nth-child(4) .pic{
  background-position: 0 -101px;
}
.footer .enter li .title{
  font-size: 12px;
  margin-top:10px; 
  color: #999;
}
.footer .enter li:hover .title{
  color: #ff5722;
}
</style>