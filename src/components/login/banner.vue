<template>
  <el-carousel indicator-position="none" height="384px">
    <el-carousel-item v-for="item in img" :key="item">
      <!--<img src="../../assets/login/banner1.png" :alt="item.altName">-->
      <img :src="item.imgSrc" :alt="item.altName">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data () {
    return {
      img: [
        {
          imgSrc: require('../../assets/login/banner1.png'),
          altName: 'banner1'
        },
        {
          imgSrc: require('../../assets/login/banner2.png'),
          altName: 'banner2'
        },
        {
          imgSrc: require('../../assets/login/banner3.png'),
          altName: 'banner2'
        }
      ]
    }
  }
}
</script>

