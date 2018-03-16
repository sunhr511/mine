<template>
  <div>
    <div class="footerStyle">
      <el-row type="flex" justify="center">
        <el-col
          style="transition: .6s all;background:black;padding:30px"
          :sm="{span: 24}" :md="{span: 23}" :lg="{span:18}">
          <el-row type="flex" justify="space-between">
            <el-col :span="5">
              <ul>
                <li>货物追踪</li>
                <li>货款查询</li>
                <li>网点查询</li>
                <li>在线发货</li>
              </ul>
            </el-col>
            <el-col :span="5">
              <ul>
                <li>管理咨询</li>
                <li>同城配送</li>
                <li>专线运输</li>
                <li>小票快运</li>
                <li>大票零担</li>
              </ul>
            </el-col>
            <el-col :span="5">
              <ul>
                <li>物流软件</li>
                <li>票据印刷</li>
                <li>代收货款</li>
                <li>保价运输</li>
                <li>短信通知</li>
                <li>微信推广</li>
              </ul>
            </el-col>
            <el-col :span="4">
              <ul>
                <li>线路布局</li>
                <li>保险赔付</li>
                <li>结算代理</li>
                <li>垫付货款</li>
              </ul>
            </el-col>
            <el-col  :span="5" style="text-align:center">
              <div><img src="../../assets/login/顶部logo.png" alt=""></div>
              <div><p style="color:#fff;font-weight:bold">服务热线: 400-670-5156</p></div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {}
  }
</script>
<style scoped>
li{list-style: none;color: white;}
li>a {color: white;text-decoration: none}
/* .footerStyle{width: 1140px;margin: auto;padding: 30px;min-width:900px;} */
</style>
