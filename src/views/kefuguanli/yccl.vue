<template>
  <el-row type="flex" justify="center">
    <el-col :span="23">
      <el-row type="flex" justify="center">
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
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <tableS
            :tableHeight="tableHeight" :tableSelectedTf="tableSelectedTf"
            :tableData="tableData" :tableColumnProps="tableColumnProps"
            :tableOperateBtnGrup="tableOperateBtnGrup"
            :tableOperateBtnWidth = "tableOperateBtnWidth"
            @handleSelectionChange="handleSelectionChange"></tableS>
        </el-col>
      </el-row>
    <el-row type="flex" justify="end" style="margin-top:50px">
        <el-col :span="12">
          <el-button :plain="true" type="danger" size="large" @click="Guashi">挂失</el-button>
          <el-button type="danger" size="large" style="margin-right:20px" @click="Jiegua">解挂</el-button>
          <el-button :plain="true" type="warning" size="large" @click="Dongjie">放款冻结</el-button>
          <el-button type="warning" size="large" style="margin-right:20px" @click="Jiedong">放款解冻</el-button>
          <el-button type="primary" size="large" @click="Zuofei">作废</el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-dialog
      title="信息填写"
      :visible.sync="dialogXinxi"
      v-if="dialogXinxi"
      size="tiny"
      :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="Abnormal_People">
          <el-input v-model="ruleForm.Abnormal_People"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="Abnormal_PeopleTel">
          <el-input v-model="ruleForm.Abnormal_PeopleTel"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="Abnormal_PeopleID">
          <el-input v-model="ruleForm.Abnormal_PeopleID"></el-input>
        </el-form-item>
        <el-form-item v-if="Gua" label="挂失费" prop="Abnormal_Amount">
          <el-input v-model="ruleForm.Abnormal_Amount"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="okGo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="操作确认"
      :visible.sync="dialogZuofei"
      size="tiny"
      :before-close="handleClose">
      确认此操作吗？
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogZuofei = false">取 消</el-button>
        <el-button type="primary" @click="Zf">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
import inputS from '../../components/inputS'
import tableS from '../../components/tableS'
import {AbnormalShow, AbnormalEdit} from '../../api/kefuguanli/yccl.js'
export default {
  components: {
    inputS,
    tableS
  },
  data () {
    return {
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
      inputWidth: '70px',
      rules: {
      },
      buttonGroup: [
        {name: '查询', tf: true, loading: false},
        {name: '', tf: ''},
        {name: '', tf: ''}
      ],
      tableData: [],
      tableHeight: 550,
      tableSelectedTf: true,
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
      tableOperateBtnGrup: [
        {name: '', tf: ''},
        {name: '', tf: ''},
        {name: '', tf: ''}
      ],
      tableOperateBtnWidth: 180,
      multipleSelection: '',
      total: 10,
      currentPage: 1,
      pageCount: 10,
      dialogXinxi: false,
      dialogZuofei: false,
      ruleForm: {
        Abnormal_People: '',
        Abnormal_PeopleTel: '',
        Abnormal_PeopleID: '',
        Abnormal_Amount: ''
      },
      rules2: {
        Abnormal_People: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        Abnormal_PeopleTel: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确电话' }
        ],
        Abnormal_PeopleID: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请正确输入身份证号', trigger: 'blur' }
          // { pattern: /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/, message: '请正确输入挂失人身份证号', trigger: 'blur' }
        ]
      },
      Gua: false,
      zhaungtai: '',
      Guid: [],
      jilu: {}
    }
  },
  methods: {
    async onSubmit (model) {
      this.jilu = {}
      this.jilu = model
      if (this.momo.model.Order_BillID === '' && this.momo.model.Order_Consignor === '') {
        this.$message({
          showClose: true,
          message: '请输入运单号或发货人再查询',
          type: 'error'
        })
      } else {
        this.buttonGroup[0].loading = true
        let search = await AbnormalShow({searchData: model})
        if (search.data.result === '1') {
          this.tableData = search.data.info
        }
        this.buttonGroup[0].loading = false
      }
    },
    async editInfo () {
      let caozuo = await AbnormalEdit({state: this.zhaungtai, Res: this.ruleForm, Guid: this.Guid})
      if (caozuo.data.result === '1') {
        this.$message({
          showClose: true,
          message: caozuo.data.info,
          type: 'success'
        })
        this.dialogXinxi = false
        this.dialogZuofei = false
        let search = await AbnormalShow({searchData: this.jilu})
        if (search.data.result === '1') {
          this.tableData = search.data.info
        }
      } else if (caozuo.data.result === '0') {
        this.$message({
          showClose: true,
          message: caozuo.data.info,
          type: 'error'
        })
        this.dialogXinxi = false
        this.dialogZuofei = false
        let search = await AbnormalShow({searchData: this.jilu})
        if (search.data.result === '1') {
          this.tableData = search.data.info
        }
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      for (let a in this.multipleSelection) {
        this.Guid[a] = this.multipleSelection[a].Order_Guid
      }
    },
    Guashi () {
      if (this.multipleSelection.length) {
        if (this.$refs['ruleForm']) {
          this.$refs['ruleForm'].resetFields()
        }
        this.zhaungtai = '挂失'
        this.Gua = true
        this.dialogXinxi = true
      } else {
        this.$message({
          showClose: true,
          message: '清选择挂失条目',
          type: 'error'
        })
      }
    },
    Jiegua () {
      if (this.multipleSelection.length) {
        if (this.$refs['ruleForm']) {
          this.$refs['ruleForm'].resetFields()
        }
        this.zhaungtai = '解挂'
        this.dialogXinxi = true
      } else {
        this.$message({
          showClose: true,
          message: '清选择解挂条目',
          type: 'error'
        })
      }
    },
    Dongjie () {
      if (this.multipleSelection.length) {
        if (this.$refs['ruleForm']) {
          this.$refs['ruleForm'].resetFields()
        }
        this.zhaungtai = '放款冻结'
        this.dialogZuofei = true
      } else {
        this.$message({
          showClose: true,
          message: '清选择放款冻结条目',
          type: 'error'
        })
      }
    },
    Jiedong () {
      if (this.multipleSelection.length) {
        if (this.$refs['ruleForm']) {
          this.$refs['ruleForm'].resetFields()
        }
        this.zhaungtai = '放款解冻'
        this.dialogZuofei = true
      } else {
        this.$message({
          showClose: true,
          message: '清选择方框解冻条目',
          type: 'error'
        })
      }
    },
    Zuofei () {
      if (this.multipleSelection.length) {
        this.dialogZuofei = true
        this.zhaungtai = '作废'
      } else {
        this.$message({
          showClose: true,
          message: '清选择作废条目',
          type: 'error'
        })
      }
    },
    okGo () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.editInfo()
        } else {
          return false
        }
      })
      // let data = {
      //   state: this.zhaungtai,
      //   Res: this.ruleForm,
      //   Guid: this.Guid
      // }
    },
    Zf () {
      this.editInfo()
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        this.Gua = false
        done()
      })
    }
  }
}
</script>

