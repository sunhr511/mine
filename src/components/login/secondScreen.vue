<template>
  <el-row 
    style="width:100%;min-width:900px;height:100%;background:#f3f3f6"
    type="flex"
    justify="center"
    align="middle"
    >
    
    <el-col
      style="transition: .6s all;height:70%"
      :sm="{span: 22}" :md="{span: 18}" :lg="{span: 18}">
      <el-row type="flex" justify="center">
        <h2 style="font-size:46px">{{secondTitle}}</h2>
      </el-row><br><br>
      <el-row type="flex" justify="center">
       <p>{{secondContent}}</p>
      </el-row>
      <br> <br>
          <el-row type="flex" justify="space-between">
            <el-col
              :xs="{span: 7}" :sm="{span: 7}" :md="{span: 7}" :lg="{span: 7}"
              v-for="(item, index) in imgSrc" :key="index" class="imgCol">
            <img @click="secondClick(index)" class="img"
              :src="item">
              <h3 class="titleClass">{{imgTitle[index]}}</h3>
              <br>
              <p>{{imgParagraph[index]}}</p>
              <br>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        secondTitle: '产品',
        secondContent: '产品多样化,服务齐全,好用,免费&付费任您选',
        imgSrc: [
          require('../../assets/chanpinjieshao/物流端.png'),
          require('../../assets/chanpinjieshao/商户端.png'),
          require('../../assets/chanpinjieshao/平台.png')
        ],
        imgTitle: [
          '物流端 —— 优合货运通',
          '商户端 —— 优合商管家',
          '优合联运平台'
        ],
        imgParagraph: [
          '让物流运营管理更轻松,高效',
          '关注商户发货的每一个细节',
          '架设物流与发货商之间公平交易平台'
        ]
      }
    },
    methods: {
      secondClick (index) {
        this.$emit('secondClick', index)
      }
    }
  }
</script>
<style scoped>
*{
  transition: all .6s;
}
.imgCol:hover {
  transform: scale(1.1);
  cursor:pointer;
  
}
.imgCol:hover .titleClass {
  color:#2b92e1
}
.titleClass{
  transition: all .5s;
}
.img {
  transition: all .3s;
  text-align: center;
  width:80%
}
.imgCol{
  background:white;
  text-align: center;
  transition: all .3s;
  padding: 12px;
  box-shadow: 0px 0px 10px rgba(0,0,0,.1);
}
</style>
