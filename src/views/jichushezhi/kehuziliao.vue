<template>
  <div>
<el-dialog :visible.sync="dialogVisible">
  <el-row type="flex" justify="center" >
    <el-col :span="23">
      <el-row><el-col :span="24" class="Ghead">&nbsp;&nbsp;&nbsp;{{name}}</el-col></el-row>
      <br><br><br>
  <el-form  :rules="rules" :model="momo.model" ref="momo.model" label-width="110px"  label-position="left">
    <el-row type="flex" justify="space-between" style="flex-wrap: wrap">
      <el-col :span="11"  v-for="(item, index) in momo.shuju" :key="index" >
        <el-form-item :label="item.label" :prop="item.props" >
          <el-input  v-if="item.input" v-model="momo.model[item.props]" :placeholder="item.placeholder"></el-input>
          <el-select style="width:100%;" clearable v-if="item.select" v-model="momo.model[item.props]" :placeholder="item.placeholder">
             <el-option
              v-for="(con, index) in item.content"
              :key="con.label"
              :label="con.label"
              :value="con.label">
            </el-option>
          </el-select>
          <el-cascader
            style="width:100%"
            clearable
            filterable
            v-model="momo.model[item.props]"
            v-if="item.cascader"
            :options="linkage"
            :placeholder="item.placeholder">
          </el-cascader>
        </el-form-item>
      </el-col>
    </el-row>
    <div style="width:100%;text-align:center;">
    <el-form-item  class="btnStyle" label-width="0px">
      <el-button :loading="saveLoading" @click="submitForm(true)" v-if="enniu == true">保存</el-button>
      <el-button :loading="saveLoading" @click="submitForm(false)" v-if="enniu == false">保存</el-button>
    </el-form-item>
    </div>
  </el-form>
    </el-col>
  </el-row>
</el-dialog>
<!--SHOW dialog-->
<el-row type="flex" justify="center">
  <el-col :span="23">
    <el-form label-width="80px" style="display:flex;justify-content: space-between;width:100%">
  <el-form-item  label="客户类型">
    <el-select  v-model="searchData1" clearable  placeholder="请选择客户类型">
      <el-option
        v-for="item in momo.shuju[10].content"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item  label="客户姓名" placeholder="请输入客户姓名">
    <el-input
      icon="search"
      v-model="searchData2"
    ></el-input>
  </el-form-item>
  <el-form-item  label="联系电话" placeholder="请输入联系电话">
    <el-input
      icon="search"
      v-model="searchData3"
    ></el-input>
  </el-form-item>
  <el-form-item label-width="20px">
    <el-button @click="searchGo()" type="warning" :loading="loadingTF">查询</el-button>
    <el-button @click="resetGo()" type="danger">清空</el-button>
    <el-button @click="showData()" type="info">显示全部</el-button>
  </el-form-item>
</el-form>
    <el-row type="flex" justify="space-between" class="Ghead">
      <el-col :span="20" >
        &nbsp;&nbsp;&nbsp;{{title}}
      </el-col>
      <el-col :span="2" class="addClass">
        <el-button type="text" @click="addData()" ><i class="el-icon-plus"></i> 新增</el-button>
      </el-col>
    </el-row>
  </el-col>
</el-row>
<br>
<!--SHOW table-->
<el-row type="flex" justify="center" id="ziseTable">
  <el-col :span="23">
    
    <el-table
      :data="tableData"
      height="525"
      border
      style="width: 100%;"
      >
    <el-table-column
      show-overflow-tooltip
      align="center"
      width="180px"
      v-for="(item, index) in momo.shuju"
      :key="index"
      :prop="item.props"
      :label="item.label"
    >
    </el-table-column>
    <el-table-column label="操作" width="160px" fixed="right" align="center">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-col>
</el-row>
<br>
 <div class="block" style="text-align:center">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageCount"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>
<script>
  import { ProgrammeXianshi, CustomerEdit, CustomerAdd, CustomerShow, CustomerDel, CustomerSearch, DictionaryShow, NetinfoNetin } from '../../api/jichushezhi/kehuziliao.js'
  export default {
    data () {
      return {
        saveLoading: false,
        loadingTF: false,
        enniu: true,
        name: '新建客户资料',
        title: '客户资料',
        dialogVisible: false,
        searchData1: '',
        searchData2: '',
        searchData3: '',
        searchData: {},
        tableData: [],
        currentPage: 1,
        pageCount: 10,
        total: 0,
        numberValidateForm: {
          age: ''
        },
        radio: 1,
        rules: {
          Consignor_Incity: [
            { type: 'array', required: true, message: '请选择网点所在城市', trigger: 'change' }
          ],
          Consignor_Name: [
            { required: true, message: '请输入客户名称', trigger: 'change' }
          ],
          Consignor_Phone: [
            { required: true, message: '请输入联系电话', trigger: 'change' },
            { pattern: /^1[34578]\d{9}$/, message: '请输入正确的联系电话', trigger: 'change' }
          ],
          Consignor_Account: [
            { required: true, message: '请输入银行账户', trigger: 'change' },
            { pattern: /^([1-9]{1})(\d{14}|\d{18})$/, message: '请正确输入银行账户', trigger: 'change' }
          ]
        },
        momo: {
          shuju: [
            { props: 'Consignor_Name', label: '客户名称', placeholder: '请输入客户名称', input: true },
            { props: 'Consignor_Incity', label: '所在城市', placeholder: '请输入所在城市', cascader: true },
            { props: 'Consignor_Linker', label: '持卡人姓名', placeholder: '请输入持卡人姓名', input: true },
            { props: 'Consignor_Phone', label: '联系电话', placeholder: '请输入联系电话', input: true },
            { props: 'Consignor_Address', label: '详细地址', placeholder: '请输入详细地址', input: true },
            { props: 'Consignor_Contract', label: '合同号', placeholder: '请输入合同号', input: true },
            { props: 'Consignor_Account', label: '银行账户', placeholder: '请输入银行账户', input: true },
            { props: 'Consignor_Poundage', label: '放款手续费', placeholder: '请选择放款手续费', select: true, content: [] },
            { props: 'Consignor_Ismonth', label: '是否月结客户', placeholder: '请选择是否月结客户', select: true, content: [{ value: '是', label: '是' }, { value: '否', label: '否' }] },
            { props: 'Consignor_IsVip', label: '是否VIP', placeholder: '请选择是否VIP', select: true, content: [{ value: '是', label: '是' }, { value: '否', label: '否' }] },
            { props: 'Consignor_Type', label: '客户类型', placeholder: '请选择客户类型', select: true, content: [{ value: '收货人', label: '收货人' }, { value: '发货人', label: '发货人' }] },
            { props: 'Consignor_Net', label: '归属网点', placeholder: '请选择归属网点', select: true, content: [] },
            { props: 'Consignor_Bank', label: '开户行', placeholder: '请选择开户行', select: true, content: [] }
          ],
          model: {
            'Consignor_Name': '',
            'Consignor_Incity': [],
            'Consignor_Linker': '',
            'Consignor_Phone': '',
            'Consignor_Address': '',
            'Consignor_Contract': '',
            'Consignor_Account': '',
            'Consignor_Poundage': '',
            'Consignor_Type': '',
            'Consignor_IsVip': '',
            'Consignor_Bank': '',
            'Consignor_Ismonth': '',
            'Consignor_Net': ''
          }
        },
        numCount: []
      }
    },
    created () {
      this.showData()
      this.firstShow()
    },
    computed: {
      linkage () {
        return this.$store.state.linkage
      }
    },
    methods: {
      async firstShow () {
        let px = await ProgrammeXianshi()
        this.momo.shuju[7].content = []
        for (let i in px.data.info) {
          this.momo.shuju[7].content.push({ value: px.data.info[i].Pro_Name, label: px.data.info[i].Pro_Name })
        }
      },
      addData () {
        // this.momo.model = {
        //   'Consignor_Name': '',
        //   'Consignor_Incity': [],
        //   'Consignor_Linker': '',
        //   'Consignor_Phone': '',
        //   'Consignor_Address': '',
        //   'Consignor_Contract': '',
        //   'Consignor_Account': '',
        //   'Consignor_Poundage': '',
        //   'Consignor_Type': '',
        //   'Consignor_IsVip': '',
        //   'Consignor_Bank': '',
        //   'Consignor_Ismonth': '',
        //   'Consignor_Net': ''
        // }
        if (this.$refs['momo.model']) {
          this.$refs['momo.model'].resetFields()
        }
        this.dialogVisible = true
        this.enniu = true
      },
      showData () {
        CustomerShow({currentPage: this.currentPage, pageCount: this.pageCount}).then((response) => {
          this.tableData = response.data.info
          this.total = response.data.count
        }).catch(error => {
          console.log(error)
        })
        DictionaryShow({Dic_Remarks: '银行'}).then((response) => {
          this.momo.shuju[12].content = []
          for (let yh in response.data.info) {
            this.momo.shuju[12].content.push({label: response.data.info[yh].Dic_Title})
          }
        }).catch(error => {
          console.log(error)
        })
        NetinfoNetin().then((response) => {
          this.momo.shuju[11].content = []
          for (let na in response.data.info) {
            this.momo.shuju[11].content.push({label: response.data.info[na].Net_Name})
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleEdit (index, row) {
        this.enniu = false
        Object.assign(this.momo.model, row)
        // this.momo.model = row
        this.dialogVisible = true
      },
      handleDelete (index, row) {
        CustomerDel({Consignor_Id: row.Consignor_Id}).then((response) => {
          this.$message({
            showClose: true,
            type: 'success',
            message: response.data.info
          })
          if (this.searchData1 === '' && this.searchData2 === '' && this.searchData3 === '') {
            this.showData()
          } else {
            this.searchGo()
          }
        }).catch(error => {
          console.log(error)
        })
      },
      submitForm (index) {
        this.$refs['momo.model'].validate(async (valid) => {
          if (valid) {
            this.saveLoading = true
            if (index) {
              let addRes = await CustomerAdd(this.momo.model)
              this.$message({
                message: addRes.data.info,
                type: 'success'
              })
              this.showData()
              this.dialogVisible = false
            } else {
              let editRes = await CustomerEdit(this.momo.model)
              this.$message({
                message: editRes.data.info,
                type: 'success'
              })
              this.showData()
              this.dialogVisible = false
            }
          } else {
            this.$message({
              showClose: true,
              message: '请按规则填写',
              type: 'warning'
            })
            return false
          }
          this.saveLoading = false
        })
      },
      resetGo () {
        this.searchData1 = ''
        this.searchData2 = ''
        this.searchData3 = ''
      },
      async searchGo () {
        this.loadingTF = true
        this.searchData = {}
        this.searchData['Consignor_Type'] = this.searchData1
        this.searchData['Consignor_Name'] = this.searchData2
        this.searchData['Consignor_Phone'] = this.searchData3
        this.searchData['currentPage'] = this.currentPage
        this.searchData['pageCount'] = this.pageCount
        let searchRes = await CustomerSearch(this.searchData)
        this.tableData = searchRes.data.info
        this.total = searchRes.data.count
        this.loadingTF = false
      },
      handleCurrentChange (val) {
        this.currentPage = val
        if (this.searchData1 === '' && this.searchData2 === '' && this.searchData3 === '') {
          this.showData()
        } else {
          this.searchGo()
        }
      }
    }
  }
</script>
<style>
*{
  font-family: "微软雅黑"
}
  .Ghead {
    background:  #8c96d9;
    height: 40px;
    line-height: 40px;
     color: white
  }
  .btnStyle .el-button {
    width: 160px;
    height: 50px;
    font-size: 18px;
    color: white;
    background: #8c96d9;
    border: none;
  }
  .addClass .el-button{
    color: white
  }
  #ziseTable .el-table th {
    background: #8c96d9;
  }
  #ziseTable .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
    background: #8c96d9;
    color: white
  }
  #ziseTable .el-table__fixed-header-wrapper thead div{
    background: #8c96d9;
    color: white
  }
</style>
