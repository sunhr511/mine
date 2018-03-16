<template>
  <div>
    <el-row type="flex" justify="center" class="zxjdzaixian">
      <el-col :span="23">
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-row>
              <el-col :span="24">
                <div class="zxjdtop">
                  <el-row class="zxjdtoptit">
                    <el-col :span="3">&nbsp;&nbsp;在线运单信息</el-col>
                    <el-col :span="8" :offset="13">
                      <el-radio-group v-model="radio" @change="radioIndex">
                        <el-radio :label="1">显示所有运单</el-radio>
                        <el-radio :label="2">显示本公司运单</el-radio>
                      </el-radio-group>
                      &nbsp;&nbsp;&nbsp;
                      <el-button @click="allReceive" v-if="radio === 2">全部承接</el-button>
                    </el-col>
                  </el-row>

                  <el-row class="zxjdtopcon" type="flex" justify="center">
                    <el-col :span="23">
                      <el-table
                        :data="anybodyData"
                        border
                        height="260"
                       @selection-change="handleSelectionChange">
                      <el-table-column
                        type="selection"
                        width="55">
                      </el-table-column>
                      <el-table-column
                        show-overflow-tooltip
                        min-width="200px"
                        align="center"
                        v-for="(item, index) in jiedan.shuju"
                        :key="index"
                        :prop="item.props"
                        :label="item.label"
                      >
                      </el-table-column>
                      <el-table-column align="center" label="操作" width="160px" fixed="right">
                          <template scope="scope">
                            <el-button
                              size="small"
                              @click="handleCheng(scope.$index, scope.row)">承接</el-button>
                            <el-button
                              v-if="radio===2"
                              size="small"
                              type="danger"
                              @click="handleDelete(scope.$index, scope.row)">拒绝</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
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
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="margin:10px 0px" type="flex" justify="center"><el-col :span="23"> </el-col></el-row>
    <el-row type="flex" justify="center" class="zxjdzaixian">
      <el-col :span="23">
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-row>
              <el-col :span="24">
                <div class="zxjdbot">
                  <el-row class="zxjdbottit">
                    <el-col :span="3">&nbsp;&nbsp;承接运单信息</el-col>
                  </el-row>
                  <el-row class="zxjdbotcon" type="flex" justify="center">
                    <el-col :span="23">
                      <el-table
                        :data="receiveData"
                        border
                        style="width: 100%;"
                        height="260"
                        >

                       <el-table-column type="expand" align="center">
                        <template scope="scope">
                          <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item v-for="item in chengjie.shuju" :key="item" v-if="!item.aaa" :label="item.label">
                              <span>{{ scope.row[item.props] }}</span>
                            </el-form-item>
                          </el-form>
                        </template>
                      </el-table-column>
                      <el-table-column
                        show-overflow-tooltip
                       align="center"
                        min-width="200px"
                        v-for="(item, index) in chengjie.shuju"
                        v-if="item.aaa"
                        :key="index"
                        :prop="item.props"
                        :label="item.label"
                      >
                      </el-table-column>
                      <el-table-column  align="center"  label="操作" width="260px" fixed="right">
                          <template scope="scope">
                            
                            <el-button
                              size="small"
                              type="warning"
                              :disabled="scope.row.result == 1"
                              @click="handlePrint(scope.$index, scope.row, 0)">分派</el-button>
                            <el-button
                              :disabled="scope.row.result == 1"
                              size="small"
                              type="danger"
                              @click="handlePrint(scope.$index, scope.row, 1)">拒绝</el-button>
                            <el-button
                              size="small"
                              type="info"
                              :disabled="scope.row.result == 1"
                              @click="transferDot(scope.$index, scope.row)">转接</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-pagination
                        style="text-align:center"
                        @current-change="handleCurrentChange1"
                        :current-page.sync="currentPage1"
                        :page-size="pageCount1"
                        layout="total, prev, pager, next"
                        :total="total1">
                      </el-pagination>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- <el-dialog
      title="分派网点"
      :visible.sync="dialogVisible"
      size="tiny">
      <el-select v-model="value" placeholder="请选择网点">
        <el-option
          v-for="item in options"
          :key="item.label"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="okGo">确 定</el-button>
      </span>
    </el-dialog> -->
    <el-dialog
      title="转接网点"
      :visible.sync="transferVisible"
      size="mini" style="text-align:center">
      <el-select v-model="transferValue.Net_Name" placeholder="请选择网点">
        <el-option
          v-for="item in all.first.data[1].content"
          :key="item.label"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
      <el-button :loading="transferLoading" type="primary" @click="transferGo">确 定</el-button>
      
    </el-dialog>
    <el-dialog
      title="分派网点"
      :visible.sync="dialogVisible"
      size="full">
      <addForm
      :saveName = "saveName"
      :saveLoading = "saveLoading"
      :printTF = "true"
      ref="addForm"
      :all="all" :formInfo="formInfo"
      :rules="rules" @submitForm="editForm" ></addForm>
    </el-dialog>
  </div>
</template>
<script>
import addForm from '../../components/yunyingguanli/ydfhform'
import store from '../../store/store.js'
import {payamount} from '../../api/top.js'
import { ProgrammeDefaultShow } from '../../api/jichushezhi/feilvshezhi.js'
import {OrderShow, OrderAllshow, OrderPubedit, OrderMyorder, OrderEdit, OrderDel, NetinfoNet, OrderDistribution, OrderDeldel, OrderZhuanjie} from '../../api/yunyingguanli/zxjd'
import {RecorderTel, NetInfoNet, DictionaryShow, ProgrammeXianshi, NetinfoNetin, CominfoShow} from '../../api/yunyingguanli/shkd'
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
      transferLoading: false,
      transferValue: {
        Net_Name: ''
      },
      transferVisible: false,
      saveLoading: false,
      saveName: '保存',
      rateC: '',
      msg: '在线接单',
      multipleSelection: [],
      radio: 2,
      jiedan: {
        shuju: [
          { props: 'Order_BillID', label: '运单号' },
          { props: 'Order_Send', label: '起运地' },
          { props: 'Order_End', label: '发往' },
          { props: 'Order_Goods', label: '货物名称' },
          { props: 'Order_Weight', label: '重量(T)' },
          { props: 'Order_Vol', label: '体积(m³)' },
          { props: 'Order_Spec', label: '规格' },
          { props: 'Order_Mode', label: '是否上门取货' },
          { props: 'Order_Freight', label: '运费区间' },
          { props: 'Order_PickType', label: '提货方式' },
          { props: 'Order_Payment', label: '代收货款' },
          { props: 'Order_Memo', label: '备注' }
        ],
        model: {
          Order_BillID: '',
          Order_Send: '',
          Order_End: '',
          Order_Goods: '',
          Order_Weight: '',
          Order_Vol: '',
          Order_Spec: '',
          Order_Mode: '',
          Order_Freight: '',
          Order_PickType: '',
          Order_Payment: '',
          Order_Memo: ''
        }
      },
      chengjie: {
        shuju: [
          { props: 'Order_BillID', label: '运单号', aaa: true },
          { props: 'Order_Send', label: '起运地', aaa: true },
          { props: 'Order_End', label: '发往', aaa: true },
          { props: 'Order_Goods', label: '货物名称', aaa: true },
          { props: 'Order_Consignor', label: '发货人', aaa: true },
          { props: 'Order_ConsignorTel', label: '发货人电话', aaa: true },
          { props: 'Order_Receive', label: '收货人', aaa: true },
          { props: 'Receive_LinkTel', label: '收货人电话', aaa: true },
          { props: 'Order_Freight', label: '运费区间', aaa: true },
          { props: 'Order_LogisStates', label: '运单状态', aaa: true },
          { props: 'Order_Weight', label: '重量(T)', aaa: false },
          { props: 'Order_Vol', label: '体积(m³)', aaa: false },
          { props: 'Order_Spec', label: '规格', aaa: false },
          { props: 'Order_Mode', label: '是否上门取货', aaa: false },
          { props: 'Order_PickType', label: '提货方式', aaa: false },
          { props: 'Order_Payment', label: '代收货款', aaa: false },
          { props: 'Order_Memo', label: '备注', aaa: false }
        ],
        model: {
          'Order_BillID': '',
          'Order_Send': '',
          'Order_End': '',
          'Order_Goods': '',
          'Order_Consignor': '',
          'Order_ConsignorTel': '',
          'Order_Receive': '',
          'Receive_LinkTel': '',
          'Order_Freight': '',
          'Order_LogisStates': '',
          'Order_Weight': '',
          'Order_Vol': '',
          'Order_Spec': '',
          'Order_Mode': '',
          'Order_PickType': '',
          'Consignor_Payment': '',
          'Order_Memo': ''
        }
      },
      total: 0,
      currentPage: 1,
      pageCount: 5,
      total1: 0,
      currentPage1: 1,
      pageCount1: 5,
      anybodyData: [],
      receiveData: [],
      benTotal: '',
      allTotal: '',
      benData: [],
      allData: [],
      value: '',
      options: [],
      dialogVisible: false,
      rowGoOn: {},
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
        Cost_Billing: ''
      }
    }
  },
  created () {
    this.allShow()
    this.firstShow()
  },
  methods: {
    async allShow () {
      await this.showData()
      this.showAllData()
      await this.showReceiveData()
    },
    async showData () {
      let ben = await OrderShow({currentPage: this.currentPage, pageCount: this.pageCount})
      this.benData = ben.data.info
      this.benTotal = ben.data.count
      // ----------------------
      if (this.radio === 2) {
        this.anybodyData = this.benData
        this.total = this.benTotal
      }
    },
    async showAllData () {
      let all = await OrderAllshow({currentPage: this.currentPage, pageCount: this.pageCount})
      this.allData = all.data.info
      this.allTotal = all.data.count
      // ----------------------
      if (this.radio === 1) {
        this.anybodyData = this.allData
        this.total = this.allTotal
      }
    },
    async showReceiveData () {
      let omo = await OrderMyorder({currentPage: this.currentPage1, pageCount: this.pageCount1})
      this.receiveData = omo.data.info
      this.total1 = omo.data.count
    },
    async allReceive () {
      if (this.radio === 2) {
        if (this.multipleSelection.length) {
          let wo = []
          for (let we in this.multipleSelection) {
            wo[we] = this.multipleSelection[we].Order_BillID
          }
          let oe = await OrderEdit(wo)
          if (oe.data.result === '1') {
            this.showData()
            this.showMoney()
            this.$message({
              showClose: true,
              message: oe.data.info,
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: oe.data.info,
              type: 'error'
            })
          }
          this.showReceiveData()
        } else {
          this.$message({
            showClose: true,
            message: '请选择要承接的运单',
            type: 'info'
          })
        }
      }
    },
    handleCurrentChange (val) {
      this.currentPage = val
      if (this.radio === 2) {
        this.showData()
      } else {
        this.showAllData()
      }
    },
    handleCurrentChange1 (val) {
      this.currentPage1 = val
      this.showReceiveData()
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 承接
    async handleCheng (index, row) {
      if (this.radio === 1) {
        let ope = await OrderPubedit([row.Order_BillID])
        if (ope.data.result === '1') {
          this.showAllData()
          this.showMoney()
          this.$message({
            showClose: true,
            message: ope.data.info,
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: ope.data.info,
            type: 'error'
          })
        }
      } else {
        let oe = await OrderEdit([row.Order_BillID])
        if (oe.data.result === '1') {
          this.showData()
          this.showMoney()
          this.$message({
            showClose: true,
            message: oe.data.info,
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: oe.data.info,
            type: 'error'
          })
        }
      }
      this.showReceiveData()
    },
    async showMoney () {
      let payamountRes = await payamount()
      store.state.yueShow = payamountRes.data.ULUser_ResidualAmount
    },
    // Delete
    async handleDelete (index, row) {
      let od = await OrderDel([row.Order_BillID])
      if (parseInt(od.data.result)) {
        this.showAllData()
        this.showData()
        this.$message({
          showClose: true,
          message: od.data.info,
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: od.data.info,
          type: 'error'
        })
      }
    },
    // Chackbox
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    async transferDot (index, row) {
      this.transferVisible = true
      Object.assign(this.transferValue, row)
    },
    async transferGo () {
      if (this.transferValue.Net_Name) {
        this.transferLoading = true
        let oz = await OrderZhuanjie(this.transferValue)
        if (parseInt(oz.data.result)) {
          await this.showReceiveData()
          this.transferLoading = false
          this.$message({
            showClose: true,
            message: oz.data.info,
            type: 'success'
          })
          this.transferVisible = false
        } else {
          this.transferLoading = false
          this.$message({
            showClose: true,
            message: oz.data.info,
            type: 'info'
          })
        }
      } else {
        this.$message({
          showClose: true,
          message: '请选择要转接的网点',
          type: 'info'
        })
      }
    },
    // Print
    async handlePrint (index, row, num) {
      // Order_Billnet: '',
        // Order_End: '',
      if (this.$refs['addForm']) {
        this.formInfo.Receive_Contract = ''
        this.formInfo.Order_ProName = ''
        this.formInfo.Consignor_Contract = ''
        this.$refs['addForm'].resetForm()
      }
      // this.formInfo.Order_Billnet = row.Order_Send
      this.formInfo.Order_ConTel = row.Order_ConsignorTel
      Object.assign(this.formInfo, row)
      this.formInfo.Order_End = ''
      this.formInfo.Order_Billnet = ''
      if (!num) {
        let nin = await NetinfoNet()
        for (let fo in nin.data.info) {
          this.options[fo] = {label: nin.data.info[fo].Net_Name}
        }
        if (this.all.first.data[0].content.length === 1) {
          this.formInfo.Order_Billnet = this.all.first.data[0].content[0].label
        }
        this.dialogVisible = true
      } else {
        let od = await OrderDeldel([row.Order_BillID])
        if (parseInt(od.data.result)) {
          this.$message({
            showClose: true,
            message: od.data.info,
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: '失败',
            type: 'info'
          })
        }
        this.allShow()
      }
    },
    radioIndex (Num) {
      this.currentPage = 1
      if (Num === 1) {
        this.anybodyData = this.allData
        this.total = this.allTotal
      } else {
        this.anybodyData = this.benData
        this.total = this.benTotal
      }
    },
    // async okGo () {
    //   this.dialogVisible = false
    //   let odb = await OrderDistribution({Order_BillID: this.rowGoOn.Order_BillID, Order_Billnet: this.value})
    //   if (odb.data.result === '1') {
    //     this.showReceiveData()
    //     this.$message({
    //       showClose: true,
    //       message: odb.data.info,
    //       type: 'success'
    //     })
    //   } else {
    //     this.$message({
    //       showClose: true,
    //       message: odb.data.info,
    //       type: 'error'
    //     })
    //   }
    // },
    async editForm (model, all, c, d) {
      this.saveLoading = true
      let odb = await OrderDistribution({Order_BillID: this.formInfo.Order_BillID, Order_Billnet: this.formInfo})
      if (odb.data.result === '1') {
        await this.showReceiveData()
        this.$message({
          showClose: true,
          message: odb.data.info,
          type: 'success'
        })
        this.saveLoading = false
        this.dialogVisible = false
      } else {
        this.saveLoading = false
        this.$message({
          showClose: true,
          message: odb.data.info,
          type: 'error'
        })
      }
    },
    async firstShow () {
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
      let cs = await CominfoShow()
      this.rateC = cs.data.info.Logistic_Rate
    }
  }
}
</script>
<style>
.zxjdzaixian .zxjdtop{border: 1px solid #d0d5f5;}
.zxjdzaixian .zxjdbot{border: 1px solid #d0d5f5;}
.zxjdzaixian .zxjdtop .zxjdtoptit{height: 40px;background: #d0d5f5;line-height: 40px}
.zxjdzaixian .zxjdtop .zxjdtopcon{margin-top: 5px}
.zxjdzaixian .zxjdbot .zxjdbottit{height: 40px;background: #d0d5f5;line-height: 40px}
.zxjdzaixian .zxjdbot .zxjdbotcon{margin-top: 5px}
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

