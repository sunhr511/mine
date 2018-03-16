<template>
<el-table
  :data="tabledata2"
  border
  fit
  height="380"
  @selection-change="handleSelectionChange"
  style="width: 100%">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      v-for="item in tableInfo2.data"
      :key="item"
      align="center"
      :prop="item.prop"
      :label="item.label"
      width="120">
    </el-table-column>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    tabledata2: Array,
    tableInfo2: Object,
    Gly: String
  },
  methods: {
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    }
  }
}
</script>
