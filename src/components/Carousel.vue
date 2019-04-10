<template>
 <div class="carousel">
   <div class="container"  @mouseenter="enter" @mouseleave="leave">
     <div class="wrap">
        <div class="ban" :style="ban">
          <img :src="img" v-for="(img,index) of imgs" :key="img" :style="imgSty[index]">
        </div>
     </div>
     <div class="btn" @click="change">
       <button class="pre"></button>
       <button class="next"></button>
     </div>
     <ul class="dots clearfix">
       <li class="float-left dot" v-for="(img,index) of imgs" :key="img" :class="{active:isActive[index]}" @click="changeDot(index)"></li>
     </ul>
   </div>
   
 </div>
</template>
<script>
 export default {
   name:"Carousel",
   data(){
     return {
       imgs:[
         require("../assets/images/carousel/banner1.png"),
         require("../assets/images/carousel/banner2.png"),
         require("../assets/images/carousel/banner3.png"),
         require("../assets/images/carousel/banner4.png"),
         require("../assets/images/carousel/banner5.png"),
         require("../assets/images/carousel/banner6.png"),
         require("../assets/images/carousel/banner7.png"),
         require("../assets/images/carousel/banner8.png")
       ],
       ban:{},
       imgSty:[],
       isActive:[true,false,false,false,false,false,false,false],
       carousel:{
          id:0,
          count:0,
          images:[],
          n:0,
          theta:0,
          s:0,
          apothem:0,
          num:1,
          nowIndex:0,
          timer:null
       },
     }
   },
   mounted(){
    //获取图片对象
    var imgs = document.querySelector('.ban').children;
    //图片加载完成后，初始化轮播图
    imgs[imgs.length-1].onload = ()=>{
     this.init();
    }
   },
   methods: {
    init(){
      var figure = document.querySelector('.ban');
      this.carousel.images = figure.children;
      this.carousel.n = this.carousel.images.length;
      this.carousel.theta = 2 * Math.PI / this.carousel.n;
      this.carousel.s = parseFloat(this.carousel.images[0].width);
      this.carousel.apothem = this.carousel.s / (2 * Math.tan(Math.PI / this.carousel.n));
      this.carousel.timer = this.time;
      this.setupCarousel();
    },
    setupCarousel() {
      this.ban = {"transform-origin":`50% 50% ${-this.carousel.apothem}px`};      
      for (let i = 0; i < this.carousel.n; i++) {
        this.imgSty.push({"transform-origin":`50% 50% ${-this.carousel.apothem}px`,
                        "transform":`rotateY(${i * this.carousel.theta}rad)`});
      }
      this.carousel.timer();
      this.carousel.timer=null;
    },
    time(){
      this.carousel.id = setInterval(()=>{
        this.changeCarousel();
      },2500);
    },
    changeCarousel(){
      this.carousel.count = this.carousel.count +this.carousel.num;
      this.ban = {"transform-origin":`50% 50% ${-this.carousel.apothem}px`,
                          transform:`rotateY(${ this.carousel.count* -this.carousel.theta}rad)`
                          };
      for (let index = 0; index < this.isActive.length; index++) {
        this.isActive[index] = false;
        if(this.carousel.count<0){
          this.carousel.nowIndex = (this.carousel.count)%(this.carousel.n)==0?0:(this.carousel.count)%(this.carousel.n)+this.carousel.n;          
        }else{
          this.carousel.nowIndex=this.carousel.count%(this.carousel.n);
        }
        this.isActive[this.carousel.nowIndex] = true;
        
      }
    },
    //左右按钮点击事件
    change(e){
      var button = e.target.className;
      //左按钮
      if(button=="pre"){
        this.carousel.num = -1;
      }
      //右按钮
      if(button=="next"){
        this.carousel.num = 1;
      }
      this.changeCarousel();
    },
    //s鼠标事件
    enter(){
      clearInterval(this.carousel.id);
      this.carousel.timer = this.time;
    },
    leave(){    
      this.carousel.timer();
      this.carousel.timer=null;
    },
    //修改点的
    changeDot(index){
      if(this.carousel.count<0){
        this.carousel.count += (index- this.carousel.nowIndex+1);
      }else{
        this.carousel.count += (index- this.carousel.nowIndex-1);
      }
      this.changeCarousel();
    }
   },

 }
</script>
<style scoped>
.carousel{
  background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
}
.carousel .container{
  position: relative;
  perspective: 500px;
  overflow: hidden;
}
.carousel .container .wrap{
  width: 730px;
  height: 370px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.carousel .container .wrap .ban{
  transform-style: preserve-3d;
  margin-top: 10px; 
  transition: transform 0.5s; 
}
.carousel .container .wrap .ban img{
  width: 100%;
}
.carousel .container .wrap .ban img:not(:first-of-type){
  position: absolute;
  top:0;
  left: 0;
}

.carousel .dots{
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translate(-50%,0%);
  text-align: center;
}
.carousel .dots .dot{
  width: 15px;
  height: 15px;
  border: 3px solid #333;
  background-color:#fff;
  border-radius: 50%;
  margin: 0 10px;
}
.active{
  border-color: #fff !important;
  background-color:red !important;
}
.carousel .btn{
  position: absolute;
  top: 35%;
  left: 0px;
  width: 100%;
  transform: translate(0%,-50%);
}
.carousel .btn .pre,
.carousel .btn .next{
  position: absolute;
  top: 0;
  width: 37px;
  height: 63px;
  background-color: transparent;
  cursor: pointer;
  color: #fff;
}
.carousel .btn .pre{
  left: -37px;
  background: url('../assets/images/carousel/banner.png') 0px -360px no-repeat;
  transition: left .5s;
}
.carousel .btn .next{
  right: -37px;
  background: url('../assets/images/carousel/banner.png') 0px -510px no-repeat;
  transition: right .5s;
}
.carousel .btn .pre:hover{
  background-position-y: -430px !important;
}
.carousel .container:hover .btn .pre{
  left:0px;
}
.carousel .btn .next:hover{
  background-position-y: -580px !important;
}
.carousel .container:hover .btn .next{
  right:0px;
}
</style>