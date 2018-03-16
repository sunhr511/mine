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
          <el-row class="Ghead">&nbsp;&nbsp;本站结算</el-row>
          <br>

          <tableIF
            :tableHeight="tableHeight" :tableSelectedTf="tableSelectedTf"
            :tableData="tableData" :tableColumnProps="tableColumnProps"
            :tableOperateBtnGrup="tableOperateBtnGrup"
            :tableOperateBtnWidth = "tableOperateBtnWidth"
            @handleSelectionChange="handleSelectionChange"
            @whiteFun="whiteFun" @dangerFun="dangerFun" @orangeFun="orangeFun"></tableIF>

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
  </div>
</template>
<script>
import inputS from '../../components/inputS'
import tableIF from '../../components/tableIF'
import {ExamineShow, ExamineEdit} from '../../api/caiwuguanli/bzjs'

export default {
  components: {
    inputS,
    tableIF
  },
  data () {
    return {
      mose: {
        data: [
          {props: 'Examine_Time', label: '日期', placeholder: '请选择日期', date: true, content: [], guest: false}
          // {props: 'Examine_State', label: '审核状态', placeholder: '请选择审核状态', select: true, content: [{value: '全部', label: '全部'}, {value: '已审核', label: '已审核'}, {value: '未审核', label: '未审核'}], guest: false}
        ],
        model: {
          Examine_Time: ''
          // Examine_State: ''
        }
      },
      buttonGroup: [
        {name: '查询', tf: true, loading: false},
        {name: '全部审核', tf: true},
        {name: '', tf: ''}
      ],
      inputWidth: '70px',
      rules: {},
      multipleTable: [],
      tableData: [],
      tableHeight: 520,
      tableSelectedTf: true,
      tableColumnProps: [
        { props: 'Examine_Net', label: '目的站' },
        { props: 'Examine_Time', label: '日期' },
        { props: 'Examine_Pay', label: '现收' },
        { props: 'Examine_Provided', label: '提收' },
        { props: 'Examine_Cost', label: '中转支出' },
        { props: 'Examine_Income', label: '其他收入' },
        // { props: 'Examine_Expenditure', label: '其他支出' },
        { props: 'Examine_DailyIncome', label: '日常收入' },
        { props: 'Examine_DailyExpenditure', label: '日常支出' }
        // { props: 'Examine_State', label: '审核状态' }
      ],
      tableOperateBtnGrup: [
        {name: '已审核', tf: true},
        {name: '', tf: ''},
        {name: '未审核', tf: false}
      ],
      tableOperateBtnWidth: 120,
      total: 0,
      currentPage: 1,
      pageCount: 10
    }
  },
  created () {
    this.show()
  },
  methods: {
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

