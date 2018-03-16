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
          <el-row class="Ghead">
            <el-col :span="2">&nbsp;&nbsp;日常收支</el-col>
          </el-row>
          <br>
      <tableS
        :tableHeight="tableHeight" :tableSelectedTf="tableSelectedTf"
        :tableData="tableData" :tableColumnProps="tableColumnProps"
        :tableOperateBtnGrup="tableOperateBtnGrup"
        :tableOperateBtnWidth = "tableOperateBtnWidth"
        @handleSelectionChange="handleSelectionChange"
        @whiteFun="whiteFun" @dangerFun="dangerFun" @orangeFun="orangeFun"></tableS>
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
        <!-- 新增 -->
    <el-dialog :visible.sync="dialogAdd" title="新增收支明细" :before-close="handleClose">
      <el-row type="flex" justify="center">
        <el-col :span="23">
          <formxx
            ref="formxx"
            :model = "momo.model"
            :rules = 'rules'
            :data = 'momo.data'
            :titlebtn="addtitle"
            @submitForm="AddBaocun"
            @resetForm="AddQuxiao"
            ></formxx>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog :visible.sync="dialogEdit" title="编辑收支明细" :before-close="handleClose">
      <el-row type="flex" justify="center">
        <el-col :span="23">
          <formxx
            :model = 'momo.model'
            :rules = 'rules'
            :data = 'momo.data'
            :titlebtn="edittitle"
            @submitForm="EditBaocun"
            @resetForm="AddQuxiao"
            ></formxx>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import inputS from '../../components/inputS'
import tableS from '../../components/tableS'
import formxx from '../../components/caiwuguanli/formxx'
import {ExpenditureShow, ExpenditureNetShow, ExpenditureAdd, ExpenditureDel, ExpenditureEdit, ExpenditureShenhe, DictionaryShow} from '../../api/caiwuguanli/rcsz'
export default {
  components: {
    inputS,
    tableS,
    formxx
  },
  data () {
    return {
      btntf: false,
      dialogAdd: false,
      dialogEdit: false,
      addtitle: '保存',
      edittitle: '保存',
      mose: {
        data: [
          {props: 'Expenditure_Time', label: '日期', placeholder: '请选择日期', date: true, content: [], guest: false},
          {props: 'Expenditure_ReimAccount', label: '报销科目', placeholder: '请输入报销科目', select: true, content: [], guest: true},
          {props: 'Expenditure_Reim', label: '报销人', placeholder: '请输入报销人', input: true, content: [], guest: false}
        ],
        model: {
          Expenditure_Time: '',
          Expenditure_ReimAccount: '',
          Expenditure_Reim: ''
        }
      },
      buttonGroup: [
        {name: '查询', tf: true, loading: false},
        {name: '审核', tf: true},
        {name: '新增', tf: true}
      ],
      inputWidth: '80px',
      rules: {
        Expenditure_Net: [
          { required: true, message: '请选择所属站点', trigger: 'change' }
          // { pattern: /^[1-9]+$/, message: '请正确输入开户银行卡号', trigger: 'change' }
        ],
        Expenditure_ReimAmount: [
          { required: true, message: '请输入报销金额', trigger: 'change' },
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请正确输入报销金额', trigger: 'change' }
        ],
        Expenditure_ReimCountent: [
          { required: true, message: '请输入报销内容', trigger: 'change' }
        ]
      },
      multipleTable: [],
      tableData: [],
      tableHeight: 520,
      tableSelectedTf: true,
      tableColumnProps: [
        { props: 'Expenditure_Time', label: '日期' },
        { props: 'Expenditure_Net', label: '所属站点' },
        { props: 'Expenditure_Reim', label: '报销人' },
        { props: 'Expenditure_ReimAccount', label: '报销科目' },
        { props: 'Expenditure_ReimCountent', label: '报销内容' },
        { props: 'Expenditure_ReimAmount', label: '报销金额(元)' },
       //  { props: 'Expenditure_ReimType', label: '报销方式(转账/现金)' },
        { props: 'Expenditure_State', label: '收支状态' },
        { props: 'Expenditure_Operator', label: '操作人' },
        { props: 'Expenditure_NowState', label: '当前状态' }
      ],
      tableOperateBtnGrup: [
        {name: '编辑', tf: true},
        {name: '作废', tf: true},
        {name: '编辑', tf: ''}
      ],
      tableOperateBtnWidth: 160,
      momo: {
        data: [
          // { props: 'Expenditure_Time', label: '日期', placeholder: '日期', date: true },
          { props: 'Expenditure_Net', label: '所属站点', placeholder: '所属站点', select: true, content: [], guest: true },
          { props: 'Expenditure_ReimAccount', label: '报销科目', placeholder: '报销科目', select: true, content: [] },
          { props: 'Expenditure_ReimAmount', label: '报销金额(元)', placeholder: '报销金额', select: false },
          { props: 'Expenditure_State', label: '收支状态', placeholder: '收支状态', select: true, content: [{value: '收入', la: ''}, {value: '支出', la: ''}], guest: true },
          // { props: 'Expenditure_ReimType', label: '报销方式', placeholder: '报销方式', select: false },
          { props: 'Expenditure_Reim', label: '报销人', placeholder: '报销人', select: false },
          { props: 'Expenditure_ReimCountent', label: '报销内容', placeholder: '报销内容', select: false }
          // { props: 'Expenditure_Operator', label: '操作人', placeholder: '操作人', select: true, content: [{ value: '是', label: '是' }, { value: '否', label: '否' }] }
          // { props: 'Expenditure_NowState', label: '当前状态', placeholder: '当前状态', select: true, content: [{ value: '是', label: '是' }, { value: '否', label: '否' }] }
          // { props: 'Consignor_Type', label: '客户类型', placeholder: '客户类型', select: true, content: [{ value: '收货人', label: '收货人' }, { value: '发货人', label: '发货人' }] }
        ],
        model: {
          // 'Expenditure_Time': '',
          'Expenditure_Net': '',
          'Expenditure_ReimAccount': '',
          'Expenditure_ReimAmount': '',
          'Expenditure_State': '',
          // 'Expenditure_ReimType': '',
          'Expenditure_Reim': '',
          'Expenditure_ReimCountent': ''
          // 'Expenditure_Operator': ''
          // 'Expenditure_NowState': ''
        }
      },
      Exid: [],
      searchData: [],
      total: 0,
      currentPage: 1,
      pageCount: 10
    }
  },
  created () {
    this.showData()
    this.Net()
  },
  methods: {
    async showData () {
      let show = await ExpenditureShow({currentPage: this.currentPage, pageCount: this.pageCount, searchData: this.searchData})
      this.total = show.data.count
      this.tableData = show.data.info
      let ds = await DictionaryShow({Dic_Remarks: '报销科目'})
      for (let o in ds.data.info) {
        this.momo.data[1].content.push({value: ds.data.info[o].Dic_Title})
        this.mose.data[1].content.push({value: ds.data.info[o].Dic_Title})
      }
    },
    async Net () {
      let netshow = await ExpenditureNetShow()
      for (let o in netshow.data.info) {
        // this.mose.data[1].content.push({value: netshow.data.info[o].Net_Name})
        this.momo.data[0].content.push({value: netshow.data.info[o].Net_Name})
      }
    },
    async here (model) {
      this.buttonGroup[0].loading = true
      this.searchData = model
      await this.showData()
      this.buttonGroup[0].loading = false
    },
    async i (model) {
      let shenhe = await ExpenditureShenhe(this.Exid)
      if (this.multipleTable.length) {
        if (shenhe.data.result === '1') {
          this.$message({
            showClose: true,
            message: shenhe.data.info,
            type: 'success'
          })
          this.showData()
        } else {
          this.$message({
            showClose: true,
            message: shenhe.data.info,
            type: 'error'
          })
        }
      } else {
        this.$message({
          showClose: true,
          message: '请选择要审核条目',
          type: 'info'
        })
      }
    },
    go (model) {
      this.momo.model.Expenditure_Net = ''
      this.momo.model.Expenditure_ReimAccount = ''
      this.momo.model.Expenditure_ReimAmount = ''
      this.momo.model.Expenditure_State = ''
      this.momo.model.Expenditure_Reim = ''
      this.momo.model.Expenditure_ReimCountent = ''
      this.dialogAdd = true
    },
    whiteFun (index, row) {
      this.dialogEdit = true
      this.momo.model = row
    },
    async dangerFun (index, row) {
      let del = await ExpenditureDel({Expenditure_Id: row.Expenditure_Id})
      if (del.data.result === '1') {
        this.$message({
          showClose: true,
          message: del.data.info,
          type: 'success'
        })
        this.btntf = true
        this.showData()
      }
    },
    orangeFun (index, row) {},
    handleSelectionChange (val) {
      this.multipleTable = val
      for (let a in this.multipleTable) {
        this.Exid[a] = this.multipleTable[a].Expenditure_Id
      }
    },
    // addNew () {
    //   this.dialogAdd = true
    // },
    handleCurrentChange (val) {
      this.showData()
    },
    async AddBaocun (model) {
      this.$refs.formxx.$refs['model'].validate(async (valid) => {
        if (valid) {
          let addinfo = await ExpenditureAdd(model)
          if (addinfo.data.result === '1') {
            this.$message({
              showClose: true,
              message: addinfo.data.info,
              type: 'success'
            })
            if (this.$refs.formxx.$refs['model']) {
              this.$refs.formxx.$refs['model'].resetFields()
            }
            this.showData()
            this.dialogAdd = false
          }
        } else {
          return false
        }
      })
    },
    AddQuxiao () {
      if (this.$refs.formxx.$refs['model']) {
        this.$refs.formxx.$refs['model'].resetFields()
      }
      this.dialogAdd = false
      this.dialogEdit = false
      this.showData()
    },
    async EditBaocun (model) {
      let editinfo = await ExpenditureEdit(model)
      if (editinfo.data.result === '1') {
        this.$message({
          showClose: true,
          message: editinfo.data.info,
          type: 'success'
        })
        this.showData()
        this.dialogEdit = false
      } else {
        this.$message({
          showClose: true,
          message: editinfo.data.info,
          type: 'error'
        })
      }
    },
    handleClose (done) {
      this.$confirm('您还没有保存是否关闭？')
        .then(_ => {
          done()
          if (this.$refs.formxx.$refs['model']) {
            this.$refs.formxx.$refs['model'].resetFields()
          }
        })
        .catch(_ => {})
    }
  }
}
</script>
<style scoped>
   .Ghead {
    background:  #8c96d9;
    height: 40px;
    line-height: 40px;
    color: white;
    overflow: hidden;
  }
</style>
