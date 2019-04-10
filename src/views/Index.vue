<template>
 <div>
		<Navbar></Navbar> 
		<Carousel></Carousel>
		<div class="container bg_bottom">
			<TabBar :floor="floor1"></TabBar>
			<CartGroup :goodsList="goods"></CartGroup>
		</div>
		<div class="bg_row">
			<div class="container bg_bottom">
				<TabBar :floor="floor2"></TabBar>
				<RowGroup :newList="newList"></RowGroup>
			</div>
		</div>
		<div class="container bg_bottom">
			<h1>排行榜</h1>
			<HotGroup :listsGroup="listsGroup"></HotGroup>
		</div>
		<div class="bg_row bg_bottom">
			<div class="container">
				<TabBar :floor="floor3"></TabBar>
				<CartGroup :goodsList="mv"></CartGroup>
			</div>
		</div>
		<Footer></Footer>
 </div>
</template>
<script>
  import Navbar from '@/components/Navbar.vue'
	import Carousel from '@/components/Carousel.vue';
	import TabBar from '@/components/TabBar.vue';
	import CartGroup from '@/components/CartGroup.vue';
	import RowGroup from '@/components/RowGroup.vue';
	import HotGroup from '@/components/HotGroup.vue';
	import Footer from '@/components/Footer.vue';
	export default {
		name:"Index",
		components:{Navbar,Carousel,TabBar,CartGroup,RowGroup,HotGroup,Footer},
		data(){
			return {
				floor1:{
					name:"热门推荐"
				},
				floor2:{
					name:"新歌首发"
				},
				floor3:{
					name:"MV"
				},
				goods:[
					{intro:"每日新歌：谁是你的那个唯一？","pl_count":156,img:require("../assets/images/cart/cart_1.jpg")},
					{intro:"人生那么苦，多听这些歌才能开心呀～","pl_count":156,img:require("../assets/images/cart/cart_2.jpg")},
					{intro:"恋爱物语丨从此和你经历人世精彩","pl_count":156,img:require("../assets/images/cart/cart_3.jpg")},
					{intro:"《女儿们的恋爱》BGM精选","pl_count":156,img:require("../assets/images/cart/cart_4.jpg")},
					{intro:"Alternative | 律动的摇滚浪潮","pl_count":156,img:require("../assets/images/cart/cart_5.jpg")},
				],
				newList:[
					{musicName:"赶考",artist:"妖蝠/汐音社",img:require('../assets/images/row/row_1.jpg'),time:"03:16"},
					{musicName:"友谊地久天长 《地久天长》电影推广曲",artist:"王源",img:require('../assets/images/row/row_2.jpg'),time:"04:01"},
					{musicName:"星空",artist:"乌兰图雅",img:require('../assets/images/row/row_3.jpg'),time:"03:25"},
					{musicName:"吞噬灵魂",artist:"赵晔",img:require('../assets/images/row/row_4.jpg'),time:"04:37"},
					{musicName:"被驯服的象",artist:"杨坤",img:require('../assets/images/row/row_5.jpg'),time:"04:46"},
					{musicName:"晏",artist:"晏菲",img:require('../assets/images/row/row_6.jpg'),time:"04:20"}
				],
				mv:[
					{intro:"每日新歌：谁是你的那个唯一？","pl_count":156,img:require("../assets/images/cart/cart_1.jpg")},
					{intro:"人生那么苦，多听这些歌才能开心呀～","pl_count":156,img:require("../assets/images/cart/cart_2.jpg")},
					{intro:"恋爱物语丨从此和你经历人世精彩","pl_count":156,img:require("../assets/images/cart/cart_3.jpg")},
					{intro:"《女儿们的恋爱》BGM精选","pl_count":156,img:require("../assets/images/cart/cart_4.jpg")},
					{intro:"Alternative | 律动的摇滚浪潮","pl_count":156,img:require("../assets/images/cart/cart_5.jpg")},
				],
				listsGroup:
					{
						order:['流行','热歌','新歌','欧美','日韩'],
						color:['#cb6f88','#6e97b5','#71baaf','#4f8b93','#eca579'],
						bgPosition:['0px','-224px','-448px','-672px','-896px'],
						lists:[
							[{musicName:"红蔷薇",artist:"张靓颖"},
								{musicName:"有一种悲伤",artist:"A-Lin"},
								{musicName:"只是太爱你",artist:"张敬轩"},
								{musicName:"绿色",artist:"陈雪凝"},
								{musicName:"有可能的夜晚",artist:"莫籽"}],
							[{musicName:"红蔷薇",artist:"张靓颖"},
								{musicName:"有一种悲伤",artist:"A-Lin"},
								{musicName:"只是太爱你",artist:"张敬轩"},
								{musicName:"绿色",artist:"陈雪凝"},],
							[{musicName:"红蔷薇",artist:"张靓颖"},
								{musicName:"有一种悲伤",artist:"A-Lin"},
								{musicName:"只是太爱你",artist:"张敬轩"},
								{musicName:"绿色",artist:"陈雪凝"},
								{musicName:"有可能的夜晚",artist:"莫籽"}],
							[{musicName:"红蔷薇",artist:"张靓颖"},
								{musicName:"有一种悲伤",artist:"A-Lin"},
								{musicName:"只是太爱你",artist:"张敬轩"},
								{musicName:"绿色",artist:"陈雪凝"},
								{musicName:"有可能的夜晚",artist:"莫籽"}],
							[{first:"红蔷薇",second:"张靓颖"},
								{first:"有一种悲伤",second:"A-Lin"},
								{first:"只是太爱你",second:"张敬轩"},
								{first:"绿色",second:"陈雪凝"},
								{first:"有可能的夜晚",second:"莫籽"}]
						],
						ids:[]
					}
			}
		},
		created(){
			//热门推荐
			this.$axios.get("http://127.0.0.1:3000/personalized").then((data)=>{
				var arr = data.data.result;
				for (let index = 0; index < 5; index++) {
					var obj = {};
					obj.id = arr[index].id;
					obj.name = arr[index].name;
					obj.picUrl = arr[index].picUrl;
					obj.playCount = arr[index].playCount;
					this.$set(this.goods,index,obj);
				}
				
			});
			//新歌首发
			this.$axios.get("http://127.0.0.1:3000/personalized/newsong").then((data)=>{
				var arr = data.data.result;
				for (let index = 0; index < 6; index++) {
					var obj = {};
					obj.name = arr[index].song.name;
					obj.id = arr[index].song.id;
					obj.picUrl = arr[index].song.album.picUrl;
					obj.artist = arr[index].song.artists[0].name;
					var m = parseInt(arr[index].song.duration/(1000*60));
					var s = parseInt(arr[index].song.duration/1000-60*m);
					obj.time = m +":"+s;
					this.$set(this.newList,index,obj);
				}
			});
			//排行榜
			this.$axios.get("http://127.0.0.1:3000/toplist/detail").then((data)=>{
				var arr = data.data.list;
				for (let index = 0; index < 4; index++) {				
					this.$set(this.listsGroup.order,index,arr[index].name);
					this.$set(this.listsGroup.lists,index,arr[index].tracks);
					this.$set(this.listsGroup.ids,index,arr[index].id);
				}
				this.$set(this.listsGroup.order,4,arr[10].name);
			});
			//mv
			this.$axios.get("http://127.0.0.1:3000/top/mv?limit=5").then((data)=>{
				var arr = data.data.data;
				for (let index = 0; index < arr.length; index++) {
					var obj = {};
					obj.id = arr[index].id;
					obj.name = arr[index].name;
					obj.picUrl = arr[index].cover;
					obj.playCount = arr[index].playCount;
					this.$set(this.mv,index,obj);
				}
			});
    },
	}
</script>
<style scoped>
.bg_bottom{
	padding-bottom: 30px;
}
.bg_row{
	background-color: #fff;
}
h1{
	text-align: center;
	margin: 30px 0 0;
	color: #999;
}
</style>