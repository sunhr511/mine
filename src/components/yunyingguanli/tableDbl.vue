<template>
  <div>

     <el-table
      :data="tableData"
      border
      fit
      height="500"
      highlight-current-row
      @row-dblclick = "rowDblclick"
      style="width: 100%">
      <el-table-column
        min-width="120"
        v-for="(item, index) in dblColumnProps.data"
        :key="index"
        :prop="item.props"
        :label="item.label">
      </el-table-column>
    </el-table>

  </div>
</template>
<script>

export default {
  props: {
    dblColumnProps: Object,
    tableData: Array,
    index: Number
  },
  data () {
    return {}
  },
  methods: {
    rowDblclick (row, event) {
      this.tableData.findIndex((value, currentIndex, arr) => {
        if (row === value) {
          this.$emit('rowDblclick', this.index, row, currentIndex)
        }
      })
    }
  }
}
</script>
<style scoped>
</style>

