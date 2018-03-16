<template>
<div>
    <el-form :model="model"  ref="model" :rules="rules">

        <el-row type="flex" justify="space-between">
          <el-col :span="18">
            <el-row type="flex">
              <el-col v-for="(item, index) in data" :key="index" :span="10">
                <el-form-item :label="item.label" :prop="item.props">
                  <el-date-picker
                    style="width:200px;"
                    type="daterange"
                    size="small"
                    v-if="item.date"
                    v-model="model[item.props]"
                    :placeholder="item.placeholder">
                  </el-date-picker>
                  <el-input
                    v-if="item.input"
                    size="small"
                    v-model="model[item.props]"
                    :placeholder="item.placeholder"
                    style="width:200px;"></el-input>
                  <el-select  size="small" clearable filterable v-if="item.select" v-model="model[item.props]" :placeholder="item.placeholder" style="width:200px;">
                    <el-option
                      v-for="(con, index) in item.content"
                      :key="con.label"
                      :label="con.label"
                      :value="con.label">
                    </el-option>
                  </el-select>
                </el-form-item>
            </el-col>
            </el-row>

          </el-col>
          <el-col :span="4">
            <el-form-item>
              <span class="chaBtn">
                <el-button @click="searchGo" size="large">查询</el-button>
              </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-button type="warning" @click="addGo" size="large">{{title}}</el-button>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
</div>
</template>

<script>
export default {
  props: {
    model: Object,
    data: Array,
    rules: Object,
    title: String
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
