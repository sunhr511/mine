<template >
  <div >
    <el-row type="flex" justify="center">
      <el-col :span="3" class="leftFilter">
        <br>
<tree :data="data"  @handleNodeClick="handleNodeClick" ></tree>

      </el-col>
      <el-col :span="20" >
        <br>

        <el-form style="display:flex;justify-content:space-between" :model="momo.model" ref="momo.model" :rules="rules" label-position="right" >
          <el-form-item  v-for="(item, index) in momo.data" :key="index" :label="item.label" :prop="item.props"  label-width="80px" >
            <el-date-picker
              size="small"
              style="width:85px;"
              type="daterange"
              v-if="item.date"
              v-model="momo.model[item.props]"
              :placeholder="item.placeholder">
            </el-date-picker>
            <el-select  size="small" clearable  v-if="item.select" v-model="momo.model[item.props]" :placeholder="item.placeholder" style="width:85px;">
              <el-option
                v-for="(con, index) in item.content"
                :key="con.label"
                :label="con.label"
                :value="con.label">
              </el-option>
            </el-select>
            <el-input size="small" v-model="momo.model[item.props]" v-if="item.input" :placeholder="item.placeholder" style="width:85px;" class="inputStyle"></el-input>
          </el-form-item>
          <el-form-item>
            <span class="btn">
              <el-button  @click="onSubmit(0)" :loading = "searchLoading">查询</el-button>
            </span>
            <el-button  @click="onSubmit(1)" type="warning" :loading = "searchAllLoading">查询全部</el-button>
          </el-form-item>
        </el-form>

        <el-table
          :data="tableData"
          highlight-current-row
          border
          height="525"
          style="width: 100%;">
          <el-table-column
            align="center"
            width="160"
            v-for="(item, index) in mozhu.data"
            :key="index"
            :prop="item.props"
            :label="item.label">
          </el-table-column>
          <el-table-column label="操作" width="160PX" fixed="right" align="center">
            <template scope="scope">
              <el-button
                style="color: white;background: #8c96d9;"
                size="small"
                @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>

        </el-table><br>
          <el-pagination
            style="text-align:center"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageCount"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
          <el-button size="large" @click="Print">打印</el-button>
          <!-- <el-button size="large" type="warning"  @click="handleDownload">导出Excel</el-button> -->
      <!-- <el-button size="large" type="info">自定义设置</el-button> -->
      </el-col>
    </el-row>
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
              <printTable :sumPay="sumPay" :sumPayment="sumPayment" :sumSend="sumSend" :Description="Description" :columnProps="mozhu.data" :tableData="tableData" id="xxx"></printTable>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPrint = false">取 消 打 印</el-button>
      </span>
    </el-dialog>

<el-dialog :visible.sync="dialogVisible" size="full">
      <!-- <el-row type="flex" justify="center">
        <el-col :span="23">
          <el-radio-group v-model="radio">
            <el-radio-button label="运单信息" size="small"></el-radio-button>
            <el-radio-button label="运输轨迹" size="small"></el-radio-button>
          </el-radio-group>
          <el-table :data="gridData" v-show="radio === '运输轨迹'">
            <el-table-column
              v-for="(item, index) in moon.data"
              :key="index"
              :prop="item.props"
              :label="item.label">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row> -->
  <el-row type="flex"  justify="center">
      <el-col :span="20">
      <kcinfo
        :rules="rules"
        :kcData = "kcData" :formData="formData"
        :billing="billing"></kcinfo>
        <br>
      <el-form>
      <el-row type="flex" style="flex-wrap:wrap">
      <el-col :span="1">
        <el-checkbox v-model="checked1" style="margin-top:8px">标签打印</el-checkbox>
      </el-col>
      <el-col :span="4">
        <el-form-item label="数量" label-width="90px">
          <el-input size="small" v-model="sumBiaoqian" placeholder="请输入数量" style="width:100%"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2" :push	="2">
        <el-checkbox v-model="checked2" style="margin-top:8px">小票打印</el-checkbox>
      </el-col>

    </el-row>
    <el-row type="flex" justify="center">
      <el-form-item label-width="100px" class="butstyle">
        <el-button type="warning" @click="dayin" style="width:100px">打 印</el-button>
      </el-form-item>
    </el-row>
  </el-form>
    </el-col>
  </el-row>
</el-dialog>

    <el-dialog
      title="请根据电脑操作系统位数下载相应的安装包"
      :visible.sync="judgeVisible"
      v-if="judgeVisible"
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
  </div>
</template>
<script>
import printTable from '../../components/printTable'
import {LODOP} from '../../../static/vendor/a'
import tree from '../../components/yunyingguanli/tree.vue'
import kcinfo from '../../components/yunyingguanli/kcinfo.vue'
import {StockMenushow, StockShow, StockStockshow} from '../../api/yunyingguanli/kc.js'
import {PrintsShow} from '../../api/jichushezhi/dysz'
import {asd} from './a.js'

export default {
  components: {
    tree,
    kcinfo,
    printTable
  },
  data () {
    return {
      searchAllLoading: false,
      searchLoading: false,
      printinfo: '',
      sumBiaoqian: 0,
      checked1: false,
      checked2: false,
      Description: '库存清单打印',
      dialogPrint: false,
      dialogVisible: false,
      momo: {
        data: [
          { props: 'Order_BaseTime', label: '开单日期', placeholder: '请输入开单日期', date: true, select: false, input: false, content: [] },
          { props: 'Order_Receive', label: '姓名', placeholder: '请输入姓名', date: false, select: false, input: true, content: [] },
          { props: 'Receive_LinkTel', label: '手机号', placeholder: '请输入手机号', date: false, select: false, input: true, content: [] },
          { props: 'Order_BillID', label: '运单号', placeholder: '请输入运单号', date: false, select: false, input: true, content: [] },
          { props: 'Order_GoodsType', label: '库存类型', placeholder: '请输入库存类型', date: false, select: true, input: false, content: [{label: '全部'}, {label: '发货库存'}, {label: '到货库存'}] }
        ],
        model: {
          Order_BaseTime: [],
          Order_Receive: '',
          Receive_LinkTel: '',
          Order_BillID: '',
          Order_GoodsType: ''
        }
      },
      mozhu: {
        data: [
          {props: 'Order_BaseTime', label: '开单日期', aaa: true},
          {props: 'Order_Send', label: '始发站', aaa: true},
          {props: 'Order_End', label: '目的站'},
          {props: 'Order_Consignor', label: '发货人'},
          {props: 'Order_ConTel', label: '发货电话'},
          {props: 'Order_Receive', label: '收货人', aaa: true},
          {props: 'Receive_LinkTel', label: '收货电话', aaa: true},
          {props: 'Order_BillID', label: '运单号', aaa: true},
          {props: 'Order_Goods', label: '货物名称', aaa: true},
          {props: 'Order_Spec', label: '规格'},
          {props: 'Order_Num', label: '件数(件)', aaa: true},
          {props: 'Order_Pay', label: '运费', aaa: true},
          {props: 'Order_Payment', label: '贷款', aaa: true},
          {props: 'Order_Weight', label: '重量(T)'},
          {props: 'Order_Vol', label: '体积(m³)'},
          {props: 'Order_GoodsType', label: '库存类型'}
        ],
        model: {
          Order_BillID: '',
          Order_Goods: '',
          Order_Num: '',
          Order_Weight: '',
          Order_Vol: '',
          Order_Spec: '',
          Order_Consignor: '',
          Order_ConTel: '',
          Order_LinkTel: '',
          Order_Pay: '',
          Order_Payment: '',
          Order_Send: '',
          Order_End: '',
          Order_GoodsType: '',
          Order_BaseTime: ''
        }
      },
      rules: {},
      data: [],
      tableData: [],
      gridData: [],
      moon: {
        data: [
          {props: 'Order_BillID', label: '站点'},
          {props: 'Order_Goods', label: '时间'},
          {props: 'Order_Num', label: '内容'}
        ],
        model: {
          Order_BillID: '',
          Order_Goods: '',
          Order_Num: ''
        }
      },
      kcData: {
        first: {
          data: [
            {props: 'Order_BillID', label: '运单号'},
            {props: 'Order_Billnet', label: '开票网点'},
            // {props: 'Order_Wrighter', label: '制单人'},
            {props: 'Order_End', label: '目的站'},
            {props: 'Order_GoodsCode', label: '货号'}
          ],
          model: {
            Order_BillID: '',
            Order_Billnet: '',
            // Order_Wrighter: '',
            Order_End: '',
            Order_GoodsCode: ''
          }
        },
        second: {
          data: [
            {props: 'Order_Receive', label: '姓名'},
            {props: 'Receive_LinkTel', label: '电话'},
            {props: 'Receive_Address', label: '地址'},
            {props: 'Receive_Contract', label: '合同号'}
          ],
          model: {
            Order_Receive: '',
            Receive_LinkTel: '',
            Receive_Address: '',
            Receive_Contract: ''
          }
        },
        third: {
          data: [
            {props: 'Order_Consignor', label: '姓名'},
            {props: 'Order_ConTel', label: '电话'},
            {props: 'Consignor_Address', label: '地址'},
            {props: 'Consignor_Contract', label: '合同号'}
          ],
          model: {
            Order_Consignor: '',
            Order_ConTel: '',
            Consignor_Address: '',
            Consignor_Contract: ''
          }
        },
        fourth: {
          data: [
            {props: 'Order_Goods', label: '货物名称'},
            {props: 'Order_Num', label: '件数'},
            {props: 'Order_Package', label: '包装'},
            {props: 'Order_Weight', label: '重量'},
            {props: 'Order_Vol', label: '体积'},
            {props: 'Order_Spec', label: '规格'},
            {props: 'Goods_Price', label: '单价'},
            {props: 'Order_ReceiptCode', label: '回单号'}
          ],
          model: {
            Order_Goods: '',
            Order_Num: '',
            Order_Package: '',
            Order_Weight: '',
            Order_Vol: '',
            Order_Spec: '',
            Order_ReceiptCode: '',
            Goods_Price: ''
          }
        },
        fifth: {
          data: [
            {props: 'Order_Pay', label: '全程费用(元)'},
            {props: 'Order_PayType', label: '运费方式'},
            {props: 'Cost_AccountPaid', label: '已付运费(元)'},
            {props: 'Cost_Unpaid', label: '未付运费(元)'},
            {props: 'Order_Payment', label: '代收货款(元)'},
            {props: 'Order_PaymentType', label: '代收货款方式'},
            {props: 'Order_PickType', label: '提货方式'},
            {props: 'Order_ProName', label: '手续费方案'},
            {props: 'Order_Memo', label: '备注'}
          ],
          model: {
            Order_Pay: '',
            Order_PayType: '',
            Cost_AccountPaid: '',
            Cost_Unpaid: '',
            Order_Payment: '',
            Order_PaymentType: '',
            Order_PickType: '',
            Order_ProName: '',
            // baojia: '',
            // baojiafei: '',
            Order_Memo: ''
          }
        },
        sixth: {
          data: [
            {props: 'Cost_Rebate', label: '回扣'},
            {props: 'Cost_Startcost', label: '始发中转费'},
            {props: 'Cost_Endcost', label: '下站中转费'},
            {props: 'Cost_Delivery', label: '接货费'},
            {props: 'Cost_Give', label: '送货费'},
            {props: 'Cost_Loading', label: '装车费'},
            {props: 'Cost_Unload', label: '卸车费'},
            {props: 'Cost_Forklift', label: '叉车费'},
            {props: 'Cost_Packing', label: '包装费'},
            {props: 'Cost_Message', label: '信息费'},
            {props: 'Cost_Billing', label: '开票费'}
          ],
          model: {
            'Cost_Rebate': '',
            'Cost_Startcost': '',
            'Cost_Endcost': '',
            'Cost_Delivery': '',
            'Cost_Give': '',
            'Cost_Loading': '',
            'Cost_Unload': '',
            'Cost_Forklift': '',
            'Cost_Packing': '',
            'Cost_Message': '',
            'Cost_Billing': ''
          }
        }
      },
      billing: true,
      total: 0,
      currentPage: 1,
      pageCount: 10,
      nodeData: '',
      formData: {},
      sumPay: 0,
      sumPayment: 0,
      sumSend: 0,
      SelectPrint: '',
      SelectPrint1: '',
      judgeVisible: false
    }
  },
  methods: {
    async treeShow () {
      let ts = await StockMenushow()
      if (ts.data.info) {
        this.data = ts.data.info
      } else {
        this.data = []
      }
    },
    async show () {
      let ss = await StockShow({currentPage: this.currentPage, pageCount: this.pageCount, Order_Billnet: this.nodeData, searchData: this.momo.model})
      if (!ss.data.info) {
        this.tableData = []
      } else {
        this.tableData = ss.data.info
        this.total = ss.data.count
      }
      let sel = await PrintsShow()
      this.SelectPrint = sel.data.info.Print_Qingdanxuan
      this.SelectPrint1 = sel.data.info.Print_Xiaopiaoxuan
    },
    handleNodeClick (data) {
      this.nodeData = data.label
      this.show()
    },
    async onSubmit (num) {
      if (!num) {
        this.searchLoading = true
        await this.show()
        this.searchLoading = false
      } else {
        this.searchAllLoading = true
        this.currentPage = 1
        this.nodeData = ''
        this.momo.model = {
          Order_BaseTime: '',
          Order_Receive: '',
          Receive_LinkTel: '',
          Order_BillID: '',
          Order_GoodsType: ''
        }
        await this.show()
        this.searchAllLoading = false
      }
      // this.$message({
      //   showClose: true,
      //   message: '查询完毕',
      //   type: 'success'
      // })
    },
    handleEdit (index, row) {
      if (row['Order_GoodsType'] === '发货库存') {
        this.billing = true
      } else if (row['Order_GoodsType'] === '到货库存') {
        this.billing = false
      } else {
        this.billing = true
      }
      this.printinfo = row
      for (let u in row) {
        this.kcData.first.model[u] = row[u]
        this.kcData.second.model[u] = row[u]
        this.kcData.third.model[u] = row[u]
        this.kcData.fourth.model[u] = row[u]
        this.kcData.fifth.model[u] = row[u]
        this.kcData.sixth.model[u] = row[u]
      }
      this.dialogVisible = true
      this.sumBiaoqian = this.kcData.fourth.model.Order_Num
    },
    handleDelete (index, row) {},
    handleCurrentChange (val) {
      this.currentPage = val
      this.show()
    },
    async Print () {
      if ((LODOP == null) || (typeof (LODOP.VERSION) === 'undefined')) {
        this.judgeVisible = true
      } else {
        let zArr = []
        for (let i = 0; i <= LODOP.GET_PRINTER_COUNT(); i++) {
          this.$set(zArr, i, LODOP.GET_PRINTER_NAME(i))
        }
        let ZR = zArr.findIndex((value, index, arr) => {
          return value === this.SelectPrint
        })
        if (!ZR) {
          this.$message({
            showClose: true,
            message: '打印机连接失败,请确认打印机是否正确连接',
            type: 'error',
            delay: 7000
          })
        } else {
          this.dialogPrint = true
          this.sumPay = ''
          this.sumPayment = ''
          for (let a in this.tableData) {
            this.sumPay = Number(this.sumPay) + Number(this.tableData[a].Order_Pay)
            this.sumPayment = Number(this.sumPayment) + Number(this.tableData[a].Order_Payment)
          }
        }
      }
    },
    async dayin () {
      if ((LODOP == null) || (typeof (LODOP.VERSION) === 'undefined')) {
        this.judgeVisible = true
      } else {
        let zArr = []
        for (let i = 0; i <= LODOP.GET_PRINTER_COUNT(); i++) {
          this.$set(zArr, i, LODOP.GET_PRINTER_NAME(i))
        }
        let ZR = zArr.find((value, index, arr) => {
          return value === this.SelectPrint1
        })
        if (!ZR) {
          this.$message({
            showClose: true,
            message: '打印机连接失败,请确认打印机是否正确连接',
            type: 'error',
            delay: 7000
          })
        } else {
          let aaa = await StockStockshow({Order_Guid: this.printinfo.Order_Guid})
          if (aaa.data.result === '1') {
            if (this.checked2) {
              let x = aaa.data.info
              asd(x.Logistic_Name, x.Order_BillID, x.Order_GoodsCode, x.Order_BaseTime, x.Order_Send, x.Logistic_STel, x.Order_End, x.Logistic_ETel, x.Order_Receive, x.Receive_LinkTel, x.Order_Goods, x.Order_Num, x.Order_Package, x.Order_Pay, x.Order_PayType, x.Order_Payment, x.Order_PaymentType, x.Cost_Give, x.Cost_Insured, x.heji, x.Order_Consignor, x.Order_ConTel, x.Advertisement_Content)
              LODOP.SET_PRINTER_INDEX(this.SelectPrint1)
              LODOP.PRINT()
            } else {}
            this.dialogVisible = false
          } else {
            this.$message({
              showClose: true,
              message: '系统错误',
              type: 'error'
            })
          }
        }
      }
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
          this.dialogPrint = false
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
            type: 'error',
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
    handleClose (done) {}
    // handleDownload () {
    //   require.ensure([], () => {
    //     const { export_json_to_excel } = require('../../../static/vendor/Export2Excel.js')
    //     // 用 webpack Code Splitting xlsl还是很大的
    //     // const tHeader = ['序号', '文章标题', '作者', '阅读数', '发布时间']
    //     let tHeader = []
    //     let filterVal = []
    //     let i = 0
    //     for (let lbTF in this.column.columnTF) {
    //       if (this.column.columnTF[lbTF] === true) {
    //         tHeader.push(this.column.columnProps[i].label)
    //         filterVal.push(this.column.columnProps[i].props)
    //       }
    //       i++
    //     }
    //     // excel 表格头
    //     const list = this.tableData
    //     const data = this.formatJson(filterVal, list)
    //     // 自行洗数据 按序排序的一个array数组
    //     export_json_to_excel(tHeader, data, '列表')
    //   })
    // }
  },
  created () {
    this.treeShow()
    this.show()
  },
  computed () {
    this.formData = {
      ...this.kcData.first.model,
      ...this.kcData.second.model,
      ...this.kcData.third.model,
      ...this.kcData.fourth.model,
      ...this.kcData.fifth.model,
      ...this.kcData.sixth.model
    }
  }
}
</script>
<style scope>

  .btn .el-button {
    color: white;
    background: #8c96d9;
  }
  .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    background: #8c96d9;
    border: 1px solid #bfcbd9;
    box-shadow: none;
}
/* .el-dialog__body {
  height:100%;
  display: flex;
} */
</style>
