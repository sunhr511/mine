<template>
  <div>
     <el-table
     @row-click = "rowClick"
      :data="operateColumnPropsData"
      border
      fit
      height="300"
      style="width: 100%">
      <el-table-column
        align="center"
        min-width="130"
        v-for="(item, index) in operateColumnProps"
        :key="index"
        :prop="item.props"
        :label="item.label">
      </el-table-column>
      <el-table-column label="操作" width="260" fixed="right" align="center">
        <template scope="scope">
          <el-button
            size="small"
            @click="handlePut(scope.$index, scope.row)">打印</el-button>
          <el-button
            size="small"
            type="warning"
            @click="handleContract(scope.$index, scope.row)">发车</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleXieche(scope.$index, scope.row)">卸车</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

export default {
  props: {
    operateColumnProps: Array,
    operateColumnPropsData: Array
  },
  data () {
    return {}
  },
  methods: {
    handleXieche (index, row) {
      // console.log(index, row)
      this.$emit('handleXieche', index, row)
    },
    handlePut (index, row) {
      // console.log(index, row)
      this.$emit('handlePut', index, row)
    },
    handleContract (index, row) {
      // console.log(index, row)
      this.$emit('handleContract', index, row)
    },
    rowClick (row, event, column) {
      this.$emit('rowClick', row, event, column)
    }
  }
}
</script>
<style scoped>
</style>

