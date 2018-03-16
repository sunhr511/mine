<template>
  <el-row type="flex" justify="center">
      <el-col :span="23">
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <inputS
            :rules="rules"
            :model="momo.model"
            :data="momo.data"
            :buttonGroup='buttonGroup'
            :width = "inputWidth"
            @here = "onSubmit"
            @i="doubleSubmit"></inputS>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <tableS
            :tableHeight="tableHeight" :tableSelectedTf="tableSelectedTf"
            :tableData="tableData" :tableColumnProps="tableColumnProps"
            :tableOperateBtnGrup="tableOperateBtnGrup"
            :tableOperateBtnWidth = "tableOperateBtnWidth"
            @handleSelectionChange="handleSelectionChange"
            @whiteFun="whiteFun" @dangerFun="dangerFun"></tableS>
          </el-col>
        </el-row>
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
      <el-dialog :visible.sync="dialogEdit" 
      title="运单信息编辑" :before-close="handleClose" size="full">
        <ydfhformTwo
          :saveName = "saveName"
          :saveLoading = "saveLoading"
          :all="all" :formInfo="formInfo"
          :rules="rulesa"  @submitForm="editForm"
          ></ydfhformTwo>
      </el-dialog>
      <el-dialog
      title="恢复状态"
      :visible.sync="dialogRec"
      size="tiny">
      <el-select v-model="Nowstate" placeholder="请选择状态">
        <el-option
          v-for="item in options"
          :key="item.label"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRec = false">取 消</el-button>
        <el-button type="primary" @click="okGo">确 定</el-button>
      </span>
    </el-dialog>

  </el-row>
</template>
<script>
import inputS from '../../components/inputS'
import tableS from '../../components/tableS'
import {MaintainShow, MaintainEdit, MaintainRecovery} from '../../api/kefuguanli/ydwh'
import ydfhformTwo from '../../components/yunyingguanli/ydfhformTwo'
import { ProgrammeDefaultShow } from '../../api/jichushezhi/feilvshezhi.js'
import { RecorderTel, NetInfoNet, DictionaryShow, ProgrammeShow, CominfoShow } from '../../api/yunyingguanli/shkd'
export default {
  components: {
    inputS,
    tableS,
    ydfhformTwo
  },
  data () {
    var v1 = (rule, value, callback) => {
      if (!this.formInfo.Cost_AccountPaid) {
        this.formInfo.Cost_AccountPaid = 0
      }
      if (parseInt(this.formInfo.Order_Pay)) {
        this.formInfo.Cost_Unpaid = parseInt(this.formInfo.Order_Pay) - parseInt(this.formInfo.Cost_AccountPaid)
      } else {
        this.formInfo.Cost_Unpaid = 0
      }
      if (this.$refs.formInfo) {
        this.$refs.formInfo.validateField('Cost_AccountPaid')
        this.$refs.formInfo.validateField('Cost_Unpaid')
      }
      callback()
    }
    var v2 = (rule, value, callback) => {
      if (parseInt(this.formInfo.Order_Pay)) {
        if (parseInt(this.formInfo.Cost_AccountPaid)) {
          this.formInfo.Cost_Unpaid = parseInt(this.formInfo.Order_Pay) - parseInt(this.formInfo.Cost_AccountPaid)
        } else {
          this.formInfo.Cost_Unpaid = parseInt(this.formInfo.Order_Pay) - 0
        }
      } else {
        if (parseInt(this.formInfo.Cost_AccountPaid) | parseInt(this.formInfo.Cost_Unpaid)) {
          callback(new Error('请输入全程费用'))
        }
      }
      if (parseInt(this.formInfo.Order_Pay) < parseInt(this.formInfo.Cost_AccountPaid)) {
        callback(new Error('已付运费必须小于全程费用' + this.formInfo.Order_Pay + '元'))
      } else {
        callback()
      }
    }
    var v3 = (rule, value, callback) => {
      if (parseInt(this.formInfo.Order_Pay)) {
        if (parseInt(this.formInfo.Cost_Unpaid)) {
          this.formInfo.Cost_AccountPaid = parseInt(this.formInfo.Order_Pay) - parseInt(this.formInfo.Cost_Unpaid)
        } else {
          this.formInfo.Cost_AccountPaid = parseInt(this.formInfo.Order_Pay) - 0
        }
      } else {
        if (parseInt(this.formInfo.Cost_AccountPaid) | parseInt(this.formInfo.Cost_Unpaid)) {
          callback(new Error('请输入全程费用'))
        }
      }
      if (parseInt(this.formInfo.Order_Pay) < parseInt(this.formInfo.Cost_Unpaid)) {
        callback(new Error('已付运费必须小于全程费用' + this.formInfo.Order_Pay + '元'))
      } else {
        callback()
      }
    }
    var v4 = (rule, value, callback) => {
      if (this.rateC) {
        switch (this.rateB) {
          case '四舍五入':
            if (this.formInfo['Order_Insured']) {
              this.formInfo.Order_InsuredValue = Math.round(this.rateC * this.formInfo.Order_Insured / 1000)
            } else {
              this.formInfo['Order_InsuredValue'] = 0
            }
            break
          case '小数进位':
            if (this.formInfo['Order_Insured']) {
              this.formInfo.Order_InsuredValue = Math.ceil(this.rateC * this.formInfo.Order_Insured / 1000)
            } else {
              this.formInfo['Order_InsuredValue'] = 0
            }
            break
          case '取整':
            if (this.formInfo['Order_Insured']) {
              this.formInfo.Order_InsuredValue = parseInt(this.rateC * this.formInfo.Order_Insured / 1000)
            } else {
              this.formInfo['Order_InsuredValue'] = 0
            }
            break
          case '保留两位小数':
            if (this.formInfo['Order_Insured']) {
              this.formInfo.Order_InsuredValue = (this.rateC * this.formInfo.Order_Insured / 1000).toFixed(2)
            } else {
              this.formInfo['Order_InsuredValue'] = 0
            }
            break
          default:
            if (this.formInfo['Order_Insured']) {
              this.formInfo.Order_InsuredValue = (this.rateC * this.formInfo.Order_Insured / 1000).toFixed(2)
            } else {
              this.formInfo['Order_InsuredValue'] = 0
            }
            break
        }
      }
      callback()
    }
    var v5 = (rule, value, callback) => {
      if (!parseInt(this.formInfo.Order_Insured)) {
        if (this.rateC) {
          switch (this.rateB) {
            case '四舍五入':
              if (this.formInfo['Order_InsuredValue']) {
                this.formInfo.Order_Insured = Math.round(this.formInfo.Order_InsuredValue * 1000 / this.rateC)
              } else {
                this.formInfo['Order_Insured'] = 0
              }
              break
            case '小数进位':
              if (this.formInfo['Order_InsuredValue']) {
                this.formInfo.Order_Insured = Math.ceil(this.formInfo.Order_InsuredValue * 1000 / this.rateC)
              } else {
                this.formInfo['Order_Insured'] = 0
              }
              break
            case '取整':
              if (this.formInfo['Order_InsuredValue']) {
                this.formInfo.Order_Insured = parseInt(this.formInfo.Order_InsuredValue * 1000 / this.rateC)
              } else {
                this.formInfo['Order_Insured'] = 0
              }
              break
            case '保留两位小数':
              if (this.formInfo['Order_InsuredValue']) {
                this.formInfo.Order_Insured = (this.formInfo.Order_InsuredValue * 1000 / this.rateC).toFixed(2)
              } else {
                this.formInfo['Order_Insured'] = 0
              }
              break
            default:
              if (this.formInfo['Order_InsuredValue']) {
                this.formInfo.Order_Insured = (this.formInfo.Order_InsuredValue * 1000 / this.rateC).toFixed(2)
              } else {
                this.formInfo['Order_Insured'] = 0
              }
              break
          }
        }
      }
      callback()
    }
    var v6 = async (rule, value, callback) => {
      let rt = await RecorderTel({phone: this.formInfo.Receive_LinkTel})
      if (rt.data.info) {
        this.formInfo.Receive_Contract = rt.data.info.Consignor_Contract
      }
      callback()
    }
    var v7 = async (rule, value, callback) => {
      let rt = await RecorderTel({phone: this.formInfo.Order_ConTel})
      if (rt.data.info) {
        this.formInfo.Order_ProName = rt.data.info.Consignor_Poundage ? rt.data.info.Consignor_Poundage : ''
        this.formInfo.Consignor_Contract = rt.data.info.Consignor_Contract ? rt.data.info.Consignor_Contract : ''
      } else {
        this.formInfo.Consignor_Contract = ''
        let response = await ProgrammeDefaultShow()
        for (let de in response.data.info) {
          if (response.data.info[de].Pro_Default === '1') {
            this.formInfo.Order_ProName = response.data.info[de].Pro_Name
          }
        }
      }
      callback()
    }
    return {
      saveLoading: false,
      saveName: '保存',
      rateC: '',
      momo: {
        data: [
          {props: 'Order_BillID', label: '运单号', placeholder: '请输入运单号', input: true}
        ],
        model: {
          'Order_BillID': ''
        }
      },
      inputWidth: '70px',
      rules: {},
      buttonGroup: [
        {name: '查询', tf: true, loading: false},
        {name: '全部恢复', tf: true},
        {name: '', tf: ''}
      ],
      tableData: [],
      tableHeight: 585,
      tableSelectedTf: true,
      tableColumnProps: [
        { props: 'Order_BaseTime', label: '开单日期' },
        { props: 'Order_BillID', label: '运单号' },
        { props: 'Order_Nowstate', label: '运单状态' },
        { props: 'Order_Send', label: '始发站' },
        { props: 'Order_End', label: '目的站' },
        { props: 'Order_Goods', label: '货物名称' },
        { props: 'Order_Num', label: '件数(件)' },
        { props: 'Order_Weight', label: '重量(T)' },
        { props: 'Order_Vol', label: '体积(m³)' },
        { props: 'Order_Spec', label: '规格' },
        { props: 'Order_Consignor', label: '发货人' },
        { props: 'Order_ConTel', label: '发货电话' },
        { props: 'Order_Receive', label: '收货人' },
        { props: 'Receive_LinkTel', label: '收货电话' },
        { props: 'Order_Pay', label: '运费' },
        { props: 'Order_Payment', label: '货款' }
      ],
      tableOperateBtnGrup: [
        {name: '编辑', tf: true},
        {name: '状态恢复', tf: true},
        {name: '编辑', tf: ''}
      ],
      tableOperateBtnWidth: 200,
      total: 0,
      currentPage: 1,
      pageCount: 10,
      searchData: [],
      dialogEdit: false,
      dialogRec: false,
      // 第一行
      all: {
        first: {
          data: [
            {prop: 'Order_Billnet', label: '开票网点', placeholder: '请输入开票网点', input: '', select: true, content: []},
            {prop: 'Order_End', label: '目的站', placeholder: '请输入目的站', input: '', select: true, content: []},
            {prop: 'Order_GoodsCode', label: '货号', placeholder: '请输入货号', input: true, select: '', content: []}
          ]
        },
        // 收货方
        third: {
          data: [
            {prop: 'Order_Receive', label: '姓名', placeholder: '请输入姓名', input: true, select: false, content: []},
            {prop: 'Receive_LinkTel', label: '电话', placeholder: '请输入电话', input: true, select: false, content: []},
            {prop: 'Receive_Address', label: '地址', placeholder: '请输入地址', input: true, select: false, content: []},
            {prop: 'Receive_Contract', label: '合同号', placeholder: '请输入合同号', input: true, select: false, content: []}
          ]
        },
        // 发货方
        fourth: {
          data: [
            {prop: 'Order_Consignor', label: '姓名', placeholder: '请输入姓名', input: true, select: false, content: []},
            {prop: 'Order_ConTel', label: '电话', placeholder: '请输入电话', input: true, select: false, content: []},
            {prop: 'Consignor_Address', label: '地址', placeholder: '请输入地址', input: true, select: false, content: []},
            {prop: 'Consignor_Contract', label: '合同号', placeholder: '请输入合同号', input: true, select: false, content: []}
          ]
        },
        // 货物信息
        fifth: {
          data: [
            {prop: 'Order_Goods', label: '货物名称', placeholder: '请输入货物名称', input: true, select: false, content: []},
            {prop: 'Order_Num', label: '件数', placeholder: '请输入件数', input: true, select: false, content: []},
            {prop: 'Order_Package', label: '包装', placeholder: '请选择包装', input: false, select: true, content: []},
            {prop: 'Order_Weight', label: '重量(T)', placeholder: '请输入重量', input: true, select: false, content: []},
            {prop: 'Order_Vol', label: '体积(m³)', placeholder: '请输入体积', input: true, select: false, content: []},
            {prop: 'Order_Spec', label: '规格', placeholder: '请输入规格', input: true, select: false, content: []},
            {prop: 'Goods_Price', label: '单价(元)', placeholder: '请输入单价', input: true, select: false, content: []}
          ]
        },
        // 费用结算
        sixth: {
          data: [
            {prop: 'Order_Pay', label: '全程费用(元)', placeholder: '请输入全程费用', input: true, select: false, content: []},
            {prop: 'Order_PayType', label: '运费方式', placeholder: '请选择运费方式', input: false, select: true, content: []},
            {prop: 'Cost_AccountPaid', label: '已付运费(元)', placeholder: '请输入已付运费', input: true, select: false, content: []},
            {prop: 'Cost_Unpaid', label: '未付运费(元)', placeholder: '请选择未付运费', input: true, select: false, content: []},
            {prop: 'Order_Payment', label: '代收货款(元)', placeholder: '请输入代收货款', input: true, select: false, content: []},
            {prop: 'Order_PaymentType', label: '代收货款方式', placeholder: '请选择代收货款方式', input: false, select: true, content: []},
            {prop: 'Order_PickType', label: '提货方式', placeholder: '请选择提货方式', input: false, select: true, content: [{label: '送货'}, {label: '自提'}]},
            {prop: 'Order_ProName', label: '手续费方案', placeholder: '请选择手续费方案', input: false, select: true, content: []}
          ]
        },
        seventh: {
          data: [
            {prop: 'Order_ReceiptCode', label: '回单号', placeholder: '请输入回单号', input: false, select: false, content: [], radios: true},
            {prop: 'Order_Insured', label: '保价(元)', placeholder: '请输入保价', input: true, select: false, content: []},
            {prop: 'Order_InsuredValue', label: '保价费(元)', placeholder: '请输入保价费', input: true, select: false, content: []},
            {prop: 'Order_Memo', label: '备注', placeholder: '请选择', input: true, select: '', content: []}
          ]
        },
        eighth: {
          data: [
            {prop: 'Cost_Rebate', label: '回扣', placeholder: '回扣', input: true, select: false, content: []},
            {prop: 'Cost_Startcost', label: '始发中转费', placeholder: '始发中转费', input: true, select: false, content: []},
            {prop: 'Cost_Endcost', label: '下站中转费', placeholder: '下站中转费', input: true, select: false, content: []},
            {prop: 'Cost_Delivery', label: '接货费', placeholder: '接货费', input: true, select: false, content: []},
            {prop: 'Cost_Give', label: '送货费', placeholder: '送货费', input: true, select: false, content: []},
            {prop: 'Cost_Loading', label: '装车费', placeholder: '装车费', input: true, select: false, content: []},
            {prop: 'Cost_Unload', label: '卸车费', placeholder: '卸车费', input: true, select: false, content: []},
            {prop: 'Cost_Forklift', label: '叉车费', placeholder: '叉车费', input: true, select: false, content: []},
            {prop: 'Cost_Packing', label: '包装费', placeholder: '包装费', input: true, select: false, content: []},
            {prop: 'Cost_Message', label: '信息费', placeholder: '信息费', input: true, select: false, content: []},
            {prop: 'Cost_Billing', label: '开票费', placeholder: '开票费', input: true, select: false, content: []}
          ]
        }
      },
      formInfo: {
        Order_Billnet: '',
        Order_End: '',
        Order_GoodsCode: '',
        Order_Receive: '',
        Receive_LinkTel: '',
        Receive_Address: '',
        Receive_Contract: '',
        Order_Consignor: '',
        Order_ConTel: '',
        Consignor_Address: '',
        Consignor_Contract: '',
        Order_Goods: '',
        Order_Num: '',
        Order_Package: '',
        Order_Weight: '',
        Order_Vol: '',
        Order_Spec: '',
        Goods_Price: '',
        Order_Pay: '',
        Cost_AccountPaid: '',
        Cost_Unpaid: '',
        Order_Payment: '',
        Order_PaymentType: '',
        Order_ProName: '',
        Order_PickType: '',
        Order_ReceiptCode: '',
        Order_Memo: '',
        Order_PayType: '',
        Order_Insured: '',
        Order_InsuredValue: '',
        Cost_Rebate: '',
        Cost_Startcost: '',
        Cost_Endcost: '',
        Cost_Delivery: '',
        Cost_Give: '',
        Cost_Unload: '',
        Cost_Forklift: '',
        Cost_Packing: '',
        Cost_Message: '',
        Cost_Billing: ''
      },
      rulesa: {
        Order_Insured: [
          {pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字'},
          { validator: v4, trigger: 'blur' }
        ],
        Order_InsuredValue: [
          {pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字'},
          { validator: v5, trigger: 'blur' }
        ],
        Order_Billnet: [
          { required: true, message: '请选择开票网点', trigger: 'change' }
        ],
        Order_End: [
          { required: true, message: '请选择目的站', trigger: 'change' }
        ],
        Order_Receive: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        Receive_LinkTel: [
          { required: true, message: '请输入电话', trigger: 'change' },
          { pattern: /^1[34578]\d{9}$/, message: '手机号码格式错误' },
          { validator: v6, trigger: 'blur' }
        ],
        Receive_Address: [
          { required: true, message: '请输入地址', trigger: 'change' }
        ],
        Order_Consignor: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        Order_ConTel: [
          { required: true, message: '请输入电话', trigger: 'change' },
          { pattern: /^1[34578]\d{9}$/, message: '手机号码格式错误' },
          { validator: v7, trigger: 'blur' }
        ],
        Consignor_Address: [
          { required: true, message: '请输入地址', trigger: 'change' }
        ],
        Order_Goods: [
          { required: true, message: '请输入货物名称', trigger: 'change' }
        ],
        Order_Num: [
          { required: true, message: '请输入件数', trigger: 'change' }
        ],
        Order_Vol: [
          {pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字'}
        ],
        Order_Weight: [
          {pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字'}
        ],
        Goods_Price: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Order_Pay: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' },
          { validator: v1, trigger: 'change' }
        ],
        Cost_AccountPaid: [
          { pattern: /^\d+$/, message: '请输入数字' },
          { validator: v2, trigger: 'change' }
        ],
        Cost_Unpaid: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' },
          { validator: v3, trigger: 'change' }
        ],
        Order_Payment: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Rebate: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Startcost: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Endcost: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Delivery: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Give: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Loading: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Unload: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Forklift: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Packing: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Message: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Billing: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ]
      },
      multipleSelection: [],
      Guid: [],
      Nowstate: '',
      options: []
    }
  },
  created () {
    this.showData()
    this.firstShow()
  },
  methods: {
    async showData () {
      let show = await MaintainShow({currentPage: this.currentPage, pageCount: this.pageCount, searchData: this.searchData})
      this.total = show.data.count
      if (show.data.info) {
        this.tableData = show.data.info
      } else {
        this.tableData = []
      }
    },
    async firstShow () {
      let cs = await CominfoShow()
      this.rateC = cs.data.info.Logistic_Rate
      let nin = await NetInfoNet()
      for (let ni in nin.data.info) {
        this.all.first.data[0].content[ni] = {label: nin.data.info[ni].Net_Name}
        this.all.first.data[1].content[ni] = {label: nin.data.info[ni].Net_Name}
      }
      let ds = await DictionaryShow({Dic_Remarks: '包装'})
      for (let i in ds.data.info) {
        this.all.fifth.data[2].content[i] = { label: ds.data.info[i].Dic_Title }
      }
      let hkfs = await DictionaryShow({Dic_Remarks: '货款方式'})
      for (let j in hkfs.data.info) {
        this.all.sixth.data[5].content[j] = { label: hkfs.data.info[j].Dic_Title }
      }
      let yffs = await DictionaryShow({Dic_Remarks: '运费方式'})
      for (let z in yffs.data.info) {
        this.all.sixth.data[1].content[z] = { label: yffs.data.info[z].Dic_Title }
      }
      let state = await DictionaryShow({Dic_Remarks: '状态'})
      this.options = []
      for (let z in state.data.info) {
        this.options.push({ label: state.data.info[z].Dic_Title })
      }
      let pgs = await ProgrammeShow()
      for (let v in pgs.data.info) {
        this.all.sixth.data[7].content[v] = { label: pgs.data.info[v].Pro_Name }
      }
    },
    async Rec () {
      let data = {
        Guid: this.Guid,
        Order_Nowstate: this.Nowstate
      }
      let Recovery = await MaintainRecovery(data)
      if (Recovery.data.result === '1') {
        this.$message({
          showClose: true,
          message: Recovery.data.info,
          type: 'success'
        })
        this.showData()
        this.dialogRec = false
      }
    },
    async onSubmit (model) {
      this.buttonGroup[0].loading = true
      this.searchData = model
      await this.showData()
      this.buttonGroup[0].loading = false
    },
    handleSelectionChange (val) {
      this.Guid = []
      this.multipleSelection = val
      for (let a in this.multipleSelection) {
        this.Guid[a] = this.multipleSelection[a].Order_Guid
      }
    },
    whiteFun (index, row) {
      Object.assign(this.formInfo, row)
      this.dialogEdit = true
    },
    async editForm (model, all) {
      this.saveLoading = true
      let oa = await MaintainEdit(model)
      if (oa.data.result === '1') {
        await this.showData()
        this.$message({
          showClose: true,
          message: oa.data.info,
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: '失败',
          type: 'info'
        })
      }
      this.saveLoading = false
      this.dialogEdit = false
    },
    async dangerFun (index, row) {
      this.Guid = []
      this.Guid[0] = row.Order_Guid
      this.Nowstate = ''
      this.dialogRec = true
    },
    doubleSubmit () {
      if (this.multipleSelection.length) {
        this.Nowstate = ''
        this.dialogRec = true
      } else {
        this.$message({
          showClose: true,
          message: '清选择恢复条目',
          type: 'info'
        })
      }
    },
    okGo () {
      this.Rec()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.showData()
    },
    handleClose (done) {
      this.$confirm('您还没有保存是否关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style scoped>

</style>
