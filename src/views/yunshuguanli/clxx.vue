<template>
  <el-row type="flex" justify="center">
    <el-col :span="23">
      <el-dialog :visible.sync="dialogVisible">
        <el-row class="addInfoClass">&nbsp;&nbsp;&nbsp;新增车辆信息</el-row>
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
          <span  class="btnStyle"><el-button  :loading="saveLoading" @click="submitForm(true)" v-if="enniu === true">保存</el-button></span>
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
import {VehicleShow, VehicleAdd, VehicleEdit, VehicleDel} from '../../api/yunshuguanli/clxx'
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
          {props: 'Car_Platenumber', label: '车牌号', placeholder: '车牌号', select: '', input: true, content: []}
          // {props: 'Order_Goods', label: '司机', placeholder: '司机', select: true, input: '', content: []}
        ],
        model: {
          Car_Platenumber: ''
          // Order_Goods: ''
        }
      },
      rules: {
        Car_Platenumber: [
          { required: true, message: '请输入车牌号', trigger: 'change' },
           { min: 7, max: 7, message: '请输入车牌号 长度在 7 个字符', trigger: 'change' }
        ],
        Car_Net: [
          { required: true, message: '请选择归属网店', trigger: 'change' }
        ]
      },
      tableData: [],
      columnProps: [
        { props: 'Car_Platenumber', label: '车牌号', placeholder: '输入车牌号', input: true, select: '', content: [] },
        // { props: 'Dir_Name', label: '司机' },
        // { props: 'Dir_Tel', label: '联系电话' },
        { props: 'Car_Length', label: '车长(m)', placeholder: '输入车长', input: true, select: '', content: [] },
        { props: 'Car_Type', label: '车型', placeholder: '输入车型', input: true, select: '', content: [] },
        { props: 'Car_Weight', label: '车载吨数(T)', placeholder: '输入车载吨数', input: true, select: '', content: [] },
        { props: 'Car_Vol', label: '车载方数(m³)', placeholder: '输入车载方数', input: true, select: '', content: [] },
        { props: 'Car_Attribution', label: '车辆来源', placeholder: '输入车辆来源', input: true, select: '', content: [] },
        { props: 'Car_Net', label: '归属网点', placeholder: '选择归属网点', input: '', select: true, content: [] }
        // { props: 'a', label: '是否自动入保' },
        // { props: 'b', label: '保险费(元)' },
        // { props: 'c', label: '承保金额(元)' }
      ],
      dialogVisible: false,
      form: {
        Car_Platenumber: '',
        Car_Length: '',
        Car_Type: '',
        Car_Weight: '',
        Car_Vol: '',
        Car_Attribution: '',
        Car_Net: ''
      },
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
      let clshow = await VehicleShow({searchData: this.searchData})
      this.tableData = clshow.data.info
    },
    // 增加
    async Add () {
      let addRes = await VehicleAdd(this.form)
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
        this.columnProps[6].content[fo] = {label: nin.data.info[fo].Net_Name}
      }
    },
    // 编辑
    async edit () {
      let editRes = await VehicleEdit(this.form)
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
        Car_Platenumber: '',
        Car_Length: '',
        Car_Type: '',
        Car_Weight: '',
        Car_Vol: '',
        Car_Attribution: '',
        Car_Net: ''
      }
      this.dialogVisible = true
    },
    handleBianji (index, row) {
      this.enniu = false
      this.dialogVisible = true
      this.form = row
    },
    async handleDel (index, row) {
      let DelRes = await VehicleDel({Car_Id: row.Car_Id})
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
      this.$refs['form'].validate(async(valid) => {
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

