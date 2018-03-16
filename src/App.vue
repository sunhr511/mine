<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view style="height:100%;width:100%;"></router-view>
    <dia :dia='dia'></dia>
  </div>
</template>

<script>
import './api/js.js'
import dia from './liulan.vue'
export default {
  name: 'app',
  components: {
    dia
  },
  data () {
    return {
      dia: false
    }
  },
  created () {
    if (navigator.userAgent.toLowerCase().indexOf('chrome') !== -1) {
      console.log('chrome')
    } else if (navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
      console.log('Firefox')
    } else if (navigator.userAgent.toLowerCase().indexOf('webkit') !== -1) {
      console.log('webkit内核')
    } else {
      this.dia = true
    }
  }
}
</script>

<style>
.allCell {
    position:absolute;
    width:100%;
    height:calc(100% - 42px);
    overflow:auto;
    padding-top:20px;
    padding-bottom:12px;
}
*{
  font-family: "微软雅黑";
  transition: all .3s;
}
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,body,#app{
  min-height: 750px;
  max-height: 1080px;
  min-width: 1000px;
  max-width: 1920px;
  height:100%;
  width: 100%;
}
html,
 body,
 ul,
 li,
 img,
 p,
 h1,
 h2,
 h3,
 h4,
 h5,
 h6,div{
  padding:0px;
  margin:0px;
  border:0px;
  font-family:"微软雅黑";
  box-sizing: border-box;
  word-break:break-all;
}
@media screen and (min-width:300px) and (max-width:375px) {
  html {
    font-size: 11px
  }
}
@media screen and (min-width:376px) and (max-width:414px) {
  html {
    font-size: 12px
  }
}
@media screen and (min-width:415px) and (max-width:639px) {
  html {
    font-size: 13px
  }
}
@media screen and (min-width:640px) and (max-width:719px) {
  html {
    font-size: 16px
  }
}

</style>
