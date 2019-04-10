<template>
  <li class="cart-item" @click="toPlay(goods.id)">
    <div class="play_btn"></div>
    <img :src="goods.picUrl">
    <div class="text-container">
      <p class="pl_intro">{{goods.name}}</p>
      <p class="pl_count">播放量<span>{{goods.playCount}}</span>万</p>
    </div>
  </li>
</template>
<script>
  export default {
    name:"Cart",
    props:['goods'],
    methods:{
      toPlay(ids){
        this.$router.push({path:"Play",query:{ids}});
      }
    }
  }
</script>
<style scoped>
.cart-item{
  width: 220px;
  height: 300px;
  margin: 20px 20px 0px 0px;
  border-radius: 15px;
  background-color: #fff;
  position: relative;
  transition: all .3s;
}
.cart-item:hover{
  transform: translateY(-2%);
  cursor: pointer;
  box-shadow: 1px 4px 10px 2px #CCC;
}

.cart-item .play_btn{
  position: absolute;
  top: 20%;
  left: 30%;
  /* transform: translate(-50%,-50%); */
  width: 100px;
  height: 100px;
  background: url('../assets/images/cart/iconall.png') -8px -394px no-repeat;
  z-index: 10;
  transform: scale(0);
  transition: transform .3s;
}
.cart-item:hover .play_btn{
  transform: scale(1)
}
.cart-item>img{
  width: 220px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.cart-item .text-container{
  width: 220px;
  position: absolute;
  left:0px;
  bottom:20px;
  padding: 0 15px;
  text-align: center;
  /* margin: 10px 15px 20px; */
}
.cart-item:hover .text-container{
  color: red;
}
.cart-item .text-container .pl_intro{
  overflow: hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
  margin-bottom: 10px;
  font-size: 16px;
}
.cart-item .text-container .pl_count{
  text-align: center;
  color: #999;
  font-size: 14px;
}
.cart-item .text-container .pl_count span{
  color: #333;
  margin: 0 10px;
}

</style>