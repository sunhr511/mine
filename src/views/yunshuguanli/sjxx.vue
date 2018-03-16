<template>
  <el-row type="flex" justify="center">
    <el-col :span="23">
      <el-dialog :visible.sync="dialogVisible">
        <el-row class="addInfoClass">&nbsp;&nbsp;&nbsp;新增司机信息</el-row>
        <br>
        <el-form :model="form"  ref="form" :rules="rules" label-width="130px">
          <el-form-item
            v-for="(item, index) in columnProps" :key="index"
            :label="item.label" :prop="item.props" >
            <el-input
              v-if="item.input"
              size="large"
              v-model="form[item.props]"
              :placeholder="item.placeholder"
              ></el-input>
            <el-select  size="large"  clearable  v-if="item.select" v-model="form[item.props]" :placeholder="item.placeholder" style="width:100%;">
              <el-option
                v-for="(con, index) in item.content"
                :key="con.label"
                :label="con.label"
                :value="con.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-row style="text-align:center" >
          <span  class="btnStyle"><el-button :loading="saveLoading"  @click="submitForm(true)" v-if="enniu === true">保存</el-button></span>
          &nbsp;<span  class="btnStyle"><el-button :loading="saveLoading" style="width: 160px;height: 50px;font-size: 18px;"  v-if="enniu === false" @click="submitForm(false)" >保存</el-button></span>
        </el-row>
      </el-dialog>
      <inputxx
        :searchLoading = "searchLoading"
        :model="mozhu.model"
        :data="mozhu.data"
        :title='title'
        @searchGo = "searchGo"
        @addGo = "addGo"></inputxx>
      <tablexx
        :height = "600"
        :tableData = "tableData"
        :columnProps = "columnProps"
        @handleBianji = "handleBianji"
        @handleDel = "handleDel"></tablexx>
    </el-col>
  </el-row>
</template>
<script>
import inputxx from '../../components/yunshuguanli/inputxx.vue'
import tablexx from '../../components/yunshuguanli/tablexx.vue'
import {DirverShow, DirverAdd, DirverEdit, DirverDel} from '../../api/yunshuguanli/sjxx'
import {NetinfoNetin} from '../../api/yunyingguanli/zxjd'
export default {
  components: {
    inputxx,
    tablexx
  },
  data () {
    return {
      searchLoading: false,
      saveLoading: false,
      mozhu: {
        data: [
          {props: 'Dir_Name', label: '司机姓名', placeholder: '司机姓名', select: '', input: true, content: [{ label: 'cao', value: 'fuck' }]},
          {props: 'Dir_IdNumber', label: '身份证号', placeholder: '身份证号', select: '', input: true, content: []}
        ],
        model: {
          Dir_Name: '',
          Dir_IdNumber: ''
        }
      },
      rules: {
        Dir_Name: [
          { required: true, message: '请输入司机姓名', trigger: 'change' }
        ],
        Dir_IdNumber: [
          { pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的18位身份证号码', trigger: 'change' }
        ],
        Dir_Tel: [
          { required: true, message: '请输入司机电话', trigger: 'change' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确司机电话' }
        ],
        Dir_UrgentTel: [
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确司机电话' }
        ]
      },
      tableData: [],
      columnProps: [
        { props: 'Dir_Name', label: '司机姓名', placeholder: '输入司机信息', input: true, select: '' },
        { props: 'Dir_IdNumber', label: '身份证号', placeholder: '输入身份证号', input: true, select: '' },
        { props: 'Dir_Tel', label: '联系电话', placeholder: '输入联系电话', input: true, select: '' },
        { props: 'Dir_UrgentTel', label: '紧急联系电话', placeholder: '输入紧急联系电话', input: true, select: '' },
        { props: 'Dir_Net', label: '归属网点', placeholder: '选择归属网点', input: '', select: true, content: [] }
      ],
      form: {
        Dir_Name: '',
        Dir_IdNumber: '',
        Dir_Tel: '',
        Dir_UrgentTel: '',
        Dir_Net: ''
      },
      dialogVisible: false,
      enniu: false,
      title: '新增',
      searchData: []
    }
  },
  created () {
    this.showData()
    this.Net()
  },
  methods: {
    // 显示
    async showData () {
      let sjshow = await DirverShow({searchData: this.searchData})
      this.tableData = sjshow.data.info
    },
    // 增加
    async Add () {
      let addRes = await DirverAdd(this.form)
      if (addRes.data.result === '1') {
        this.$message({
          showClose: true,
          message: addRes.data.info,
          type: 'success'
        })
        this.showData()
      }
    },
    // 网点
    async Net () {
      let nin = await NetinfoNetin()
      for (let fo in nin.data.info) {
        this.columnProps[4].content[fo] = {label: nin.data.info[fo].Net_Name}
      }
    },
    // 编辑
    async edit () {
      let editRes = await DirverEdit(this.form)
      if (editRes.data.result === '1') {
        this.$message({
          showClose: true,
          message: editRes.data.info,
          type: 'success'
        })
        this.showData()
      }
    },
    // 删除
    async searchGo (a) {
      this.searchLoading = true
      this.searchData = a
      await this.showData()
      this.searchLoading = false
    },
    addGo (a) {
      this.enniu = true
      if (this.$refs['form']) {
        this.$refs['form'].resetFields()
      }
      this.form = {
        Dir_Name: '',
        Dir_IdNumber: '',
        Dir_Tel: '',
        Dir_UrgentTel: '',
        Dir_Net: ''
      }
      this.dialogVisible = true
    },
    handleBianji (index, row) {
      this.enniu = false
      this.dialogVisible = true
      this.form = row
    },
    async handleDel (index, row) {
      let DelRes = await DirverDel({Dir_Id: row.Dir_Id})
      if (DelRes.data.result === '1') {
        this.$message({
          showClose: true,
          message: DelRes.data.info,
          type: 'success'
        })
        this.showData()
      }
    },
    submitForm (tf) {
      // true 新增
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          this.saveLoading = true
          if (tf) {
            await this.Add()
            this.dialogVisible = false
          } else {
            await this.edit()
            this.dialogVisible = false
          }
          this.saveLoading = false
        } else {
          this.$message({
            showClose: true,
            message: '请按规则填写',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.addInfoClass{
  height: 40px;
  background: #d0d5f5;
  font-size: 18px;
  line-height: 40px;

}
.btnStyle .el-button {
    width: 160px;
    height: 50px;
    font-size: 18px;
    color: white;
    background: #8c96d9;
    border: none  ;
  }
</style>

