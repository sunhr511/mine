<template>
  <el-row type="flex" justify="center">
    <el-col :span="23">
      <!-- 选项卡按钮 -->
      <el-row type="flex" justify="center" style="margin-bottom:1.25rem">
        <el-col :span="6"  class="double">
          <el-button-group>
            <el-button size="large"  @click="Sq" :class="{'flag': flag}">申请页面</el-button>
            <el-button size="large" @click="Sl" :class="{'flag': !flag}">受理页面</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <!-- 申请 -->
      <el-row type="flex" justify="center" v-if="tf === 1">
        <el-col :span="24">
          <!-- search -->
          <el-row type="flex">
            <el-col :span="24">
              <inputS
              :rules="rules"
              :model="momo.model"
              :data="momo.data"
              :buttonGroup='buttonGroup'
              :width = "inputWidth"
              @here = "onSubmit"></inputS>
            </el-col>
          </el-row>
          <!-- table -->
          <el-row type="flex">
            <el-col :span="24">
              <tableS
              :tableHeight="tableHeight" :tableSelectedTf="tableSelectedTf"
              :tableData="tableData" :tableColumnProps="tableColumnProps"
              :tableOperateBtnGrup="tableOperateBtnGrup"
              :tableOperateBtnWidth = "tableOperateBtnWidth"
              @handleSelectionChange="handleSelectionChange" @dangerFun="dangerFun"></tableS>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 受理 -->
      <el-row type="flex" justify="center" v-if="tf === 2">
        <el-col :span="24">
          <!-- search -->
          <el-row type="flex">
            <el-col :span="24">
              <inputS
              ref="shoulitf"
              :rules="rules2"
              :model="momo2.model"
              :data="momo2.data"
              :buttonGroup='buttonGroup'
              :width = "inputWidth"
              @here = "twoSubmit"></inputS>
            </el-col>
          </el-row>
          <!-- table -->
          <el-row type="flex">
            <el-col :span="24">
              <tableS
              :tableHeight="tableHeight" :tableSelectedTf="tableSelectedTf"
              :tableData="tableData2" :tableColumnProps="tableColumnProps2"
              :tableOperateBtnGrup="tableOperateBtnGrup2"
              :tableOperateBtnWidth = "tableOperateBtnWidth"
              @handleSelectionChange="handleSelectionChange"
              @whiteFun = "whiteFun"
              @dangerFun="Shoulibtn" @orangeFun="Peifubtn"></tableS>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <!-- 申请dialog -->
    <el-dialog
      title="理赔详情"
      :visible.sync="dialogSQ"
      size="small"
      :before-close="handleClose">
      <el-row type="flex" justify="center">
        <el-col :span="23" style="background:#8c96d9;color:#fff;font-size:1rem;height:30px;line-height:1.875rem;margin-bottom:16px">&nbsp;&nbsp;基本信息</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="23">
          <el-form :inline="true" :model="fromInfo.model" class="demo-form-inline" label-width="5rem">
            <el-col :span="6" v-for="(item, index) in fromInfo.data" :key="item">
              <el-form-item :label="item.label" :prop="item.props">
                <el-input
                    disabled
                    v-if="item.input"
                    size="small"
                    style="width:5rem"
                    v-model="fromInfo.model[item.props]"
                    :placeholder="item.placeholder"
                    ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="23" style="background:#8c96d9;color:#fff;font-size:1rem;height:30px;line-height:1.875rem">&nbsp;&nbsp;异常申报</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="23">
          <el-form :inline="true" :model="tianxie.model" class="demo-form-inline" ref="tianxiea" label-width="5rem">
            <el-col :span="11" v-for="(item, index) in tianxie.data" :key="item" v-if="item.aaa">
              <el-form-item :label="item.label" :prop="item.props">
                <el-input
                  v-if="item.input"
                  size="small"
                  style="width:12.5rem"
                  v-model="tianxie.model[item.props]"
                  :placeholder="item.placeholder"
                  ></el-input>
                <el-date-picker
                  style="max-width:150px"
                  type="daterange"
                  size="small"
                  v-if="item.date"
                  v-model="tianxie.model[item.props]"
                  :placeholder="item.placeholder">
                </el-date-picker>
                <el-select  size="small" clearable filterable style="width:12.5rem"
                  v-if="item.select" v-model="tianxie.model[item.props]"
                  :placeholder="item.placeholder"  >
                  <el-option
                    v-for="(con, index) in item.content"
                    :key="con.label"
                    :label="con.label"
                    :value="con.value">
                      <span style="float: left" v-if="!item.guest">{{ con.label }}</span>
                      <span style="float: left" v-if="item.guest">{{ con.value }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px" v-if="item.guest">{{ con.la }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="23" v-for="(item, index) in tianxie.data" :key="item" v-if="!item.aaa">
              <el-form-item :label="item.label" :prop="item.props">
                <el-input
                  type="textarea"
                  v-if="item.textarea"
                  size="small"
                  style="width:32.5rem"
                  v-model="tianxie.model[item.props]"
                  :placeholder="item.placeholder"
                  ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSQ = false">取 消</el-button>
        <el-button :loading="sqLoading" type="warning" @click="SQbtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 受理 -->
    <el-dialog
      title="受理详情"
      :visible.sync="dialogSL"
      size="small"
      :before-close="handleClose">
      <el-row type="flex" justify="center">
        <el-col :span="23" style="background:#8c96d9;color:#fff;font-size:1rem;height:30px;line-height:1.875rem;margin-bottom:16px">&nbsp;&nbsp;基本信息</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="23">
          <el-form :inline="true" :model="fromInfo.model" class="demo-form-inline" label-width="5rem">
            <el-col :span="6" v-for="(item, index) in fromInfo.data" :key="item">
              <el-form-item :label="item.label" :prop="item.props">
                <el-input
                    disabled
                    v-if="item.input"
                    size="small"
                    style="width:5rem"
                    v-model="fromInfo.model[item.props]"
                    :placeholder="item.placeholder"
                    ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="23" style="background:#8c96d9;color:#fff;font-size:1rem;height:30px;line-height:1.875rem">&nbsp;&nbsp;异常受理</el-col>
      </el-row>
      <br>
      <el-row type="flex" justify="center">
        <el-col :span="23">
          <el-form :inline="true" :model="tianxie2.model" class="demo-form-inline" ref="tianxiea2" label-width="5rem">
            <el-col :span="11" v-for="(item, index) in tianxie2.data" :key="item" v-if="item.aaa">
              <el-form-item :label="item.label" :prop="item.props">
                <el-input
                  v-if="item.input"
                  size="small"
                  style="width:12.5rem"
                  v-model="tianxie2.model[item.props]"
                  :placeholder="item.placeholder"
                  ></el-input>
                <el-date-picker
                  style="max-width:150px"
                  type="daterange"
                  size="small"
                  v-if="item.date"
                  v-model="tianxie2.model[item.props]"
                  :placeholder="item.placeholder">
                </el-date-picker>
                <el-select  size="small" clearable filterable style="width:12.5rem"
                  v-if="item.select" v-model="tianxie2.model[item.props]"
                  :placeholder="item.placeholder"  >
                  <el-option
                    v-for="(con, index) in item.content"
                    :key="con.label"
                    :label="con.label"
                    :value="con.value">
                      <span style="float: left" v-if="!item.guest">{{ con.label }}</span>
                      <span style="float: left" v-if="item.guest">{{ con.value }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px" v-if="item.guest">{{ con.la }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="23" v-for="(item, index) in tianxie2.data" :key="item" v-if="!item.aaa">
              <el-form-item :label="item.label" :prop="item.props">
                <el-input
                  type="textarea"
                  v-if="item.textarea"
                  size="small"
                  style="width:32.5rem"
                  :disabled="showtf == 1"
                  v-model="tianxie2.model[item.props]"
                  :placeholder="item.placeholder"
                  ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="23" style="background:#8c96d9;color:#fff;font-size:1rem;height:30px;line-height:1.875rem">&nbsp;&nbsp;责任判定</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="23">
          <br>
          <el-form :inline="true" :model="tianxie3.model" class="demo-form-inline" ref="tianxiea3" label-width="5rem" >
            <el-col :span="11" v-for="(item, index) in tianxie3.data" :key="item" v-if="item.aaa">
              <el-form-item :label="item.label" :prop="item.props">
                <el-input
                  v-if="item.input"
                  size="small"
                  style="width:12.5rem"
                  :disabled="showtf == 0"
                  v-model="tianxie3.model[item.props]"
                  :placeholder="item.placeholder"
                  ></el-input>
                <el-date-picker
                  style="max-width:150px"
                  type="daterange"
                  size="small"
                  v-if="item.date"
                  v-model="tianxie3.model[item.props]"
                  :placeholder="item.placeholder">
                </el-date-picker>
                <el-select  size="small" clearable filterable style="width:12.5rem"
                  v-if="item.select" v-model="tianxie3.model[item.props]"
                  :placeholder="item.placeholder"  >
                  <el-option
                    v-for="(con, index) in item.content"
                    :key="con.label"
                    :label="con.label"
                    :value="con.value">
                      <span style="float: left" v-if="!item.guest">{{ con.label }}</span>
                      <span style="float: left" v-if="item.guest">{{ con.value }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px" v-if="item.guest">{{ con.la }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="23" v-for="(item, index) in tianxie3.data" :key="item" v-if="!item.aaa">
              <el-form-item :label="item.label" :prop="item.props">
                <el-input
                  type="textarea"
                  v-if="item.textarea"
                  size="small"
                  :disabled="showtf == 1"
                  style="width:32.5rem"
                  v-model="tianxie3.model[item.props]"
                  :placeholder="item.placeholder"
                  ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSL = false">取 消</el-button>
        <el-button :loading="pfLoading" type="warning" @click="PFbtn">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
import tableS from '../../components/tableS'
import inputS from '../../components/inputS'
import {CompensateDel, CompensateApplyShow, CompensateApplyAdd, CompensateAcceptanceShow, CompensateAcceptance, CompensatePeifu} from '../../api/kefuguanli/lpcl'
export default {
  components: {
    inputS, tableS
  },
  data () {
    return {
      sqLoading: false,
      pfLoading: false,
      flag: true,
      tf: 1,
      momo: {
        data: [
          {props: 'Order_BillID', label: '运单号', placeholder: '请输入运单号', input: true},
          {props: 'Order_Consignor', label: '发货人', placeholder: '请输入发货人', input: true}
        ],
        model: {
          'Order_BillID': '',
          'Order_Consignor': ''
        }
      },
      momo2: {
        data: [
          {props: 'Compensate_BillID', label: '运单号', placeholder: '请输入运单号', input: true},
          {props: 'Compensate_ApplyTime', label: '理赔申请时间', placeholder: '请选择理赔申请时间', date: true},
          {props: 'Compensate_AcceptanceState', label: '理赔状态', placeholder: '请选择理赔状态', select: true, guest: true, content: [{value: '全部', la: ''}, {value: '待受理', la: ''}, {value: '待赔付', la: ''}, {value: '完成', la: ''}, {value: '拒绝', la: ''}]},
          {props: 'Compensate_Consignor', label: '发货人', placeholder: '请输入发货人', input: true},
          {props: 'Compensate_Acceptance', label: '受理人', placeholder: '请输入受理人', input: true}
        ],
        model: {
          'Compensate_BillID': '',
          'Compensate_ApplyTime': '',
          'Compensate_AcceptanceState': '',
          'Compensate_Consignor': '',
          'Compensate_Acceptance': ''
        }
      },
      inputWidth: '120px',
      rules: {
      },
      rules2: {
      },
      buttonGroup: [
        {name: '查询', tf: true, loading: false},
        {name: '', tf: ''},
        {name: '', tf: ''}
      ],
      tableData: [
        // {Order_BaseTime: 11}
      ],
      tableData2: [],
      tableHeight: 580,
      tableSelectedTf: false,
      tableColumnProps: [
        { props: 'Order_BaseTime', label: '开单日期' },
        { props: 'Order_BillID', label: '运单号' },
        { props: 'Order_Nowstate', label: '运单状态' },
        { props: 'Order_Abnormal', label: '异常状态' },
        { props: 'Order_Send', label: '始发站' },
        { props: 'Order_End', label: '目的站' },
        { props: 'Order_Goods', label: '货物名称' },
        { props: 'Order_Num', label: '件数(件)' },
        { props: 'Order_Weight', label: '重量(T)' },
        { props: 'Order_Vol', label: '体积(m³)' },
        { props: 'Order_Spec', label: '规格' },
        { props: 'Order_Consignor', label: '发货人' },
        { props: 'Order_ConTel', label: '发货电话' },
        { props: 'Order_Receive', label: '收货人' },
        { props: 'Receive_LinkTel', label: '收货电话' },
        { props: 'Order_Pay', label: '运费' },
        { props: 'Order_Payment', label: '货款' }
      ],
      tableColumnProps2: [
        { props: 'Compensate_BillID', label: '运单号' },
        { props: 'Compensate_Consignor', label: '发货人' },
        { props: 'Compensate_ConsignorTel', label: '发货电话' },
        { props: 'Compensate_ApplyTime', label: '理赔申请时间' },
        { props: 'Compensate_Reason', label: '理赔原因' },
        { props: 'Compensate_ApplyAmount', label: '理赔申请金额' },
        { props: 'Compensate_ActualAmount', label: '理赔金额' },
        { props: 'Compensate_ApplyNet', label: '申请网点' },
        { props: 'Compensate_GoodsNum', label: '异常件数' },
        { props: 'Compensate_Apply', label: '申请人' },
        { props: 'Compensate_ApplyOperation', label: '申请操作人' },
        { props: 'Compensate_AcceptanceNet', label: '受理网点' },
        { props: 'Compensate_Acceptance', label: '受理人' },
        // { props: 'Compensate_Beneficiary', label: '理赔受益人' },
        { props: 'Compensate_AcceptanceTime', label: '受理时间' },
        { props: 'Compensate_AcceptanceType', label: '受理方式' },
        { props: 'Compensate_AcceptanceState', label: '受理状态' }
      ],
      tableOperateBtnGrup: [
        {name: '申请', tf: ''},
        {name: '申请', tf: true},
        {name: '', tf: ''}
      ],
      tableOperateBtnGrup2: [
        {name: '拒绝', tf: true},
        {name: '受理', tf: true},
        {name: '赔付', tf: true}
      ],
      tableOperateBtnWidth: 220,
      multipleSelection: '',
      dialogSQ: false,
      dialogSL: false,
      fromInfo: {
        data: [
          {props: 'Order_BillID', label: '运单号', placeholder: '请输入运单号', input: true},
          {props: 'Order_GoodsCode', label: '货号', placeholder: '请输入货号', input: true},
          {props: 'Order_BaseTime', label: '开单时间', placeholder: '开单时间', input: true},
          {props: 'Order_Send', label: '发站', placeholder: '发展', input: true},
          // {props: 'Order_Send', label: '经由站', placeholder: '开单时间', input: true},
          {props: 'Order_End', label: '到站', placeholder: '到站', input: true},
          {props: 'Order_Goods', label: '货物名称', placeholder: '货物名称', input: true},
          {props: 'Order_Num', label: '件数', placeholder: '件数', input: true}
        ],
        model: {
          'Order_BillID': '',
          'Order_GoodsCode': '',
          'Order_BaseTime': '',
          'Order_Send': '',
          'Order_End': '',
          'Order_Goods': '',
          'Order_Num': ''
        }
      },
      tianxie: {
        data: [
          {props: 'Compensate_AcceptanceType', label: '理赔方式', placeholder: '请选择理赔方式', select: true, content: [{value: '全价', la: ''}, {value: '半价', la: ''}], aaa: true, guest: true},
          {props: 'Compensate_Apply', label: '申请人', placeholder: '请输入申请人', input: true, aaa: true},
          // {props: 'Compensate_ApplyNet', label: '申报网点', placeholder: '申报网点', input: true, aaa: true},
          {props: 'Compensate_GoodsNum', label: '异常件数', placeholder: '请输入异常件数', input: true, aaa: true},
          {props: 'Compensate_ApplyAmount', label: '申请金额', placeholder: '请输入申请金额', input: true, aaa: true},
          {props: 'Compensate_Reason', label: '异常描述', placeholder: '请输入异常描述', textarea: true, aaa: false}
        ],
        model: {
          'Compensate_AcceptanceType': '',
          'Compensate_Apply': '',
          // 'Compensate_ApplyNet': '',
          'Compensate_GoodsNum': '',
          'Compensate_ApplyAmount': '',
          'Compensate_Reason': ''
        }
      },
      tianxie2: {
        data: [
          // {props: 'Compensate_AcceptanceState', label: '受理进度', placeholder: '请选择受理进度', select: true, content: [{value: '完成', la: ''}, {value: '已受理', la: ''}, {value: '已赔付', la: ''}, {value: '待赔付', la: ''}], aaa: true, guest: true},
          {props: 'Compensate_Opinion', label: '受理意见', placeholder: '受理意见', textarea: true, aaa: false}
        ],
        model: {
          // 'Compensate_AcceptanceState': '',
          'Compensate_Opinion': ''
        }
      },
      tianxie3: {
        data: [
          {props: 'Compensate_ActualAmount', label: '判定金额', placeholder: '判定金额', input: true, aaa: true},
          {props: 'Compensate_Determine', label: '判定人', placeholder: '判定人', input: true, aaa: true}
        ],
        model: {
          'Compensate_ActualAmount': '',
          'Compensate_Determine': ''
        }
      },
      fahuoren: '',
      fahuorenTel: '',
      Guid: '',
      Guid2: '',
      BillID: '',
      infosq: [],
      infosl: [],
      Compensate_AcceptanceState: '',
      showtf: ''
    }
  },
  // created () {
  //   this.twoSubmit()
  // },
  methods: {
    Sq () {
      this.flag = true
      this.tf = 1
    },
    Sl () {
      this.flag = false
      this.tf = 2
      this.twoSubmit()
    },
    // 申请 查询
    async onSubmit (model) {
      this.infosq = []
      this.infosq = model
      if (this.momo.model.Order_BillID === '' && this.momo.model.Order_Consignor === '') {
        this.$message({
          showClose: true,
          message: '请输入运单号或发货人再查询',
          type: 'error'
        })
      } else {
        this.buttonGroup[0].loading = true
        let search = await CompensateApplyShow({searchData: model})
        if (search.data.result === '1') {
          this.tableData = search.data.info
        } else if (search.data.result === '0') {
          this.$message({
            showClose: true,
            message: search.data.info,
            type: 'error'
          })
        }
        this.buttonGroup[0].loading = false
      }
    },
    async twoSubmit (model) {
      this.infosl = []
      this.infosl = model
      // if (this.momo2.model.Order_BillID === '' && this.momo2.model.Compensate_AcceptanceTime === '' && this.momo2.model.Compensate_AcceptanceState === '' && this.momo2.model.Compensate_Consignor === '' && this.momo2.model.Compensate_Acceptance === '') {
      //   this.$message({
      //     showClose: true,
      //     message: '请输入查询条件再查询',
      //     type: 'error'
      //   })
      // } else {
      this.buttonGroup[0].loading = true
      let search = await CompensateAcceptanceShow({searchData: model})
      if (search.data.result === '1') {
        this.tableData2 = []
        this.tableData2 = search.data.info
      } else if (search.data.result === '0') {
        this.$message({
          showClose: true,
          message: search.data.info,
          type: 'error'
        })
      }
      this.buttonGroup[0].loading = false
      // }
    },
    async whiteFun (index, row) {
      // console.log({'Compensate_Guid': row.Compensate_Guid})
      let csd = await CompensateDel({'Compensate_Guid': row.Compensate_Guid})
      if (csd.data.result === '1') {
        this.$message({
          showClose: true,
          message: csd.data.info,
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: csd.data.info,
          type: 'info'
        })
      }
      this.twoSubmit()
    },
    dangerFun (index, row) {
      if (this.$refs['tianxiea']) {
        this.$refs['tianxiea'].resetFields()
      }
      this.showtf = 0
      this.Compensate_AcceptanceState = row.Compensate_AcceptanceState
      this.fahuoren = row.Order_Consignor
      this.fahuorenTel = row.Order_ConTel
      this.Guid = row.Order_Guid
      this.BillID = row.Order_BillID
      this.fromInfo.model = row
      this.dialogSQ = true
    },
    Shoulibtn (index, row) {
      if (this.$refs['tianxiea2']) {
        this.$refs['tianxiea2'].resetFields()
      }
      if (this.$refs['tianxiea3']) {
        this.$refs['tianxiea3'].resetFields()
      }
      this.Guid2 = row.Order_Guid
      this.fromInfo.model = row
      this.dialogSL = true
    },
    async SQbtn () {
      this.sqLoading = true
      let data = {
        Compensate_Guid: this.Guid,
        Compensate_BillID: this.BillID,
        Compensate_Consignor: this.fahuoren,
        Compensate_ConsignorTel: this.fahuorenTel,
        Compensate_Reason: this.tianxie.model.Compensate_Reason,
        Compensate_ApplyAmount: this.tianxie.model.Compensate_ApplyAmount,
        Compensate_Apply: this.tianxie.model.Compensate_Apply,
        Compensate_AcceptanceType: this.tianxie.model.Compensate_AcceptanceType,
        Compensate_GoodsNum: this.tianxie.model.Compensate_GoodsNum
      }
      let sq1 = await CompensateApplyAdd(data)
      this.sqLoading = false
      if (sq1.data.result === '1') {
        this.$message({
          showClose: true,
          message: sq1.data.info,
          type: 'success'
        })
        let search = await CompensateApplyShow({searchData: this.infosq})
        if (search.data.result === '1') {
          this.tableData = search.data.info
        } else if (search.data.result === '0') {
          this.$message({
            showClose: true,
            message: search.data.info,
            type: 'error'
          })
        }
        this.dialogSQ = false
      }
    },
    async SLbtn () {
      let data = {
        Compensate_Guid: this.Guid2,
        Compensate_Opinion: this.tianxie2.model.Compensate_Opinion
      }
      let cc = await CompensateAcceptance(data)
      if (cc.data.result === '1') {
        this.$message({
          showClose: true,
          message: cc.data.info,
          type: 'success'
        })
        let search = await CompensateAcceptanceShow({searchData: this.infosl})
        if (search.data.result === '1') {
          this.tableData2 = search.data.info
        } else if (search.data.result === '0') {
          this.$message({
            showClose: true,
            message: search.data.info,
            type: 'error'
          })
        }
        this.dialogSL = false
      }
    },
    Peifubtn (index, row) {
      this.tianxie2.model = row
      this.dialogSL = true
      this.showtf = 1
    },
    async PFbtn () {
      this.pfLoading = true
      if (this.showtf) {
        let data = {
          Compensate_Guid: this.Guid2,
          Compensate_ActualAmount: this.tianxie3.model.Compensate_ActualAmount,
          Compensate_Determine: this.tianxie3.model.Compensate_Determine
        }
        let cc = await CompensatePeifu(data)
        if (cc.data.result === '1') {
          this.$message({
            showClose: true,
            message: cc.data.info,
            type: 'success'
          })
          let search = await CompensateAcceptanceShow({searchData: this.infosl})
          if (search.data.result === '1') {
            this.tableData2 = search.data.info
          } else if (search.data.result === '0') {
            this.$message({
              showClose: true,
              message: search.data.info,
              type: 'error'
            })
          }
          this.dialogSL = false
        }
      } else {
        let data = {
          Compensate_Guid: this.Guid2,
          Compensate_Opinion: this.tianxie2.model.Compensate_Opinion
        }
        let cc = await CompensateAcceptance(data)
        if (cc.data.result === '1') {
          this.$message({
            showClose: true,
            message: cc.data.info,
            type: 'success'
          })
          let search = await CompensateAcceptanceShow({searchData: this.infosl})
          if (search.data.result === '1') {
            this.tableData2 = search.data.info
          } else if (search.data.result === '0') {
            this.$message({
              showClose: true,
              message: search.data.info,
              type: 'error'
            })
          }
          this.dialogSL = false
        }
      }
      this.pfLoading = false
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style >
.double .flag {
  background:#20A0FF;
  color:white;
  border:#20A0FF 1px solid;
}
</style>
