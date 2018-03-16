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
        <el-row type="flex" justify="center" v-if="showKuang == 1">
          <el-col :span="24">
            <el-table
              :data="tableData"
              height="625"
              style="width: 100%">
              <el-table-column
                prop="Record_Rotime"
                align="center"
                label="日期"
                width="300">
              </el-table-column>
              <el-table-column
                prop="Record_Curstatus"
                align="center"
                label="站点"
                width="180">
              </el-table-column>
              <el-table-column
                prop="Record_Content"
                align="center"
                label="内容">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" v-if="showKuang == 2" style="height:600px;overflow-y:scroll">
          <el-col :span="24">
            <kefufrom
              :all="all" :rules="rules2" :formInfo="formInfo"
              :billing="billing" :aaa="YDstate"></kefufrom>
          </el-col>
        </el-row>
      </el-col>
  </el-row>
</template>
<script>
import inputS from '../../components/inputS'
import kefufrom from '../../components/kefuguanli/kefuaa.vue'
import {ContrailShow, ContrailOrderInfo} from '../../api/kefuguanli/ydgj.js'
export default {
  components: {
    inputS,
    kefufrom
  },
  data () {
    return {
      showKuang: 1,
      momo: {
        data: [
          {props: 'Order_BillID', label: '运单号', placeholder: '请输入运单号', input: true}
        ],
        model: {
          'Order_BillID': ''
        }
      },
      inputWidth: '70px',
      rules: {
        Order_BillID: [
          { required: true, message: '请输入运单号', trigger: 'blur' }
        ]
      },
      rules2: {},
      buttonGroup: [
        {name: '运单轨迹', tf: true, loading: false},
        {name: '运单信息', tf: true},
        {name: '', tf: ''}
      ],
      tableData: [],
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
      billing: [
        {name: '待放款'},
        {name: '待结算'},
        {name: '待审核'},
        {name: '待提货'},
        {name: '待装车'},
        {name: '已放款'},
        {name: '已结算'},
        {name: '已开单'},
        {name: '已审核'},
        {name: '已提货'},
        {name: '已完成'},
        {name: '已装车'},
        {name: '在途'}
      ],
      formData: {},
      YDstate: '已开单'
    }
  },
  methods: {
    async onSubmit (model) {
      if (this.momo.model.Order_BillID === '') {
        this.$message({
          showClose: true,
          message: '请输入运单号',
          type: 'error'
        })
      } else {
        let gj = await ContrailShow(model)
        if (gj.data.result === '1') {
          this.$message({
            showClose: true,
            message: '查询成功',
            type: 'success'
          })
          this.tableData = gj.data.info
          this.showKuang = 1
        } else if (gj.data.result === '0') {
          this.$message({
            showClose: true,
            message: gj.data.info,
            type: 'error'
          })
        }
      }
    },
    async doubleSubmit (model) {
      if (this.momo.model.Order_BillID === '') {
        this.$message({
          showClose: true,
          message: '请输入运单号',
          type: 'error'
        })
      } else {
        let xx = await ContrailOrderInfo(model)
        if (xx.data.result === '1') {
          this.$message({
            showClose: true,
            message: '查询成功',
            type: 'success'
          })
          this.formInfo = xx.data.info[0]
          this.YDstate = this.formInfo.Order_Nowstate
          this.showKuang = 2
        } else if (xx.data.result === '0') {
          this.$message({
            showClose: true,
            message: xx.data.info,
            type: 'error'
          })
        }
      }
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

