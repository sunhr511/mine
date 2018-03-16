<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%;"
    :height="height"
    @selection-change="handleSelectionChange">
    <!-- <el-table-column
    type="selection"
    width="55">
  </el-table-column> -->
    <!-- <el-table-column type="expand">
    <template scope="scope">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item v-for="item in columnProps" :key="item" v-if="!item.aaa" :label="item.label">
          <span>{{ scope.row[item.props] }}</span>
        </el-form-item>
      </el-form>
    </template>
  </el-table-column> -->
  <el-table-column
    min-width="160px"
    align="center"
    v-for="(item, index) in columnProps"
    v-if="item.aaa"
    :key="index"
    :prop="item.props"
    :label="item.label"
  >
  </el-table-column>
  <el-table-column label="操作" width="160px" align="center" fixed="right">
      <template scope="scope">
        <el-button
          size="small"
          type="danger"
          @click="handlePrint(scope.$index, scope.row)">打印预览</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    tableData: Array,
    columnProps: Array,
    height: Number
  },
  methods: {
    handleSelectionChange (val) {
      this.$meit('handleSelectionChange', val)
    },
    handlePrint (index, row) {
      this.$emit('handlePrint', index, row)
    }
  }
}
</script>

