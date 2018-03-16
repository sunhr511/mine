<template>
  <div  >
    <el-row type="flex" justify="center" style=" height:100%">
      <el-col :span="23">
        <inputSearch
          :rLoading = "rLoading"
          :title = "title"
          :rules="rules"
          :model="momo.model"
          :data="momo.data"
          @onSubmit="onSubmitOne"></inputSearch>
        <tableShow
          :height="540"
          @handleSelectionChange = "handleSelectionChange"
          :tableData = "tableData"
          :columnProps = "columnProps"></tableShow>
          <br>
          <el-pagination
            style="text-align:center"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageCount"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
          <el-row type="flex" justify="end">
     <el-col :span="4" style="display:flex;justify-content:space-around">
       <span class="btnClass">
         <el-button  style="" size="large" @click="peizaizhuangche" :disabled="!Boolean(multipleSelection.length)" >配载装车</el-button>
      </span>
      <el-badge :value="badgeValue" :max="99">
       <el-button type="warning" size="large" @click="dispatchGo">发车</el-button>
      </el-badge>
     </el-col>
   </el-row>
      </el-col>

    </el-row>
<!-- 装车 -->
  <el-dialog
    :visible.sync="dialogVisibleOne"
    size="large"
    :before-close="handleClose" v-if="dialogVisibleOne">
    <el-row type="flex" justify="center">
      <el-col :span="23">
          <el-row class="cheliangInfo">&nbsp;&nbsp;车辆信息</el-row>
          <br>
          <inputS
            ref="inputS"
            :rules="rules"
            :model="mose.model"
            :data="mose.data"
            :buttonGroup='buttonGroup'
            :width = "inputWidth"
            @here = "here"
            @i = "i"
            @go = "go"
            @liandong="liandong"></inputS>
          <el-row class="cheliangInfo">&nbsp;&nbsp;所装货物</el-row>
          <br>
          <tableDel
            :tableData = "multipleSelection"
            :columnProps = "columnPropsOne"
            ></tableDel>
            <br>

        <el-row type="flex" justify="center">
          <el-col :span="1">
            <el-button
            :loading="dispatchLoading"
            style="text-align:center"
            :disabled="!multipleSelection.length" type="warning"
            size="large" @click="dispatch">装 车</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </el-dialog>
<!-- 发车 -->
<el-dialog
  :visible.sync="dialogVisibleTwo"
  v-if="dialogVisibleTwo"
  size="full"
  :before-close="handleClose">
  <el-row type="flex" justify="center">
    <el-col :span="23">
    <tableOperate
      @rowClick = "rowClick"
      :operateColumnPropsData = "operateColumnPropsData"
      :operateColumnProps ="operateColumnProps"
      @handlePut = "handlePut"
      @handleContract = "handleContract"
      @handleXieche = "handleXieche"
      ></tableOperate>
    <br>

      <el-row class="shoufa" type="flex" justify="space-between">
        <el-col :span="2">&nbsp;&nbsp;&nbsp;发车合同</el-col>
        <el-col :span="2">&nbsp;&nbsp;&nbsp;
          <el-button type="warning" @click="handleHetong">合同打印</el-button>
        </el-col>
      </el-row>
  <br>
  <!-- 合同Input -->
  <el-form
    :inline="true" :model="contactModel.model"
    ref="contactModel.model"  :rules="rules1"
    label-position="right" label-width="110px">
    <el-form-item
      v-for="(item, index) in contactModel.data" :key="index"
      :label="item.label" :prop="item.props" >
      <el-input
        :disabled="Boolean(contactDisabled|item.disabled)" size="small"
        v-model="contactModel.model[item.props]" v-if="item.input"
        :placeholder="item.placeholder" style="width:100px;"
        class="inputStyle"></el-input>
      <el-checkbox
        :disabled="Boolean(contactDisabled|item.disabled)" v-model="contactModel.model[item.props]"
        v-if="item.checkbox" ></el-checkbox>
      <el-select
        size="small" clearable filterable :disabled="Boolean(contactDisabled|item.disabled)"
        v-if="item.select" v-model="contactModel.model[item.props]"
        :placeholder="item.placeholder" style="width:100px;">
        <el-option
          v-for="(con, index) in item.content"
          :key="con.label"
          :label="con.value"
          :value="con.label">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <!-- 合同打印 -->
  <el-row type="flex" justify="center">
    <el-col :span="15" style="border:.0625rem solid #d3d3d3;height:21.875rem;font-size:1rem" disabled>
      <div style="border:none;width:100%;height:100%;padding:0;margin:0;overflow-y:scroll;" id="hetong">
        <h2 style="text-align:center">{{wlname}}物流货物承运协议</h2>
        <br />
        <p>甲方：{{wlname}}</p>
        <p>乙方：承运汽车车主:__________________&nbsp;&nbsp;车属单位:<u>{{Nnet}}</u></p>
        <p>地址：<u>{{address}}</u> &nbsp;&nbsp;车牌号:<u>{{carnum}}</u></p>
        <p>驾驶员姓名:<u>{{Driver}}</u>&nbsp;&nbsp;住址:_____________________&nbsp;&nbsp;驾驶证号:_______________________</p>
        <p>身份证号:<u>{{DriverID}}</u>&nbsp;&nbsp;电话:<u>{{phone}}</u></p>
        <br />
        <p>经甲乙双方共同协商达成如下承运协议:</p>
        <p>一、乙方从河北省石家庄市承运货物到:<u>{{contactModel.model.Transport_Endnet}}</u>共计:<u>{{num}}</u>件；票数:<u>{{ordernum}}</u>票，共计运费:<u>{{pay}}</u>元先预付:________元，待货物安全到达目的地并且完成交接经目的地人员确认后结欠余款:_______元。</p>
        <p>二、乙方对其提供的车辆有完全的支配权并且保证其车辆具有运输相关资质，符合国家相关法律法规规定的道路运营许可；乙方保证车辆有良好的车况及配备完整足够的篷布、绳子、丝网等安全附属工具。</p>
        <p>三、运输途中的轮渡、过桥、过路、停车、住宿及车辆违章处罚等一切费用由乙方承担。由交通事故及车辆自身维护不当等引起车上货物损失、损坏、掉包或盗抢等事故，应由乙方按实际损失全部赔偿，并及时反应给甲方。</p>
        <p>四、运输途中因货物不具有运输条件产生的相关费用及罚款，应由甲方承担；因乙方驾驶员或车辆不符合相关法律法规产生的罚款或者因此产生延误导致的损失，应由乙方全部承担。</p>
        <p>五、乙方应按照甲方规定线路运行，如遇特殊情况须与甲方沟通。未经甲方允许擅自更改运行线路导致延误产生货物损失的，乙方应付全责。</p>
        <p>六、押运人员由双方共同协商，若由乙方兼任，则不得无故离岗，否则造成的损失由押运员负责</p>
        <p>七、本合同一式三份，甲乙双方及目的站各执一份，具同等法律效应。</p>
        <br />
        <el-row>
          <el-col :span="11">
            <p>甲方：</p>
            <p>负责人：</p>
            <p>电话：</p>
          </el-col>
          <el-col :span="11">
            <p>乙方：</p>
            <p>押运员：</p>
            <p>电话：</p>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
      </el-col>
    </el-row>
</el-dialog>
  <!-- 管理员操作 -->
  <el-dialog
    title="管理员操作(发车网点)"
    :visible.sync="superDialog"
    size="tiny"
    :before-close="handleClose">
    <br>
    <el-select  size="lagre" clearable filterable
      style="width:100%"
      v-model="net.model"
      :placeholder="net.placeholder"  >
        <el-option
          v-for="(con, index) in net.content"
          :key="con.value"
          :label="con.value"
          :value="con.value">
        </el-option>
      </el-select>
       <span slot="footer" class="dialog-footer">
        <el-button :loading="nextLoading" type="primary" @click="netGo">确 定</el-button>
      </span>
  </el-dialog>
  <!-- 打印预览 -->
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
    <!-- 打印控件Dialog -->
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
    <el-dialog
      title="选择卸车"
      size="large"
      :visible.sync="chooseVisible"
      >
      <tableShow
        :height="400"
        @handleSelectionChange = "chooseSelection"
        :tableData = "chooseData"
        :columnProps = "chooseProps"></tableShow>
        <br>
      <el-button
        :loading="chooseLoading"
        @click="chooseGo"
        style="float:right"
        type="warning"
        size="large">
        卸车
      </el-button>
      <br>
    </el-dialog>
  </div>
</template>
<script>
import tableShow from '../../components/yunyingguanli/tableShow.vue'
import tableOperate from '../../components/yunyingguanli/tableOperate.vue'
import inputSearch from '../../components/yunyingguanli/inputSearch.vue'
// import pzDialogContent from '../../components/yunyingguanli/pzDialogContent.vue'
import tableDel from '../../components/yunyingguanli/tableDel.vue'
import inputS from '../../components/inputS.vue'
import {NetinfoNet} from '../../api/yunyingguanli/zxjd'
import {TransportShow, VehicleCarshow, TransportLoading, Dirverdshow, TransportStartShow, TransportStart, TransportUnload, TransportLoadingShow} from '../../api/yunyingguanli/pzfc.js'
import printTable from '../../components/printTable'
import {LODOP} from '../../../static/vendor/a'
import {RecordPicGoodsShow} from '../../api/yunshuguanli/jcjl'
import {PrintsShow} from '../../api/jichushezhi/dysz'
export default {
  components: {
    tableShow,
    inputSearch,
    tableOperate,
    inputS,
    tableDel,
    printTable
  },
  data () {
    return {
      wlname: '',
      Driver: '',
      carnum: '',
      address: '',
      Nnet: '',
      phone: '',
      num: '',
      DriverID: '',
      pay: '',
      Endnet: '',
      ordernum: '',
      dispatchLoading: false,
      chooseLoading: false,
      nextLoading: false,
      rLoading: false,
      chooseVisible: false,
      judgeVisible: false,
      dialogPrint: false,
      // show Data          -----first
      tableData: [],
      momo: {
        data: [
          { props: 'Order_BillID', label: '运单号', placeholder: '请输入运单号', date: '', select: '', input: true, content: [] },
          { props: 'Order_Receive', label: '收货人', placeholder: '请输入收货人', date: '', select: '', input: true, content: [] },
          { props: 'Order_End', label: '目的站', placeholder: '请输入目的站', date: '', select: true, input: '', content: [] }
        ],
        model: {
          Order_BillID: '',
          Order_Receive: '',
          Order_End: ''
        }
      },
      mozhu: {
        data: [
          { props: 'Transport_Platenumber', label: '车牌号', placeholder: '请输入车牌号', date: '', select: '', input: true, content: [] },
          { props: 'Transport_Driver', label: '司机', placeholder: '请输入司机', date: '', select: '', input: true, content: [] },
          { props: 'Transport_Tel', label: '手机号', placeholder: '请输入手机号', date: '', select: '', input: true, content: [] }
        ],
        model: {
          Transport_Platenumber: '',
          Transport_Driver: '',
          Transport_Tel: ''
        }
      },
      columnProps: [
        { props: 'Order_BillID', label: '运单号' },
        { props: 'Order_Receive', label: '收货人' },
        { props: 'Receive_LinkTel', label: '联系电话' },
        { props: 'Order_Goods', label: '货物名称' },
        { props: 'Order_Num', label: '件数' },
        { props: 'Goods_Weight', label: '重量(T)' },
        { props: 'Order_Vol', label: '体积(m³)' },
        { props: 'Order_Spec', label: '规格' },
        { props: 'Order_Pay', label: '运费' },
        { props: 'Order_Payment', label: '贷款' },
        { props: 'Order_Send', label: '始发站' },
        { props: 'Order_End', label: '目的站' },
        { props: 'Order_GoodsType', label: '库存类型' },
        { props: 'Order_BaseTime', label: '开单日期' }
      ],
      operateColumnProps: [
        { props: 'Transport_Platenumber', label: '车牌号' },
        { props: 'Transport_Driver', label: '司机' },
        { props: 'Transport_Tel', label: '电话' },
        { props: 'Transport_Num', label: '件数' },
        { props: 'Transport_Weight', label: '重量(T)' },
        { props: 'Transport_Vol', label: '体积(m³)' },
        { props: 'count', label: '车载运费' },
        { props: 'Transport_Payment', label: '车载货款' },
        { props: 'Transport_OrderNum', label: '车载票数' },
        { props: 'Transport_LoadingCharge', label: '装车费' },
        { props: 'Transport_Net', label: '经过网点' }
      ],
      operateColumnPropsData: [],
      contactModel: {
        data: [
          { props: 'Transport_Platenumber', label: '车牌号', placeholder: '车牌号', date: '', checkbox: '', select: '', input: true, content: [], disabled: true },
          { props: 'Transport_ContractId', label: '合同号', placeholder: '合同号', date: '', checkbox: '', select: '', input: true, content: [], disabled: false },
          { props: 'Transport_Endnet', label: '发往', placeholder: '请输入发往', date: '', checkbox: '', select: true, input: '', content: [], disabled: false },
          // { props: 'shifouchengbao', label: '是否承保', placeholder: '', date: '', checkbox: true, select: '', input: '', content: [], disabled: false },
          { props: 'Transport_Insurance', label: '保险公司', placeholder: '请选择保险公司', date: '', checkbox: '', select: true, input: '', content: [{label: 123, value: 123}], disabled: false },
          { props: 'Transport_InsurancePay', label: '承保费', placeholder: '请输入承保费', date: '', checkbox: '', select: '', input: true, content: [], disabled: false },
          { props: 'Transport_InsuranceAmount', label: '承保金额(万元)', placeholder: '请输入承保金额', date: '', checkbox: '', select: '', input: true, content: [], disabled: false }
        ],
        model: {
          'Transport_Platenumber': '',
          'Transport_ContractId': '',
          'Transport_Endnet': '',
          // 'shifouchengbao': false,
          'Transport_Insurance': '',
          'Transport_InsurancePay': '',
          'Transport_InsuranceAmount': ''
        }
      },
      total: 0,
      currentPage: 1,
      pageCount: 10,
      multipleSelection: [],
      dialogVisibleOne: false,
      dialogVisibleTwo: false,
      title: '查 询',
      contactDisabled: false,
      badgeValue: 0,
      superDialog: false,
      mose: {
        data: [
          // { la: '体积', value: '车牌号' }
          {props: 'Transport_Platenumber', label: '车牌号', placeholder: '请输入车牌号', select: true, content: [], guest: true},
          {props: 'Transport_Driver', label: '司机', placeholder: '请输入司机', select: true, content: [], guest: true},
          {props: 'Transport_Tel', label: '手机号', placeholder: '请输入手机号', input: true, content: [], guest: false},
          {props: 'Transport_Hire', label: '雇车费', placeholder: '请输入雇车费', input: true, content: [], guest: false},
          {props: 'Transport_LoadingCharge', label: '装车费', placeholder: '请输入装车费', input: true, content: [], guest: false}
        ],
        model: {
          Transport_Platenumber: '',
          Transport_Driver: '',
          Transport_Tel: '',
          Transport_Hire: '',
          Transport_LoadingCharge: ''
        }
      },
      buttonGroup: [
        {name: '', tf: ''},
        {name: '', tf: ''},
        {name: '', tf: ''}
      ],
      inputWidth: '70px',
      columnPropsOne: [
        { props: 'Order_BillID', label: '运单号' },
        { props: 'Order_Goods', label: '货物名称' },
        { props: 'Order_Num', label: '件数' },
        { props: 'Goods_Weight', label: '重量(T)' },
        { props: 'Order_Vol', label: '体积(m³)' },
        { props: 'Order_Spec', label: '规格' },
        { props: 'Order_End', label: '目的站' },
        { props: 'Order_Receive', label: '收货人' },
        { props: 'Receive_LinkTel', label: '联系电话' }
      ],
      net: {
        model: '',
        placeholder: '请选择网点',
        content: []
      },
      rules: {
        Transport_Platenumber: [
          { required: true, message: '请选择车牌号', trigger: 'change' }
        ],
        Transport_Driver: [
          { required: true, message: '请选择司机', trigger: 'change' }
        ],
        Transport_Tel: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[34578]\d{9}$/, message: '手机号码格式错误' }
        ]
      },
      rules1: {
        Transport_Endnet: [
          { required: true, message: '请选择发往', trigger: 'change' }
        ]
      },
      searchParams: {},
      contractTextarea: '',
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
        { props: 'Receive_LinkTel', label: '收货人电话', aaa: true },
        { props: 'Order_Memo', label: '备注', aaa: true }
      ],
      Description: '车载货物明细',
      // dialogPrint: false,
      sumPay: 0,
      sumPayment: 0,
      sumSend: 0,
      dialogTable: false,
      chooseData: [],
      chooseSelectionData: [],
      chooseProps: [
        { props: 'Goods_Name', label: '货物名称' },
        { props: 'Goods_Num', label: '件数' },
        { props: 'Goods_PickType', label: '提货方式' },
        { props: 'Goods_Price', label: '单价' },
        { props: 'Goods_Send', label: '始发地' },
        { props: 'Goods_Spec', label: '规格' },
        { props: 'Goods_Type', label: '库存类型' },
        { props: 'Goods_Vol', label: '体积' },
        { props: 'Goods_Weight', label: '重量' }
      ],
      chooseCarGoId: ''
    }
  },
  async created () {
    await this.firstShow()
    this.show()
  },
  methods: {
    liandong (a) {
      for (let b in this.mose.data[1].content) {
        if (this.mose.data[1].content[b].value.indexOf(a) !== -1) {
          this.mose.model.Transport_Tel = ''
          this.mose.model.Transport_Tel = this.mose.data[1].content[b].la
          return
        }
      }
    },
    async show () {
      let ts = await TransportShow({currentPage: this.currentPage, pageCount: this.pageCount, searchData: this.momo.model})
      if (ts.data.info === '' | ts.data.info === []) {
        this.tableData = []
      } else {
        this.tableData = ts.data.info
        // for (let i in ts.data.info) {
        //   this.$set(this.tableData, i, ts.data.info[i])
        // }
        this.total = ts.data.count
        this.tsSuper = ts.data.result
      }
      let tss = await TransportStartShow({searchData: this.searchParams})
      if (tss.data.info === '' | tss.data.info === []) {
        this.operateColumnPropsData = []
        this.badgeValue = 0
      } else {
        this.badgeValue = tss.data.info.length
        this.operateColumnPropsData = tss.data.info
        // for (let i in tss.data.info) {
        //   this.$set(this.operateColumnPropsData, i, tss.data.info[i])
        // }
      }
    },
    async firstShow () {
      let nn = await NetinfoNet()
      for (let ii in nn.data.info) {
        this.$set(this.momo.data[2].content, ii, {label: nn.data.info[ii].Net_Name})
      }
      let vs = await VehicleCarshow()
      // console.log(vs)
      for (let fc in vs.data.info) {
        this.mose.data[0].content[fc] = {la: vs.data.info[fc].Car_Vol, value: vs.data.info[fc].Car_Platenumber}
      }
      let ds = await Dirverdshow()
      for (let dfc in ds.data.info) {
        this.mose.data[1].content[dfc] = {la: ds.data.info[dfc].Dir_Tel, value: ds.data.info[dfc].Dir_Name}
      }
      let nin = await NetinfoNet()
      for (let fo in nin.data.info) {
        this.net.content[fo] = {value: nin.data.info[fo].Net_Name}
        this.contactModel.data[2].content[fo] = {label: nin.data.info[fo].Net_Name}
      }
    },
    async onSubmitOne () {
      this.rLoading = true
      await this.show()
      this.rLoading = false
    },
    handleSelectionChange (val) {
      this.multipleSelection = []
      this.multipleSelection = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.show()
    },
    peizaizhuangche () {
      this.mose.model = {
        Transport_Platenumber: '',
        Transport_Driver: '',
        Transport_Tel: '',
        Transport_Hire: '',
        Transport_LoadingCharge: ''
      }
      this.dialogVisibleOne = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        done()
      })
    },
    dispatchGo () {
      this.dialogVisibleTwo = true
      if (this.$refs['contactModel.model']) {
        this.$refs['contactModel.model'].resetFields()
      }
    },
    here (model) {},
    i (model) {},
    go (model) {},
    dispatch () {
      this.$refs.inputS.$refs['model'].validate(async (valid) => {
        if (valid) {
          this.dispatchLoading = true
          let oo = []
          for (let we in this.multipleSelection) {
            oo[we] = this.multipleSelection[we].Goods_Guid
          }
          this.mose.model['guid'] = oo
          if (this.tsSuper === '10') {
            this.net.model = ''
            this.superDialog = true
          } else {
            await this.show()
            // this.firstShow()
            this.facheNet()
            this.dialogVisibleOne = false
          }
          this.dispatchLoading = false
        } else {
          this.$message({
            showClose: true,
            message: '请按规则填写',
            type: 'warning'
          })
          this.dispatchLoading = false
        }
      })
    },
    async facheNet () {
      let tl = await TransportLoading(this.mose.model)
      if (tl.data.result === '1') {
        this.$message({
          showClose: true,
          message: tl.data.info,
          type: 'success'
        })
      } else {
        // this.$message({
        //   showClose: true,
        //   message: '失败',
        //   type: 'info'
        // })
      }
    },
    async netGo () {
      if (this.net.model) {
        this.nextLoading = true
        this.mose.model['Transport_Loadnet'] = this.net.model
        let tl = await TransportLoading(this.mose.model)
        if (parseInt(tl.data.result) === 1) {
          this.$message({
            showClose: true,
            message: tl.data.info,
            type: 'success'
          })
          await this.show()
          this.nextLoading = false
          this.superDialog = false
          this.dialogVisibleOne = false
        } else {
          this.nextLoading = false
          this.$message({
            showClose: true,
            message: tl.data.info,
            type: 'info'
          })
        }
      } else {
        this.$message({
          showClose: true,
          message: '请选择发车网点',
          type: 'info'
        })
      }
    },
    async handlePut (index, row) {
      let ss = await RecordPicGoodsShow({Transport_CargoId: row.Transport_CargoId})
      this.Datas = ss.data.info
      this.sumPay = 0
      this.sumPayment = 0
      for (let a in this.Datas) {
        this.sumPay = Number(this.sumPay) + Number(this.Datas[a].Order_Pay)
        this.sumPayment = Number(this.sumPayment) + Number(this.Datas[a].Order_Payment)
      }
      this.dialogPrint = true
      let sel = await PrintsShow()
      this.SelectPrint = sel.data.info.Print_Qingdanxuan
    },
    async handleContract (index, row) {
      this.$refs['contactModel.model'].validate(async(valid) => {
        if (valid) {
          let goData = row
          for (let go in this.contactModel.model) {
            goData[go] = this.contactModel.model[go]
          }
          goData['Transport_Contract'] = this.contractTextarea
          if (!this.contactModel.model.Transport_Insurance | !this.contactModel.model.Transport_Endnet) {
            this.$confirm('没有选择保险，是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async () => {
              let startGo = await TransportStart(goData)
              if (startGo.data.result === '1') {
                this.$message({
                  showClose: true,
                  message: startGo.data.info,
                  type: 'success'
                })
                if (this.$refs) {
                  this.$refs['contactModel.model'].resetFields()
                }
              } else {
                this.$message({
                  showClose: true,
                  message: '失败',
                  type: 'info'
                })
              }
              await this.show()
              // this.firstShow()
            }).catch(() => {})
          } else {
            let startGo = await TransportStart(goData)
            if (startGo.data.result === '1') {
              this.$message({
                showClose: true,
                message: startGo.data.info,
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: '失败',
                type: 'info'
              })
            }
            await this.show()
            // this.firstShow()
          }
        } else {
          return false
        }
      })
    },
    async handleXieche (index, row) {
      let tls = await TransportLoadingShow({Transport_CargoId: row.Transport_CargoId})
      this.chooseData = tls.data.info
      this.chooseCarGoId = row.Transport_CargoId
      this.chooseVisible = true
    },
    chooseSelection (val) {
      this.chooseSelectionData = val
    },
    async chooseGo () {
      if (this.chooseSelectionData.length) {
        this.chooseLoading = true
        let ur = []
        for (let z in this.chooseSelectionData) {
          ur.push(this.chooseSelectionData[z].Goods_Guid)
        }
        let tpu = await TransportUnload({Transport_CargoId: this.chooseCarGoId, Goods_Guid: ur})
        if (tpu.data.result === '1') {
          this.$message({
            showClose: true,
            message: tpu.data.info,
            type: 'success'
          })
          await this.show()
          this.chooseVisible = false
          // this.firstShow()
          this.chooseLoading = false
        } else {
          this.$message({
            showClose: true,
            message: '失败',
            type: 'success'
          })
          this.chooseLoading = false
        }
      } else {
        this.$message({
          showClose: true,
          message: '请选择要卸载的货物',
          type: 'info'
        })
      }
    },
    rowClick (row, event, column) {
      // console.log(row)
      this.phone = row.Transport_Tel
      this.carnum = row.Transport_Platenumber
      this.Nnet = row.Transport_Curnet
      this.Driver = row.Transport_Driver
      this.DriverID = row.Dir_IdNumber
      this.ordernum = row.Transport_OrderNum
      this.pay = row.Transport_Pay
      this.wlname = row.Logis_Name
      this.address = row.Transport_Curnet
      this.num = row.Transport_Num
      this.contactModel.model.Transport_Platenumber = row.Transport_Platenumber
    },
    // 打印
    Prints () {
      let yz = this.printSYZ()
      if (yz) {
        LODOP.PRINT_INIT('打印表格')
        LODOP.SET_PRINT_STYLE('FontSize', 9)
        LODOP.ADD_PRINT_HTM(0, 0, '100%', '100%', document.getElementById('xxx').innerHTML)
        LODOP.SET_PRINTER_INDEX(this.SelectPrint)
        LODOP.PRINT()
      }
    },
    PrintsView () {
      let yz = this.printSYZ()
      if (yz) {
        LODOP.PRINT_INIT('打印表格')
        LODOP.SET_PRINT_STYLE('FontSize', 9)
        LODOP.ADD_PRINT_HTM(0, 0, '100%', '100%', document.getElementById('xxx').innerHTML)
        LODOP.SET_PRINTER_INDEX(this.SelectPrint)
        LODOP.PREVIEW()
      }
    },
    handleHetong () {
      let yz = this.printSYZ()
      if (yz) {
        LODOP.PRINT_INIT('打印合同')
        LODOP.SET_PRINT_STYLE('FontSize', 9)
        LODOP.ADD_PRINT_HTM(0, 0, '100%', '100%', document.getElementById('hetong').innerHTML)
        LODOP.SET_PRINTER_INDEX(this.SelectPrint)
        LODOP.PRINT()
      }
    },
    printSYZ () {
      if ((LODOP == null) || (typeof (LODOP.VERSION) === 'undefined')) {
        this.judgeVisible = true
        return false
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
          return false
        } else {
          return true
        }
      }
    }
  }
}
</script>
<style scoped>
  .btnClass .el-button{
     background:#8c96d9;
     color: white
  }
  .btnClass .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
    background:#c4c4c6;
    border: 1px #9d9d9e solid;
    color:#ffffff
  }
  .shoufa {
    background:#d0d5f5;
    height: 40px;
    line-height: 40px;
    font-size:16px;
    border-radius: 5px;
  }
  .cheliangInfo {
    background:#8c96d9;
    height: 36px;
    color: white;
    line-height: 36px;
    border-radius: 5px;
  }
  p{
    text-align: left;
  }

</style>
<style>
/* .el-textarea__inner{
    height:200px
  } */
</style>

