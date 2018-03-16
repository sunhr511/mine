  <template>
    <el-table
      :height="height"
      :data="countData"
      highlight-current-row
      border
      fit
      style="width: 100%"
      >
      <el-table-column label="操作" align="center" width="90">
        <template scope="scope">
          <el-button size="small" type="danger" @click="handleFanku(scope.$index, scope.row)">返 库</el-button>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="运单号">
        <template scope="scope">
          <span>{{scope.row.Order_BillID}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="货名">
        <template scope="scope">
          <span>{{scope.row.Order_Goods}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="件数">
        <template scope="scope">
          <span>{{scope.row.Order_Num}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" align="center" label="中转单号">
        <template scope="scope">
          <el-input size="small" v-model="scope.row.Order_TransferID" placeholder="请输入中转单号" @blur="inputBlur"></el-input>
        </template>
      </el-table-column>

      <el-table-column min-width="160px" align="center" label="下站中转费(元)">
        <template scope="scope">
          <el-input size="small" type="number" v-model="scope.row.Cost_Endcost" placeholder="请输入下站中转费" ></el-input>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="应收货款">
        <template scope="scope">
          <span>{{scope.row.Order_Payment}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="实收货款">
        <template scope="scope">
          <el-input size="small" v-model="scope.row.Cost_HasPayment" placeholder="请输入实收货款" @blur="inputBlur"></el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="总运费">
        <template scope="scope">
          <span>{{scope.row.Order_Pay}}</span>
          <!-- <el-input size="small" v-model="scope.row.Order_Pay" placeholder="请输入应收运费" @blur="inputBlur"></el-input> -->
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="已付运费">
        <template scope="scope">
          <span>{{scope.row.Cost_AccountPaid}}</span>
          <!-- <el-input size="small" v-model="scope.row.Order_Pay" placeholder="请输入应收运费" @blur="inputBlur"></el-input> -->
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="应收运费">
        <template scope="scope">
          <el-input size="small" v-model="scope.row.Cost_Unpaid" placeholder="请输入实收运费" @blur="inputBlur"></el-input>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="始发站">
        <template scope="scope">
          <span>{{scope.row.Order_Send}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="收货人">
        <template scope="scope">
          <span>{{scope.row.Order_Receive}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="收货电话">
        <template scope="scope">
          <span>{{scope.row.Receive_LinkTel}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="发货人">
        <template scope="scope">
          <span>{{scope.row.Order_Consignor}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="发货电话">
        <template scope="scope">
          <span>{{scope.row.Order_ConTel}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="重量(T)">
        <template scope="scope">
          <span>{{scope.row.Order_Weight}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="体积(m³)">
        <template scope="scope">
          <span>{{scope.row.Order_Vol}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="规格">
        <template scope="scope">
          <span>{{scope.row.Order_Spec}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="备注">
        <template scope="scope">
          <span>{{scope.row.Order_Memo}}</span>
        </template>
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
      data () {
        return {
          rulesArr: []
        }
      },
      created () {
        // console.log(this.countData)
        this.resultData()
      },
      methods: {
        handleFanku (index, row) {
          this.$emit('handleFanku', index, row)
        },
        resultData () {
          this.$emit('resultData', this.countData)
        },
        inputBlur (Event) {
          this.$emit('inputBlur', Event)
        }
      }
    }
  </script>
