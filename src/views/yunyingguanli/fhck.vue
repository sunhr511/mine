<template>
  <div class="fhck">
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <el-row>
          <el-col>
            <!--表单  -->
            <el-row type="flex">
              <el-col :span="24">
                <input-search :rLoading="rLoading" :rules="rules" :model="momo.model" :data="momo.data" :title="title" @onSubmit="onSubmit"></input-search>
              </el-col>
            </el-row>
            <!--表格  -->
            <el-row type="flex">
              <el-col :span="24">
                <tableShow :height="500" @handleSelectionChange = "handleSelectionChange"
                :tableData = "tableData" :columnProps = "columnProps"></tableShow>
                <br>
                <el-pagination
                  style="text-align:center"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="pageCount"
                  layout="total, prev, pager, next"
                  :total="total">
                </el-pagination>
              </el-col>
            </el-row>
            <el-row type="flex" justify="end">
              <el-col :span="10">
                <el-button class="fhckbtn fhckbtn1" @click="Zhongzhuan1(1)">中 转</el-button>
                <el-button class="fhckbtn fhckbtn2" @click="Waipai1(2)">外 派</el-button>
                <el-button class="fhckbtn" @click="Ziti1(3)">自 提</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--中转dialog  -->
    <el-dialog  title="中转" :visible.sync="dialogZhongzhuan" size="large" :before-close="handleClose">
      <p style="color:red">**此页中转同行、联系电话、中转单号、实收货款为必填项**</p>
      <input-search :rLoading="rLoading" ref="inputSa" :rules="Zhongzhuanrules" :model="Zhongzhuan.model" :data="Zhongzhuan.data" :title="Zhongzhuantitle" @onSubmit="ZhongzhuanSubmit"></input-search>
      <table-count-z-z  :countData = "ZhongzhuanData" @handleFanku="Fanku" @inputBlur="inputBlur" @resultData="resultZZ"></table-count-z-z>
    </el-dialog>
    <!--派送dialog  -->
    <el-dialog  title="外派" :visible.sync="dialogWaipai" size="large" :before-close="handleClose">
      <p style="color:red">**此页联系电话、实收货款为必填项**</p>
      <input-search :rLoading="rLoading" ref="inputSb" :rules="Waipairules" :model="Waipai.model" :data="Waipai.data" :title="Waipaititle" @onSubmit="WaipaiSubmit"></input-search>
      <table-count-w-p  :countData = "WaipaiData" @handleFanku="Fanku" @inputBlur="inputBlur" @resultData="resultWP"></table-count-w-p>
    </el-dialog>
    <!--自提dialog  -->
    <el-dialog  title="自提" :visible.sync="dialogZiti" size="large" :before-close="handleClose">
      <p style="color:red">**此页联系电话,实收货款，实收运费、实收货款为必填项**</p>
      <input-search :rLoading="rLoading" ref="inputSc" :rules="Zitirules" :model="Ziti.model" :data="Ziti.data" :title="Zitititle" @onSubmit="ZitiSubmit"></input-search>
      <table-count-z-t  v-if="zitiTF" :countData = "ZitiData" @handleFanku="Fanku" @inputBlur="inputBlur" @resultData="resultZT" ></table-count-z-t>
    </el-dialog>
    <el-dialog  title="自提结算" :visible.sync="dialogZitiJiesuan" size="tiny" :before-close="handleClose">
      <el-form :model="JiesuanModel" label-position="right" label-width="100px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="票数" prop="Piaoshu">
              <el-input  v-model="JiesuanModel.Piaoshu" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="总运费" prop="ysyf">
              <el-input  v-model="JiesuanModel.ysyf" disabled ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="已付运费" prop="ssyf">
              <el-input  v-model="JiesuanModel.ssyf" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="应收运费" prop="ysyf">
              <el-input  v-model="JiesuanModel.ysyf" disabled></el-input>
            </el-form-item>
          </el-col></el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="应收货款" prop="yshk">
              <el-input  v-model="JiesuanModel.yshk" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="实收货款" prop="sshk">
              <el-input  v-model="JiesuanModel.sshk" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="应收费用总计" prop="yshj">
              <el-input  v-model="JiesuanModel.yshj" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="实收费用总计" prop="sshj">
              <el-input  v-model="JiesuanModel.sshj" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Jiesuan">确 定</el-button>
      </span>
    </el-dialog>
        <!-- 打印控件Dialog -->
     <el-dialog
      title="请根据电脑操作系统位数下载相应的安装包"
      :visible.sync="judgeVisible"
      v-if="judgeVisible"
      size="tiny"
      >
      <font color='#FF00FF'>打印控件未安装!点击这里
        <a href='http://oss.kuaihuoyun.com/ktms/resource/Lodop6.205/install_lodop32.exe' target='_self'>执行安装</a>
        ,安装后请刷新页面或重新进入。(32位)
      </font>
      <br>
      <font color='#FF00FF'>打印控件未安装!点击这里
        <a href='http://oss.kuaihuoyun.com/ktms/resource/Lodop6.205/install_lodop64.exe' target='_self'>
        执行安装</a>,安装后刷新页面或重新进入。(64位)
      </font>
      (二选其一即可)
      <br><br>

      <font color='#FF00FF'>CLodop云打印服务(localhost本地)未安装启动!点击这里
        <a href='http://oss.kuaihuoyun.com/ktms/resource/Lodop6.205/CLodop_Setup_for_Win32NT.exe' target='_self'>执行安装</a>
      ,安装后请刷新页面。
      </font>
      (必装)
    </el-dialog>
  </div>
</template>
<script>
import {LODOP} from '../../../static/vendor/a'
// 选择打印机接口
import {asd} from './a.js'
import {PrintsShow} from '../../api/jichushezhi/dysz'
import inputSearch from '../../components/yunyingguanli/inputSearch.vue'
import tableShow from '../../components/yunyingguanli/tableShow'
import tableCountZZ from '../../components/yunyingguanli/tableCountZZ'
import tableCountWP from '../../components/yunyingguanli/tableCountWP'
import tableCountZT from '../../components/yunyingguanli/tableCountZT'
import {StorageShow, StoragePeerShow, StorageTransit, StorageSend, StorageSign} from '../../api/yunyingguanli/fhck'
// import {StorageShow, StoragePeerShow, StorageTransit, StorageSend} from '../../api/yunyingguanli/fhck'
import {NetInfoNet} from '../../api/yunyingguanli/shkd'
export default {
  components: {
    inputSearch,
    tableShow,
    tableCountZZ,
    tableCountWP,
    tableCountZT
  },
  data () {
    return {
      rLoading: false,
      judgeVisible: false,
      Zhongzhuantitle: '中转',
      Waipaititle: '外派',
      Zitititle: '自提结算',
      dialogZhongzhuan: false,
      dialogWaipai: false,
      dialogZiti: false,
      dialogZitiJiesuan: false,
      title: '查 询',
      // 分页
      total: 0,
      currentPage: 1,
      pageCount: 10,
      // 表单信息
      momo: {
        data: [
          { props: 'Order_Receive', label: '收货人', placeholder: '请输入收货人', date: '', select: '', input: true, content: [] },
          { props: 'Receive_LinkTel', label: '手机号', placeholder: '请输入收货人手机号', date: '', select: '', input: true, content: [] },
          { props: 'Order_End', label: '目的站', placeholder: '请输入目的站', date: '', select: true, input: '', content: [] }
        ],
        model: {
          Order_Receive: '',
          Receive_LinkTel: '',
          Order_End: ''
        }
      },
      rules: {},
      // 表格信息
      tableData: [],
      columnProps: [
        { props: 'Order_BillID', label: '运单号' },
        { props: 'Order_Goods', label: '货物名称' },
        { props: 'Order_Num', label: '件数(件)' },
        { props: 'Order_Package', label: '包装' },
        { props: 'Order_Send', label: '始发站' },
        { props: 'Order_End', label: '目的站' },
        { props: 'Order_Consignor', label: '发货人' },
        { props: 'Order_ConTel', label: '发货人电话' },
        { props: 'Order_Receive', label: '收货人' },
        { props: 'Receive_LinkTel', label: '收货人电话' },
        { props: 'Order_Payment', label: '货款' },
        { props: 'Order_PaymentType', label: '货款方式' },
        { props: 'Order_Pay', label: '运费' },
        { props: 'Order_PayType', label: '运费方式' },
        { props: 'Order_PickType', label: '提货方式' },
        { props: 'Cost_Startcost', label: '始发中转费' },
        { props: 'Cost_Rebate', label: '回扣' },
        { props: 'Order_ReceiptCode', label: '回单号' },
        // { props: 'Transpor_Insurance', label: '保价' },
        // { props: 'Transpor_InsurancePay', label: '保价费' },
        { props: 'Order_Nowstate', label: '运单状态' },
        { props: 'Order_Memo', label: '备注' }
      ],
      // 中转
      Zhongzhuan: {
        data: [
          { props: 'Order_TransferNet', label: '中转同行', placeholder: '请输入中转同行', date: '', select: true, input: '', content: [] },
          { props: 'Order_PeerNet', label: '网点名称', placeholder: '请输入网点名称', date: '', select: '', input: true, content: [] },
          { props: 'Order_NetAdd', label: '网点地址', placeholder: '请输入网点地址', date: '', select: '', input: true, content: [] },
          { props: 'Order_NetTel', label: '网点电话', placeholder: '请输入网点电话', date: '', select: '', input: true, content: [] }
        ],
        model: {
          Order_TransferNet: '',
          Order_PeerNet: '',
          Order_NetAdd: '',
          Order_NetTel: ''
        }
      },
      Zhongzhuanrules: {
        Order_TransferNet: [
          { required: true, message: '请选择中转同行名称', trigger: 'change' }
        ],
        Order_NetTel: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请正确填写联系电话', trigger: 'blur' }
        ]
      },
      ZhongzhuanData: [],
      ZZdata: [],
      // 派送
      Waipai: {
        data: [
          { props: 'Order_Courier', label: '派送员', placeholder: '请输入派送员', date: '', select: '', input: true, content: [] },
          { props: 'Order_CourierID', label: '身份证号', placeholder: '请输入身份证号', date: '', select: '', input: true, content: [] },
          { props: 'Order_CourierTel', label: '联系电话', placeholder: '请输入联系电话', date: '', select: '', input: true, content: [] }
        ],
        model: {
          Order_Courier: '',
          Order_CourierID: '',
          Order_CourierTel: ''
        }
      },
      Waipairules: {
        Order_CourierTel: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[34578]\d{9}$/, message: '请正确填写手机号', trigger: 'change' }
        ]
      },
      WaipaiData: [],
      WPdata: [],
      // 自提
      Ziti: {
        data: [
          { props: 'Order_Consignee', label: '提货人', placeholder: '请输入提货人', date: '', select: '', input: true, content: [] },
          { props: 'Order_ConsigneeID', label: '提货人证件', placeholder: '请输入提货人证件', date: '', select: '', input: true, content: [] },
          { props: 'Order_ConsigneeTel', label: '联系电话', placeholder: '请输入联系电话', date: '', select: '', input: true, content: [] }
        ],
        model: {
          Order_Consignee: '',
          Order_ConsigneeID: '',
          Order_ConsigneeTel: ''
        }
      },
      JiesuanModel: {
        Piaoshu: '',
        ysyf: '',
        ssyf: '',
        yshk: '',
        sshk: '',
        yshj: '',
        sshj: ''
      },
      Zitirules: {
        Order_ConsigneeTel: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[34578]\d{9}$/, message: '请正确填写手机号', trigger: 'change' }
        ]
      },
      ZitiData: [],
      ZTdata: [],
      ZTmodel: [],
      ZTstate: '',
      options: [],
      tf: true,
      zitiTF: true,
      disable: false,
      searchData: [],
      SelectPrint: ''
    }
  },
  created () {
    // this.resultZZ()
    this.showData()
    this.firstshow()
  },
  methods: {
    async showData () {
      let StorageShowRes = await StorageShow({currentPage: this.currentPage, pageCount: this.pageCount, searchData: this.searchData})
      this.total = StorageShowRes.data.count
      this.tableData = StorageShowRes.data.info
      let StoragePeerShowRes = await StoragePeerShow()
      for (let fo in StoragePeerShowRes.data.info) {
        this.Zhongzhuan.data[0].content[fo] = {label: StoragePeerShowRes.data.info[fo].Peer_Name}
      }
      let sel = await PrintsShow()
      this.SelectPrint = sel.data.info.Print_XiaopiaoXuan
    },
    async firstshow () {
      let nin = await NetInfoNet()
      // console.log(nin)
      this.momo.data[2].content = []
      for (let ni in nin.data.info) {
        // this.momo.data[2].content[ni] = {label: nin.data.info[ni].Net_Name}
        this.momo.data[2].content.push({label: nin.data.info[ni].Net_Name})
        // console.log(1, this.momo.data[2].content[ni])
      }
    },
    onSubmit (model) {
      this.searchData = model
      this.showData()
    },
    // 复选框
    handleSelectionChange (val) {
      // console.log(val)
      // if (this.Zhongzhuan1()) {
      this.ZhongzhuanData = val
    // } else if (this.Waipai1()) {
      this.WaipaiData = val
    // } else if (this.Ziti1()) {
      this.ZitiData = val
      // }
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.showData()
    },
    // dialog 中转
    Zhongzhuan1 () {
      // this.$message('我是中转')
      if (this.ZhongzhuanData.length) {
        for (let a in this.ZhongzhuanData) {
          this.ZhongzhuanData[a].Cost_HasPayment = this.ZhongzhuanData[a].Order_Payment
        }
        this.dialogZhongzhuan = true
      } else {
        this.$message({
          showClose: true,
          message: '请选择中转条目',
          type: 'info'
        })
      }
    },
    async ZhongzhuanSubmit (model, index) {
      // console.log(this.$refs)
      this.$refs.inputSa.$refs['model'].validate(async (valid) => {
        if (valid) {
          for (let a in this.ZZdata) {
            if (this.ZZdata[a].Order_TransferID && this.ZZdata[a].Cost_HasPayment) {
              let data = {
                mozhu: this.ZZdata,
                Fromdata: model
              }
              let StorageTransitRes = await StorageTransit(data)
//              console.log(StorageTransitRes)
              if (StorageTransitRes.data.result === '1') {
                this.$message({
                  message: StorageTransitRes.data.info,
                  typpe: 'success'
                })
                this.dialogZhongzhuan = false
                this.showData()
                this.Zhongzhuan.model = {
                  Order_TransferNet: '',
                  Order_PeerNet: '',
                  Order_NetAdd: '',
                  Order_NetTel: ''
                }
                this.ZZdata[a].Order_TransferID = ''
              }
              break
            } else {
              // console.log(this.ZZdata)
              // if (this.)
              this.$message.error('中转单号或实收货款不能为空')
            }
          }
        } else {
          // console.log(this.ZZdata)
          this.$message.error('请将带*的必填项填写完整！')
          return false
        }
      })
    },
    // dialog 派送
    Waipai1 () {
      if (this.WaipaiData.length) {
        for (let a in this.WaipaiData) {
          this.WaipaiData[a].Cost_HasPayment = this.WaipaiData[a].Order_Payment
        }
        this.dialogWaipai = true
      } else {
        this.$message({
          showClose: true,
          message: '请选择外派条目',
          type: 'info'
        })
      }
    },
    async WaipaiSubmit (model, index) {
      this.$refs.inputSb.$refs['model'].validate(async (valid) => {
        if (valid) {
          for (let a in this.WPdata) {
            if (this.WPdata[a].Cost_HasPayment) {
              let data = {
                mozhu: this.WPdata,
                Fromdata: model
              }
              let StorageSendRes = await StorageSend(data)
              if (StorageSendRes.data.result === '1') {
                this.$message({
                  message: StorageSendRes.data.info,
                  type: 'success'
                })
                this.Waipai.model = {
                  Order_Courier: '',
                  Order_CourierID: '',
                  Order_CourierTel: ''
                }
                this.dialogWaipai = false
                this.showData()
              }
            } else {
              this.$message.error('实收货款不能为空')
            }
          }
        } else {
          // console.log(this.ZZdata)
          this.$message.error('请将带*的必填项填写完整！')
          return false
        }
      })
    },
    // dialog 自提
    Ziti1 () {
      this.zitiTF = true
      if (this.ZitiData.length) {
        for (let a in this.ZitiData) {
          this.ZitiData[a].Cost_HasPayment = this.ZitiData[a].Order_Payment
          // this.ZitiData[a].Cost_AccountPaid = this.ZitiData[a].Order_Pay
        }
        this.dialogZiti = true
      } else {
        this.$message({
          showClose: true,
          message: '请选择自提条目',
          type: 'info'
        })
      }
    },
    ZitiSubmit (model, index) {
      this.$refs.inputSc.$refs['model'].validate(async (valid) => {
        if (valid) {
          this.tf = true
          this.JiesuanModel.Piaoshu = ''
          this.JiesuanModel.ysyf = ''
          this.JiesuanModel.ssyf = ''
          this.JiesuanModel.yshk = ''
          this.JiesuanModel.sshk = ''
          this.JiesuanModel.yshj = ''
          this.JiesuanModel.sshj = ''
          for (let a in this.ZitiData) {
            if (!this.ZitiData[a].Cost_AccountPaid || !this.ZitiData[a].Cost_HasPayment) {
              this.$message.error('实收运费或实收货款不能为空')
              // this.ZitiDuata[a].Cost_AccountPaid = 0
              // this.ZitiData[a].Cost_HasPayment = 0
            } else {
              if (this.tf) {
                this.ZTmodel = model
                this.dialogZiti = false
                this.dialogZitiJiesuan = true
                this.JiesuanModel.Piaoshu = this.ZitiData.length
                for (let c in this.ZitiData) {
                  this.JiesuanModel.ysyf = Number(this.JiesuanModel.ysyf) + Number(this.ZitiData[c].Order_Pay)
                  this.JiesuanModel.ssyf = Number(this.JiesuanModel.ssyf) + Number(this.ZitiData[c].Cost_AccountPaid)
                  this.JiesuanModel.yshk = Number(this.JiesuanModel.yshk) + Number(this.ZitiData[c].Order_Payment)
                  this.JiesuanModel.sshk = Number(this.JiesuanModel.sshk) + Number(this.ZitiData[c].Cost_HasPayment)
                }
                this.JiesuanModel.yshj = this.JiesuanModel.ysyf + this.JiesuanModel.yshk
                this.JiesuanModel.sshj = this.JiesuanModel.ssyf + this.JiesuanModel.sshk
                this.tf = false
              }
            }
          }
        } else {
          // console.log(this.ZitiData)
          this.$message.error('请将带*的必填项填写完整！')
          return false
        }
      })
    },
    async Jiesuan () {
      let data = {
        mozhu: this.ZitiData,
        Fromdata: this.ZTmodel
      }
      let StorageSignRes = await StorageSign(data)
      if (StorageSignRes.data.result === '1') {
        this.$message({
          message: StorageSignRes.data.info,
          type: 'success'
        })
        this.Ziti.model = {
          Order_Consignee: '',
          Order_ConsigneeID: '',
          Order_ConsigneeTel: ''
        }
        let a = this.ZitiData
        let yz = this.printSYZ()
        if (yz) {
          for (let x in a) {
            asd(a[x].Logis, a[x].Order_BillID, a[x].Order_GoodsCode, a[x].Order_BaseTime, a[x].Order_Send, a[x].Logistic_STel, a[x].Order_End, a[x].Logistic_ETel, a[x].Order_Receive, a[x].Receive_LinkTel, a[x].Order_Goods, a[x].Order_Num, a[x].Order_Package, a[x].Order_Pay, a[x].Order_PayType, a[x].Order_Payment, a[x].Order_PaymentType, a[x].Cost_Give, a[x].Cost_Insured, a[x].heji, a[x].Order_Consignor, a[x].Order_ConTel, a[x].Advertisement_Content)
            LODOP.SET_PRINTER_INDEX(this.SelectPrint)
            LODOP.PRINT()
          }
        }
        this.dialogZitiJiesuan = false
        this.showData()
      }
    },
    // dialog关闭之后
    handleClose (done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        this.zitiTF = false
        this.ZhongzhuanData = []
        this.WaipaiData = []
        this.ZitiData = []
        this.showData()
        done()
      })
      .catch(_ => {})
    },
    // 中转方法
    Fanku (index, row) {
      this.ZZdata.splice(index, 1)
      if (this.ZZdata.length === 0) {
        // this.showData()
        this.dialogZhongzhuan = false
      }
      this.WPdata.splice(index, 1)
      if (this.WPdata.length === 0) {
        // this.showData()
        this.dialogWaipai = false
      }
      this.ZitiData.splice(index, 1)
      if (this.ZitiData.length === 0) {
        // this.showData()
        this.dialogZiti = false
      }
    },
    inputBlur (Event) {
      // if (Event.target.value === '') {
      //   this.$message.error('此项不能为空')
      // }
    },
    resultZZ (data) {
      this.ZZdata = data
    },
    resultWP (data) {
      this.WPdata = data
    },
    resultZT (data) {
      // this.ZTdata = data
    },
    printSYZ () {
      if ((LODOP == null) || (typeof (LODOP.VERSION) === 'undefined')) {
        this.judgeVisible = true
        return false
      } else {
        let zArr = []
        for (let i = 0; i <= LODOP.GET_PRINTER_COUNT(); i++) {
          this.$set(zArr, i, LODOP.GET_PRINTER_NAME(i))
        }
        let ZR = zArr.find((value, index, arr) => {
          return value === this.SelectPrint
        })
        if (!ZR) {
          this.$message({
            showClose: true,
            message: '打印机连接失败,请确认打印机是否正确连接',
            type: 'info',
            delay: 7000
          })
          return false
        } else {
          return true
        }
      }
    }
  }
}
</script>
<style>
.fhck .fhckbtn{width: 120px;height: 50px;font-size: 18px;margin-left: 30px;margin-top: 30px;}
.fhck .fhckbtn1{background: #f8b551;color: #fff}
.fhck .fhckbtn2{background: #8c96d9;color: #fff}
</style>

