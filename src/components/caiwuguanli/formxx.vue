<template>
  <el-form  :model="model" ref="model" :rules="rules"  label-width="110px"  label-position="left">
    <el-row type="flex" justify="space-between" style="flex-wrap: wrap">
      <el-col :span="11"  v-for="(item, index) in data" :key="index" >
        <el-form-item :label="item.label" :prop="item.props" >
          <el-input  v-if="!item.select" v-model="model[item.props]" :placeholder="item.placeholder"></el-input>
          <el-select style="width:100%" clearable filterable v-if="item.select" v-model="model[item.props]" :placeholder="item.placeholder">
             <el-option
              v-for="(con, index) in item.content"
              :key="con.value"
              :label="con.label"
              :value="con.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <br>
    <br>
    <el-row type="flex" justify="center">
      <el-form-item label-width="0px">
        <el-button size="large" type="warning" @click="submitForm('model')">{{titlebtn}}</el-button>
        <el-button size="large" @click="resetForm('model')">取消</el-button>
      </el-form-item>
    </el-row>
  </el-form>
</template>
<script>
export default {
  props: {
    model: Object,
    rules: Object,
    data: Array,
    titlebtn: String
  },
  methods: {
    submitForm () {
      this.$emit('submitForm', this.model)
    },
    resetForm () {
      this.$emit('resetForm')
    }
  }
}
</script>
<style scoped>
  .btnStyle .el-button {
    width: 160px;
    height: 50px;
    font-size: 18px;
    color: white;
    background: #8c96d9;
    border: none;
  }
</style>
