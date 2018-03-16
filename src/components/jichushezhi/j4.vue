<template>
<div>
  <el-row type="flex" justify="center" id="ziseTable">
    <el-col :span="23">
      
      <br>
      <el-form  :rules="rules"  :model="form" ref="form" label-width="100px" >
        <el-row type="flex" justify="space-between">
          
          <el-col :span="6">
            <el-form-item label="充值金额" prop="money" >  
          <el-select clearable v-model="form.money" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>
          <el-col :span="4" >
            <el-form-item style="float:right">
               <el-button @click="submitForm('form')" style="background: #8c96d9;color: white">充值</el-button>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <el-row>
        <el-col :span="24" class="Ghead">
        &nbsp;&nbsp;&nbsp;{{name}}
      </el-col>
      <br><br><br>
      </el-row>
      <el-table
        :data="tableData"
        border
        height="404"
        style="width: 100%">
        <el-table-column
          prop="Pay_Amount"
          label="金额">
        </el-table-column>
        <el-table-column
          prop="Pay_Type"
          label="类型（消费/充值)">
        </el-table-column>
        <el-table-column
          prop="Pay_Time"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="Pay_BillID"
          label="操作单号">
        </el-table-column>
      </el-table>
      <br>
      <el-pagination
      style="text-align:center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageCount"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </el-col>
  </el-row>
  <el-dialog
    title="充值"
    :visible.sync="dialogVisible"
    size="tiny"
    :before-close="handleClose">
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-row type="flex" justify="center" > 
          <el-col :span="19"><img style="height:30px;" src="../../assets/微信支付.png" /></el-col>
        </el-row>
        <br>
        <el-row style="text-align:center;"> 
          <el-col>总计支付金额 {{form.money}} 元</el-col>
        </el-row>
        <el-row style="text-align:center;">
          <el-col style="text-align:center;"><img style="height:180px;" :src="weixin_img_url" /></el-col>
        </el-row>
        <el-row style="text-align:center;" v-if="!shuxinButton">
          <el-col>距二维码过期还有 <span style="color:red">{{erweimaTime}}</span> 秒，过期后请点击刷新重新生成二维码</el-col>
        </el-row>
        <br>
        <el-row style="text-align:center;">
          <el-col><el-button type="warning" @click="shuxinData()" v-if="shuxinButton"> 刷新</el-button></el-col>
      </el-row>
      </el-col>
    </el-row> 
</el-dialog>
</div> 
</template>
<script>
  import {WeixinShow, PayShow, WeixinIsPayed} from '../../api/jichushezhi/jinechongzhi.js'
  export default {
    data () {
      return {
        name: '消费记录',
        form: {
          money: ''
        },
        dialogVisible: false,
        shuxinButton: false,
        currentPage: 1,
        pageCount: 10,
        total: 0,
        erweimaTime: 60,
        weixin_img_url: '',
        one_weixin_img_url: '',
        rules: {
          money: [
            { required: true, message: '请选择充值金额', trigger: 'change' }
          ]
        },
        tableData: [],
        options: [
          {
            value: '100',
            label: '100'
          },
          {
            value: '200',
            label: '200'
          },
          {
            value: '500',
            label: '500'
          },
          {
            value: '1000',
            label: '1000'
          }
        ]
      }
    },
    created () {
      this.showDate()
    },
    methods: {
      async showDate () {
        let psRes = await PayShow({'currentPage': this.currentPage, 'pageCount': this.pageCount})
        if (psRes.data.info === '') {
          this.tableData = []
        } else {
          this.tableData = psRes.data.info
          this.total = psRes.data.count
        }
      },
      handleClose () {
        this.$confirm('取消充值, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.dialogVisible = false
        }).catch(() => {})
      },
      submitForm (formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            this.dialogVisible = true
            let wxsRes = await WeixinShow({'Rec_Payment': this.form.money})
            this.weixin_img_url = wxsRes.data.weixin_img_url
            this.one_weixin_img_url = wxsRes.data.weixin_img_url
            // console.log(wxsRes)
            clearInterval(this.Timer)
            this.shuxinTime()
          } else {
            this.$message({
              showClose: true,
              message: '请按规则填写',
              type: 'warning'
            })
            return false
          }
        })
      },
      shuxinData () {
        this.weixin_img_url = this.one_weixin_img_url
        this.erweimaTime = 60
        this.shuxinButton = false
        this.shuxinTime()
      },
      shuxinTime () {
        this.erweimaTime = 60
        this.Timer = setInterval(async() => {
          this.erweimaTime--
          if (this.erweimaTime === 0) {
            this.weixin_img_url = ''
            this.shuxinButton = true
            clearInterval(this.Timer)
          }
          let wxip = await WeixinIsPayed()
          if (wxip.data.result === '1') {
            clearInterval(this.Timer)
            this.dialogVisible = false
            this.showDate()
            this.$message({
              message: wxip.data.info,
              type: 'success',
              showClose: true
            })
          }
        }, 1000)
      },
      handleSizeChange (val) {
        // console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.showDate()
      }
    }
  }
  
</script>
<style scoped>
.Ghead {
    background:  #8c96d9;
    height: 40px;
    line-height: 40px;
     color: white
  }
</style>

