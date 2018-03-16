<template>

<el-form 
  style="width:100%;display:flex;justify-content:space-between"
 :model="model" ref="model" :rules="rules" label-position="right" label-width="90px">
<div style="display:flex;">
    <el-form-item  v-for="(item, index) in data" :key="index" :label="item.label" :prop="item.props" >
      <el-date-picker
        style="width:120px;"
        type="daterange"
        v-if="item.date"
        v-model="model[item.props]"
        :placeholder="item.placeholder">
      </el-date-picker>
      <el-select  clearable  v-if="item.select" v-model="model[item.props]" :placeholder="item.placeholder" style="width:120px;">
        <el-option
          v-for="(con, index) in item.content"
          :key="con.label"
          :label="con.label"
          :value="con.label">
        </el-option>
      </el-select>
      <el-input  v-model="model[item.props]" v-if="item.input" :placeholder="item.placeholder" style="width:120px;" class="inputStyle"></el-input>
    </el-form-item>
</div>
      <el-form-item class="nimabi" style="float:right">
        <el-button :loading="searchLoading" class="btn" @click="onSubmit">{{title}}</el-button>
        <el-button  type="warning" @click="doubleSubmit">{{doubletitle}}</el-button>
      </el-form-item>

</el-form>

</template>

  <script>
    export default {
      props: {
        model: Object,
        data: Array,
        rules: Object,
        title: String,
        doubletitle: String,
        searchLoading: Boolean
      },
      methods: {
        onSubmit () {
          this.$emit('onSubmit', this.model)
        },
        doubleSubmit () {
          this.$emit('doubleSubmit', this.model)
        }
      }
    }
  </script>
  <style>
  .nimabi .btn {
    color: white;
    background: #8c96d9;

  }
  </style>

