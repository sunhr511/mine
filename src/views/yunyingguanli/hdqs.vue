<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <el-row type="flex">
          <el-col :span="24">
            <!--表单查询组件  -->
            <el-row type="flex">
              <el-col :span="24">
                 <inputS
                  ref="inputS"
                  :rules="rules"
                  :model="momo.model"
                  :data="momo.data"
                  :buttonGroup='buttonGroup'
                  :width = "inputWidth"
                  @here = "onSubmit"
                  @i = "doubleSubmit"
                  @go = "onSubmit"></inputS>
              </el-col>
            </el-row>
            <!--表格信息展示组件  -->
            <el-row type="flex">
              <el-col :span="24">
                <tableShowBtn
                  :height="600"
                  :tableData="tableData"
                  :columnProps="columnProps"
                  :btnTitle="btnTitle"
                  @handleSelectionChange="handleSelectionChange"
                  @handleBtn="handleBtn"></tableShowBtn>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {ReceiptSignShow, ReceiptSignAdd} from '../../api/yunyingguanli/hdqs'
import tableShowBtn from '../../components/yunyingguanli/tableShowBtn'
import inputS from '../../components/inputS'
import store from '../../store/store.js'
export default {
  components: {
    tableShowBtn,
    inputS
  },
  data () {
    return {
      // 表单开始
      title: '查询',
      doubletitle: '全部签收',
      momo: {
        data: [
          { props: 'Order_BillID', label: '运单号', placeholder: '请输入运单号', date: '', select: '', input: true, content: [] }
        ],
        model: {
          Order_BillID: ''
        }
      },
      rules: {},
      // 表单结束
      // 表格开始
      btnTitle: '签收',
      tableData: [],
      tableData1: [{
        Order_BillID: '2016-05-02',
        Order_Goods: '王小虎',
        Order_Num: '上海市普陀区金沙江路 1518 弄'
      }, {
        Order_BillID: '2016-05-02',
        Order_Goods: '王小虎',
        Order_Num: '上海市普陀区金沙江路 1518 弄'
      }],
      columnProps: [
        { props: 'Order_BillID', label: '运单号' },
        { props: 'Receipt_Code', label: '回单号' },
        { props: 'Order_Goods', label: '货物名称' },
        { props: 'Order_Num', label: '件数(件)' },
        { props: 'Order_Package', label: '包装' },
        { props: 'Order_Send', label: '始发站' },
        { props: 'Order_End', label: '目的站' },
        { props: 'Order_StorageType', label: '出库方式' },
        { props: 'Order_Consignor', label: '发货人' },
        { props: 'Order_ConTel', label: '发货人电话' },
        { props: 'Order_Receive', label: '收货人' },
        { props: 'Receive_LinkTel', label: '收货人电话' },
        { props: 'Order_Payment', label: '货款' },
        { props: 'Order_PaymentType', label: '货款方式' },
        { props: 'Order_Pay', label: '运费' },
        { props: 'Order_PayType', label: '运费方式' },
        { props: 'Order_PickType', label: '提货方式' },
        // { props: 'huikou', label: '回扣' },
        { props: 'Order_Nowstate', label: '运单状态' },
        { props: 'Order_Memo', label: '备注' }
      ],
      Order_BillID: [],
      BillID: [],
      inputWidth: '70px',
      buttonGroup: [
        {name: '查询', tf: true, loading: false},
        {name: '全部签收', tf: 'true'},
        {name: '', tf: ''}
      ],
      searchData: []
    }
  },
  computed: {
    Datasa () {
      return store.state.Datasa
    }
  },
  created () {
    this.showData()
  },
  methods: {
    // 接口展示
    async showData () {
      let ReceiptSignShowRes = await ReceiptSignShow({searchData: this.searchData})
      // console.log(123123, ReceiptSignShowRes)
      this.tableData = ReceiptSignShowRes.data.info
    },
    // 签收接口
    async Qianshou () {
      let ReceiptSignAddRes = await ReceiptSignAdd(this.BillID)
      if (ReceiptSignAddRes.data.result === '1') {
        this.$message({
          message: ReceiptSignAddRes.data.info,
          type: 'success'
        })
        this.showData()
        store.state.Datasa = 2
      } else if (ReceiptSignAddRes.data.result === '0') {
        this.$message({
          message: ReceiptSignAddRes.data.info,
          type: 'error'
        })
      }
    },
    // 表单开始
    async onSubmit (model) {
      this.buttonGroup[0].loading = true
      this.searchData = model
      await this.showData()
      this.buttonGroup[0].loading = false
    },
    doubleSubmit () {
      this.Qianshou()
      this.showData()
    },
    // 表单结束
    // 表格开始
    handleSelectionChange (val) {
      this.BillID = []
      for (let a in val) {
        this.BillID.push(val[a].Order_BillID)
      }
    },
    handleBtn (index, row) {
      this.BillId = []
      this.BillID.push(row.Order_BillID)
      this.Qianshou()
      this.showData()
    }
  }
}
</script>
