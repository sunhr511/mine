<template>
<div>
<el-dialog :visible.sync="dialogVisible">
   <el-row type="flex" justify="center">
    <el-col :span="23" >
      <el-col :span="24" class="Ghead">
        &nbsp;&nbsp;&nbsp;{{name}}
      </el-col>
      <br><br><br>
  <el-form :model="momo.model" :rules="rules" ref="momo.model"   label-width="100px" label-position="right" >
    <el-form-item
      v-for="(item, index) in momo.shuju"
      :key="index"
      :label="item.label"
      :prop="item.props"
    >
    <el-select clearable v-if="item.select" v-model="momo.model[item.props]" :placeholder="item.placeholder" style="width:100%">
      <el-option
        v-for="(con, index) in item.content"
        :key="con.label"
        :label="con.label"
        :value="con.label">
      </el-option>
    </el-select>
    <el-input v-if="!item.select"  v-model="momo.model[item.props]" :placeholder="item.placeholder"></el-input>
  </el-form-item>
     <el-form-item class="btnStyle" label-width="0px">
        <el-button   @click="submitForm(true)" v-if="enniu == true">保存</el-button>
        <el-button   @click="submitForm(false)" v-if="enniu == false">保存</el-button>
      </el-form-item>
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
        <el-select clearable filterable v-model="searchData" placeholder="请选择网点">
          <el-option
            v-for="item in searchOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-input>
      </el-col>
      <el-col :span="5" :offset="4"><el-button @click="searchGo()" :loading="loadingTF">查询</el-button></el-col>
    </el-row>
  </el-col>
</el-row>
<br>
<!--SHOW dialog-->
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
  <el-col :span="23" style="">
    <el-table
      height="462"
      :data="tableData"
      border
      style="width: 100%;"
      >
      
      <el-table-column
       v-for="(item, index) in momo.shuju" 
       :key="index"
       :prop="item.props" 
       :label="item.label"
      ></el-table-column>
    <el-table-column label="操作" width="150px" >
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
</div>
  <!--
    Rel_ID业务关系id
    Rel_Net公司网点
    Rel_Business业务网点
    Rel_Nexus业务关系
    Rel_Ratio运费分段占比
    Rel_LastDay财务欠款时效
-->
</template>
<script>
  import { RelationsShow, RelationsAdd, RelationsEdit, RelationsDel, RelationsSearch, NetinfoNet } from '../../api/jichushezhi/gongsicaiwushuxingshezhi.js'
  export default {
    data () {
      return {
        loadingTF: false,
        enniu: true,
        name: '公司财务属性设置',
        title: '公司财务属性',
        dialogVisible: false,
        searchData: '',
        searchOptions: [],
        tableData: [],
        numberValidateForm: {
          age: ''
        },
        radio: 1,
        form: {},
        rules: {
          Rel_Net: [
            { required: true, message: '请输入公司网点', trigger: 'change' }
          ],
          Rel_Business: [
            { required: true, message: '请输入业务网点', trigger: 'change' }
          ],
          Rel_Nexus: [
            { required: true, message: '请输入业务关系', trigger: 'change' }
          ],
          Rel_Ratio: [
            { required: true, message: '请输入运费分段占比(%)', trigger: 'change' },
            { pattern: /^[^0]\d*$/, message: '请正确输入运费分段占比(不包含单位)', trigger: 'change' }
          ],
          Rel_LastDay: [
            { required: true, message: '请正确输入财务欠款时效(天)', trigger: 'change' },
            { pattern: /^[^0]\d*$/, message: '请正确输入财务欠款时效(不包含单位)', trigger: 'change' }
          ]
        },
        momo: {
          shuju: [
            { props: 'Rel_Net', label: '公司网点', placeholder: '请输入公司网点', model: '', select: true, content: [] },
            { props: 'Rel_Business', label: '业务网点', placeholder: '请输入业务网点', model: '', select: true, content: [] },
            { props: 'Rel_Nexus', label: '业务关系', placeholder: '请输入业务关系', model: '', select: true, content: [] },
            { props: 'Rel_Ratio', label: '运费分段占比(%)', placeholder: '请输入运费分段占比(不包含单位)', model: '', select: false, content: [] },
            { props: 'Rel_LastDay', label: '财务欠款时效(天)', placeholder: '请输入财务欠款时效(不包含单位)', model: '', select: false, content: [] }
          ],
          model: {
            'Rel_Net': '',
            'Rel_Business': '',
            'Rel_Nexus': '',
            'Rel_Ratio': '',
            'Rel_LastDay': ''
          }
        },
        numCount: []
      }
    },
    created () {
      this.firstShow()
      this.showData()
    },
    methods: {
      addData () {
        this.momo.model = {
          'Rel_Net': '',
          'Rel_Business': '',
          'Rel_Nexus': '',
          'Rel_Ratio': '',
          'Rel_LastDay': ''
        }
        // this.$refs['momo.model'].resetFields()
        if (this.$refs['momo.model']) {
          this.$refs['momo.model'].resetFields()
        }
        this.dialogVisible = true
        this.enniu = true
      },
      firstShow () {
        NetinfoNet().then((response) => {
          // console.log(response)
          this.momo.shuju[0].content = []
          this.momo.shuju[1].content = []
          this.momo.shuju[2].content = []
          for (let z in response.data.info) {
            this.momo.shuju[0].content.push({'label': response.data.info[z].Net_Name})
            this.momo.shuju[1].content.push({'label': response.data.info[z].Net_Name})
            this.searchOptions[z] = {'label': response.data.info[z].Net_Name, 'value': response.data.info[z].Net_Name}
          }
          this.momo.shuju[2].content.push({'label': '上缴'}, {'label': '收缴'})
        })
      },
      async showData () {
        let rs = await RelationsShow()
        if (rs.data.info === '') {
          this.tableData = []
        } else {
          this.tableData = rs.data.info
        }
      },
      handleEdit (index, row) {
        this.enniu = false
        // for (let mo in this.momo.shuju) {
        //   this.momo.shuju[mo].model = row[this.momo.shuju[mo].props]
        // }
        this.momo.model = row
        console.log(row)
        this.form['Rel_ID'] = row.Rel_ID
        // console.log(this.momo.shuju)
        this.dialogVisible = true
      },
      handleDelete (index, row) {
        // console.log(index, row)
        RelationsDel({Rel_ID: row.Rel_ID}).then((response) => {
          // alert(response.data.info)
          this.$message({
            showClose: true,
            message: response.data.info,
            type: 'success'
          })
          this.showData()
        })
      },
      submitForm (index) {
        // this.dialogVisible = false
        // for (let sj in this.momo.shuju) {
        //   this.form[this.momo.shuju[sj].props] = this.momo.shuju[sj].model
        // }
        this.$refs['momo.model'].validate((valid) => {
          if (valid) {
            this.form = this.momo.model
            // console.log(this.form)
            if (index) {
              RelationsAdd(this.form).then((response) => {
                // alert(response.data.info)
                this.$message({
                  showClose: true,
                  message: response.data.info,
                  type: 'success'
                })
                // console.log(response)
                this.showData()
                this.dialogVisible = false
              })
            }
            if (!index) {
              RelationsEdit(this.form).then((response) => {
                // alert(response.data.info)
                this.$message({
                  showClose: true,
                  message: response.data.info,
                  type: 'success'
                })
                // console.log(response)
                this.showData()
                this.dialogVisible = false
              })
            }
            // this.momo.model = {
            //   'Rel_Net': '',
            //   'Rel_Business': '',
            //   'Rel_Nexus': '',
            //   'Rel_Ratio': '',
            //   'Rel_LastDay': ''
            // }
          } else {
            // console.log('error submit!!')
            this.$message({
              showClose: true,
              message: '请按规则填写',
              type: 'warning'
            })
            return false
          }
        })
        // for (let mo in this.momo.model) {
        //   this.momo.model[this.momo.shuju[mo].props] = ''
        // }
      },
      async searchGo () {
        this.loadingTF = true
        let rs = await RelationsSearch({'Rel_Net': this.searchData})
        if (rs.data.info === '') {
          this.tableData = []
        } else {
          this.tableData = rs.data.info
        }
        this.loadingTF = false
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
  .btnStyle {
    text-align: center;
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
