<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="23">
      <el-row class="cheliangInfo">&nbsp;&nbsp;车辆信息</el-row>
      <br>
<el-row>
  <el-form
    :inline="true" 
    :model="state" 
    ref="state" 
    :rules="rules" label-position="right" 
    label-width="80px">
    <el-form-item label="车牌号" prop="state1">
      <el-autocomplete
        style="width:140px;" 
        v-model="state.state1"
        :fetch-suggestions="a1"
        placeholder="请输入车牌号"
        @select="handleSelect1"></el-autocomplete>
    </el-form-item>
    <el-form-item label="司机" prop="state2">
      <el-autocomplete
        style="width:140px;" 
        v-model="state.state2"
        :fetch-suggestions="a2"
        placeholder="请输入司机"
        @select="handleSelect2"></el-autocomplete>
    </el-form-item>
    <el-form-item label="手机号" prop="state3">
      <el-autocomplete
        style="width:140px;" 
        v-model="state.state3"
        :fetch-suggestions="a3"
        placeholder="请输入手机号"
        @select="handleSelect3"></el-autocomplete>
    </el-form-item>
    <el-form-item label="雇车费" prop="state4">
      <el-input v-model="state.state4"  placeholder="请输入雇车费" style="width:140px;" ></el-input>
    </el-form-item>
    <el-form-item label="装车费" prop="state5">
      <el-input v-model="state.state5" placeholder="请输入装车费" style="width:140px;" ></el-input>
    </el-form-item>
  </el-form>
</el-row>
    <el-row class="cheliangInfo">&nbsp;&nbsp;所装货物</el-row>
<br>
      <el-table
        height="300"
        :data="tableDataOne"
        border
        fit
        style="width: 100%"
        >
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableDataOne)"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          min-width="130"
          v-for="(item, index) in columnProps"
          :key="index"
          :prop="item.props"
          :label="item.label">
        </el-table-column>
      </el-table>
        <br>
      
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
        <el-col :span="1">
          <el-button :disabled="!tableDataOne.length" type="warning" size="large" @click="dispatch">发车</el-button>
        </el-col>
      </el-row>
  </div>
</template>
<script>

export default {
  props: {
    multipleSelection: Array
  },
  created () {
    console.log(this.multipleSelection)
    this.tableDataOne = this.multipleSelection
  },
  data () {
    return {
      autocompleteData: [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13' }
      ],
      multipleSelect: [],
      timeout: null,
      state: {
        state1: '',
        state2: '',
        state3: '',
        state4: '',
        state5: ''
      },
      rules: {
        state1: [
          { required: true, message: '请选择车牌号', trigger: 'change' }
        ]
      },
      columnProps: [
        { props: 'Order_BillID', label: '运单号' },
        { props: 'Order_Goods', label: '货物名称' },
        { props: 'Order_Num', label: '件数' },
        { props: 'Order_Vol', label: '体积(m³)' },
        { props: 'Order_Spec', label: '规格' },
        { props: 'Order_End', label: '目的站' },
        { props: 'Order_Receive', label: '收货人' },
        { props: 'Receive_LinkTel', label: '联系电话' }
      ],
      tableDataOne: []
    }
  },
  methods: {
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    async dispatch () {
      this.$refs['state'].validate((valid) => {
        if (valid) {
          console.log('----------------------')
          console.log(this.state)
          console.log(this.tableDataOne)
          console.log('----------------------')
          this.$emit('dialogTF', false)
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
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    handleSelection (val) {
      this.multipleSelect = val
      console.log(val)
    },
    handleSelect1 (item) {
      console.log(item)
    },
    handleSelect2 (item) {
      console.log(item)
    },
    handleSelect3 (item) {
      console.log(item)
    },
    a1 (queryString, cb) {
      let autocompleteData = this.autocompleteData
      let results = queryString ? autocompleteData.filter(this.createStateFilter(queryString)) : autocompleteData
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    a2 (queryString, cb) {
      let autocompleteData = this.autocompleteData
      let results = queryString ? autocompleteData.filter(this.createStateFilter(queryString)) : autocompleteData
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    a3 (queryString, cb) {
      let autocompleteData = this.autocompleteData
      let results = queryString ? autocompleteData.filter(this.createStateFilter(queryString)) : autocompleteData
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    }
  }
}
</script>
<style scoped>
  .cheliangInfo {
    background:#8c96d9;
    height: 36px;
    color: white;
    line-height: 36px;
    border-radius: 5px;
  }
</style>

