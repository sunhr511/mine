  <template>
    <el-table
      :height="tableHeight"
      :data="tableData"
      highlight-current-row
      border
      fit
      style="width: 100%"
      @selection-change="handleSelectionChange"
      >
    <el-table-column
      align="center"
      v-if="tableSelectedTf"
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
        min-width="160"
        v-for="(item, index) in tableColumnProps"
        :key="index"
        :prop="item.props"
        :label="item.label"
        >
      </el-table-column>
      <el-table-column
        label="操作" :width="tableOperateBtnWidth"
        fixed="right" align="center" v-if="tableOperateBtnGrup[0].tf | tableOperateBtnGrup[1].tf | tableOperateBtnGrup[2].tf">
        <template scope="scope" style="text-align:center">
          <!-- <el-button
            size="small"
            :disabled="scope.row.Examine_State == '已审核'"
            v-if="scope.row.Examine_State == '已审核'"
            @click="whiteFun(scope.$index, scope.row)">{{tableOperateBtnGrup[0].name}}</el-button> -->
            <el-button
            size="small"
            type="danger"
            v-if="tableOperateBtnGrup[1].tf"
            @click="dangerFun(scope.$index, scope.row)" >{{tableOperateBtnGrup[1].name}}</el-button>
            <!-- v-if="scope.row.Examine_State == '未审核'" -->
            <el-button
            size="small"
            type="warning"
            @click="orangeFun(scope.$index, scope.row)" >{{tableOperateBtnGrup[2].name}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>

  <script>
    export default {
      props: {
        tableData: Array,
        tableColumnProps: Array,
        tableHeight: Number,
        tableSelectedTf: Boolean,
        tableOperateBtnGrup: Array,
        tableOperateBtnWidth: Number
      },
      methods: {
        handleSelectionChange (val) {
          this.$emit('handleSelectionChange', val)
        },
        whiteFun (index, row) {
          this.$emit('whiteFun', index, row)
        },
        dangerFun (index, row) {
          this.$emit('dangerFun', index, row)
        },
        orangeFun (index, row) {
          this.$emit('orangeFun', index, row)
        }
      }
    }
  </script>
