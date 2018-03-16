<template>
  <div >
    <el-row >
      <j9 v-if="wugeShow === 9"></j9>
      <j1 v-if="wugeShow === 1"></j1>
      <j2 v-if="wugeShow === 2"></j2>
      <j3 v-if="wugeShow === 3"></j3>
      <j4 v-if="wugeShow === 4"></j4>
    </el-row>
    <br>
    <br>
    <el-row type="flex" align="bottom" justify="space-around">
      <el-col class="btnGroup" :span="20">
        <el-button v-for="item in wuge" :key="item.ii" @click="showDiv(item.ii)" :class="{'selected':flag==item.ii}">
          {{item.title}}
        </el-button>
      </el-col>
      <el-col class="btnGroup" :span="3">
        <el-button  @click="showDiv(9)" type="primary">
            公司信息设置
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import j9 from '../../components/jichushezhi/j9.vue'
  import j1 from '../../components/jichushezhi/j1.vue'
  import j2 from '../../components/jichushezhi/j2.vue'
  import j3 from '../../components/jichushezhi/j3.vue'
  import j4 from '../../components/jichushezhi/j4.vue'
  export default {
    components: {
      j9,
      j1,
      j2,
      j3,
      j4
    },
    data () {
      return {
        name: '公司主体设置',
        flag: '',
        wuge: [
          { title: '费率设置', ii: 1 },
          { title: '网点设置', ii: 2 },
          { title: '公司财务属性设置', ii: 3 },
          { title: '充值(用户余额)', ii: 4 }
        ],
        wugeShow: 9
      }
    },
    created () {
    },
    methods: {
      showDiv (index) {
        this.wugeShow = index
        this.flag = index
      }
    }
  }
</script>
<style scoped>
  *{
    font-family: "微软雅黑"
  }
  .Ghead {
    background:  #d0d5f5;
    height: 50px;
    line-height: 50px;
    color: black;
  }
  .btnGroup .el-button {
    padding-left:30px;
    padding-right:30px;
    /* width: 140px; */
    height: 50px;
    font-size: 14px;
  }
  .btnGroup .el-button:hover{
     color: white;
     background: #8c96d9;
     border: 1px white solid;
  }
  .selected {
    background: #8c96d9;
    color: white
  }

  #ziseTable .el-table th {
    background: #8c96d9;
  }
  #ziseTable .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
    background: #8c96d9;
    color: white
  }
  #ziseTable .el-table__fixed-header-wrapper thead div{
    background: #8c96d9;
    color: white
  }
  
</style>
