<template >
  <div  >
    <el-row type="flex" justify="center">
      <el-col :span="3"><br>
        <tree :data="treeData"  @handleNodeClick="handleNodeClick" ></tree>
      </el-col>
      <el-col :span="20" ><br>
        <el-form :inline="true" :model="momo.model" ref="momo.model" :rules="rules" label-position="right" >
          <el-form-item  v-for="(item, index) in momo.data" :key="index" :label="item.label" :prop="item.props"  label-width="100px" >
            <el-date-picker
              size="small"
              style="width:200px;"
              type="daterange"
              v-if="item.date"
              v-model="momo.model[item.props]"
              :placeholder="item.placeholder">
            </el-date-picker>
            <el-select  size="small" clearable  v-if="item.select" v-model="momo.model[item.props]" :placeholder="item.placeholder" style="width:90px;">
              <el-option
                v-for="(con, index) in item.content"
                :key="con.label"
                :label="con.label"
                :value="con.label">
              </el-option>
            </el-select>
            <el-input size="small" v-model="momo.model[item.props]" v-if="item.input" :placeholder="item.placeholder" style="width:65px;" class="inputStyle"></el-input>
          </el-form-item>
          <el-form-item style="float:right">
            <span class="btn"><el-button :loading="searchLoading" @click="searchShow(0)">查询</el-button></span>
            <el-button type="warning" :loading="searchAllLoading" @click="searchShow(1)">查询全部</el-button>
          </el-form-item>
        </el-form>
          
  <tableOperateTF
    :height = "tableHeight"
    @handleBack = "handleBack"
    @handleSelectionChange = "handleSelectionChange"
    :operateBtn = "operateBtn"
    :tableData = "tableData"
    :columnTF = "column.columnTF"
    :selectedTF = "column.selectedTF"
    :operateTF = "column.operateTF"
    :columnProps = "column.columnProps"
    :getSummaries = "getSummaries"
    :minwidth="minwidth"
    :showSummary="showSummary">
  </tableOperateTF><br>
  <el-pagination
    style="text-align:center"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-size="pageCount"
    layout="total, prev, pager, next"
    :total="total">
  </el-pagination><br>
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
            <el-button type="primary" size="mini" @click="customGo">确定</el-button>
          </div>
      </el-popover>
      <!-- <el-button size="large">打印</el-button> -->
      <el-button size="large" type="warning" @click="handleDownload">导出Excel</el-button>
      <el-button size="large" type="info"  :plain="true"  v-popover:popo>自定义设置</el-button>          
    </el-col>
  </el-row>

  </div>
</template>
<script>
import tree from '../../components/yunyingguanli/tree.vue'
import tableOperateTF from '../../components/tableOperateTFS.vue'
import {StockMenushow} from '../../api/yunyingguanli/kc.js'
import {SettlementPpayShow} from '../../api/baobiaofenxi/wdshtj.js'
import {SettlementCustom, SettlementCusadd} from '../../api/baobiaofenxi/baobiaofenxi'

export default {
  components: {
    tree,
    tableOperateTF
  },
  data () {
    return {
      searchLoading: false,
      searchAllLoading: false,
      tableHeight: 500,
      minwidth: 160,
      showSummary: true,
      momo: {
        data: [
          { props: 'Order_BaseTime', label: '开单日期', placeholder: '请输入开单日期', date: true }
        ],
        model: {
          Order_BaseTime: []
        }
      },
      column: {
        columnProps: [
          { props: 'Order_BillID', label: '运单号', computed: '' },
          // { props: 'Order_TransferID', label: '中转单号' },
          { props: 'Order_BaseTime', label: '开单日期', computed: '' },
          { props: 'Order_Goods', label: '货物名称', computed: '' },
          { props: 'Order_Package', label: '包装', computed: '' },
          // { props: 'Order_Send', label: '始发站' },
          { props: 'Order_Billnet', label: '开票网点', computed: '' },
          { props: 'Order_Consignor', label: '发货人', computed: '' },
          { props: 'Order_ConTel', label: '发货电话', computed: '' },
          { props: 'Order_Receive', label: '收货人', computed: '' },
          { props: 'Receive_LinkTel', label: '收货电话', computed: '' },
          { props: 'Order_Num', label: '件数(件)', computed: true },
          { props: 'Order_Payment', label: '货款', computed: true },
          { props: 'Order_Pay', label: '运费', computed: true },
          // { props: 'Order_PayType', label: '运费方式' },
          // { props: 'Goods_Send', label: '始发中转费' },
          { props: 'Cost_Rebate', label: '回扣', computed: true }
          // { props: 'Order_Receiptcode', label: '回单' },
          // { props: 'Order_Nowstate', label: '运单状态' }
        ],
        columnTF: {
          'Order_BillID': true,
          'Order_BaseTime': true,
          'Order_Goods': true,
          'Order_Package': true,
          'Order_Billnet': true,
          'Order_Consignor': true,
          'Order_ConTel': true,
          'Order_Receive': true,
          'Receive_LinkTel': true,
          'Order_Num': true,
          'Order_Payment': true,
          'Order_Pay': true,
          'Cost_Rebate': true
        },
        selectedTF: false,
        operateTF: false
      },
      rules: {},
      treeData: [],
      tableData: [],
      total: 0,
      currentPage: 1,
      pageCount: 10,
      nodeData: '',
      operateBtn: '无',
      visible: false
    }
  },
  created () {
    // showHide  column
    this.customSetting()
    // three
    this.treeShow()
    // table
    this.show()
  },
  methods: {
    async treeShow () {
      let sms = await StockMenushow()
      if (sms.data.info) {
        this.treeData = sms.data.info
      } else {
        this.treeData = []
      }
    },
    async show () {
      let gcs = await SettlementPpayShow({currentPage: this.currentPage, Order_Billnet: this.nodeData, pageCount: this.pageCount, searchData: this.momo.model})
      this.tableData = gcs.data.info
      this.total = gcs.data.count
    },
    async customSetting () {
      let customData = await SettlementCustom({Cus_Type: 'wdshtj'})
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
    async searchShow (num) {
      if (!num) {
        this.searchLoading = true
        await this.show()
        this.searchLoading = false
      } else {
        this.searchAllLoading = true
        this.currentPage = 1
        this.nodeData = ''
        this.momo.model = {
          Order_BaseTime: ''
        }
        await this.show()
        this.searchAllLoading = false
      }
      this.$message({
        showClose: true,
        message: '查询完毕',
        type: 'success'
      })
    },
    handleNodeClick (data) {
      this.nodeData = data.label
      this.show()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.show()
    },
    async handleBack (index, row) {},
    handleSelectionChange (val) {},
    async customGo () {
      let ctData = []
      for (let c in this.column.columnTF) {
        if (this.column.columnTF[c]) {
          ctData.push(c)
        }
      }
      let ct = await SettlementCusadd({Cus_Name: ctData, Cus_Type: 'wdshtj'})
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
    handleDownload () {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../static/vendor/Export2Excel.js')
        // 用 webpack Code Splitting xlsl还是很大的
        // const tHeader = ['序号', '文章标题', '作者', '阅读数', '发布时间']
        let tHeader = []
        let filterVal = []
        let i = 0
        for (let lbTF in this.column.columnTF) {
          if (this.column.columnTF[lbTF] === true) {
            tHeader.push(this.column.columnProps[i].label)
            filterVal.push(this.column.columnProps[i].props)
          }
          i++
        }
        // excel 表格头
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        // 自行洗数据 按序排序的一个array数组
        export_json_to_excel(tHeader, data, '列表')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    changeTwoDecimal (num) {
      var result = parseFloat(num)
      if (isNaN(result)) {
        return 0
      }
      result = Math.round(num * 100) / 100
      return result
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value) & ((columns[index].label === '件数(件)') | (columns[index].label === '货款') | (columns[index].label === '运费') | (columns[index].label === '回扣'))) {
              return this.changeTwoDecimal(prev + curr)
            } else {
              return ''
            }
          }, 0)
        }
      })
      if (!sums[0]) {
        sums[0] = '合计'
      }
      return sums
    }
  }
}
</script>
<style scope>
.btn .el-button {
  color: white;
  background: #8c96d9;
}
.el-radio-button__orig-radio:checked+.el-radio-button__inner {
  background: #8c96d9;
  border: 1px solid #bfcbd9;
  box-shadow: none;
}
</style>
