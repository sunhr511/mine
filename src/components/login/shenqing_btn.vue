<template>
  <div>
    <el-button type="warning"   @click="dialogBtn" class="bw">申请试用</el-button>
    <el-dialog title="申请试用账号" :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      size="tiny">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="mobileNum">
          <el-input v-model="form.mobileNum" auto-complete="off" placeholder="请输入常用手机号"  class="inputStyle" size="large"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="form.name" auto-complete="off" placeholder="请输入联系人姓名"  class="inputStyle" size="large"></el-input>
        </el-form-item>
        <el-form-item prop="Cname">
          <el-input
          @keyup.enter.native="keyDown($event)"
          v-model="form.Cname" auto-complete="off" placeholder="请输入公司名称"
          class="inputStyle" size="large"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row class="sub11">
            <el-button type="primary" :loading="subLoading" @click="submitForm('form')" class="btnStyle">提交申请</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {shenqing} from '../../api/login.js'
export default {
  data () {
    return {
      subLoading: false,
      dialogFormVisible: false,
      form: {
        mobileNum: '',
        name: '',
        Cname: ''
      },
      rules: {
        mobileNum: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[34578]\d{9}$/, message: '请正确输入手机电话', trigger: 'change' }
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
          this.subLoading = true
          this.shenqingInfo()
          this.subLoading = false
        } else {
          this.$message('失败')
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
        if (res.data.result === '1') {
          this.dialogFormVisible = false
          this.$message({
            message: res.data.info,
            type: 'success',
            duration: 5000,
            showClose: true
          })
        } else {
          this.$message({
            message: res.data.info,
            type: 'info'
          })
          this.$refs['form'].resetFields()
        }
      }, (error) => {
        this.$message({
          message: error,
          type: 'error'
        })
      })
    },
    dialogBtn () {
      // this.$message('点击了按钮')
      if (this.$refs['form']) {
        this.$refs['form'].resetFields()
      }
      this.dialogFormVisible = true
    },
    keyDown (ev) {
      if (ev.keyCode === 13) {
        this.submitForm('form')
      }
    }
  }
}
</script>
<style scoped>
.Img{margin-top:1px;line-height: 42px;}
.inputStyle{width: 100%;overflow: hidden}
.codeStyle{width: 60%;float: left;}
.imgStyle{float: left;margin-left: 10px}
.sub11{text-align: center}
.sub11 .el-button{width: 180px;height: 50px;font-size:18px;}
.bw{
  background: transparent;

   color:white;
}
.bw:hover,.bw:focus{
  background: transparent;
   color:orange;
}
</style>
