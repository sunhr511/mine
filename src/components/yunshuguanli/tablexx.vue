<template>
  <div>
     <el-table
      :data="tableData"
      border
      :height="height"
      fit
      style="width: 100%">
      <el-table-column
      align="center"
        
        v-for="(item, index) in columnProps"
        :key="index"
        :prop="item.props"
        :label="item.label">
      </el-table-column>
      <el-table-column label="操作"  fixed="right" align="center">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleBianji(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

export default {
  props: {
    columnProps: Array,
    tableData: Array,
    height: Number
  },
  methods: {
    handleBianji (index, row) {
      this.$emit('handleBianji', index, row)
    },
    handleDel (index, row) {
      this.$emit('handleDel', index, row)
    }
  }
}
</script>
<style scoped>
</style>

