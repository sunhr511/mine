<template>
  <div  >
<el-dialog
  title=""
  :visible.sync="dialogVisible"
  size="small"
  >
    <el-row type="flex" justify="center" >
      <el-col :span="23"> <br>
        <el-row>
          <el-col :span="24" class="Ghead">
            &nbsp;&nbsp;&nbsp;{{name}}
          </el-col>
        </el-row><br><br>

  <el-form :model="momo.model" ref="momo.model" :rules="rules">
    <el-row type="flex" justify="space-around" style="flex-wrap: wrap;">
      <el-col :span="11" v-for="(item, index) in momo.shuju" :key="index" >
        <el-form-item  :label="item.label" :prop="item.props"  label-width="100px" >
          <!-- @active-item-change="handleItemChange" -->
          <el-cascader
            style="width:100%"
            clearable
            filterable
            v-model="momo.model[item.props]"
            v-if="item.cascader"
            :options="item.content"
            :placeholder="item.placeholder">
          </el-cascader>
          <el-select  clearable v-if="item.select" v-model="momo.model[item.props]" :placeholder="item.placeholder" style="width:100%">
            <el-option
              v-for="(con, index) in item.content"
              :key="con.label"
              :label="con.label"
              :value="con.label">
            </el-option>
          </el-select>
          <el-input
            v-model="momo.model[item.props]" v-if="!item.select & !item.cascader"
            :placeholder="item.placeholder"  class="inputStyle" size="large"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="是否收款放款" prop="type">
          <el-checkbox-group v-model="checkedMessages" >
              <el-checkbox
                v-for="(op, index) in messages"
                :label="op"
                :key="index">&nbsp;{{op}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>

      <br>
    <el-row style="text-align:center" class="btnStyle" >
      <el-button :loading="saveLoading" @click="submitForm(true)" v-if="enniu == true">保存</el-button>
      <el-button :loading="saveLoading" @click="submitForm(false)" v-if="enniu == false">保存</el-button>
    </el-row>
  </el-form>
    </el-col>
  </el-row>
</el-dialog>

<!--SHOW TOP searchData-->
<br>
<el-row >
  <el-col :span="8" :offset="1">
    <el-row type="flex" justify="center">
      <el-col :span="6" style="line-height:35px;">
        网点名称
      </el-col>
      <el-col :span="11">
        <el-select
          clearable filterable
          v-model="searchData" placeholder="请选择网点">
          <el-option
            v-for="item in searchOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
        
      <el-col :span="5" :offset="4"><el-button @click="searchGo()" :loading="loadingTF">查询</el-button></el-col>
    </el-row>
  </el-col>
</el-row>
<br>
<!--SHOW dialog 新增-->
<el-row type="flex" justify="center">
  <el-col :span="23">
    <el-row type="flex" justify="space-around" class="Ghead">
      <el-col :span="21" >
        {{title}}
      </el-col>
      <el-col :span="1" class="addClass">
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
      height="462"
      :data="tableData"
      border
      fit
      style="width: 100%;"
      >
      <el-table-column label="操作" min-width="160px" fixed="right" align="center">
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
      <el-table-column
        show-overflow-tooltip
        align="center"
        min-width="200px"
        v-for="(item, index) in momo.shuju"
        :key="index"
        :prop="item.props"
        :label="item.label"
      ></el-table-column>
    <el-table-column
    align="center"
    min-width="150px"
      prop="Net_IsCollect"
      label="是否收款">
    </el-table-column>
    <el-table-column
    align="center"
    min-width="150px"
      prop="Net_IsLoan"
      label="是否放款">
    </el-table-column>

    </el-table>
  </el-col>
</el-row>
  </div>

</template>
<script>
  import { NetinfoEdit, NetinfotAdd, NetinfoShow, NetinfotDel, NetinfotSearch, NetinfoNet, DictionaryShow } from '../../api/jichushezhi/wangdianshezhi.js'
  export default {
    data () {
      return {
        saveLoading: false,
        loadingTF: false,
        enniu: true,
        name: '网点信息设置',
        title: '网点信息',
        dialogVisible: false,
        searchData: '',
        searchOptions: [],
        tableData: [],
        numberValidateForm: {
          age: ''
        },
        radio: 1,
        form: {},
        ruleForm: {},
        rules: {
          Net_Type: [
            { required: true, message: '请输入网点类型', trigger: 'change' }
          ],
          Net_Name: [
            { required: true, message: '请输入网点名称', trigger: 'change' }
          ],
          Net_Incity: [
            { type: 'array', required: true, message: '请选择网点所在城市', trigger: 'change' }
          ],
          Net_Tel: [
            { required: true, message: '请输入网点电话', trigger: 'change' },
            { pattern: /^1[34578]\d{9}$/, message: '请输入正确网点电话' }
          ],
          Net_Ratio: [
            { required: true, message: '请输入分段运费分成比例(%)', trigger: 'change' },
            { pattern: /^[^0]\d*$/, message: '请正确输入分段运费分成比例(不包含单位)', trigger: 'change' }
          ],
          Net_Account: [
            { pattern: /^([1-9]{1})(\d{14}|\d{18})$/, message: '请正确输入银行卡号', trigger: 'change' }
          ]
        },
        checkedMessages: [],
        messages: ['收款', '放款'],
        momo: {
          shuju: [
            { props: 'Net_Name', label: '网点名称', placeholder: '请输入网点名称', select: false, content: [] },
            { props: 'Net_Incity', label: '网点所在城市', placeholder: '请输入网点所在城市', cascader: true, content: [] },
            { props: 'Net_Linker', label: '网点联系人', placeholder: '请输入网点联系人', select: false, content: [] },
            { props: 'Net_Tel', label: '网点电话', placeholder: '请输入网点电话', select: false, content: [] },
            { props: 'Net_Addr', label: '网点地址', placeholder: '请输入网点地址', select: false, content: [] },
            { props: 'Net_Ratio', label: '分段运费分成比例(%)', placeholder: '请输入分段运费分成比例(不包含单位)', select: false, content: [] },
            { props: 'Net_Type', label: '网点类型', placeholder: '请输入网点类型', select: true, content: [] },
            { props: 'Net_Belong', label: '归属网点', placeholder: '请输入归属网点', select: true, content: [] },
            { props: 'Net_Sortname', label: '网点简称', placeholder: '请输入网点简称', select: false, content: [] },
            { props: 'Net_Py', label: '拼音简码', placeholder: '请输入网点拼音', select: false, content: [] },
            { props: 'Net_Bank', label: '网点开户行', placeholder: '请输入网点开户行', select: true, content: [] },
            { props: 'Net_Account', label: '银行卡号', placeholder: '请输入银行卡号', select: false, content: [] },
            { props: 'Net_GoodsCode', label: '货号前缀', placeholder: '请输入货号前缀', select: false, content: [] }
          ],
          model: {
            'Net_Type': '',
            'Net_Name': '',
            'Net_Sortname': '',
            'Net_Py': '',
            'Net_Linker': '',
            'Net_Tel': '',
            'Net_Addr': '',
            'Net_Incity': [],
            'Net_Belong': '',
            'Net_GoodsCode': '',
            'Net_Ratio': '',
            'Net_Bank': '',
            'Net_Account': ''
          }
        }
      }
    },
    created () {
      this.firstShow()
      this.showData()
    },
    computed: {
      linkage () {
        return this.$store.state.linkage
      }
    },
    methods: {
      addData () {
        this.resetF()
        this.dialogVisible = true
        this.enniu = true
      },
      async showData () {
        let nis = await NetinfoShow()
        if (nis.data.info === '') {
          this.tableData = []
        } else {
          this.tableData = nis.data.info
        }
        this.momo.shuju[7].content = []
        this.searchOptions = []
        let netRes = await NetinfoNet()
        for (let i in netRes.data.info) {
          this.$set(this.momo.shuju[7].content, i, {'label': netRes.data.info[i].Net_Name})
          this.$set(this.searchOptions, i, {'label': netRes.data.info[i].Net_Name, 'value': netRes.data.info[i].Net_Name})
        }
      },
      async firstShow () {
        this.momo.shuju[1].content = []
        this.momo.shuju[1].content = this.linkage
        let DictionaryBankRes = await DictionaryShow({'Dic_Remarks': '银行'})
        for (let i in DictionaryBankRes.data.info) {
          this.$set(this.momo.shuju[10].content, i, {'label': DictionaryBankRes.data.info[i].Dic_Title})
        }
        let DictionaryTypeRes = await DictionaryShow({'Dic_Remarks': '网点类型'})
        for (let i in DictionaryTypeRes.data.info) {
          this.$set(this.momo.shuju[6].content, i, {'label': DictionaryTypeRes.data.info[i].Dic_Title})
        }
      },
      handleEdit (index, row) {
        this.resetF()
        this.enniu = false
        this.momo.model = row
        this.form = row
        this.form['Net_Id'] = row.Net_Id
        this.checkedMessages = []
        if (row.Net_IsLoan === '放款') {
          this.checkedMessages.push(row.Net_IsLoan)
        }
        if (row.Net_IsCollect === '收款') {
          this.checkedMessages.push(row.Net_IsCollect)
        }
        this.dialogVisible = true
      },
      async handleDelete (index, row) {
        let nid = await NetinfotDel({Net_Id: row.Net_Id})
        this.showData()
        this.$message({
          message: nid.data.info,
          type: 'success'
        })
      },
      submitForm (index) {
        this.$refs['momo.model'].validate(async (valid) => {
          if (valid) {
            Object.assign(this.form, this.momo.model)
            let a = this.checkedMessages.find((value, index, arr) => {
              return value === '放款'
            })
            let b = this.checkedMessages.find((value, index, arr) => {
              return value === '收款'
            })
            if (a) {
              this.form['Net_IsLoan'] = '放款'
            } else {
              this.form['Net_IsLoan'] = ''
            }
            if (b) {
              this.form['Net_IsCollect'] = '收款'
            } else {
              this.form['Net_IsCollect'] = ''
            }
            this.saveLoading = true
            if (index) {
              let na = await NetinfotAdd(this.form)
              this.$message({
                message: na.data.info,
                type: 'success'
              })
              await this.showData()
              this.resetF()
              this.saveLoading = false
              this.dialogVisible = false
            }
            if (!index) {
              let ne = await NetinfoEdit(this.form)
              this.$message({
                message: ne.data.info,
                type: 'success'
              })
              await this.showData()
              this.saveLoading = false
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
        })
      },
      async searchGo () {
        this.loadingTF = true
        let nis = await NetinfotSearch({Net_Name: this.searchData})
        if (nis.data.info === '') {
          this.tableData = []
        } else {
          this.tableData = nis.data.info
        }
        this.loadingTF = false
      },
      resetF () {
        if (this.$refs['momo.model']) {
          this.$refs['momo.model'].resetFields()
        }
        if (this.$refs['form']) {
          this.$refs['form'].resetFields()
        }
        this.checkedMessages = []
        this.momo.model = {
          'Net_Type': '',
          'Net_Name': '',
          'Net_Sortname': '',
          'Net_Py': '',
          'Net_Linker': '',
          'Net_Tel': '',
          'Net_Addr': '',
          'Net_Incity': [],
          'Net_Belong': '',
          'Net_GoodsCode': '',
          'Net_Ratio': '',
          'Net_Bank': '',
          'Net_Account': ''
        }
        this.form['Net_Id'] = ''
      }
    }
  }
</script>
<style >
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
    border: none  ;
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
