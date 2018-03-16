<template>
  <el-table
        height="300"
        :data="tableData"
        border
        fit
        style="width: 100%"
        >
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          min-width="160"
          v-for="(item, index) in columnProps"
          :key="index"
          :prop="item.props"
          :label="item.label">
        </el-table-column>
      </el-table>
</template>

<script>
export default {
  props: {
    tableData: Array,
    columnProps: Array
  },
  methods: {
    deleteRow (index, rows) {
      rows.splice(index, 1)
    }
  }
}
</script>
