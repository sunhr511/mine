  <template>
    <el-table
      :height="height"
      :data="countData"
      highlight-current-row
      border
      fit
      show-summary
      style="width: 100%"
      >
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="handleFanku(scope.$index, scope.row)">返 库</el-button>
        </template>
      </el-table-column>
      <el-table-column min-width="130" v-for="(item, index) in countProps" v-if="item.input" :key="index" :prop="item.props" :label="item.label">
        <template scope="scope">
          <el-input v-model="item.props" :placeholder="item.placeholder"></el-input>
        </template>
      </el-table-column>

      <el-table-column
        min-width="130"
        v-for="(item, index) in countProps"
        v-if="!item.input"
        :key="index"
        :prop="item.props"
        :label="item.label">
      </el-table-column>
    </el-table>
  </template>

  <script>
    export default {
      props: {
        countData: Array,
        countProps: Array,
        height: Number
      },
      methods: {
        handleFanku (index, row) {
          this.$emit('handleSelectionChange', index, row)
        }
      }
    }
  </script>
