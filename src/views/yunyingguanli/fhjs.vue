<template>
  <div>
   <el-row type="flex" justify="center">
     <el-col :span="23">
        <inputSearch
          :rLoading="rLoading"
          :title = "title"
          :rules="rules"
          :model="mozhu.model"
          :data="mozhu.data"
          @onSubmit="onSubmit"></inputSearch>

        <tableOperateTF
        :height="520"
          @handleBack = "handleBack"
          @handleSelectionChange = "handleSelectionChange"
          :operateBtn = "operateBtn"
          :tableData = "tableData"
          :columnTF = "column.columnTF"
          :selectedTF = "column.selectedTF"
          :operateTF = "column.operateTF"
          :columnProps = "column.columnProps"></tableOperateTF>
          <br>
          <el-pagination
            style="text-align:center"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageCount"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
          <br>
          <el-row type="flex" justify="end">
            <el-col :span="5">
            <el-popover
              ref="popo"
              placement="top-end"
              title="自定义设置"
              width="450"
              v-model="visible"
              trigger="click">
              <br>&nbsp; &nbsp;
            <el-checkbox
              v-model="column.columnTF[item.props]"  v-for="(item, index) in column.columnProps"
              :key="index" style="height:30px">
              &nbsp;{{item.label}}
            </el-checkbox>
            <br>
              <div style="text-align: right; margin: 0">
                <el-button type="primary" size="mini" @click="custom">确定</el-button>
              </div>
          </el-popover>
              <el-button size="large" type="warning" @click="balance">结算</el-button>
              <el-button size="large" v-popover:popo >自定义设置</el-button>
            </el-col>
          </el-row>
     </el-col>
   </el-row>
   <el-dialog  title="放货结算" :visible.sync="dialogJiesuan" size="tiny" :before-close="handleClose">
      <el-form :model="JiesuanModel" label-position="right" label-width="120px">
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
  </div>
</template>
<script>
import inputSearch from '../../components/yunyingguanli/inputSearch.vue'
import tableOperateTF from '../../components/yunyingguanli/tableOperateTF.vue'
import {SettlementShow, SettlementCustom, SettlementCusadd, SettlementEdit, SettlementJiesuan} from '../../api/yunyingguanli/fhjs'
export default {
  components: {
    inputSearch,
    tableOperateTF
  },
  data () {
    return {
      rLoading: false,
      operateBtn: '返库',
      title: '查 询',
      rules: {},
      mozhu: {
        data: [
          { props: 'Order_BillID', label: '运单号', placeholder: '请输入运单号', date: '', select: '', input: true, content: [] },
          { props: 'Order_StorageType', label: '出库方式', placeholder: '请选择出库方式', date: '', select: true, input: '', content: [{label: '中转'}, {label: '外派'}, {label: '自提'}] },
          { props: 'Order_Receive', label: '收货人', placeholder: '请输入收货人', date: '', select: '', input: true, content: [] },
          { props: 'Order_LinkTel', label: '收货人手机号', placeholder: '请输入收货人手机号', date: '', select: '', input: true, content: [] }
        ],
        model: {
          Order_BillID: '',
          Order_StorageType: '',
          Order_Receive: '',
          Order_LinkTel: ''
        }
      },
      column: {
        columnProps: [
          { props: 'Order_BillID', label: '运单号' },
          { props: 'Order_TransferID', label: '中转单号' },
          { props: 'Order_Goods', label: '货物名称' },
          { props: 'Order_Num', label: '件数(件)' },
          { props: 'Order_Send', label: '始发站' },
          { props: 'Order_End', label: '目的站' },
          { props: 'Order_Consignor', label: '发货人' },
          { props: 'Order_ConTel', label: '发货电话' },
          { props: 'Order_Receive', label: '收货人' },
          { props: 'Receive_LinkTel', label: '收货电话' },
          { props: 'Order_Payment', label: '货款' },
          { props: 'Order_Pay', label: '运费' },
          { props: 'Order_PayType', label: '运费方式' },
          { props: 'Cost_Startcost', label: '始发中转费' },
          { props: 'Cost_Rebate', label: '回扣' },
          { props: 'Order_ReceiptCode', label: '回单' },
          { props: 'Order_Nowstate', label: '运单状态' }
        ],
        columnTF: {
          'Order_BillID': true,
          'Order_TransferID': true,
          'Order_Goods': true,
          'Order_Num': true,
          'Order_Send': true,
          'Order_End': true,
          'Order_Consignor': true,
          'Order_ConTel': true,
          'Order_Receive': true,
          'Receive_LinkTel': true,
          'Order_Payment': true,
          'Order_Pay': true,
          'Order_PayType': true,
          'Cost_Startcost': true,
          'Cost_Rebate': true,
          'Order_ReceiptCode': true,
          'Order_Nowstate': true
        },
        selectedTF: true,
        operateTF: true
      },
      tableData: [],
      multipleSelection: [],
      total: 0,
      currentPage: 1,
      pageCount: 10,
      visible: false,
      JiesuanModel: {
        Piaoshu: '',
        ysyf: '',
        ssyf: '',
        yshk: '',
        sshk: '',
        yshj: '',
        sshj: ''
      },
      dialogJiesuan: false,
      Guid: []
    }
  },
  created () {
    this.showData()
  },
  methods: {
    async showData () {
      let res = await SettlementShow({currentPage: this.currentPage, pageCount: this.pageCount, searchData: this.mozhu.model})
      this.tableData = res.data.info
      this.total = res.data.count
      let customData = await SettlementCustom({Cus_Type: 'fhjs'})
      if (!customData.data.info.Cus_Name) {
        for (let ctf in this.column.columnTF) {
          this.column.columnTF[ctf] = true
        }
      } else {
        for (let ctf in this.column.columnTF) {
          this.column.columnTF[ctf] = false
        }
        for (let cdi in customData.data.info.Cus_Name) {
          this.column.columnTF[customData.data.info.Cus_Name[cdi]] = true
        }
      }
    },
    async JieSuan () {
      let js = await SettlementJiesuan(this.Guid)
      if (js.data.result === '1') {
        this.$message({
          showClose: true,
          message: js.data.info,
          type: 'success'
        })
        this.showData()
      }
    },
    async onSubmit (model) {
      this.rLoading = true
      await this.showData()
      this.rLoading = false
    },
    async handleBack (index, row) {
      let se = await SettlementEdit({Order_Guid: row.Order_Guid})
      if (se.data.result === '1') {
        this.$message({
          showClose: true,
          message: se.data.info,
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: '返库失败',
          type: 'info'
        })
      }
      this.showData()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.Guid = []
      for (let a in this.multipleSelection) {
        this.Guid.push(this.multipleSelection[a].Order_Guid)
      }
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.showData()
    },
    balance () {
      if (this.multipleSelection.length) {
        this.dialogJiesuan = true
        this.JiesuanModel.Piaoshu = ''
        this.JiesuanModel.ysyf = ''
        this.JiesuanModel.ssyf = ''
        this.JiesuanModel.yshk = ''
        this.JiesuanModel.sshk = ''
        this.JiesuanModel.yshj = ''
        this.JiesuanModel.sshj = ''
        this.JiesuanModel.Piaoshu = this.multipleSelection.length
        for (let c in this.multipleSelection) {
          this.JiesuanModel.ysyf = Number(this.JiesuanModel.ysyf) + Number(this.multipleSelection[c].Order_Pay)
          this.JiesuanModel.ssyf = Number(this.JiesuanModel.ssyf) + Number(this.multipleSelection[c].Cost_AccountPaid)
          this.JiesuanModel.yshk = Number(this.JiesuanModel.yshk) + Number(this.multipleSelection[c].Order_Payment)
          this.JiesuanModel.sshk = Number(this.JiesuanModel.sshk) + Number(this.multipleSelection[c].Cost_HasPayment)
        }
        this.JiesuanModel.yshj = this.JiesuanModel.ysyf + this.JiesuanModel.yshk
        this.JiesuanModel.sshj = this.JiesuanModel.ssyf + this.JiesuanModel.sshk
      } else {
        this.$message({
          showClose: true,
          message: '请选择结算条目',
          type: 'info'
        })
      }
    },
    Jiesuan () {
      this.JieSuan()
      this.dialogJiesuan = false
    },
    async custom () {
      let ctData = []
      for (let c in this.column.columnTF) {
        if (this.column.columnTF[c]) {
          ctData.push(c)
        }
      }
      let ct = await SettlementCusadd({Cus_Name: ctData, Cus_Type: 'fhjs'})
      if (ct.data.result === '1') {
        this.$message({
          showClose: true,
          message: ct.data.info,
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: '设置失败',
          type: 'info'
        })
      }
      this.visible = false
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        this.showData()
        done()
      })
    }
  }
}
</script>
