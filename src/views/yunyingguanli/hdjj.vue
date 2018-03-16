<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="23">
    <p style="color:red">*如内容不同步，请关闭此页从新打开！！*</p>
    </el-col>
    </el-row>
    <br>
    <el-row type="flex" justify="center">
      <el-col :span="23">
          <inputS
            ref="inputS"
            :rules="rules"
            :model="mozhu.model"
            :data="mozhu.data"
            :buttonGroup='buttonGroup'
            :width = "inputWidth"
            @here = "onSubmit"></inputS>
            <!-- :dis = "Boolean(!mozhu.model.Order_BillID & !mozhu.model.Order_Consignor)" -->
      </el-col>
    </el-row>

    <el-row type="flex" justify="space-around">
      <el-col :span="11">
<div ><div style="margin-top:-2px;float:left">双击加入</div>&nbsp; <img src="../../assets/右.png"></div>
        <tableDbl
          :index="momoOne"
          :dblColumnProps = "dblColumnProps"
          @rowDblclick = "rowDblclick"
          :tableData = "tableDataOne"
          ></tableDbl>

      </el-col>
      <el-col :span="11">
<div style="float:right"><div style="margin-top:-2px;float:left">双击移除</div>&nbsp; <img src="../../assets/左.png"></div>
          <br>
          <tableDbl
          :index="momoTwo"
          :dblColumnProps = "dblColumnProps"
          @rowDblclick = "rowDblclick"
          :tableData = "tableDataTwo"
          ></tableDbl>
      </el-col>
    </el-row>
    <br>
    <el-row type="flex" justify="end">
      <el-col :span="3">
        <el-button type="warning" size="large" @click="join">交接确认</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import store from '../../store/store.js'
import {ReceiptTransferShow, ReceiptTransferJiaojie} from '../../api/yunyingguanli/hdjj'
import tableDbl from '../../components/yunyingguanli/tableDbl.vue'
import inputS from '../../components/inputS'
// import store from '../../store/store.js'
export default {
  components: {
    tableDbl,
    inputS
  },
  data () {
    return {
      dis: false,
      mozhu: {
        data: [
          { props: 'Order_BillID', label: '运单号', placeholder: '请输入运单号', date: '', select: '', input: true, content: [] },
          { props: 'Order_Consignor', label: '发货人', placeholder: '请输入发货人', date: '', select: '', input: true, content: [] }
        ],
        model: {
          Order_BillID: '',
          Order_Consignor: ''
        }
      },
      momo: {
        data: [
          { props: 'Order_BillID', label: '运单号', placeholder: '请输入运单号', date: '', select: '', input: true, content: [] }
        ],
        model: {
          Order_BillID: ''
        }
      },
      rules: {},
      moOne: 0,
      moTwo: 1,
      title: '查询',
      dblColumnProps: {
        data: [
          {props: 'Order_BillID', label: '运单号'},
          {props: 'Receipt_Code', label: '回单单号'},
          {props: 'Receipt_State', label: '回单状态'},
          {props: 'Receipt_SendNet', label: '签收网点'},
          {props: 'Receipt_EndNet', label: '寄送网点'},
          {props: 'Receipt_Time', label: '签收时间'},
          {props: 'Order_Consignor', label: '发货人'},
          {props: 'Order_ConTel', label: '发货人电话'},
          {props: 'Order_Receive', label: '收货人'},
          {props: 'Receive_LinkTel', label: '收货人电话'}
        ]
      },
      tableDataOne: [],
      tableDataTwo: [],
      momoOne: 0,
      momoTwo: 1,
      buttonGroup: [
        {name: '查询', tf: true, loading: false},
        {name: '', tf: ''},
        {name: '', tf: ''}
      ],
      inputWidth: '70px',
      searchData: [],
      BillID: []
    }
  },
  created () {
    this.showData()
  },
  methods: {
    async showData () {
      let rs = await ReceiptTransferShow({searchData: this.searchData})
      if (rs.data.result === '1') {
        this.tableDataOne = rs.data.info
        if (this.tableDataTwo.length) {
          if (this.tableDataOne) {
            this.tableDataOne.find((v, i, arr) => {
              if (v.Order_BillID === this.tableDataTwo[i].Order_BillID) {
                this.tableDataOne.splice(i, 1)
              }
            })
          }
        }
      }
    },
    async Jiaojie () {
      let ReceiptTransferJiaojieRes = await ReceiptTransferJiaojie(this.BillID)
      if (ReceiptTransferJiaojieRes.data.result === '1') {
        this.$message({
          message: ReceiptTransferJiaojieRes.data.info,
          type: 'success',
          showClose: true
        })
        this.showData()
        this.tableDataTwo = []
      } else if (ReceiptTransferJiaojieRes.data.result === '0') {
        this.$message({
          message: ReceiptTransferJiaojieRes.data.info,
          type: 'error',
          showClose: true
        })
      }
    },
    async onSubmit (model) {
      if (model.Order_BillID && model.Order_Consignor) {
        let zz = this.tableDataTwo.find((value, index, arr) => {
          return (model.Order_BillID === value.Order_BillID && model.Order_Consignor === value.Order_Consignor)
        })
        if (zz) {
          this.$message('该订单已准备交接')
        } else {
          this.searchData = model
          this.buttonGroup[0].loading = true
          await this.showData()
          this.buttonGroup[0].loading = false
        }
      } else if (model.Order_BillID || model.Order_Consignor) {
        if (this.tableDataTwo.length) {
          let zz = this.tableDataTwo.find((value, index, arr) => {
            return (model.Order_BillID === value.Order_BillID || model.Order_Consignor === value.Order_Consignor)
          })
          if (zz) {
            this.$message('该订单已准备交接')
          } else {
            this.searchData = model
            this.buttonGroup[0].loading = true
            await this.showData()
            this.buttonGroup[0].loading = false
          }
        } else {
          this.searchData = model
          this.buttonGroup[0].loading = true
          await this.showData()
          this.buttonGroup[0].loading = false
        }
      } else {
        this.$message({
          message: '请输入要搜索的数据',
          type: 'info',
          showClose: true
        })
        await this.showData()
        this.buttonGroup[0].loading = false
      }
    },
    rowDblclick (index, row, currentIndex) {
      if (!index) {
        this.tableDataOne.splice(currentIndex, 1)
        this.tableDataTwo.push(row)
      } else {
        this.tableDataTwo.splice(currentIndex, 1)
        this.tableDataOne.push(row)
      }
    },
    join () {
      this.BillID = []
      for (let a in this.tableDataTwo) {
        this.BillID.push(this.tableDataTwo[a].Order_BillID)
      }
      this.Jiaojie()
    }
  }
}
</script>
