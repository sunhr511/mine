<template>
  <div style="text-align:center;">
<br>
<br>
<br><br><br><br>
<br>

    
    <b style="font-size:28px;">{{contentTitle}}</b>
<br>
<br>
<br>
    
<el-row type="flex" justify="center">
  <el-col  :xs="{span: 24}" :sm="{span: 23}"
          :md="{span: 20}" :lg="{span: 15}">
      <el-row type="flex" justify="space-between">
        <el-col :xs="{span: 7}" :sm="{span: 7}"
            :md="{span: 6}" :lg="{span: 6}"><div class="back"><h1 class="back1"></h1></div></el-col>
        <el-col ::xs="{span: 7}" :sm="{span: 7}"
            :md="{span: 6}" :lg="{span: 6}"><div class="back"><h1 class="back2"></h1></div></h1></el-col>
        <el-col :xs="{span: 7}" :sm="{span: 7}"
            :md="{span: 6}" :lg="{span: 6}"><div class="back"><h1 class="back3"></h1></div></h1></el-col>
      </el-row>
      <el-row type="flex" justify="space-between" style="transition: .6s all;">
        <el-col :xs="{span: 7}" :sm="{span: 7}"
          :md="{span: 6}" :lg="{span: 6}"><div class="text"><br><h3>1、申请试用</h3><br><p>在优合联运官网申请试用，填写公司名称、联系人、手机号</p></div></el-col>
        <el-col :xs="{span: 7}" :sm="{span: 7}"
          :md="{span: 6}" :lg="{span: 6}"><div class="text"><br><h3>2、完善资料</h3><br><p>市场人员接到试用申请后会联系您确认需求，并审核公司资质</p></div></el-col>
        <el-col :xs="{span: 7}" :sm="{span: 7}"
          :md="{span: 6}" :lg="{span: 6}"><div class="text"><br><h3>3、开始使用</h3><br><p>资质审核通过后会为您开通账号，并安排系统调试和培训</p></div></el-col>
      </el-row>
  </el-col>
</el-row>

<br>
<br><br>

<el-row>
  <div style="text-align:center">
    <span  class="shiyong"><el-button type="primary" @click="dialogBtn">申请试用</el-button></span>
  </div>

</el-row>

   
  </div>
</template>
<script>
import {shenqing} from '../../api/login.js'
export default {
  data () {
    return {
      contentTitle: '使用流程',
      form: {
        mobileNum: '',
        name: '',
        Cname: ''
      },
      loadingState: false,
      rules: {
        mobileNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        Cname: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$message('成功登录')
          this.shenqingInfo()
          // this.loadingState = true
        } else {
          this.$message('登录失败')
          return false
        }
      })
    },
    shenqingInfo () {
      let data = {
        Logis_LinkTel: this.form.mobileNum,
        Logis_Linker: this.form.name,
        Logis_Name: this.form.Cname
      }
      shenqing(data).then((res) => {
        this.$message({
          message: res.data.info,
          type: 'success'
        })
      }, (error) => {
        console.log(error)
      })
    },
    dialogBtn () {
      this.$emit('dialogBtn')
    }
  }
}
</script>
<style scoped>
*{
  transition: .6s all;
}
h1,h2,h3,h4,h5,h6{font-family: Microsoft YaHei}
.tableStyle{width: 1200px;margin: auto;text-align: center;padding: 30px}
.tableStyle .el-row{height: 150px;vertical-align:middle;}
.back{margin: auto;cursor: pointer}
/*申请试用hover*/
.back1{background: url(../../assets/login/shenqing1.png)no-repeat center center;height: 100px}
.back1:hover{background: url(../../assets/login/shenqing2.png)no-repeat center top;height: 100px;}
/**/
.back2{background: url(../../assets/login/wanshan1.png)no-repeat center center;height: 100px;}
.back2:hover{background: url(../../assets/login/wanshan2.png)no-repeat center top;height: 100px;}
/**/
.back3{background: url(../../assets/login/shiyong1.png)no-repeat center center;height: 100px;}
.back3:hover{background: url(../../assets/login/shiyong2.png)no-repeat center top;height: 100px;}
/*wenzi*/
.text{height: 100px;margin: auto;text-align: center;}
/*btn*/
.shiyong{margin: 10px auto;text-align: center;margin-bottom: 50px}
.shiyong .el-button{width: 300px;border-radius: 30px;height: 60px;font-size: 25px}
</style>

