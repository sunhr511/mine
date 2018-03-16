<template>
  <div>
    <br>
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <el-row>
        <el-col>
          {{name1}} &nbsp;
          <el-select v-model="defaultGoValue"  clearable placeholder="请选择默认方案" >
            <el-option
              v-for="item in defaultGoOptions"
              :key="item.Pro_Name"
              :label="item.Pro_Name"
              :value="item.Pro_Name">
            </el-option>
          </el-select>
          &nbsp;&nbsp;
          <el-button type="info" @click="defaultGo()" :loading = "sureLoading">确定</el-button>
        </el-col>
      </el-row>
        <el-row class="Ghead">
          <el-col :span="22">
            {{name}}
          </el-col>
          <el-col :span="2" >
            <el-button style="color:white" type="text" @click="addData()" ><i class="el-icon-plus"></i> 新增</el-button>
          </el-col>
        </el-row>
<br>

<el-row id="ziseTable">
  <el-col>
    <el-table
      :data="tableData"
      border
      height="470"
      style="width: 100%;">
      <el-table-column
       v-for="(item, index) in momo.shuju" 
       :key="index"
       :prop="item.props"
       :label="item.label"
      ></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-col>
</el-row>

  </el-col>
</el-row>


  <el-dialog :visible.sync="dialogVisible" v-if="dialogVisible">
    <el-row type="flex" justify="center">
    <el-col :span="22" >
      <el-col :span="24" class="Dhead">
        {{title}}<small style="color:red">(如果在同一方案中，请与方案名相同)</small>
      </el-col>
      <el-col>


<el-form :model="momo.model" :rules="rules" ref="momo.model"   label-width="100px" label-position="left" >
  <el-form-item
    v-for="(item, index) in momo.shuju"
    :key="index"
    :label="item.label"
    :prop="item.props"
  >
  <el-select @change="changeSelect"  @clear="clearSelect" clearable  v-if="item.select" v-model="momo.model[item.props]" :placeholder="item.placeholder" style="width:100%">
    <el-option
      v-for="(con, index) in item.content"
      :key="con.label"
      :label="con.label"
      :value="con.label">
    </el-option>
  </el-select>
  <el-input v-if="!item.select" :disabled="item.ableT"   v-model="momo.model[item.props]" :placeholder="item.placeholder"></el-input>
  </el-form-item>
  <el-form-item class="btnStyle" label-width="0px">
    <el-button :loading="saveLoading"  @click="submitForm(true)" v-if="enniu == true">保存</el-button>
    <el-button :loading="saveLoading"  @click="submitForm(false)" v-if="enniu == false">保存</el-button>
  </el-form-item>
</el-form>
      </el-col>
    </el-col>
  </el-row>
  </el-dialog>
  </div>
</template>
<script>
  import { ProgrammeShow, ProgrammeAdd, ProgrammeEdit, ProgrammeDel, ProgrammeDefaultShow, ProgrammeDef } from '../../api/jichushezhi/feilvshezhi.js'
  export default {
    data () {
      return {
        sureLoading: false,
        saveLoading: false,
        name: '系统方案明细',
        name1: '系统默认方案',
        title: '新增方案明细',
        dialogVisible: false,
        enniu: true,
        tableData: [],
        startTF: false,
        rules: {
          Pro_Name: [
            { required: true, message: '请输入方案名称', trigger: 'blur' }
          ],
          Pro_Spayment: [
            { required: true, message: '请输入起始', trigger: 'blur' }
          ],
          Pro_Epayment: [
            { required: true, message: '请输入结束', trigger: 'blur' }
          ],
          Pro_Type: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          Pro_Payment: [
            { required: true, message: '请输入金额(元)', trigger: 'blur' },
            { pattern: /^[1-9]\d*$/, message: '请正确输入金额', trigger: 'blur' }
          ],
          Pro_Rate: [
            { required: true, message: '请输入费率(‰)', trigger: 'blur' },
            { pattern: /^[^0]\d*$/, message: '请正确输入费率(不包含单位)', trigger: 'blur' }
          ]
        },
        momo: {
          shuju: [
            { props: 'Pro_Name', label: '方案名称', placeholder: '请输入方案名称', model: '', select: false, content: [] },
            { props: 'Pro_Spayment', label: '起始', placeholder: '请输入起始', model: '', select: false, content: [] },
            { props: 'Pro_Epayment', label: '结束', placeholder: '请输入结束', model: '', select: false, content: [] },
            { props: 'Pro_Type', label: '类型', placeholder: '请输入类型', model: '', select: true, content: [{ label: '区间固定费率' }, { label: '区间固定金额' }] },
            { props: 'Pro_Payment', label: '金额(元)', placeholder: '请输入金额(不包含单位)', model: '', select: false, content: [], ableT: true },
            { props: 'Pro_Rate', label: '费率(‰)', placeholder: '请正确输入费率(不包含单位)', model: '', select: false, content: [], ableT: true }
          ],
          model: {
            'Pro_Name': '',
            'Pro_Spayment': '',
            'Pro_Epayment': '',
            'Pro_Type': '',
            'Pro_Payment': '',
            'Pro_Rate': ''
          }
        },
        defaultGoOptions: [],
        defaultGoValue: ''
      }
    },
    created () {
      this.showData()
      this.defaultShow()
    },
    methods: {
      async defaultShow () {
        let response = await ProgrammeDefaultShow()
        this.defaultGoOptions = response.data.info
        for (let de in response.data.info) {
          if (response.data.info[de].Pro_Default === '1') {
            this.defaultGoValue = response.data.info[de].Pro_Name
          }
        }
      },
      async defaultGo () {
        this.sureLoading = true
        let response = await ProgrammeDef({Pro_Name: this.defaultGoValue})
        this.sureLoading = false
        this.$message({
          showClose: true,
          message: response.data.info,
          type: 'success'
        })
      },
      async showData () {
        let response = await ProgrammeShow()
        if (response.data.info === '') {
          this.tableData = []
        } else {
          this.tableData = response.data.info
        }
      },
      submitForm (tf) {
        this.$refs['momo.model'].validate(async (valid) => {
          if (valid) {
            this.saveLoading = true
            if (tf) {
              let response = await ProgrammeAdd(this.momo.model)
              this.$message({
                showClose: true,
                message: response.data.info,
                type: 'success'
              })
              this.dialogVisible = false
              this.showData()
            } else {
              let response = await ProgrammeEdit(this.momo.model)
              this.$message({
                showClose: true,
                message: response.data.info,
                type: 'success'
              })
              this.dialogVisible = false
              this.showData()
            }
            this.saveLoading = false
            this.defaultShow()
          } else {
            this.$message({
              showClose: true,
              message: '请按规则填写',
              type: 'warning'
            })
            return false
          }
        })
      },
      addData () {
        this.title = '新增方案明细'
        this.enniu = true
        this.dialogVisible = true
        this.momo.model = {
          'Pro_Name': '',
          'Pro_Spayment': '',
          'Pro_Epayment': '',
          'Pro_Type': '',
          'Pro_Payment': '',
          'Pro_Rate': ''
        }
        if (this.$refs['momo.model']) {
          this.$refs['momo.model'].resetFields()
        }
      },
      handleEdit (index, row) {
        this.title = '修改方案明细'
        this.rules.Pro_Payment[0].required = Boolean(row.Pro_Payment)
        this.rules.Pro_Rate[0].required = Boolean(row.Pro_Rate)
        this.momo.shuju[4].ableT = Boolean(!row.Pro_Payment)
        this.momo.shuju[5].ableT = Boolean(!row.Pro_Rate)
        if (this.$refs['momo.model']) {
          this.$refs['momo.model'].resetFields()
        }
        this.momo.model = Object.assign({}, row)
        this.enniu = false
        this.dialogVisible = true
      },
      async handleDelete (index, row) {
        let response = await ProgrammeDel(row)
        if (response.data.result) {
          this.$message({
            showClose: true,
            message: response.data.info,
            type: 'success'
          })
          this.showData()
        }
      },
      changeSelect () {
        this.momo.model['Pro_Payment'] = ''
        this.momo.model['Pro_Rate'] = ''
        this.momo.shuju[4].ableT = Boolean(!(this.momo.model['Pro_Type'] === '区间固定金额'))
        this.momo.shuju[5].ableT = Boolean(!(this.momo.model['Pro_Type'] === '区间固定费率'))
        this.rules.Pro_Payment[0].required = Boolean(this.momo.model['Pro_Type'] === '区间固定金额')
        this.rules.Pro_Rate[0].required = Boolean(this.momo.model['Pro_Type'] === '区间固定费率')
      },
      clearSelect () {
        this.momo.shuju[4].ableT = true
        this.momo.shuju[5].ableT = true
      }
    }
  }
</script>
<style scoped>
  .Ghead {
    background:  #8c96d9;
    height: 40px;
    line-height: 40px;
    color: color;
     padding-left:15px;
     margin-top: 15px; 
  }
  .Dhead {
    background:  #d0d5f5;
    height: 40px;
    line-height: 40px;
    color: color;
     padding-left:15px;
     margin-bottom: 15px; 
  }
  .btnGroup .el-button:hover{
     color: white;
     background: #8c96d9;
     border: 1px white solid;
  }
  #ziseTable .el-table th {
    background: #8c96d9;
  }
  #ziseTable .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
    background: #8c96d9;
    color: white
  }
  #ziseTable .el-table__fixed-header-wrapper thead div{
    background: #8c96d9;
    color: white
  }
  .btnStyle {
    text-align: center
  }
</style>
