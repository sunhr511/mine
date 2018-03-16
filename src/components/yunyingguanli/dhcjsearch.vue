<template>
  <el-form :inline="true" :model="searchInfo">
    <el-row type="flex" style="flex-wrap:wrap">
      <el-col :span="5"  v-for="(item, index) in searchInfo.data" :key="index">
        <el-form-item   :label="item.label" :prop="item.props"  label-width="80px" >
          <el-select  size="small" clearable  v-if="item.select" v-model="searchInfo.model[item.props]" :placeholder="item.placeholder" style="width:150px;">
            <el-option
              v-for="(con, index) in item.content"
              :key="con.label"
              :label="con.label"
              :value="con.label">
            </el-option>
          </el-select>
          <el-input v-model="searchInfo.model[item.prop]" v-if="item.input" :placeholder="item.placeholder" style="width:150px;" class="inputStyle"></el-input>
        </el-form-item>

      </el-col>
        <el-form-item>
      <el-button type="primary">查询</el-button>
    </el-form-item>
    </el-row>

  </el-form>
</template>
<script>
export default {
  props: {
    searchInfo: Object
  }
}
</script>

