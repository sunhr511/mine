  <template>
     <el-table
    :data="tableData"
    border
    show-summary
    :summary-method="getSummaries"
    height="400"
    style="width: 100%">
    <el-table-column
      min-width="178"
      align="center"
      v-for="(item, index) in columnPropsComputed"
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
        columnPropsComputed: Array
      },
      data () {
        return {
          total: ''
        }
      },
      methods: {
        getSummaries (param) {
          const { columns, data } = param
          const sums = []
          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = '合计 (元)'
              return
            }
            const values = data.map(item => Number(item[column.property]))
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                  return prev + curr
                } else {
                  return prev
                }
              }, 0)
              if (!this.total) {
                this.total = sums[2] + sums[3] + sums[4]
              }
              // sums[index] += ' 元'
            } else {
              sums[1] = '票数 ' + this.tableData.length
            }
          })
          sums[1] = '票数 ' + this.tableData.length
          sums[2] = ''
          return sums
        }
      }
    }
  </script>
