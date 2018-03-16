<template>
<div>
    <el-form  label-width="90px"  :model="model"  ref="model" :rules="rules" style="display:flex;justify-content:space-between">
      <el-form-item v-for="(item, index) in data" :key="index" :label="item.label" :prop="item.props">
          <el-date-picker
            style="width:200px;"
            type="daterange"
            v-if="item.date"
            v-model="model[item.props]"
            :placeholder="item.placeholder">
          </el-date-picker>
          <el-input
            v-if="item.input"
            v-model="model[item.props]"
            :placeholder="item.placeholder"
            style="width:200px;"></el-input>
          <el-select   clearable  v-if="item.select" v-model="model[item.props]" :placeholder="item.placeholder" style="width:200px;">
            <el-option
              v-for="(con, index) in item.content"
              :key="con.label"
              :label="con.label"
              :value="con.label">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-row type="flex" justify="space-between">
          <el-col :span="18">
            <el-row type="flex">
              <el-col v-for="(item, index) in data" :key="index" :span="10">
                
            </el-col>
            </el-row>

          </el-col>
          <el-col :span="4">
            
          </el-col>

        </el-row> -->
        <el-form-item>
          <span class="chaBtn">
            <el-button :loading="searchLoading" @click="searchGo" size="large">查询</el-button>
          </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button type="warning" @click="addGo" size="large">{{title}}</el-button>
        </el-form-item>
      </el-form>
</div>
</template>

<script>
export default {
  props: {
    model: Object,
    data: Array,
    rules: Object,
    title: String,
    searchLoading: Boolean
  },
  methods: {
    searchGo () {
      this.$emit('searchGo', this.model)
    },
    addGo () {
      this.$emit('addGo', this.model)
    }
  }
}
</script>
<style scoped>
.chaBtn .el-button{
  color:white;
  background: #8c96d9
}
</style>
