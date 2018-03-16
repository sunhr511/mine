<template>
  <el-row type="flex" justify="center">
    <el-col :span="23">
      <!--表单  -->
      <el-row type="flex">
        <!-- <el-col>
           <inputxx
            :rules="rules"
            :model="mozhu.model"
            :data="mozhu.data"
            :title="title"
            @searchGo="searchGo"
            @addGo = "addGo"></inputxx>
        </el-col> -->
        <el-col>
        <inputS
          ref="inputS"
          :rules="rules"
          :model="mozhu.model"
          :data="mozhu.data"
          :buttonGroup='buttonGroup'
          :width = "inputWidth"
          @here = "searchGo"
          ></inputS>
          </el-col>
      </el-row>
      <!--表格  -->
      <el-row type="flex">
        <el-col>
          <tableXiala :height="610"
            :columnProps="columnProps"
            :tableData="tableData"
            @handleSelectionChange="handleSelectionChange"
            @handlePrint="handlePrint"></tableXiala>
        </el-col>
      </el-row>
    </el-col>
    <el-dialog
      title="货物明细"
      :visible.sync="dialogTable"
      size="large"
      :before-close="handleClose">
      <el-table
        :data="Datas"
        border
        style="width: 100%">
        <el-table-column
          min-width="160px"
          align="center"
          v-for="(item, index) in TableDia"
          :key="index"
          :prop="item.props"
          :label="item.label">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTable = false">取 消</el-button>
        <el-button type="warning" @click="Print">打 印</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="打印预览"
      :visible.sync="dialogPrint"
      size="large"
      :before-close="handleClose">
      <el-row type="flex" justify="center">
        <el-col :span="22">
          <el-row type="flex">
            <el-col :span="24">
              <el-button type="primary" @click="Prints">打印</el-button>
              <el-button type="warning" @click="PrintsView">打印预览</el-button>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="24">
              <printTable :sumPay="sumPay" :sumPayment="sumPayment" :sumSend="sumSend" :Description="Description" :columnProps="TableDia" :tableData="Datas" id="xxx"></printTable>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPrint = false" type="info">取消打印</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="请根据电脑操作系统位数下载相应的安装包"
      :visible.sync="judgeVisible"
      size="tiny"
      >
      <font color='#FF00FF'>打印控件未安装!点击这里
        <a href='http://oss.kuaihuoyun.com/ktms/resource/Lodop6.205/install_lodop32.exe' target='_self'>执行安装</a>
        ,安装后请刷新页面或重新进入。(32位)
      </font>
      <br>
      <font color='#FF00FF'>打印控件未安装!点击这里
        <a href='http://oss.kuaihuoyun.com/ktms/resource/Lodop6.205/install_lodop64.exe' target='_self'>
        执行安装</a>,安装后刷新页面或重新进入。(64位)
      </font>
      (二选其一即可)
      <br><br>

      <font color='#FF00FF'>CLodop云打印服务(localhost本地)未安装启动!点击这里
        <a href='http://oss.kuaihuoyun.com/ktms/resource/Lodop6.205/CLodop_Setup_for_Win32NT.exe' target='_self'>执行安装</a>
      ,安装后请刷新页面。
      </font>
      (必装)
    </el-dialog>
  </el-row>
</template>
<script>
import printTable from '../../components/printTable'
import {LODOP} from '../../../static/vendor/a'
import inputxx from '../../components/yunshuguanli/inputxx'
import tableXiala from '../../components/yunshuguanli/tableXiala'
import inputS from '../../components/inputS'
import {RecordPickShow, RecordPicGoodsShow} from '../../api/yunshuguanli/jcjl'
import {NetinfoNet} from '../../api/yunyingguanli/zxjd'
import {PrintsShow} from '../../api/jichushezhi/dysz'
export default {
  components: {
    inputxx,
    tableXiala,
    inputS,
    printTable
  },
  data () {
    return {
      judgeVisible: false,
      Description: '车载货物明细',
      dialogPrint: false,
      sumPay: 0,
      sumPayment: 0,
      sumSend: 0,
      SelectPrint: '',
      dialogTable: false,
      // msg: '发车记录',
      buttonGroup: [
        {name: '查询', tf: true, loading: false},
        {name: '', tf: ''},
        {name: '', tf: ''}
      ],
      inputWidth: '70px',
      // title: '打印',
      mozhu: {
        data: [
          {props: 'Transport_Curtime', label: '日期', placeholder: '选择日期', select: '', input: '', date: true, content: []},
          {props: 'Transport_Platenumber', label: '车牌号', placeholder: '车牌号', select: '', input: true, date: '', content: []},
          {props: 'Transport_Loadnet', label: '始发站', placeholder: '始发站', select: true, input: '', date: '', content: [], guest: true}
        ],
        model: {
          Transport_Curtime: '',
          Transport_Platenmuber: '',
          Transport_Loadnet: ''
        }
      },
      rules: {},
      columnProps: [
        { props: 'Transport_Curtime', label: '日期', aaa: true },
        { props: 'Transport_Platenumber', label: '车牌号', aaa: true },
        { props: 'Transport_CargoId', label: '车次', aaa: true },
        { props: 'Transport_Driver', label: '司机', aaa: true },
        { props: 'Transport_Tel', label: '联系电话', aaa: true },
        { props: 'Transport_Loadnet', label: '始发站', aaa: true },
        { props: 'Transport_Endnet', label: '目的站', aaa: true },
        { props: 'Transport_OrderNum', label: '车载票数', aaa: true },
        { props: 'Transport_Num', label: '车载件数(件)', aaa: true },
        { props: 'Transport_Pay', label: '车载运费', aaa: true },
        { props: 'Transport_Payment', label: '车载货款', aaa: true },
        { props: 'Transport_Curstatus', label: '车辆状态', aaa: true }
      ],
      tableData: [],
      searchData: {},
      Datas: [],
      TableDia: [
        { props: 'Order_BillID', label: '运单号', aaa: true },
        { props: 'Order_Send', label: '始发站', aaa: true },
        { props: 'Order_End', label: '目的站', aaa: true },
        { props: 'Order_Goods', label: '货名', aaa: true },
        { props: 'Order_Num', label: '数量', aaa: true },
        { props: 'Order_Pay', label: '运费', aaa: true },
        { props: 'Order_Payment', label: '货款', aaa: true },
        { props: 'Order_Consignor', label: '发货人', aaa: true },
        { props: 'Order_ConTel', label: '发货人电话', aaa: true },
        { props: 'Order_Receive', label: '收货人', aaa: true },
        { props: 'Receive_LinkTel', label: '收货人电话', aaa: true }
      ]
    }
  },
  created () {
    this.showData()
    this.oneShow()
  },
  methods: {
    async oneShow () {
      let nin = await NetinfoNet()
      for (let o in nin.data.info) {
        this.mozhu.data[2].content.push({value: nin.data.info[o].Net_Name})
      }
    },
    async showData () {
      let show = await RecordPickShow({searchData: this.searchData})
      this.tableData = show.data.info
    },
    async searchGo (a, b) {
      this.buttonGroup[0].loading = true
      this.searchData = a
      await this.showData()
      this.buttonGroup[0].loading = false
    },
    addGo (a, b) {},
    handleSelectionChange (val) {},
    async handlePrint (index, row) {
      let ss = await RecordPicGoodsShow({Transport_Cargold: row.Transport_Cargold})
      this.Datas = ss.data.info
      this.sumPay = 0
      this.sumPayment = 0
      for (let a in this.Datas) {
        this.sumPay = Number(this.sumPay) + Number(this.Datas[a].Order_Pay)
        this.sumPayment = Number(this.sumPayment) + Number(this.Datas[a].Order_Payment)
      }
      this.dialogTable = true
      this.dialogTable = true
      let sel = await PrintsShow()
      this.SelectPrint = sel.data.info.Print_Qingdanxuan
    },
    Print () {
      // let strtyle = '<style>td,th {border: 1px solid black;}table{width:100%}</style>'
      // let strtyle = '<style>th{border:1px solid black}</style>'
      // let str = '<head>' + strtyle + '</head><body>' + document.getElementById('aaa').innerHTML + '</body>'
      // LODOP.PRINT_INIT('打印表格')// 首先一个初始化语句
      // LODOP.SET_PRINT_STYLE('FontSize', 50)
      // // LODOP.SET_PRINT_STYLE('Bold', 1)
      // LODOP.ADD_PRINT_HTM(0, 0, '100%', '100%', str)
      // LODOP.PREVIEW()
      this.dialogTable = false
      this.dialogPrint = true
    },
    Prints () {
      if ((LODOP == null) || (typeof (LODOP.VERSION) === 'undefined')) {
        this.judgeVisible = true
      } else {
        let zArr = []
        for (let i = 0; i <= LODOP.GET_PRINTER_COUNT(); i++) {
          this.$set(zArr, i, LODOP.GET_PRINTER_NAME(i))
        }
        let ZR = zArr.find((value, index, arr) => {
          return value === this.SelectPrint
        })
        if (!ZR) {
          this.$message({
            showClose: true,
            message: '打印机连接失败,请确认打印机是否正确连接',
            type: 'info',
            delay: 7000
          })
        } else {
          LODOP.PRINT_INIT('打印表格')
          LODOP.SET_PRINT_STYLE('FontSize', 9)
          LODOP.ADD_PRINT_HTM(0, 0, '100%', '100%', document.getElementById('xxx').innerHTML)
          LODOP.SET_PRINTER_INDEX(this.SelectPrint)
          LODOP.PRINT()
        }
      }
    },
    PrintsView () {
      if ((LODOP == null) || (typeof (LODOP.VERSION) === 'undefined')) {
        this.judgeVisible = true
      } else {
        let zArr = []
        for (let i = 0; i <= LODOP.GET_PRINTER_COUNT(); i++) {
          this.$set(zArr, i, LODOP.GET_PRINTER_NAME(i))
        }
        let ZR = zArr.find((value, index, arr) => {
          return value === this.SelectPrint
        })
        if (!ZR) {
          this.$message({
            showClose: true,
            message: '打印机连接失败,请确认打印机是否正确连接',
            type: 'info',
            delay: 7000
          })
        } else {
          LODOP.PRINT_INIT('打印表格')
          LODOP.SET_PRINT_STYLE('FontSize', 9)
          LODOP.ADD_PRINT_HTM(0, 0, '100%', '100%', document.getElementById('xxx').innerHTML)
          LODOP.SET_PRINTER_INDEX(this.SelectPrint)
          LODOP.PREVIEW()
        }
      }
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        this.showData()
        done()
      })
    }
  }
}
</script>
<style scoped>

</style>
