<template>
  <div>
    <button @click="c">点我试试</button>
    <audio :src="mp3" controls="controls"></audio>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        mp3:""
      }
    },
    methods:{
      c(){//
        this.$axios.get('http://127.0.0.1:3000/playlist/detail?id=2715838381').then((data)=>{
          var source = data.data
        });
        this.$axios.get('http://127.0.0.1:3000/song/url?id=77634399').then((data)=>{
          var source = data.data
        });
      }
    }
  }
</script>
<style scoped>
   
</style>