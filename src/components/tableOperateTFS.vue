  <template>
    <el-table
      :height="height"
      :data="tableData"
      highlight-current-row
      border
      fit
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :summary-method="getSummaries"
      :show-summary="showSummary"
      >
    <el-table-column
      align="center"
      v-if="selectedTF"
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
        align="center"
        :min-width="minwidth"
        v-for="(item, index) in columnProps"
        :key="index"
        :prop="item.props"
        :label="item.label"
        v-if="columnTF[item.props]"
        >
      </el-table-column>
      <el-table-column
      v-if="operateTF"
      label="操作" width="100"
      fixed="right" align="center">
        <template scope="scope">
          <el-button
            size="small"
            type="warning"
            @click="handleBack(scope.$index, scope.row)">{{operateBtn}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>

  <script>
    export default {
      props: {
        tableData: Array,
        columnProps: Array,
        height: null,
        columnTF: Object,
        selectedTF: Boolean,
        operateBtn: String,
        operateTF: Boolean,
        getSummaries: Function,
        minwidth: Number,
        showSummary: Boolean
      },
      methods: {
        handleSelectionChange (val) {
          this.$emit('handleSelectionChange', val)
        },
        handleBack (index, row) {
          // console.log(index, row)
          this.$emit('handleBack', index, row)
        }
      }
    }
  </script>
<style>
.el-table .el-table--fit .el-table--border .el-table--enable-row-hover .el-table--enable-row-transition
.el-table {
  height: 30%;
}
</style>
