<template>
  <div class="all" >
      <el-row type="flex" justify="space-between"  align="middle" style="height:38px;background:#e1f2fb;">
      <el-col :span = "3" style="padding-left:18px;color:#1d90ce;">统计数据</el-col>
      <el-col :span = "2" >&nbsp;&nbsp;&nbsp;&nbsp;今天</el-col>
    </el-row>
    <el-row type="flex" justify="space-between" style="text-align:center;font-size:24px;color:#1d90ce;height:40px;">
      <el-col :span = "12">营业</el-col>
      <el-col :span = "12">库存</el-col>
    </el-row>
    <el-row type="flex" justify="space-between">
      <el-col :span = "4"  v-for="(item,index) in statisticsData" :key="index">
        <div :class="item.class1" class="yangshi" >{{item.title}}</div>
        <div :class="item.class" class="yangshi1">{{item.num}}</div>
      </el-col>
    </el-row>
  <el-row type="flex" justify="space-between"  align="middle" style="height:38px;background:#e1f2fb;">
      <el-col  style="padding-left:18px;color:#1d90ce;">收货量统计（周数据）</el-col>
  </el-row>
  <el-row type="flex" justify="center" >
    <el-col :span="24"  id="charts">
     <div id="main" style="width:100%;height:300px"  ></div>
    </el-col>
  </el-row>
   
  </div>
</template>
<script>
  import { MainTodayShow, MainShow } from '../api/shouye'
  import echarts from 'echarts'
  // require('echarts/lib/chart/line')
  // require('echarts/lib/component/title')
  // require('echarts/lib/component/tooltip')
  // require('echarts/lib/component/legend')
  // require('echarts/lib/component/grid')
  // require('echarts/lib/component/toolbox')
  
  export default {
    data () {
      return {
        abc: '我是首页',
        statisticsData: [
          {pinyin: 'piaoshu', title: '票数', num: '0', class: 'info', class1: 'info1'},
          {pinyin: 'jianshu', title: '件数', num: '0', class: 'success', class1: 'success1'},
          {pinyin: 'yunfei', title: '实时运费', num: '0', class: 'warning', class1: 'warning1'},
          {pinyin: 'weifapiao', title: '未发票数', num: '0', class: 'info', class1: 'info1'},
          {pinyin: 'weifajian', title: '未发件数', num: '0', class: 'success', class1: 'success1'},
          {pinyin: 'kucun', title: '当前库存', num: '0', class: 'warning', class1: 'warning1'}
        ],
        chartData: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['收货量']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '收货量',
              type: 'line',
              stack: '总量',
              data: [],
              lineStyle: {
                normal: {
                  width: 4
                }
              },
              smooth: false
            }
          ],
          color: ['#1d90ce']
        },
        myChart: ''
      }
    },
    created () {
      this.goo()
    },
    watch: {
      chartData: {
        handler (newValue, oldValue) {
          this.setOptions()
        },
        deep: true
      }
    },
    mounted () {
      this.chartGo()
    },
    methods: {
      async goo () {
        let mts = await MainTodayShow()
        for (let i in mts.data.info) {
          this.statisticsData.findIndex((value, index, arr) => {
            if (value.pinyin === i) {
              this.statisticsData[index].num = mts.data.info[i]
              if (mts.data.info[i] === null) {
                this.statisticsData[index].num = 0
              }
            }
          })
        }
        let ms = await MainShow()
        for (let y in ms.data.info) {
          // this.chartData.series[0].data[y] = ms.data.info[y].num
          this.$set(this.chartData.series[0].data, y, ms.data.info[y].num)
          // this.chartData.xAxis.data[y] = ms.data.info[y].Order_BaseTime
          this.$set(this.chartData.xAxis.data, y, ms.data.info[y].Order_BaseTime)
          if (!ms.data.info[y].num) {
            // this.chartData.series[0].data[y] = 0
            this.$set(this.chartData.series[0].data, y, 0)
          }
        }
      },
      setOptions () {
        this.myChart.setOption(this.chartData)
      },
      chartGo () {
        this.myChart = echarts.init(document.getElementById('main'))
        this.setOptions()
      }
    }
  }
</script>
<style scoped>
  *{
    font-family: "微软雅黑"
  }
  .success{
    background: #13ce66;
  }
   .info{
    background: #20a8f1
  }
   .warning{
    background: #ff9d49;
  }
   .success1{
    background: #2fac24;
  }
   .info1{
    background: #1d90ce
  }
   .warning1{
    background: #fe7f1c;
  }
  .yangshi{
    color: white;
    text-align: center;
    height:30px;
    font-size:16px;
    line-height: 30px;
    margin-left:5px; 
    margin-right:5px; 
  }
  .yangshi1{
    margin-left:5px;
    margin-right:5px; 
    color: white;
    text-align: center;
    height:70px;
    font-size:24px;
    line-height: 70px;
    text-shadow: 5px 5px 10px gray;
  }
  .all {
    
    position:absolute;
    width:100%; 
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>
