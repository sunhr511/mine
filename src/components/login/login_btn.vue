<template>
  <div>
      <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="80px">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="form.username" auto-complete="off" placeholder="请输入用户名" class="inputStyle"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" auto-complete="off" type="password" placeholder="请输入密码" class="inputStyle"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码">
          <el-row type="flex" justify="space-between">
            <el-input
              style="ime-mode:active"
              @keyup.enter.native="keyDown($event)"
              v-model="form.code" auto-complete="off"
              placeholder="请输入验证码"
              class="codeStyle"></el-input>
              <img :src="codepath"  alt="点击更换" @click="changeCode"  class="imgStyle">
             
            <!-- <el-col :span="16">
              <el-input
                style="ime-mode:active"
                @keyup.enter.native="keyDown($event)"
                v-model="form.code" auto-complete="off"
                placeholder="请输入"
                class="codeStyle" size="large"></el-input></el-col>
           &nbsp; <el-col :span="7">
             <img :src="codepath"  alt="点击更换" @click="changeCode"  class="imgStyle">
             <span @click="forgetPwd" style="border:0px;margin-top:10px;font-size:18px;float:right;cursor:pointer" type="warning"  size="large">
               忘记密码?
             </span>
             </el-col> -->
          </el-row>
          <!--<img src="http://123.207.178.167/thinkphp5/index.php/captcha.html" alt="点击更换"  onclick="this.src='http://123.207.178.167/thinkphp5/index.php/captcha.html?id='+Math.random();" width="200px" height="60px" />-->
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="text" @click="forgetPwd" size="large">
            忘记密码?
          </el-button> -->
          <span @click="forgetPwd"
           style="border:0px;font-size:18px;float:right;cursor:pointer">
               忘记密码?
             </span>
        </el-form-item>
        <el-form-item style="text-align:center" class="sub11">
            <el-button type="primary" size="large" :loading="loadingState" @click="submitForm('form')" >登录</el-button>
        </el-form-item>
      </el-form>
    <el-dialog
      size="tiny"
      :modal-append-to-body="false"
      title="欢迎登录优合物流管理系统"
      :visible.sync="forgetVisible">
      <el-form
        label-position="left"
        :model="forgetData" :rules="rules"
        ref="forgetData" label-width="80px">
        <el-form-item prop="mobile" label="手机号">
          <el-input v-model="forgetData.mobile" auto-complete="off" placeholder="请输入手机号" size="large"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码">
          <div style="display:flex">
            <el-input v-model="forgetData.code" auto-complete="off" placeholder="请输入验证码" size="large"></el-input>
            <el-button type="warning" @click="yzmGo()" :disabled = "yzmTF">{{yzm}}</el-button>
          </div>
        </el-form-item>
        <el-form-item style="float:right" v-if="!nextTF">
          <el-button type="primary" @click="nextGo" :loading="loadingNext">下一步</el-button>
        </el-form-item >
        <el-form-item prop="pass" v-if="nextTF" label="密码">
          <!-- v-show="nextTF" -->
          <el-input type="password" v-model="forgetData.pass" auto-complete="off" placeholder="请输入密码" size="large"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" v-if="nextTF" label="确认密码">
          <el-input type="password" v-model="forgetData.checkPass" auto-complete="off" placeholder="请再输入密码" size="large"></el-input>
        </el-form-item>
        <el-form-item  style="float:right;" v-if="nextTF" label-width="0px">
          <el-button type="primary" @click="saveGo" style="margin:auto" :loading="loadingSave">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
// import axios from '../../api/index.js'
import * as types from '../../store/mutation-types.js'
import router from '../../router/index.js'
import {login, LoginSmsCodes, LoginYanzheng, LoginEditpassword} from '../../api/login.js'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      this.$refs.forgetData.validateField('checkPass')
      callback()
    }
    var validatePass2 = (rule, value, callback) => {
      if (this.forgetData.pass !== this.forgetData.checkPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loadingNext: false,
      loadingSave: false,
      dialogFormVisible: false,
      forgetVisible: false,
      yzm: '点击获取验证码',
      timer: '',
      yzmTF: false,
      nextTF: false,
      forgetData: {
        mobile: '',
        code: '',
        pass: '',
        checkPass: ''
      },
      form: {
        username: '',
        password: '',
        code: ''
      },
      loadingState: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '必须4个字符', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '请输入手机电话', trigger: 'change' },
          { pattern: /^1[34578]\d{9}$/, message: '请正确输入手机电话', trigger: 'change' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
          { min: 6, message: '必须6个以上字符', trigger: 'change' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
          { min: 6, message: '必须6个以上字符', trigger: 'change' }
        ]
      },
      // codepath: 'http://47.92.132.179/thinkphp5/index.php/captcha.html',
      codepath: 'http://120.27.18.62/thinkphp5/index.php/captcha.html',
      // codepath: 'http://219.148.37.219/thinkphp5/index.php/captcha.html',
      formLabelWidth: '0px'
    }
  },
  watch: {
    '$route.params': 'showBan'
  },
  methods: {
    showBan () {
      switch (this.$route.path) {
        case '/wo/9':
          this.dialogBtn()
          break
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginInfo()
        } else {
          // this.$message('登录失败')
          return false
        }
      })
    },
    // 提交登录信息
    loginInfo () {
      let data = {
        username: this.form.username,
        password: this.form.password,
        code: this.form.code
      }
      this.loadingState = true
      login(data).then((res) => {
        if (res.data.result === '1') {
          router.replace('/index/shoye')
          let token = res.data.token
          let loginID = res.data.loginId
          if (token) {
            this.$store.commit(types.LOGIN, token)
            this.$store.commit(types.LOGINID, loginID)
            let redirect = decodeURIComponent(this.$route.query.redirect || '/')
            this.$router.push({
              path: redirect
            })
          }
          this.$message({
            message: res.data.info
          })
        } else {
          this.changeCode()
          this.form.code = ''
          this.$message({
            message: res.data.info,
            type: 'warning'
          })
        }
        this.loadingState = false
      })
    },
    aaa () {
      if (this.$refs['form']) {
        this.$refs['form'].resetFields()
      }
      this.dialogFormVisible = false
    },
    dialogBtn () {
      // this.$message('点击了登录按钮')
      if (this.$refs['form']) {
        this.$refs['form'].resetFields()
      }
      this.dialogFormVisible = true
    },
    handleClose (done) {},
    changeCode () {
      this.codepath = 'http://120.27.18.62/thinkphp5/index.php/captcha.html?id=' + Math.random()
      // this.codepath = 'http://47.92.132.179/thinkphp5/index.php/captcha.html?id=' + Math.random()
      // this.codepath = 'http://219.148.37.219/thinkphp5/index.php/captcha.html?id=' + Math.random()
    },
    keyDown (ev) {
      if (ev.keyCode === 13) {
        this.submitForm('form')
      }
    },
    forgetPwd () {
      if (this.$refs['forgetData']) {
        this.$refs['forgetData'].resetFields()
      }
      this.dialogFormVisible = false
      this.forgetVisible = true
      this.nextTF = false
      this.yzmTF = false
    },
    yzmGo () {
      this.rules.code[0].required = false
      this.rules.pass[0].required = false
      this.rules.checkPass[0].required = false
      this.$refs['forgetData'].validate(async (valid) => {
        if (valid) {
          this.yzmTF = true
          let lsc = await LoginSmsCodes(this.forgetData)
          if (parseInt(lsc.data.result)) {
            let z = 60
            clearInterval(this.timer)
            this.timer = setInterval(() => {
              z--
              this.yzm = '验证码已发送' + z + '(s)'
              if (z === 0) {
                clearInterval(this.timer)
                this.yzm = '点击获取验证码'
                this.yzmTF = false
              }
            }, 1000)
          } else {
            this.$message({
              showClose: true,
              message: lsc.data.info,
              type: 'info',
              duration: 5000
            })
            let z = 60
            clearInterval(this.timer)
            this.timer = setInterval(() => {
              z--
              this.yzm = '重新获取验证码' + z + '(s)'
              if (z === 0) {
                clearInterval(this.timer)
                this.yzm = '点击获取验证码'
                this.yzmTF = false
              }
            }, 1000)
          }
        } else {
          return false
        }
        this.rules.code[0].required = true
        this.rules.pass[0].required = true
        this.rules.checkPass[0].required = true
      })
    },
    nextGo () {
      this.rules.pass[0].required = false
      this.rules.checkPass[0].required = false
      this.$refs['forgetData'].validate(async (valid) => {
        if (valid) {
          this.loadingNext = true
          let ly = await LoginYanzheng(this.forgetData)
          if (ly.data.result === '1') {
            this.loadingNext = false
            this.nextTF = true
          } else {
            this.loadingNext = false
            this.$message({
              showClose: true,
              message: ly.data.info,
              type: 'info'
            })
          }
        } else {
          return false
        }
      })
      this.rules.pass[0].required = true
      this.rules.checkPass[0].required = true
    },
    async saveGo () {
      this.$refs['forgetData'].validate(async(valid) => {
        if (valid) {
          this.loadingSave = true
          let le = await LoginEditpassword(this.forgetData)
          if (le.data.result === '1') {
            this.$message({
              showClose: true,
              message: le.data.info,
              type: 'success'
            })
            this.forgetVisible = false
            this.loadingSave = false
          } else {
            this.loadingSave = false
            this.$message({
              showClose: true,
              message: le.data.info,
              type: 'info'
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.Img{margin-top:1px;line-height: 42px;}
.inputStyle{width: 100%;overflow: hidden}
.codeStyle{float: left;width: 100%;height: 100%;}
.imgStyle{float: left;margin-left: 10px;height: 40px;}
.sub11 .el-button{
  width:180px;
  padding:15px;
  /* width: 180px;height: 50px;font-size:18px; */
}
.bw{
  background: transparent;
  color:white;
}
.bw:hover,.bw:focus{
  background: transparent;
}
</style>
