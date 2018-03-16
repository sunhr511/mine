<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <br>
        <el-row type="flex" justify="space-between">
          <el-col>
            <el-radio-group v-model="radio" id="radioClass" change="changeRadio">
              <el-radio-button :label="0" >公司短信充值</el-radio-button>
              <el-radio-button :label="1" >短信格式设置</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <br>
        <div v-show = "radio === 0">
          <el-row type="flex" justify="space-between">
            <el-col :span="20">公司短信剩余：【<span style="color:red"> {{balance}} </span>】</el-col>
            <el-col :span="4" class="chongzhi">
              <el-button  type="warning" @click="chongzhiShow()">充值</el-button>
              <el-button   type="info" @click="fenpeiShow()">短信分配</el-button>
            </el-col>
          </el-row>
          <br>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-col :span="8" style="line-height:30px;">充值历史查询 &nbsp;日期</el-col>
              <el-col :span="13">
                <el-date-picker
                  size="small"
                  v-model="inputDate"
                  type="daterange"
                  placeholder="选择日期范围">
                </el-date-picker>
              </el-col>
            </el-col>

            <el-col :span="2" class="chaxun">
                  <el-button  @click="chaxunDate()" :loading="loadingTF">查询</el-button>

            </el-col>
          </el-row>
          <br>
          <el-row id="ziseTable">
            <el-col>
                <template>
                  <el-table
                    border
                    height="440"
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                      v-for="(tc, index) in tableColumn"
                      :key="index"
                      :prop="tc.prop"
                      :label="tc.label"
                      :width="tc.width">
                    </el-table-column>
                  </el-table>
                </template>

            </el-col>
          </el-row>
          <br>
          <el-row type="flex" justify="center">
            <el-col :span="6">
              <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="pageCount"
                  layout="total, prev, pager, next"
                  :total="total">
                </el-pagination>
            </el-col>
          </el-row>
        </div>



        <div v-show = "radio === 1">
          <el-row >
            <el-col>
              <br>
              <el-radio-group v-model="radioData" @change="radioSettingShow">
                <el-radio :label="0">发货人</el-radio>
                <el-radio :label="1">收货人</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <br>
          <el-row>
            <el-col>
              <el-checkbox-group v-model="checkedMessages" >
                <el-checkbox v-for="(op, index) in messages" :label="op"  :key="index">{{op}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
          <br>
          <br>
          <el-row type="flex" justify="center">
            <el-col :span="1">
              <el-button type="warning" @click="confirmData()" size="large">保存</el-button>
            </el-col>
          </el-row>
        </div>

      </el-col>
    </el-row>
    <el-dialog :title="chongzhiTitle" :visible.sync="chongzhiDialog" @close="closeDialog">
      <el-form :rules = "rules" ref="form" :model="form" label-width="220px" v-if="chongzhiTF">
        <el-form-item label="充值方式：">
          <el-radio-group v-model="form.resource">
            <el-radio :label="0"> <img style="height:30px;" src="../../assets/微信支付.png" /></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="短信单价：">
          {{duanxinMoney}}
        </el-form-item>
         <el-form-item label="充值金额（元）：" prop = "input">
          <el-input v-model="form.input" style="width:80%"></el-input>
        </el-form-item>
        <br>
        <el-form-item label-width="0px" style="text-align:center;">
          <el-button type="warning" @click="chongzhiData()">充值</el-button>
          <el-button class="quxiao" @click="chongzhiDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center"  v-if="!chongzhiTF">
        <el-col :span="10">
          <el-row type="flex" justify="center" >
            <el-col :span="10"><img style="height:30px;"  src="../../assets/微信支付.png" /></el-col>
          </el-row>
          <br>
          <el-row style="text-align:center;">
            <el-col>总计支付金额 {{form.input}} 元</el-col>
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
    <el-dialog title="短信分配" :visible.sync="fenpeiDialog">
      <el-form :rules = "rules" ref="allotForm" :model="allotForm" label-width="220px">
        <el-row>
          <el-col :span="20">
            <el-form-item label="选择网点：" prop = "Net_Id">
              <el-select v-model="allotForm.Net_Id" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in options"
                  :key="item.Net_Id"
                  :label="item.Net_Name"
                  :value="item.Net_Id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="20">
            <el-form-item label="分配条数：" prop = "Logis_SurplusNum">
              <el-input v-model="allotForm.Logis_SurplusNum" placeholder="请输入要分配的条数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <br>
        <el-form-item label-width="0px" style="text-align:center;">
          <el-button  @click="fenpeiData()" class="quxiao">确认</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>
<script>
  import { MessageShow, MessageEdit, MespayShow, MessageIsPayed, MespayMesnum, MespayRecord, MespaySearch, NetinfoNet, MespayDistribution } from '../../api/jichushezhi/duanxinshezhi.js'

  export default {
    data () {
      return {
        name: '短信设置',
        chongzhiTitle: '公司短信设置',
        chongzhiTF: true,
        weixin_img_url: '',
        one_weixin_img_url: '',
        checkedMessages: [],
        chongzhiDialog: false,
        fenpeiDialog: false,
        erweimaTime: 60,
        radio: 0,
        radioData: 0,
        balance: 0,
        allot: 0,
        inputDate: '',
        currentPage: 1,
        pageCount: 10,
        total: 0,
        shuxinButton: false,
        loadingTF: false,
        Timer: '',
        duanxinMoney: '0.08元/条',
        form: {
          resource: 0,
          input: ''
        },
        allotForm: {
          Net_Id: '',
          Logis_SurplusNum: ''
        },
        options: [],
        rules: {
          input: [
            { pattern: /^[^0]\d*$/, message: '请输入正确充值金额(不包含单位)', trigger: 'change' },
            { required: true, message: '请输入充值金额', trigger: 'change' },
            { max: 5, message: '必须1-5个字符', trigger: 'change' }
          ],
          Logis_SurplusNum: [
            { validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入分配条数'))
              } else if (!Number.isInteger(Number(value))) {
                callback(new Error('请输入数字值'))
              } else if (Number(value) > Number(this.allot)) {
                callback(new Error(`条数不够,目前剩余条数为${this.allot}`))
              } else if (Number(value) <= 0) {
                callback(new Error('不能小于等于0'))
              } else {
                callback()
              }
            },
              trigger: 'blur'
            }
          ]
        },
        messages: ['开单通知', '装车通知', '发车通知', '到货通知', '签收通知', '取款通知', '放款通知'],
        tableData: [],
        tableColumn: [
          { prop: 'Rec_Time', label: '时间', width: '180' },
          { prop: 'Rec_InitialNum', label: '起初条数', width: '180' },
          { prop: 'Rec_SendNum', label: '发送量', width: '180' },
          { prop: 'Rec_Payment', label: '充值金额', width: '' },
          { prop: 'Rec_Num', label: '当前剩余条数', width: '' }
        ],
        radioSettingData: []
      }
    },
    created () {
      this.radioSettingShow(this.radioData)
      this.showNum()
    },
    methods: {
      chongzhiData () {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.$confirm(`公司短信确认充值金额${this.form.input}元`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            })
            .then(() => {
              MespayShow({Rec_Payment: this.form.input}).then(response => {
                this.chongzhiTF = false
                this.weixin_img_url = response.data.weixin_img_url
                this.one_weixin_img_url = response.data.weixin_img_url
                this.chongzhiTitle = '微信支付'
                clearInterval(this.Timer)
                this.shuxinTime()
              }).catch(error => {
                console.log(error)
              })
            }).catch(() => {
              this.chongzhiTF = true
              this.chongzhiDialog = false
              clearInterval(this.Timer)
              this.$message({
                type: 'info',
                message: '已取消充值'
              })
            })
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
        this.Timer = setInterval(() => {
          this.erweimaTime--
          if (this.erweimaTime === 0) {
            this.weixin_img_url = ''
            this.shuxinButton = true
            clearInterval(this.Timer)
          }
          MessageIsPayed().then(response => {
            if (response.data.result === '1') {
              clearInterval(this.Timer)
              this.chongzhiDialog = false
              this.showNum()
              this.$message({
                message: response.data.info,
                type: 'success',
                showClose: true
              })
            }
          }).catch(error => {
            console.log(error)
          })
        }, 1000)
      },
      closeDialog () {
        this.chongzhiTF = true
        this.chongzhiTitle = '公司短信设置'
        this.shuxinButton = false
        this.weixin_img_url = ''
        this.form.input = ''
      },
      chongzhiShow () {
        if (this.$refs['form']) {
          this.$refs['form'].resetFields()
        }
        this.chongzhiDialog = true
      },
      fenpeiShow () {
        if (this.allot === '') {
          this.$message({
            message: '余额不足',
            type: 'info',
            showClose: true
          })
        } else {
          if (this.$refs['allotForm']) {
            this.$refs['allotForm'].resetFields()
          }
          this.fenpeiDialog = true
        }
      },
      fenpeiData () {
        this.$refs['allotForm'].validate(async(valid) => {
          if (valid) {
            let allotRes = await MespayDistribution(this.allotForm)
            this.$message({
              message: allotRes.data.info,
              type: 'success',
              showClose: true
            })
            this.showNum()
            this.fenpeiDialog = false
          } else {
            return false
          }
        })
      },
      async showNum () {
        let response = await MespayMesnum()
        let netRes = await NetinfoNet()
        this.allot = response.data.info.Logis_SurplusNum
        this.options = netRes.data.info
        if (response.data.info.Logis_MesNum) {
          this.balance = response.data.info.Logis_MesNum
        } else {
          this.balance = 0
        }
        if (this.inputDate[0] != null) {
          this.chaxunDate()
        } else {
          let res = await MespayRecord({currentPage: this.currentPage, pageCount: this.pageCount})
          this.tableData = res.data.info
          this.total = res.data.count
        }
      },
      async chaxunDate () {
        this.loadingTF = true
        if (this.inputDate[0] != null) {
          let response = await MespaySearch({Rec_Time: this.inputDate, currentPage: this.currentPage, pageCount: this.pageCount})
          this.tableData = response.data.info
          this.total = response.data.count
          this.loadingTF = false
        } else {
          await this.showNum()
          this.loadingTF = false
        }
      },
      handleCurrentChange (val) {
        this.currentPage = val
        if (this.inputDate[0] != null) {
          this.chaxunDate()
        } else {
          this.showNum()
        }
      },
      async radioSettingShow (index) {
        this.radioData = index
        let response = await MessageShow({Mes_Linker: index})
        this.checkedMessages = []
        if (response.data.info.Mes_Type === null) {
          response.data.info.Mes_Type = []
        }
        if (index) {
          this.checkedMessages = response.data.info.Mes_Type
        } else {
          this.checkedMessages = response.data.info.Mes_Type
        }
      },
      async confirmData () {
        this.radioSettingData = {Mes_Linker: this.radioData, Mes_Type: this.checkedMessages}
        let response = await MessageEdit(this.radioSettingData)
        if (response.data.info.Mes_Linker) {
          this.checkedMessages = response.data.info.Mes_Type
        }
        this.$message({
          message: response.data.info,
          type: 'success',
          showClose: true
        })
      }
    }
  }
</script>
<style>
  #radioClass .el-radio-button .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    background: #8c96d9;
    color: white;
    border: 1px solid #bfcbd9;
    box-shadow: 0px 0px 0px white;
  }
    .chongzhi .el-button{
    float: right;
  }
  .chaxun .el-button {
    background: #8c96d9;
     float: right;
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
  .quxiao{
    background: #8c96d9;
    color: white;
  }
</style>
