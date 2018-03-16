<template>
  <div class="all">
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <el-row class="header" type="flex" justify="center" align="middle">
          <el-col :span="4" style="height:50%"><img style="height:100%" src="http://www.udao56.com/Work/logo/2.png"  alt="优道联运"></el-col>
          <el-col :span="10"><h1>物流管理系统</h1></el-col>
          <el-col :span="4"><h4>服务热线: 400-670-5156</h4></el-col>
        </el-row>
        <el-row class="content" type="flex" align="middle">
          <el-col :span="24">
            <el-row type="flex" justify="center" align="middle">
              <el-col :span="6" class="content_view">
                <el-row type="flex" justify="center" align="middle" style="height:560px">
                  <el-col :span="15">
                    <loginbtn></loginbtn>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div style="text-align:center">
          <el-row type="flex" justify="center" >&copy 河北优道科技有限公司</el-row>
          <el-row type="flex" justify="center" style="margin-top:3px;font-size:12px">冀ICP备12006906号-2</el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import loginbtn from '../../components/login/login_btn.vue'
  export default {
    components: {
      loginbtn
    }
  }
</script>
<style type="text/css" scoped>
  .header{
    height:140px;
    text-align: center; 
  }
  .header h1{
    color: #535a91;
    font-size: 58px
  }
  .header font{
    font-weight:400
  }
  .content{
    background:url(../../assets/back2.png) no-repeat;
    height:780px;
  }
  .content .content_view{
    background:rgba(255,255,255,0.2);
    height: 500px;
    width: 600px;
  }
  .bottom{
    height:100px;
  }
  
</style>
