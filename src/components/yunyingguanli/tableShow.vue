  <template>
    <el-table
      :height="height"
      :data="tableData"
      highlight-current-row
      border
      fit
      style="width: 100%"
      @selection-change="handleSelectionChange"
      >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <!-- <el-table-column
        type="index"
        >
      </el-table-column> -->
      <el-table-column
        align="center"
        min-width="170"
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
        columnProps: Array,
        height: Number
      },
      methods: {
        handleSelectionChange (val) {
          this.$emit('handleSelectionChange', val)
        }
      }
    }
  </script>
