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
      <el-table-column
        min-width="160"
        align="center"
        v-for="(item, index) in columnProps"
        :key="index"
        :prop="item.props"
        :label="item.label">
      </el-table-column>
      <el-table-column label="操作" min-width="120" fixed="right" align="center">
        <template scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleBtn(scope.$index, scope.row)">{{btnTitle}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>

  <script>
    export default {
      props: {
        tableData: Array,
        columnProps: Array,
        height: Number,
        btnTitle: String
      },
      methods: {
        handleSelectionChange (val) {
          this.$emit('handleSelectionChange', val)
        },
        handleBtn (index, row) {
          this.$emit('handleBtn', index, row)
        }
      }
    }
  </script>
