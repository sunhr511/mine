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
    align="center"
      type="selection"
      width="55">
    </el-table-column>
      <!-- <el-table-column
        type="index"
        >
      </el-table-column> -->
      <el-table-column
        width="130"
        align="center"
        v-for="(item, index) in columnProps"
        :key="index"
        :prop="item.props"
        :label="item.label">
      </el-table-column>
      <el-table-column align="center" label="操作" width="80" fixed="right">
        <template scope="scope">
          <el-button
            size="small"
            type="warning"
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
