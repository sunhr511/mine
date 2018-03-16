<template>
  <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
    <el-table :data="gridData">
      <el-table-column property="date" label="日期" width="150"></el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
export default {
}
</script>

