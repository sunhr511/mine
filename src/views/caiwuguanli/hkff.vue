<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <inputS
          ref="inputS"
          :rules="rules"
          :model="mose.model"
          :data="mose.data"
          :buttonGroup='buttonGroup'
          :width = "inputWidth"
          @here = "here"
          @i = "i"
          @go = "go"></inputS>
        <el-row class="Ghead" type="flex" justify="space-between">
          <el-col :span="2">&nbsp;&nbsp;货款发放</el-col>
          <el-col :span="6">
            <el-radio-group v-model="radio" @change="radioIndex">
              <el-radio :label="0">显示全部</el-radio>
              <el-radio :label="1">仅显示合同客户</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <br>
        <tableShowBtn
          :height = "520"
          :tableData="tableData" :columnProps="columnProps"
          :btnTitle="btnTitle" @handleSelectionChange="handleSelectionChange"
          @handleBtn="handleBtn"></tableShowBtn>
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
      <el-dialog :visible.sync="dialogVisible" size="large">
        <tableComputed
          :tableData="tableComputedData"
          :columnPropsComputed="columnPropsComputed"></tableComputed>
          <br>
        <el-row type="flex" justify="center">
          <el-col :span="6" style="text-align:center">
            <el-button
              type="warning"
              size="large" @click="loan(0)">现金</el-button>
            <el-button
              size="large" @click="loan(1)">转账</el-button>
          </el-col>
        </el-row>
      </el-dialog>
  </div>
</template>
<script>
import inputS from '../../components/inputS'
import tableShowBtn from '../../components/caiwuguanli/tableShowBtn'
import tableComputed from '../../components/caiwuguanli/tableComputed'

import {PaymentShow, PaymentContractShow, PaymentCashloan, PaymentLoan} from '../../api/caiwuguanli/hkff'
export default {
  components: {
    inputS,
    tableShowBtn,
    tableComputed
  },
  data () {
    return {
      mose: {
        data: [
          {props: 'Order_Consignor', label: '发货人', placeholder: '请输入发货人', input: true, content: [{ value: 'fuck' }], guest: false},
          {props: 'Order_ConTel', label: '发货电话', placeholder: '请输入发货电话', input: true, content: [], guest: false},
          {props: 'Order_BillID', label: '运单号', placeholder: '请输入运单号', input: true, content: [], guest: false}
        ],
        model: {
          Order_Consignor: '',
          Order_ConTel: '',
          Order_BillID: ''
        }
      },
      buttonGroup: [
        {name: '查询', tf: true, loading: false},
        {name: '放款', tf: true},
        {name: '', tf: ''}
      ],
      inputWidth: '80px',
      rules: {},
      radio: 0,
      tableData: [],
      columnProps: [
        { props: 'Order_BillID', label: '运单号' },
        { props: 'Order_End', label: '目的站' },
        { props: 'Order_Goods', label: '货物名称' },
        { props: 'Order_Num', label: '件数(件)' },
        { props: 'Order_Consignor', label: '发货人' },
        { props: 'Order_ConTel', label: '发货人电话' },
        { props: 'Order_Receive', label: '收货人' },
        { props: 'Receive_LinkTel', label: '收货人电话' },
        { props: 'Order_Payment', label: '货款' },
        { props: 'Order_PaymentType', label: '货款方式' },
        { props: 'Order_ReleaseTime', label: '提货时间' },
        { props: 'Order_SettlementTime', label: '结算时间' },
        { props: 'Order_BaseTime', label: '制单时间' }
      ],
      btnTitle: '放款',
      multipleTable: [],
      total: 0,
      currentPage: 1,
      pageCount: 10,
      dialogVisible: false,
      tableComputedData: [],
      columnPropsComputed: [
        { props: 'Order_Consignor', label: '取款人姓名' },
        { props: 'Consignor_Account', label: '取款人账号' },
        { props: 'Order_BillID', label: '运单号' },
        { props: 'Order_Payment', label: '应收货款(元)' },
        { props: 'Cost_HasPayment', label: '实收货款(元)' },
        { props: 'Order_Pay', label: '运费(元)' },
        { props: 'Order_PayType', label: '运费方式' },
        { props: 'programme', label: '手续费合计(元)' },
        { props: 'Cost_Truemoney', label: '实放金额(元)' }

      ]
    }
  },
  created () {
    this.show()
  },
  methods: {
    async show () {
      let ps = await PaymentShow({currentPage: this.currentPage, pageCount: this.pageCount, searchData: this.mose.model})
      this.tableData = ps.data.info
      this.total = ps.data.count
    },
    async contractShow () {
      let pcs = await PaymentContractShow({currentPage: this.currentPage, pageCount: this.pageCount, searchData: this.mose.model})
      this.tableData = pcs.data.info
      this.total = pcs.data.count
    },
    async here (model) {
      this.buttonGroup[0].loading = true
      await this.RShow()
      this.buttonGroup[0].loading = false
    },
    i (model) {
      let zObj = {}
      let oArr = []
      for (let c in this.multipleTable) {
        if (!zObj[this.multipleTable[c].Order_ConTel]) {
          zObj[this.multipleTable[c].Order_ConTel] = c
        }
      }
      for (let oo in zObj) {
        oArr.push(oo)
      }
      if (oArr.length > 1) {
        this.$confirm('放款对象为多个, 是否继续放款?', '操作提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableComputedData = []
          this.tableComputedData = this.multipleTable
          this.dialogVisible = true
        }).catch(() => {
          this.$message({
            showClose: true,
            type: 'info',
            message: '已取消放款'
          })
        })
      } else if (oArr.length === 1) {
        this.tableComputedData = []
        this.tableComputedData = this.multipleTable
        this.dialogVisible = true
      } else {
        this.$message({
          showClose: true,
          message: '请选择要放款条目',
          type: 'info'
        })
      }
    },
    go (model) {},
    radioIndex (Num) {
      this.currentPage = 1
      this.RShow()
    },
    handleSelectionChange (val) {
      this.multipleTable = val
    },
    handleBtn (index, row) {
      this.tableComputedData = []
      this.tableComputedData[0] = row
      this.dialogVisible = true
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.RShow()
    },
    async RShow () {
      if (this.radio) {
        await this.contractShow()
      } else {
        await this.show()
      }
      // this.$message({
      //   showClose: true,
      //   type: 'success',
      //   message: '显示成功'
      // })
    },
    async loan (num) {
      // let uoArr = []
      // for (let uo in this.tableComputedData) {
      //   uoArr[uo] = {'Order_Guid': this.tableComputedData[uo].Order_Guid}
      // }
      if (!num) {
        // Payment/cashloan
        let pcl = await PaymentCashloan(this.tableComputedData)
        if (pcl.data.result === '1') {
          this.dialogVisible = false
          this.$message({
            showClose: true,
            type: 'success',
            message: pcl.data.info
          })
        } else {
          this.$message({
            showClose: true,
            type: 'info',
            message: '失败'
          })
        }
      } else {
        // Payment/loan
        let pl = await PaymentLoan(this.tableComputedData)
        if (pl.data.result === '1') {
          this.dialogVisible = false
          this.$message({
            showClose: true,
            type: 'success',
            message: pl.data.info
          })
        } else {
          this.$message({
            showClose: true,
            type: 'info',
            message: '失败'
          })
        }
      }
      this.RShow()
    }
  }
}
</script>
<style >
  .huokuanInfo {
    background:#d0d5f5;
    height: 36px;
    line-height: 36px;
    border-radius: 5px;
  }
.Ghead {
    background:  #8c96d9;
    height: 40px;
    line-height: 40px;
     color: white
  }
</style>
