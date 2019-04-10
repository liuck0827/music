<template>
  <div class="floor">
    <h1>{{floor['name']}}</h1>
    <ul class="clearfix tab">
      <li class="float-left tab-item"  @click="changeTab(index)" :class="{active:isActive[index]}" v-for="(tab,index) in floor['tab']" :key="tab.name" data-toogle="tab.id">{{tab.name}}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    name:"TabBar",
    props:['floor'],
    data(){
      return {
        isActive:[]
      }
    },
    created() {
      // //获取li
      // for (let index = 0; index < this.floor.tab.length; index++) {
      //   if(index==0){
      //     this.isActive[index]=true;
      //   }else{
      //     this.isActive[index] = false;        
      //   }
      // }
    },
    methods: {
      changeTab(index){
        for (let index = 0; index < this.isActive.length; index++) {
          this.isActive[index] = false;
        }
        this.$set(this.isActive,index,true);
      }
    },
  }
</script>
<style scoped>
.floor{
  border: 1px solid transparent;
}
h1{
  text-align: center;
  margin: 30px 0 0px;
  color: #999;
}

.tab{
  display: flex;
  justify-content: center;    
}
.tab .tab-item{
  width: 7%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.tab .tab-item:hover{
  color: #f46262;
}
.active{
  color: #f46262 !important;
} 
</style>