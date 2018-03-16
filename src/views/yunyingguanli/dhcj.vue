<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <!-- <search-info :searchInfo="searchInfo"></search-info> -->
            <inputS
              ref="inputS"
              :rules="rules"
              :model="momo.model"
              :data="momo.data"
              :buttonGroup='buttonGroup'
              :width = "inputWidth"
              @here = "onSubmit"
              @i = "doubleSubmit"
              ></inputS>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <table-info
            :height="600"
            :tableData="tableData" :tableInfo="tableInfo"
            @handleRuku="Ruku" @handleShaixuan="Shaixuan"
            @handleSelectionChange="handleAllSel"></table-info>
          </el-col>
        </el-row>
        <br>
        <!-- <el-pagination
          style="text-align:center"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageCount"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination> -->
      </el-col>
    </el-row>
    <el-dialog
      title="货物信息"
      :visible.sync="dialogVisible"
      size="small"
      :before-close="handleClose">
      <table-info2 :tableInfo2="tableInfo2" :tabledata2="tabledata2" @handleSelectionChange="handleSelectionChange" :Gly="Gly"></table-info2>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="warning" @click="GoodsXuanze" v-if="Gly == 10">入 库</el-button>
        <el-button type="warning" @click="GoodsRuku" v-else>入  库</el-button>
      </span>
    </el-dialog>
    <!--超级管理员  -->
    <el-dialog
      title="管理员操作"
      :visible.sync="dialogGly"
      size="tiny"
      :before-close="handleClose">
      <el-select v-model="value" placeholder="请选择网点">
        <el-option
          v-for="item in options"
          :key="item.label"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogGly = false">取 消</el-button>
        <el-button type="warning" @click="FenpaiSub">分 派</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="管理员操作"
      :visible.sync="dialogGly1"
      size="tiny"
      :before-close="handleClose">
      <el-select  clearable filterable  v-model="value" placeholder="请选择网点">
        <el-option
          v-for="item in options"
          :key="item.label"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogGly1 = false">取 消</el-button>
        <el-button :loading = "dispatchLoading" type="warning" @click="ShaixuanFenpai">分 派</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="管理员操作"
      :visible.sync="dialogGlyAll"
      size="tiny"
      :before-close="handleClose">
      <el-select clearable filterable v-model="value" placeholder="请选择网点">
        <el-option
          v-for="item in options"
          :key="item.label"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogGlyAll = false">取 消</el-button>
        <el-button :loading = "dispatchLoading" type="warning" @click="Allruku">分 派</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import searchInfo from '../../components/yunyingguanli/dhcjsearch'
import tableInfo from '../../components/yunyingguanli/dhcjtable'
import tableInfo2 from '../../components/yunyingguanli/dhcjtable2'
import {DeliveryShow, DeliveryGoodShow, DeliveryStorage, DeliveryShaixuan, DeliveryQuanbu} from '../../api/yunyingguanli/dhcj'
import {NetinfoNet} from '../../api/yunyingguanli/zxjd'
import inputS from '../../components/inputS'
export default {
  components: {
    tableInfo,
    tableInfo2,
    inputS
  },
  data () {
    return {
      // dialog
      dispatchLoading: false,
      title: '查询',
      doubletitle: '入库',
      buttonGroup: [
        {name: '查询', tf: true, loading: false},
        {name: '', tf: ''},
        {name: '', tf: ''}
      ],
      inputWidth: '80px',
      cargoid: '',
      total: 0,
      currentPage: 1,
      pageCount: 10,
      dialogVisible: false,
      // 查询表单
      momo: {
        data: [
          {props: 'Transport_Curtime', label: '发车时间', placeholder: '请输入发车时间', date: true, content: []},
          {props: 'Transport_Loadnet', label: '发车网点', placeholder: '请输入发车网点', select: true, content: []},
          {props: 'Transport_Platenumber', label: '车牌号', placeholder: '请输入车牌号', input: true, content: []}
        ],
        model: {
          'Transport_Curtime': '',
          'Transport_Loadnet': '',
          'Transport_Platenumber': ''
        }
      },
      rules: {},
      // 表格信息1
      tableData: [],
      tableInfo: {
        data: [
          {prop: 'Transport_Platenumber', label: '车牌号'},
          {prop: 'Transport_Driver', label: '司机'},
          {prop: 'Transport_Tel', label: '电话'},
          {prop: 'Transport_Curtime', label: '发车时间'},
          {prop: 'Transport_Curstatus', label: '车辆状态'},
          {prop: 'Transport_Loadnet', label: '装车网点'},
          {prop: 'Transport_Endnet', label: '目的站'},
          {prop: 'Transport_OrderNum', label: '车载票数'},
          {prop: 'Transport_Num', label: '车载件数'},
          {prop: 'Transport_Payment', label: '车载货款'},
          {prop: 'Transport_Hire', label: '雇车费'},
          {prop: 'Transport_LoadingCharge', label: '装车费'},
          {prop: 'Transport_Net', label: '经过网点'}
        ]
      },
      // 表格信息2
      tabledata2: [],
      tableInfo2: {
        data: [
          {prop: 'Goods_Name', label: '货名'},
          {prop: 'Goods_Send', label: '货物始发站'},
          {prop: 'Goods_End', label: '货物目的站'},
          {prop: 'Goods_Num', label: '件数'},
          {prop: 'Goods_Weight', label: '重量'},
          {prop: 'Goods_Vol', label: '体积'},
          {prop: 'Goods_Price', label: '单价'},
          {prop: 'Goods_Spec', label: '规格'},
          {prop: 'Goods_PickType', label: '提货方式'},
          {prop: 'Goods_Type', label: '库存类型'}
        ]
      },
      Transport_CargoId: '',
      Gly: '',
      dialogGly: false,
      dialogGly1: false,
      dialogGlyAll: false,
      value: '',
      options: [],
      mozhu: [],
      // tablemodu: [],
      Allmozhu: [],
      searchData: [],
      Guid: ''
    }
  },
  created () {
    this.Net()
    this.showInfo()
    // this.secondInfo()
  },
  methods: {
    async showInfo () {
      // let DeliveryShowRes = await DeliveryShow({currentPage: this.currentPage, pageCount: this.pageCount})
      let DeliveryShowRes = await DeliveryShow({searchData: this.searchData})
      this.total = DeliveryShowRes.data.count
      this.tableData = DeliveryShowRes.data.info
      this.Gly = DeliveryShowRes.data.result
    },
    async secondInfo () {
      let DeliveryGoodShowRes = await DeliveryGoodShow({Transport_CargoId: this.cargoid})
      this.tabledata2 = DeliveryGoodShowRes.data.info
      // console.log(1111111, DeliveryGoodShowRes)
      // console.log(2222222222222222222, this.tabledata2)
      // this.Guid = DeliveryGoodShowRes.data.info.Goods_Guid
    },
    async rukuInfo () {
      let DeliveryStorageRes = await DeliveryStorage({Transport_CargoId: this.Transport_CargoId})
      if (DeliveryStorageRes.data.result === '1') {
        this.$message({
          message: DeliveryStorageRes.data.info,
          type: 'success'
        })
        this.showInfo()
      } else if (DeliveryStorageRes.data.result === '0') {
        this.$message({
          message: DeliveryStorageRes.data.info,
          type: 'error'
        })
      }
    },
    async onSubmit (model) {
      this.buttonGroup[0].loading = true
      this.searchData = model
      await this.showInfo()
      this.buttonGroup[0].loading = false
    },
    async Allruku () {
      this.dispatchLoading = true
      let DeliveryQuanbuRes = await DeliveryQuanbu({Allmozhu: this.Allmozhu, Order_Nownet: this.value})
      if (DeliveryQuanbuRes.data.result === '1') {
        this.$message({
          message: DeliveryQuanbuRes.data.info,
          type: 'success'
        })
        this.dialogGlyAll = false
        await this.showInfo()
        this.dispatchLoading = false
      } else if (DeliveryQuanbuRes.data.result === '0') {
        this.$message({
          message: DeliveryQuanbuRes.data.info,
          type: 'error'
        })
        this.dispatchLoading = false
      }
    },
    async doubleSubmit () {
      if (this.Gly === '10') {
        // this.Net()
        this.dialogGlyAll = true
      } else if (this.Gly === '0') {
        this.Allruku()
      }
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.showInfo()
    },
    handleAllSel (val) {
      this.Allmozhu = val
    },
    handleSelectionChange (val) {
      this.mozhu = val
    },
    async Net () {
      let nin = await NetinfoNet()
      this.momo.data[1].content = []
      for (let fo in nin.data.info) {
        this.$set(this.momo.data[1].content, fo, {label: nin.data.info[fo].Net_Name, value: nin.data.info[fo].Net_Name})
        this.$set(this.options, fo, {label: nin.data.info[fo].Net_Name})
      }
    },
    async Ruku (index, row) {
      // this.dialogGly = true
      this.Transport_CargoId = row.Transport_CargoId
      if (this.Gly === '10') {
        // this.Net()
        this.dialogGly = true
      } else if (this.Gly === '0') {
        this.Transport_CargoId = row.Transport_CargoId
        this.rukuInfo()
      }
    },
    // 分派
    async FenpaiSub () {
      let data = {
        Transport_CargoId: this.Transport_CargoId,
        Order_Nownet: this.value
      }
      let DeliveryStorageRes = await DeliveryStorage(data)
      if (DeliveryStorageRes.data.result === '1') {
        this.$message({
          message: DeliveryStorageRes.data.info,
          type: 'success'
        })
        this.dialogGly = false
        this.showInfo()
      } else if (DeliveryStorageRes.data.result === '0') {
        this.$message({
          message: DeliveryStorageRes.data.info,
          type: 'error'
        })
      }
    },
    async Shaixuan (index, row) {
      this.Allmozhu = []
      this.cargoid = row.Transport_CargoId
      this.dialogVisible = true
      // if (this.Allmozhu.length) {
      // } else {
      //   this.$message({
      //     message: '请选择要入库的货物',
      //     type: 'info'
      //   })
      // }
      this.secondInfo()
    },
    // 员工入库
    async GoodsRuku () {
      // this.dialogGly1 = true
      // this.Net()
      if (this.tabledata2.length) {
        if (this.Gly === '10') {
          this.dialogVisible = false
          this.dialogGly1 = true
          // this.Net()
        } else if (this.Gly === '0') {
          await this.ShaixuanFenpai()
          await this.secondInfo()
          this.dialogVisible = false
        } else {}
      } else {
        // console.log(22, this.tablemozhu)
        this.$message({
          message: '请选择要入库的货物',
          type: 'info'
        })
      }
    },
    // 管理员入库
    GoodsXuanze () {
      if (this.mozhu.length) {
        this.dialogVisible = false
        this.dialogGly1 = true
      } else {
        this.$message({
          message: '请选择要入库的货物',
          type: 'info'
        })
      }
      // this.Net()
    },
    // 筛选分派
    async ShaixuanFenpai () {
      this.dispatchLoading = true
      let data = {
        Order_Nownet: this.value,
        Transport_CargoId: this.cargoid,
        tablemozhu: this.mozhu
        // Goods_Guid: this.Guid
      }
      // console.log('你想要的字段', data)
      // if (this.Gly === '10') {
      //   data.tablemozhu = this.mozhu
      // } else if (this.Gly === '0') {
      //   data.tablemozhu = this.mozhu
      // }
      let DeliveryShaixuanRes = await DeliveryShaixuan(data)
      if (DeliveryShaixuanRes.data.result === '1') {
        this.$message({
          message: DeliveryShaixuanRes.data.info,
          type: 'success'
        })
        this.dialogGly1 = false
        this.secondInfo()
        this.showInfo()
      } else if (DeliveryShaixuanRes.data.result === '0') {
        this.$message({
          message: DeliveryShaixuanRes.data.info,
          type: 'error'
        })
      }
      this.dispatchLoading = false
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        done()
      })
    }
  }
}
</script>
