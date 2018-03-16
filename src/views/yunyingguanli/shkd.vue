<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <el-row type="flex" justify="center" class="fhkd">
          <el-col>
            <el-row>
              <el-col :span="24">
                <el-form :inline="true" :model="formInline">
                    <el-form-item label="客户名称">
                      <el-input v-model="formInline.yundan" placeholder="客户名称" style="width:160px"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="query" :loading="queryLoading">查询</el-button>
                    </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" class="fhkdtable">
              <el-col :span="24">
                <el-row  type="flex" class="Ghead" justify="space-between">
                  <el-col :span="2" style="text-align:center">运单信息</el-col>
                  <el-col :span="3">
                    <el-button size="large"  type="text"  @click="dialogaddGo" style="color:white">
                      <i class="el-icon-plus"></i> 新增开单
                    </el-button>
                  </el-col>
                  <!-- <el-col :span="2"><el-button @click="Printsa">打印</el-button></el-col> -->
                </el-row>
                <el-row style="margin-top:20px">
                  <el-col>
                    <el-table
                      :data="tableData"
                      border
                      height="500"
                      style="width: 100%">
                      <el-table-column
                        align="center"
                        v-for="item in Info.shuju"
                        :key="item"
                        :prop="item.prop"
                        :label="item.label"
                        min-width="160px">
                      </el-table-column>
                      <el-table-column label="操作" fixed="right" width="160" align="center">
                        <template scope="scope">
                          <el-button
                            size="small"
                            :disabled="scope.row.Order_Operation == 1"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <!-- :disabled="Boolean(scope.row.Order_Operation)" :disabled="scope.row.Order_Operation == 1" -->
                          <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>

                </el-row>
              </el-col>
            </el-row>
            <br>
            <el-pagination
              style="text-align:center"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pageCount"
              layout="total, prev, pager, next"
              :total="total">
            </el-pagination>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- <add-dialog :dialogVisible="aaa" :all="all" :formInfo="formInfo"  @aaad="aaad" @submitForm="submitForm" @close="close()"></add-dialog> -->
     <el-dialog
      :visible.sync="dialogAdd"
      size="full"
      :before-close="handleClose">
      <addForm
        ref="addForm"
        :saveName = "saveName"
        :saveLoading = "saveLoading"
        :all="all" :formInfo="formInfo"
        :rules="rules"  @submitForm="submitForm"></addForm>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogEdit"
      v-if="dialogEdit"
      size="full"
      :before-close="handleClose">
      <addForm :saveLoading = "saveLoading" :saveName = "saveName1"  :all="all" :formInfo="formInfo" :rules="rules" @submitForm="editForm"></addForm>
    </el-dialog>
    <!-- <add-dialog :dialogVisible="aaa" :all="all" :formInfo="editinfo" @aaad="aaad" @close="close()"></add-dialog> -->
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
// import addDialog from '../../components/yunyingguanli/shkddialogadd'
import addForm from '../../components/yunyingguanli/ydfhform'
import {LODOP} from '../../../static/vendor/a'
// 选择打印机接口
import {asd, def} from './a.js'
import {PrintsShow} from '../../api/jichushezhi/dysz'
import { ProgrammeDefaultShow } from '../../api/jichushezhi/feilvshezhi.js'
import {RecorderTel, RecorderShow, RecorderAdd, RecorderDel, NetInfoNet, RecorderEdit, DictionaryShow, ProgrammeXianshi, NetinfoNetin, CominfoShow} from '../../api/yunyingguanli/shkd'
// import {RecorderShow, RecorderAdd, RecorderEdit, RecorderDel} from '../../api/yunyingguanli/shkd'
export default {
  components: {
    addForm
  },
  data () {
    var v1 = (rule, value, callback) => {
      if (!this.formInfo.Cost_AccountPaid) {
        this.formInfo.Cost_AccountPaid = 0
      }
      if (parseInt(this.formInfo.Order_Pay)) {
        this.formInfo.Cost_Unpaid = parseInt(this.formInfo.Order_Pay) - parseInt(this.formInfo.Cost_AccountPaid)
      } else {
        this.formInfo.Cost_Unpaid = 0
      }
      if (this.$refs.formInfo) {
        this.$refs.formInfo.validateField('Cost_AccountPaid')
        this.$refs.formInfo.validateField('Cost_Unpaid')
      }
      callback()
    }
    var v2 = (rule, value, callback) => {
      if (parseInt(this.formInfo.Order_Pay)) {
        if (parseInt(this.formInfo.Cost_AccountPaid)) {
          this.formInfo.Cost_Unpaid = parseInt(this.formInfo.Order_Pay) - parseInt(this.formInfo.Cost_AccountPaid)
        } else {
          this.formInfo.Cost_Unpaid = parseInt(this.formInfo.Order_Pay) - 0
        }
      } else {
        if (parseInt(this.formInfo.Cost_AccountPaid) | parseInt(this.formInfo.Cost_Unpaid)) {
          callback(new Error('请输入全程费用'))
        }
      }
      if (parseInt(this.formInfo.Order_Pay) < parseInt(this.formInfo.Cost_AccountPaid)) {
        callback(new Error('已付运费必须小于全程费用' + this.formInfo.Order_Pay + '元'))
      } else {
        callback()
      }
    }
    var v3 = (rule, value, callback) => {
      if (parseInt(this.formInfo.Order_Pay)) {
        if (parseInt(this.formInfo.Cost_Unpaid)) {
          this.formInfo.Cost_AccountPaid = parseInt(this.formInfo.Order_Pay) - parseInt(this.formInfo.Cost_Unpaid)
        } else {
          this.formInfo.Cost_AccountPaid = parseInt(this.formInfo.Order_Pay) - 0
        }
      } else {
        if (parseInt(this.formInfo.Cost_AccountPaid) | parseInt(this.formInfo.Cost_Unpaid)) {
          callback(new Error('请输入全程费用'))
        }
      }
      if (parseInt(this.formInfo.Order_Pay) < parseInt(this.formInfo.Cost_Unpaid)) {
        callback(new Error('已付运费必须小于全程费用' + this.formInfo.Order_Pay + '元'))
      } else {
        callback()
      }
    }
    var v4 = (rule, value, callback) => {
      if (this.rateC) {
        switch (this.rateB) {
          case '四舍五入':
            if (this.formInfo['Order_Insured']) {
              this.formInfo.Order_InsuredValue = Math.round(this.rateC * this.formInfo.Order_Insured / 1000)
            } else {
              this.formInfo['Order_InsuredValue'] = 0
            }
            break
          case '小数进位':
            if (this.formInfo['Order_Insured']) {
              this.formInfo.Order_InsuredValue = Math.ceil(this.rateC * this.formInfo.Order_Insured / 1000)
            } else {
              this.formInfo['Order_InsuredValue'] = 0
            }
            break
          case '取整':
            if (this.formInfo['Order_Insured']) {
              this.formInfo.Order_InsuredValue = parseInt(this.rateC * this.formInfo.Order_Insured / 1000)
            } else {
              this.formInfo['Order_InsuredValue'] = 0
            }
            break
          case '保留两位小数':
            if (this.formInfo['Order_Insured']) {
              this.formInfo.Order_InsuredValue = (this.rateC * this.formInfo.Order_Insured / 1000).toFixed(2)
            } else {
              this.formInfo['Order_InsuredValue'] = 0
            }
            break
          default:
            if (this.formInfo['Order_Insured']) {
              this.formInfo.Order_InsuredValue = (this.rateC * this.formInfo.Order_Insured / 1000).toFixed(2)
            } else {
              this.formInfo['Order_InsuredValue'] = 0
            }
            break
        }
      }
      callback()
    }
    var v5 = (rule, value, callback) => {
      if (!parseInt(this.formInfo.Order_Insured)) {
        if (this.rateC) {
          switch (this.rateB) {
            case '四舍五入':
              if (this.formInfo['Order_InsuredValue']) {
                this.formInfo.Order_Insured = Math.round(this.formInfo.Order_InsuredValue * 1000 / this.rateC)
              } else {
                this.formInfo['Order_Insured'] = 0
              }
              break
            case '小数进位':
              if (this.formInfo['Order_InsuredValue']) {
                this.formInfo.Order_Insured = Math.ceil(this.formInfo.Order_InsuredValue * 1000 / this.rateC)
              } else {
                this.formInfo['Order_Insured'] = 0
              }
              break
            case '取整':
              if (this.formInfo['Order_InsuredValue']) {
                this.formInfo.Order_Insured = parseInt(this.formInfo.Order_InsuredValue * 1000 / this.rateC)
              } else {
                this.formInfo['Order_Insured'] = 0
              }
              break
            case '保留两位小数':
              if (this.formInfo['Order_InsuredValue']) {
                this.formInfo.Order_Insured = (this.formInfo.Order_InsuredValue * 1000 / this.rateC).toFixed(2)
              } else {
                this.formInfo['Order_Insured'] = 0
              }
              break
            default:
              if (this.formInfo['Order_InsuredValue']) {
                this.formInfo.Order_Insured = (this.formInfo.Order_InsuredValue * 1000 / this.rateC).toFixed(2)
              } else {
                this.formInfo['Order_Insured'] = 0
              }
              break
          }
        }
      }
      callback()
    }
    var v6 = async (rule, value, callback) => {
      let rt = await RecorderTel({phone: this.formInfo.Receive_LinkTel})
      if (rt.data.info) {
        this.formInfo.Receive_Contract = rt.data.info.Consignor_Contract
      }
      callback()
    }
    var v7 = async (rule, value, callback) => {
      let rt = await RecorderTel({phone: this.formInfo.Order_ConTel})
      if (rt.data.info) {
        this.formInfo.Order_ProName = rt.data.info.Consignor_Poundage ? rt.data.info.Consignor_Poundage : ''
        this.formInfo.Consignor_Contract = rt.data.info.Consignor_Contract ? rt.data.info.Consignor_Contract : ''
      } else {
        this.formInfo.Consignor_Contract = ''
        let response = await ProgrammeDefaultShow()
        for (let de in response.data.info) {
          if (response.data.info[de].Pro_Default === '1') {
            this.formInfo.Order_ProName = response.data.info[de].Pro_Name
          }
        }
      }
      callback()
    }
    return {
      saveLoading: false,
      saveName: '保存并继续',
      saveName1: '保存',
      rateB: '',
      rateC: '',
      queryLoading: false,
      judgeVisible: false,
      dialogAdd: false,
      dialogEdit: false,
      formInline: {
        yundan: ''
      },
      aaa: false,
      tableData: [],
      Info: {
        shuju: [
          {prop: 'Order_BillID', label: '运单号', width: '160'},
          {prop: 'Order_Send', label: '始发站', width: '100'},
          {prop: 'Order_End', label: '目的站', width: '100'},
          {prop: 'Order_Goods', label: '货名', width: '100'},
          {prop: 'Order_Num', label: '件数(件)', width: '100'},
          {prop: 'Order_Consignor', label: '发货人', width: '100'},
          {prop: 'Order_ConTel', label: '发货人电话', width: '120'},
          {prop: 'Order_Receive', label: '收货人', width: '100'},
          {prop: 'Receive_LinkTel', label: '收货人电话', width: '120'},
          {prop: 'Order_Pay', label: '运费', width: '100'},
          {prop: 'Order_PayType', label: '运费方式', width: '100'},
          {prop: 'Order_BaseTime', label: '开票时间', width: '100'},
          {prop: 'Order_TransferPay', label: '中转费用', width: '100'},
          {prop: 'Order_Payment', label: '货款', width: '100'},
          {prop: 'Order_PaymentType', label: '货款方式', width: '100'},
          {prop: 'Order_PickType', label: '提货方式', width: '100'},
          {prop: 'Order_Nowstate', label: '运单状态', width: '100'}
        ],
        ziduan: {
          'Order_BillID': '',
          'Order_Send': '',
          'Order_End': '',
          'Order_Goods': '',
          'Order_Num': '',
          'Order_Consignor': '',
          'Order_ConTel': '',
          'Order_Receive': '',
          'Receive_LinkTel': '',
          'Order_Pay': '1',
          'Order_PayType': '',
          'Order_BaseTime': '',
          'Order_TransferPay': '',
          'Order_Payment': '',
          'Order_PaymentType': '',
          'Order_PickType': '',
          'Order_Nowstate': ''
        }
      },
      // 第一行
      all: {
        first: {
          data: [
            {prop: 'Order_Billnet', label: '开票网点', placeholder: '请输入开票网点', input: '', select: true, content: []},
            {prop: 'Order_End', label: '目的站', placeholder: '请输入目的站', input: '', select: true, content: []},
            {prop: 'Order_GoodsCode', label: '货号', placeholder: '请输入货号', input: true, select: '', content: []}
          ]
        },
        // 收货方
        third: {
          data: [
            {prop: 'Order_Receive', label: '姓名', placeholder: '请输入姓名', input: true, select: false, content: []},
            {prop: 'Receive_LinkTel', label: '电话', placeholder: '请输入电话', input: true, select: false, content: []},
            {prop: 'Receive_Address', label: '地址', placeholder: '请输入地址', input: true, select: false, content: []},
            {prop: 'Receive_Contract', label: '合同号', placeholder: '请输入合同号', input: true, select: false, content: []}
          ]
        },
        // 发货方
        fourth: {
          data: [
            {prop: 'Order_Consignor', label: '姓名', placeholder: '请输入姓名', input: true, select: false, content: []},
            {prop: 'Order_ConTel', label: '电话', placeholder: '请输入电话', input: true, select: false, content: []},
            {prop: 'Consignor_Address', label: '地址', placeholder: '请输入地址', input: true, select: false, content: []},
            {prop: 'Consignor_Contract', label: '合同号', placeholder: '请输入合同号', input: true, select: false, content: []}
          ]
        },
        // 货物信息
        fifth: {
          data: [
            {prop: 'Order_Goods', label: '货物名称', placeholder: '请输入货物名称', input: true, select: false, content: []},
            {prop: 'Order_Num', label: '件数', placeholder: '请输入件数', input: true, select: false, content: []},
            {prop: 'Order_Package', label: '包装', placeholder: '请选择包装', input: false, select: true, content: []},
            {prop: 'Order_Weight', label: '重量(T)', placeholder: '请输入重量', input: true, select: false, content: []},
            {prop: 'Order_Vol', label: '体积(m³)', placeholder: '请输入体积', input: true, select: false, content: []},
            {prop: 'Order_Spec', label: '规格', placeholder: '请输入规格', input: true, select: false, content: []},
            {prop: 'Goods_Price', label: '单价(元)', placeholder: '请输入单价', input: true, select: false, content: []}
          ]
        },
        // 费用结算
        sixth: {
          data: [
            {prop: 'Order_Pay', label: '全程费用(元)', placeholder: '请输入全程费用', input: true, select: false, content: []},
            {prop: 'Order_PayType', label: '运费方式', placeholder: '请选择运费方式', input: false, select: true, content: []},
            {prop: 'Cost_AccountPaid', label: '已付运费(元)', placeholder: '请输入已付运费', input: true, select: false, content: []},
            {prop: 'Cost_Unpaid', label: '未付运费(元)', placeholder: '请选择未付运费', input: true, select: false, content: []},
            {prop: 'Order_Payment', label: '代收货款(元)', placeholder: '请输入代收货款', input: true, select: false, content: []},
            {prop: 'Order_PaymentType', label: '代收货款方式', placeholder: '请选择代收货款方式', input: false, select: true, content: []},
            {prop: 'Order_PickType', label: '提货方式', placeholder: '请选择提货方式', input: false, select: true, content: [{label: '送货'}, {label: '自提'}]},
            {prop: 'Order_ProName', label: '手续费方案', placeholder: '请选择手续费方案', input: false, select: true, content: []}
          ]
        },
        seventh: {
          data: [
            {prop: 'Order_ReceiptCode', label: '回单号', placeholder: '请输入回单号', input: false, select: false, content: [], radios: true},
            {prop: 'Order_Insured', label: '保价(元)', placeholder: '请输入保价', input: true, select: false, content: []},
            {prop: 'Order_InsuredValue', label: '保价费(元)', placeholder: '请输入保价费', input: true, select: false, content: []},
            {prop: 'Order_Memo', label: '备注', placeholder: '请选择', input: true, select: '', content: []}
          ]
        },
        eighth: {
          data: [
            {prop: 'Cost_Rebate', label: '回扣', placeholder: '回扣', input: true, select: false, content: []},
            {prop: 'Cost_Startcost', label: '始发中转费', placeholder: '始发中转费', input: true, select: false, content: []},
            {prop: 'Cost_Endcost', label: '下站中转费', placeholder: '下站中转费', input: true, select: false, content: []},
            {prop: 'Cost_Delivery', label: '接货费', placeholder: '接货费', input: true, select: false, content: []},
            {prop: 'Cost_Give', label: '送货费', placeholder: '送货费', input: true, select: false, content: []},
            {prop: 'Cost_Loading', label: '装车费', placeholder: '装车费', input: true, select: false, content: []},
            {prop: 'Cost_Unload', label: '卸车费', placeholder: '卸车费', input: true, select: false, content: []},
            {prop: 'Cost_Forklift', label: '叉车费', placeholder: '叉车费', input: true, select: false, content: []},
            {prop: 'Cost_Packing', label: '包装费', placeholder: '包装费', input: true, select: false, content: []},
            {prop: 'Cost_Message', label: '信息费', placeholder: '信息费', input: true, select: false, content: []},
            {prop: 'Cost_Billing', label: '开票费', placeholder: '开票费', input: true, select: false, content: []}
          ]
        }
      },
      formInfo: {
        Order_Billnet: '',
        Order_End: '',
        Order_GoodsCode: '',
        Order_Receive: '',
        Receive_LinkTel: '',
        Receive_Address: '',
        Receive_Contract: '',
        Order_Consignor: '',
        Order_ConTel: '',
        Consignor_Address: '',
        Consignor_Contract: '',
        Order_Goods: '',
        Order_Num: '',
        Order_Package: '',
        Order_Weight: '',
        Order_Vol: '',
        Order_Spec: '',
        Goods_Price: '',
        Order_Pay: '',
        Cost_AccountPaid: '',
        Cost_Unpaid: '',
        Order_Payment: '',
        Order_PaymentType: '',
        Order_ProName: '',
        Order_PickType: '',
        Order_ReceiptCode: '',
        Order_Memo: '',
        Order_PayType: '',
        Order_Insured: '',
        Order_InsuredValue: '',
        Cost_Rebate: '',
        Cost_Startcost: '',
        Cost_Endcost: '',
        Cost_Delivery: '',
        Cost_Give: '',
        Cost_Unload: '',
        Cost_Forklift: '',
        Cost_Packing: '',
        Cost_Message: '',
        Cost_Billing: '',
        num1: ''
      },
      editinfo: {},
      total: 0,
      currentPage: 1,
      pageCount: 10,
      rules: {
        Order_Insured: [
          {pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字'},
          { validator: v4, trigger: 'blur' }
        ],
        Order_InsuredValue: [
          {pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字'},
          { validator: v5, trigger: 'blur' }
        ],
        Order_Billnet: [
          { required: true, message: '请选择开票网点', trigger: 'change' }
        ],
        Order_End: [
          { required: true, message: '请选择目的站', trigger: 'change' }
        ],
        Order_Receive: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        Receive_LinkTel: [
          { required: true, message: '请输入电话', trigger: 'change' },
          { pattern: /^1[34578]\d{9}$/, message: '手机号码格式错误' },
          { validator: v6, trigger: 'blur' }
        ],
        Receive_Address: [
          { required: true, message: '请输入地址', trigger: 'change' }
        ],
        Order_Consignor: [
          { required: true, message: '请输入姓名', trigger: 'change' }
        ],
        Order_ConTel: [
          { required: true, message: '请输入电话', trigger: 'change' },
          { pattern: /^1[34578]\d{9}$/, message: '手机号码格式错误' },
          { validator: v7, trigger: 'blur' }
        ],
        Consignor_Address: [
          { required: true, message: '请输入地址', trigger: 'change' }
        ],
        Order_Goods: [
          { required: true, message: '请输入货物名称', trigger: 'change' }
        ],
        Order_Num: [
          { required: true, message: '请输入件数', trigger: 'change' }
        ],
        Order_Vol: [
          {pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字'}
        ],
        Order_Weight: [
          {pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字'}
        ],
        Goods_Price: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Order_Pay: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' },
          { validator: v1, trigger: 'change' }
        ],
        Cost_AccountPaid: [
          { pattern: /^\d+$/, message: '请输入数字' },
          { validator: v2, trigger: 'change' }
        ],
        Cost_Unpaid: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' },
          { validator: v3, trigger: 'change' }
        ],
        Order_Payment: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Rebate: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Startcost: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Endcost: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Delivery: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Give: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Loading: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Unload: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Forklift: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Packing: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Message: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ],
        Cost_Billing: [
          { pattern: /^\d*\.?\d{1,3}$/, message: '请输入数字' }
        ]
      },
      SelectPrint: '',
      SelectPrintB: '',
      LogName: '',
      LogTel: '',
      checked2: false,
      checked1: false
    }
  },
  async created () {
    await this.firstShow()
    this.showData()
    // this.formInfo = Object.assign(this.firstInfo.model, this.secondInfo.model, this.thirdInfo.model, this.fourthInfo.model, this.fifthInfo.model, this.sixthInfo.model, this.seventhInfo.model, this.eighthInfo.model)
  },
  methods: {
    // 接口
    async showData () {
      let RecorderShowRes = await RecorderShow({currentPage: this.currentPage, pageCount: this.pageCount, searchData: this.formInline.yundan})
      if (RecorderShowRes.data.info === '') {
        this.tableData = []
      } else {
        this.tableData = RecorderShowRes.data.info
        this.total = RecorderShowRes.data.count
      }
    },
    async Adddata () {
      this.saveLoading = true
      if (this.formInfo.Order_Payment === '') {
        this.formInfo.Order_Payment = 0
      }
      let RecorderAddRes = await RecorderAdd(this.formInfo)
      if (parseInt(RecorderAddRes.data.result)) {
        this.$message({
          showClose: true,
          message: RecorderAddRes.data.info,
          type: 'success'
        })
        if (this.checked2) {
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
              let x = RecorderAddRes.data.info2
              asd(x.Logistic_Name, x.Order_BillID, x.Order_GoodsCode, x.Order_BaseTime, x.Order_Send, x.Logistic_STel, x.Order_End, x.Logistic_ETel, x.Order_Receive, x.Receive_LinkTel, x.Order_Goods, x.Order_Num, x.Order_Package, x.Order_Pay, x.Order_PayType, x.Order_Payment, x.Order_PaymentType, x.Cost_Give, x.Cost_Insured, x.heji, x.Order_Consignor, x.Order_ConTel, x.Advertisement_Content)
              LODOP.SET_PRINTER_INDEX(this.SelectPrint)
              LODOP.PRINT()
            }
          }
        }
        if (this.checked1) {
          if ((LODOP == null) || (typeof (LODOP.VERSION) === 'undefined')) {
            this.judgeVisible = true
          } else {
            let zArr = []
            for (let i = 0; i <= LODOP.GET_PRINTER_COUNT(); i++) {
              this.$set(zArr, i, LODOP.GET_PRINTER_NAME(i))
            }
            let ZR = zArr.find((value, index, arr) => {
              return value === this.SelectPrintB
            })
            if (!ZR) {
              this.$message({
                showClose: true,
                message: '打印机连接失败,请确认打印机是否正确连接',
                type: 'info',
                delay: 7000
              })
            } else {
              let x = RecorderAddRes.data.info2
              // let a = '\\UHSERVER\\Brother DCP-7055 Printer'
              def(x.Logistic_Name, x.Order_Send, x.Order_End, x.Order_BillID, x.Order_Num, x.Order_Receive)
              LODOP.SET_PRINTER_INDEX(this.SelectPrintB)
              // LODOP.SET_PRINT_COPIES(this.formInfo.Order_Num)
              // LODOP.SET_PRINTER_INDEX(a)
              // LODOP.PRINT_DESIGN()
              LODOP.PRINT()
            }
          }
        }
        await this.showData()
        this.saveLoading = false
      } else {
        this.saveLoading = false
        this.$message({
          showClose: true,
          message: '失败',
          type: 'info'
        })
      }
    },
    async Deldata () {
      let RecorderDelRes = await RecorderDel({Order_Guid: this.formInfo.Order_Guid})
      if (RecorderDelRes.data.result === '1') {
        this.$message({
          showClose: true,
          message: RecorderDelRes.data.info,
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: '失败',
          type: 'info'
        })
      }
    },
    async firstShow () {
      let cs = await CominfoShow()
      this.rateB = cs.data.info.Logis_Point
      this.rateC = cs.data.info.Logistic_Rate
      let nin = await NetInfoNet()
      if (nin.data.info === '') {} else {
        for (let ni in nin.data.info) {
          // this.all.first.data[0].content[ni] = {label: nin.data.info[ni].Net_Name}
          this.all.first.data[1].content[ni] = {label: nin.data.info[ni].Net_Name}
        }
      }
      let nis = await NetinfoNetin()
      if (nis.data.info === '') {} else {
        for (let ni in nis.data.info) {
          this.all.first.data[0].content[ni] = {label: nis.data.info[ni].Net_Name}
        }
      }
      let ds = await DictionaryShow({Dic_Remarks: '包装'})
      for (let i in ds.data.info) {
        this.all.fifth.data[2].content[i] = { label: ds.data.info[i].Dic_Title }
      }
      let hkfs = await DictionaryShow({Dic_Remarks: '货款方式'})
      for (let j in hkfs.data.info) {
        this.all.sixth.data[5].content[j] = { label: hkfs.data.info[j].Dic_Title }
      }
      let yffs = await DictionaryShow({Dic_Remarks: '运费方式'})
      for (let z in yffs.data.info) {
        this.all.sixth.data[1].content[z] = { label: yffs.data.info[z].Dic_Title }
      }
      let pgs = await ProgrammeXianshi()
      for (let v in pgs.data.info) {
        this.all.sixth.data[7].content[v] = { label: pgs.data.info[v].Pro_Name }
      }
      // 调用打印机接口
      let sel = await PrintsShow()
      // console.log('打印机', sel)
      this.SelectPrint = sel.data.info.Print_Xiaopiaoxuan
      this.SelectPrintB = sel.data.info.Print_Biaoqianxuan
    },
    async query () {
      this.queryLoading = true
      await this.showData()
      this.queryLoading = false
    },
    handleEdit (index, row) {
      Object.assign(this.formInfo, row)
      this.showData()
      this.dialogEdit = true
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.showData()
    },
    handleDelete (index, row) {
      this.formInfo = row
      this.Deldata()
      this.showData()
    },
    resetAll () {
      this.formInfo = {
        Order_Billnet: '',
        Order_End: '',
        Order_GoodsCode: '',
        Order_Receive: '',
        Receive_LinkTel: '',
        Receive_Address: '',
        Receive_Contract: '',
        Order_Consignor: '',
        Order_ConTel: '',
        Consignor_Address: '',
        Consignor_Contract: '',
        Order_Goods: '',
        Order_Num: '',
        Order_Package: '',
        Order_Weight: '',
        Order_Vol: '',
        Order_Spec: '',
        Goods_Price: '',
        Order_Pay: '',
        Cost_AccountPaid: '',
        Cost_Unpaid: '',
        Order_Payment: '',
        Order_PaymentType: '',
        Order_ProName: '',
        Order_PickType: '',
        Order_ReceiptCode: '',
        Order_Memo: '',
        Order_PayType: '',
        Order_Insured: '',
        Order_InsuredValue: '',
        Cost_Rebate: '',
        Cost_Startcost: '',
        Cost_Endcost: '',
        Cost_Delivery: '',
        Cost_Give: '',
        Cost_Unload: '',
        Cost_Forklift: '',
        Cost_Packing: '',
        Cost_Message: '',
        Cost_Billing: '',
        num1: ''
      }
    },
    dialogaddGo () {
      this.resetAll()
      if (this.$refs.addForm) {
        this.$refs.addForm.$refs['formInfo'].resetFields()
      }
      if (this.all.first.data[0].content.length === 1) {
        this.formInfo.Order_Billnet = this.all.first.data[0].content[0].label
      }
      this.dialogAdd = true
    },
    async submitForm (model, model1, c, d) {
      this.checked1 = c
      this.checked2 = d
      await this.Adddata()
      if (this.$refs.addForm.$refs['formInfo']) {
        this.$refs.addForm.$refs['formInfo'].resetFields()
      }
      // this.dialogAdd = false
    },
    async editForm (model, all, c, d, n) {
      let rde = await RecorderEdit(model)
      // console.log(n)
      if (rde.data.result === '1') {
        this.$message({
          showClose: true,
          message: rde.data.info,
          type: 'success'
        })
        if (d) {
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
              let x = rde.data.info2
              // let a = '\\UHSERVER\\Brother DCP-7055 Printer'
              asd(x.Logistic_Name, x.Order_BillID, x.Order_GoodsCode, x.Order_BaseTime, x.Order_Send, x.Logistic_STel, x.Order_End, x.Logistic_ETel, x.Order_Receive, x.Receive_LinkTel, x.Order_Goods, x.Order_Num, x.Order_Package, x.Order_Pay, x.Order_PayType, x.Order_Payment, x.Order_PaymentType, x.Cost_Give, x.Cost_Insured, x.heji, x.Order_Consignor, x.Order_ConTel, x.Advertisement_Content)
              LODOP.SET_PRINTER_INDEX(this.SelectPrint)
              // LODOP.SET_PRINTER_INDEX(a)
              LODOP.PRINT()
            }
          }
        } else {}
        if (c) {
          if ((LODOP == null) || (typeof (LODOP.VERSION) === 'undefined')) {
            this.judgeVisible = true
          } else {
            let zArr = []
            for (let i = 0; i <= LODOP.GET_PRINTER_COUNT(); i++) {
              this.$set(zArr, i, LODOP.GET_PRINTER_NAME(i))
            }
            let ZR = zArr.find((value, index, arr) => {
              return value === this.SelectPrintB
            })
            if (!ZR) {
              this.$message({
                showClose: true,
                message: '打印机连接失败,请确认打印机是否正确连接',
                type: 'info',
                delay: 7000
              })
            } else {
              let x = rde.data.info2
              // let a = '\\UHSERVER\\Brother DCP-7055 Printer'
              // console.log(x)
              def(x.Logistic_Name, x.Order_Send, x.Order_End, x.Order_BillID, x.Order_Num, x.Order_Receive, x.num1)
              LODOP.SET_PRINTER_INDEX(this.SelectPrintB)
              LODOP.SET_PRINT_COPIES(model.Order_Num)
              // LODOP.SET_PRINTER_INDEX(a)
              LODOP.PRINT_DESIGN()
              // LODOP.PRINT()
            }
          }
        }
      } else {
        this.$message({
          showClose: true,
          message: '失败',
          type: 'info'
        })
      }
      this.showData()
      this.dialogEdit = false
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        if (this.$refs['formInfo']) {
          this.$refs['formInfo'].resetFields()
        }
        done()
      })
    }
  }
}
</script>
<style>
.fhkd{margin-top: 20px}
/* .fhkd .fhkdtable {border: 1px solid #d0d5f5;} */
.fhkdtable .el-table th {
    background: #8c96d9;
  }
.fhkdtable .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
    background: #8c96d9;
    color: white
}
.fhkdtable .el-table__fixed-header-wrapper thead div{
    background: #8c96d9;
    color: white
  }
/* .fhkd .fhkdtable .fhkdtabletit{background:#d0d5f5;height: 40px;line-height: 40px} */

</style>
<style scoped>
  .Ghead {
    background:  #8c96d9;
    height: 40px;
    line-height: 40px;
     color: white
  }
</style>
