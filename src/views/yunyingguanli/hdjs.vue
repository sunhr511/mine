<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <el-row type="flex">
          <el-col :span="24">
            <!--表单查询组件  -->
            <el-row type="flex">
              <el-col :span="24">
                <doubleSearch
                  :searchLoading = "searchLoading"
                  :rules="rules" :model="momo.model"
                  :data="momo.data" :title="title"
                  @onSubmit="onSubmit"
                  :doubletitle="doubletitle"
                  @doubleSubmit="doubleSubmit"></doubleSearch>
              </el-col>
            </el-row>
            <!--表格信息展示组件  -->
            <el-row type="flex">
              <el-col :span="24">
                <tableShowBtn :height="600" :tableData="tableData" :columnProps="columnProps" :btnTitle="btnTitle" @handleSelectionChange="handleSelectionChange" @handleBtn="handleBtn"></tableShowBtn>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>



    <el-dialog  title="回付结算" :visible.sync="dialogJiesuan" size="tiny" :before-close="handleClose">
      <el-form :model="JiesuanModel" label-position="right" label-width="100px">
        <el-row v-if="aaa">
          <el-col :span="10">
            <el-form-item label="票数" prop="Piaoshu">
              <el-input  v-model="JiesuanModel.Piaoshu" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="应收运费" prop="ysyf">
              <el-input  v-model="JiesuanModel.ysyf" disabled ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="实收运费" prop="ssyf">
              <el-input  v-model="JiesuanModel.ssyf" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
import doubleSearch from '../../components/yunyingguanli/doubleSearch'
import tableShowBtn from '../../components/yunyingguanli/tableShowBtn'
import {ReceiptTransferJiesuanShow, ReceiptTransferJiesuan} from '../../api/yunyingguanli/hdjs'
export default {
  components: {
    doubleSearch,
    tableShowBtn
  },
  data () {
    return {
      // 表单开始
      searchLoading: false,
      title: '查询',
      doubletitle: '全部结算',
      momo: {
        data: [
          { props: 'Order_BillID', label: '运单号', placeholder: '请输入运单号', date: '', select: '', input: true, content: [] },
          { props: 'Order_Consignor', label: '发货人', placeholder: '请输入发货人', date: '', select: '', input: true, content: [] }
        ],
        model: {
          Order_BillID: '',
          Order_Consignor: ''
        }
      },
      rules: {},
      // 表单结束
      // 表格开始
      btnTitle: '结算',
      tableData: [],
      columnProps: [
        { props: 'Order_BillID', label: '运单号' },
        { props: 'Order_ReceiptCode', label: '回单号' },
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
        // { props: 'Transpor_Insurance', label: '保价' },
        // { props: 'Transpor_InsurancePay', label: '保价费' },
        { props: 'Order_Nowstate', label: '运单状态' },
        { props: 'Order_Memo', label: '备注' }
      ],
      searchData: [],
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
      aaa: true,
      AllJiesuan: [],
      Guid: []
    }
  },
  created () {
    this.showData()
  },
  methods: {
    // 表单开始
    async showData () {
      let Jsshow = await ReceiptTransferJiesuanShow({searchData: this.searchData})
      this.tableData = Jsshow.data.info
    },
    async JieSuan () {
      let js = await ReceiptTransferJiesuan(this.Guid)
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
      this.searchLoading = true
      this.searchData = model
      await this.showData()
      this.searchLoading = false
    },
    // 表单结束
    // 表格开始
    handleSelectionChange (val) {
      this.ALlJiesuan = val
      this.Guid = []
      for (let a in this.ALlJiesuan) {
        this.Guid.push(this.ALlJiesuan[a].Order_Guid)
      }
    },
    doubleSubmit () {
      if (this.ALlJiesuan) {
        this.dialogJiesuan = true
        this.JiesuanModel.Piaoshu = ''
        this.JiesuanModel.ysyf = ''
        this.JiesuanModel.ssyf = ''
        this.JiesuanModel.yshk = ''
        this.JiesuanModel.sshk = ''
        this.JiesuanModel.yshj = ''
        this.JiesuanModel.sshj = ''
        this.JiesuanModel.Piaoshu = this.ALlJiesuan.length
        for (let c in this.ALlJiesuan) {
          this.JiesuanModel.ysyf = Number(this.JiesuanModel.ysyf) + Number(this.ALlJiesuan[c].Order_Pay)
          this.JiesuanModel.ssyf = Number(this.JiesuanModel.ssyf) + Number(this.ALlJiesuan[c].Cost_AccountPaid)
          this.JiesuanModel.yshk = Number(this.JiesuanModel.yshk) + Number(this.ALlJiesuan[c].Order_Payment)
          this.JiesuanModel.sshk = Number(this.JiesuanModel.sshk) + Number(this.ALlJiesuan[c].Cost_HasPayment)
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
    handleBtn (index, row) {
      this.Guid = []
      this.Guid.push(row.Order_Guid)
      this.JiesuanModel.Piaoshu = ''
      this.JiesuanModel.ysyf = ''
      this.JiesuanModel.ssyf = ''
      this.JiesuanModel.yshk = ''
      this.JiesuanModel.sshk = ''
      this.JiesuanModel.yshj = ''
      this.JiesuanModel.sshj = ''
      this.aaa = false
      this.dialogJiesuan = true
      this.JiesuanModel.ysyf = Number(row.Order_Pay)
      this.JiesuanModel.ssyf = Number(row.Cost_AccountPaid)
      this.JiesuanModel.yshk = Number(row.Order_Payment)
      this.JiesuanModel.sshk = Number(row.Cost_HasPayment)
      this.JiesuanModel.yshj = this.JiesuanModel.ysyf + this.JiesuanModel.yshk
      this.JiesuanModel.sshj = this.JiesuanModel.ssyf + this.JiesuanModel.sshk
    },
    Jiesuan () {
      this.JieSuan()
      this.dialogJiesuan = false
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
