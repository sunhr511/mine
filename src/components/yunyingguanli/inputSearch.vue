<template>

<el-form :inline="true" :model="model" ref="model" :rules="rules" label-position="right" label-width="110px">
  <el-row type="flex" justify="space-between">
    <el-col :span="22">
    <el-form-item  v-for="(item, index) in data" :key="index" :label="item.label" :prop="item.props" >
      <el-date-picker
        style="width:130px;"
        type="daterange"
        v-if="item.date"
        v-model="model[item.props]"
        :placeholder="item.placeholder">
      </el-date-picker>
      <el-select  clearable  v-if="item.select" v-model="model[item.props]" :placeholder="item.placeholder" filterable style="width:120px;">
        <el-option
          v-for="(con, index) in item.content"
          :key="con.label"
          :label="con.label"
          :value="con.label">
        </el-option>
      </el-select>
      <el-input  v-model="model[item.props]" v-if="item.input" :placeholder="item.placeholder" style="width:150px;" class="inputStyle"></el-input>
    </el-form-item>
  </el-col>
    <el-col :span="2" >
      <el-form-item class="btn" style="float:right">
        <el-button :loading="rLoading" @click="onSubmit('model')">{{title}}</el-button>
      </el-form-item>
    </el-col>
  </el-row>
</el-form>

</template>

  <script>
    export default {
      props: {
        model: Object,
        data: Array,
        rules: Object,
        title: String,
        index: Number,
        rLoading: Boolean
      },
      methods: {
        onSubmit (from) {
          this.$emit('onSubmit', this.model, this.index, from)
        }
      }
    }
  </script>
  <style>
  .btn .el-button {
    color: white;
    background: #8c96d9;

  }
  </style>

