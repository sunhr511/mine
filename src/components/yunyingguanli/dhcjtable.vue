<template>
  <el-table
  :data="tableData"
  border
  :height="height"
  @selection-change="handleSelectionChange"
  style="width: 100%">
    <!-- <el-table-column
    align="center"
      type="selection"
      width="55">
    </el-table-column> -->
    <el-table-column
    align="center"
      v-for="item in tableInfo.data"
      :key="item"
      :prop="item.prop"
      :label="item.label"
      width="160">
    </el-table-column>
    <el-table-column align="center" label="操作" fixed="right" width="160">
      <template scope="scope">
        <!-- <el-button
          size="small"
          @click="handleRuku(scope.$index, scope.row)">整车入库</el-button> -->
        <el-button
          size="small"
          type="danger"
          @click="handleShaixuan(scope.$index, scope.row)">卸货入库</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    tableData: Array,
    tableInfo: Object,
    height: Number
  },
  // created () {
  //   this.dialog = this.dialogbtn
  // },
  // data () {
  //   return {
  //     dialog: false
  //   }
  // },
  methods: {
    handleRuku (index, row) {
      this.$emit('handleRuku', index, row)
    },
    handleShaixuan (index, row) {
      this.$emit('handleShaixuan', index, row)
    },
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    }
  }
}
</script>

