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
          <el-row class="Ghead">&nbsp;&nbsp;货款审核</el-row>
          <br>
           <tableOperateTF
            :height = "tableHeight"
            @handleBack = "handleBack"
            @handleSelectionChange = "handleSelectionChange"
            :operateBtn = "operateBtn"
            :tableData = "tableData"
            :columnTF = "tableColumnProps.columnTF"
            :selectedTF = "tableColumnProps.selectedTF"
            :operateTF = "tableColumnProps.operateTF"
            :columnProps = "tableColumnProps.ColumnProps"
            :minwidth="minwidth"
            :showSummary="showSummary">
          </tableOperateTF>
            <br>
          <el-pagination
            style="text-align:center"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageCount"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
          <el-popover
              ref="popo"
              placement="top-end"
              title="自定义设置"
              width="450"
              v-model="visible"
              trigger="click">
              <br>&nbsp; &nbsp;
            <el-checkbox
              v-model="tableColumnProps.columnTF[item.props]"  v-for="(item, index) in tableColumnProps.ColumnProps"
              :key="index" style="height:30px">
              &nbsp;{{item.label}}
            </el-checkbox>
            <br>
              <div style="text-align: right; margin: 0">
                <el-button type="primary" size="mini" @click="customGo">确定</el-button>
              </div>
          </el-popover>
          <el-button style="float:right" size="large" type="info"  :plain="true"  v-popover:popo>自定义设置</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import inputS from '../../components/inputS'
import tableIF from '../../components/tableIF'
import tableOperateTF from '../../components/tableOperateTFS.vue'
import {ExamineShow, ExamineEdit} from '../../api/caiwuguanli/bzjs'
import {SettlementCusadd, SettlementCustom} from '../../api/baobiaofenxi/baobiaofenxi'
export default {
  components: {
    inputS,
    tableIF,
    tableOperateTF
  },
  data () {
    return {
      mose: {
        data: [
          {props: 'Order_BillID', label: '运单号', placeholder: '亲输入运单号', input: true, content: [], guest: false},
          {props: 'Order_Consignor', label: '发货人', placeholder: '请输入发货人', input: true, content: [], guest: false},
          {props: 'Order_Payment', label: '货款金额', placeholder: '请输入货款金额', input: true, content: [], guest: false}
          // {props: 'Examine_State', label: '审核状态', placeholder: '请选择审核状态', select: true, content: [{value: '全部', label: '全部'}, {value: '已审核', label: '已审核'}, {value: '未审核', label: '未审核'}], guest: false}
        ],
        model: {
          Order_BillID: '',
          Order_Consignor: '',
          Order_Payment: ''
        }
      },
      buttonGroup: [
        {name: '查询', tf: true, loading: false},
        {name: '', tf: ''},
        {name: '', tf: ''}
      ],
      inputWidth: '70px',
      rules: {},
      multipleTable: [],
      tableData: [],
      tableHeight: 442,
      tableSelectedTf: false,
      visible: false,
      showSummary: false,
      minwidth: 160,
      tableColumnProps: {
        ColumnProps: [
          { props: 'Order_Consignor', label: '发货人' },
          { props: 'Order_ConTel', label: '发货人电话' },
          { props: 'Order_Receive', label: '收货人' },
          { props: 'Receive_LinkTel', label: '收货人电话' },
          { props: 'Order_Send', label: '始发站' },
          { props: 'Order_End', label: '目的站' },
          { props: 'Order_Payment', label: '货款' },
          { props: 'Order_Pay', label: '运费' },
          { props: 'Order_PayType', label: '运费方式' },
          { props: 'Order_Goods', label: '货名' },
          { props: 'Order_Num', label: '件数' },
          { props: 'Order_BillID', label: '运单号' },
          { props: 'Order_BaseTime', label: '制单时间' },
          { props: 'Goods_Code', label: '货号' },
          { props: 'Order_AccStates', label: '结算状态' }
        ],
        columnTF: {
          'Order_Consignor': true,
          'Order_ConTel': true,
          'Order_Receive': true,
          'Receive_LinkTel': true,
          'Order_Send': true,
          'Order_End': true,
          'Order_Payment': true,
          'Order_Pay': true,
          'Order_PayType': true,
          'Order_Goods': true,
          'Order_Num': true,
          'Order_BillID': true,
          'Order_BaseTime': true,
          'Goods_Code': true,
          'Order_AccStates': true
        },
        selectedTF: false,
        operateTF: true
      },
      operateBtn: '审核',
      total: 0,
      currentPage: 1,
      pageCount: 10
    }
  },
  created () {
    this.show()
    this.customSetting()
  },
  methods: {
    // 默认自定义设置
    async customSetting () {
      let customData = await SettlementCustom({Cus_Type: 'hksh'})
      if (!customData.data.info.Cus_Name) {
        for (let ctf in this.tableColumnProps.columnTF) {
          this.tableColumnProps.columnTF[ctf] = true
        }
      } else {
        for (let ctf in this.tableColumnProps.columnTF) {
          this.tableColumnProps.columnTF[ctf] = false
        }
        for (let cdi in customData.data.info.Cus_Name) {
          this.tableColumnProps.columnTF[customData.data.info.Cus_Name[cdi]] = true
        }
      }
    },
    async show () {
      let es = await ExamineShow({currentPage: this.currentPage, pageCount: this.pageCount, searchData: this.mose.model})
      this.tableData = es.data.info
      this.total = es.data.count
      // console.log(es)
    },
    async here (model) {
      this.buttonGroup[0].loading = true
      await this.show()
      this.buttonGroup[0].loading = false
    },
    async i (model) {
      let judgeId = []
      let judgeArr = []
      for (let o in this.multipleTable) {
        judgeId.push(this.multipleTable[o]['Examine_Id'])
        judgeArr.push(this.multipleTable[o]['Examine_State'])
      }
      if (this.multipleTable.length) {
        let ee = await ExamineEdit(judgeId)
        if (ee.data.result === '1') {
          this.show()
          this.$message({
            showClose: true,
            message: ee.data.info,
            type: 'success'
          })
        } else {
          this.show()
          this.$message({
            showClose: true,
            message: '审核失败',
            type: 'info'
          })
        }
        // let JA = judgeArr.findIndex((value, index, arr) => {
        //   return value === '已审核'
        // })
        // if (JA === -1) {} else {
        //   this.$message({
        //     showClose: true,
        //     message: '订单中包括已审核订单,请重新选择',
        //     type: 'info'
        //   })
        // }
      } else {
        this.$message({
          showClose: true,
          message: '请选择要审核条目',
          type: 'info'
        })
      }
    },
    async handleBack (index, row) {
      console.log('我是审核按钮')
    },
    async customGo () {
      let ctData = []
      for (let c in this.tableColumnProps.columnTF) {
        if (this.tableColumnProps.columnTF[c]) {
          ctData.push(c)
        }
      }
      let ct = await SettlementCusadd({Cus_Name: ctData, Cus_Type: 'hksh'})
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
    go (model) {},
    whiteFun (index, row) {},
    dangerFun (index, row) {},
    async orangeFun (index, row) {
      let ee = await ExamineEdit([row.Examine_Id])
      if (ee.data.result === '1') {
        this.$message({
          showClose: true,
          message: ee.data.info,
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: '审核失败',
          type: 'info'
        })
      }
      this.show()
    },
    handleSelectionChange (val) {
      this.multipleTable = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.show()
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

