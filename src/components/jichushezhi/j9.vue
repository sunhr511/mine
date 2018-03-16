<template>
  <div>
    <el-row type="flex" justify="center" style="height:607px;">
      <el-col :span="23">
        <br>

    <el-row>
      <el-col :span="24" class="Ghead">
        &nbsp;&nbsp;&nbsp;{{name}} <small style="color:red">(以下内容不填，其他功能将无法正常使用，请填写完整，填写完成，填写完整!！)</small>
      </el-col>
    </el-row>

<el-form :model="form" :rules="rules" ref="form">
  <br>
  <br>
  <br>
<el-row type="flex" justify="center">
  <el-col :span="11">
    <el-form-item prop="Logis_Name" label="公司名称" label-width="120px">
      <el-input v-model="form.Logis_Name" auto-complete="off" placeholder="请输入公司名称"  class="inputStyle" size="large"></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="11">
    <el-form-item prop="Logis_SortName" label="公司简称" label-width="120px">
      <el-input v-model="form.Logis_SortName " auto-complete="off" placeholder="请输入公司简称"  class="inputStyle" size="large"></el-input>
    </el-form-item>
  </el-col>
</el-row>
<el-row type="flex" justify="center">
  <el-col :span="11">
    <el-form-item prop="Logis_PY" label="拼音简码" label-width="120px">
      <el-input v-model="form.Logis_PY " auto-complete="off" placeholder="请输入拼音简码" class="inputStyle" size="large"></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="11">
    <el-form-item prop="Logis_Owner" label="法人" label-width="120px">
      <el-input v-model="form.Logis_Owner " auto-complete="off" placeholder="请输入法人" class="inputStyle" size="large"></el-input>
    </el-form-item>
  </el-col>
</el-row>



<el-row type="flex" justify="center">
  <el-col :span="11">
    <el-form-item prop="Logis_Bank" label="开户银行" label-width="120px">
      <!-- <el-input v-model="form.Logis_Bank" auto-complete="off" placeholder="请输入开户行"  class="inputStyle" size="large"></el-input> -->
      <el-select size="large" v-model="form.Logis_Bank" clearable placeholder="请输入开户行" style="width:100%">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
  </el-col>
  <el-col :span="11">
    <el-form-item prop="Logis_BankID" label="对公账户" label-width="120px">
      <el-input v-model="form.Logis_BankID " auto-complete="off" placeholder="请输入对公账户"  class="inputStyle" size="large"></el-input>
    </el-form-item>
  </el-col>
</el-row>
<el-row type="flex" justify="center">
  <el-col :span="11">
    <el-form-item prop="Logis_Address" label="注册地址" label-width="120px">
      <el-input v-model="form.Logis_Address " auto-complete="off" placeholder="请输入注册地址" class="inputStyle" size="large"></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="11">
     <el-form-item prop="Logistic_Rate" label="保价利率(‰)" label-width="120px">
      <el-input v-model="form.Logistic_Rate " auto-complete="off" placeholder="请输入保价利率(不带单位)" class="inputStyle" size="large"></el-input>
    </el-form-item>
  </el-col>
</el-row>
<el-row type="flex" justify="center">
  <el-col :span="11">
    <el-form-item prop="Logis_Point" label="算法选项" label-width="120px">
      <!-- <el-input v-model="form.Logis_Bank" auto-complete="off" placeholder="请输入开户行"  class="inputStyle" size="large"></el-input> -->
      <el-select size="large" v-model="form.Logis_Point"  placeholder="请选择算法选项" style="width:100%">
        <el-option
          v-for="item in optionp"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
  </el-col>
  <el-col :span="11">
    <el-form-item prop="Logis_Wgoods" label="重货(元/吨)" label-width="120px">
      <el-input v-model="form.Logis_Wgoods " auto-complete="off" placeholder="请输入重货单价" class="inputStyle" size="large"></el-input>
    </el-form-item>
  </el-col>
  
</el-row>
<el-row type="flex" justify="center">
  <el-col :span="11">
    <el-form-item prop="Logis_Lgoods" label="轻货(元/立方米)" label-width="120px">
      <el-input v-model="form.Logis_Lgoods " auto-complete="off" placeholder="请输入轻货单价" class="inputStyle" size="large"></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="11">
    <el-form-item prop="Logis_LogisMemo" label="简介" label-width="120px">
      <el-input type="textarea" v-model="form.Logis_LogisMemo " auto-complete="off" placeholder="请输入简介" class="inputStyle" size="large"></el-input>
    </el-form-item>
  </el-col>
</el-row>
      <el-row style="text-align:center" class="btnStyle">
        <el-button  :loading="loadingState" @click="submitForm('form')" >保存</el-button>
      </el-row>

  </el-form>

      </el-col>
    </el-row>
  </div>
<!-- 公司名称Logis_Name
  公司简称Logis_SortName
  拼音简码Logis_PY
  法人Logis_Owner
  开户行Logis_Bank
  对公账户Logis_BankID
  注册地址Logis_Address-->
</template>
<script>
  import { CominfoShow, CominfoEdit, DictionaryShow } from '../../api/jichushezhi/jichushezhi.js'
  export default {
    data () {
      return {
        name: '公司主体设置',
        numberValidateForm: {
          age: ''
        },
        form: {
          Logis_Name: '',
          Logis_SortName: '',
          Logis_PY: '',
          Logis_Owner: '',
          Logis_Wgoods: '',
          Logis_Lgoods: '',
          Logis_Bank: '',
          Logis_BankID: '',
          Logis_Address: '',
          Logistic_Rate: '',
          Logis_Point: '',
          Logis_LogisMemo: ''
        },
        loadingState: false,
        options: [],
        optionp: [
          {'label': '四舍五入', 'value': '四舍五入'},
          {'label': '小数进位', 'value': '小数进位'},
          {'label': '取整', 'value': '取整'},
          {'label': '保留两位小数', 'value': '保留两位小数'}
        ],
        rules: {
          Logis_Wgoods: [
            { pattern: /^\d*$/, message: '请输入数字(不要单位)' }
          ],
          Logis_Lgoods: [
            { pattern: /^\d*$/, message: '请输入数字(不要单位)' }
          ],
          Logis_Name: [
            { required: true, message: '请输入公司名称', trigger: 'change' }
          ],
          Logis_Bank: [
            { required: true, message: '请输入开户银行', trigger: 'change' }
          ],
          Logis_BankID: [
            { required: true, message: '请输入对公账户(开户银行卡号)', trigger: 'change' },
            { pattern: /^([1-9]{1})(\d{14}|\d{18})$/, message: '请正确输入开户银行卡号', trigger: 'change' }
          ],
          Logis_Address: [
            { required: true, message: '请输入注册地址', trigger: 'change' }
          ],
          Logistic_Rate: [
            { required: true, message: '请输入保价利率', trigger: 'change' },
            { pattern: /^[^0]\d*$/, message: '请正确输入保价利率', trigger: 'change' }
          ]
        }
      }
    },
    created () {
      this.OneData()
    },
    methods: {
      async OneData () {
        let cs = await CominfoShow()
        if (cs.data.info) {
          this.form = cs.data.info
        }
        let ds = await DictionaryShow({Dic_Remarks: '银行'})
        this.options = []
        for (let i in ds.data.info) {
          this.options.push({'label': ds.data.info[i].Dic_Title, 'value': ds.data.info[i].Dic_Title})
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.loadingState = true
            CominfoEdit(this.form).then((response) => {
              this.OneData()
              this.$message({
                message: response.data.info,
                showClose: true,
                type: 'success'
              })
              this.loadingState = false
            }, (value) => {
              this.$message({
                message: '保存失败',
                showClose: true,
                type: 'error'
              })
              this.loadingState = false
            })
          } else {
            this.$message({
              showClose: true,
              message: '请按规则填写',
              type: 'warning'
            })
            return false
          }
        })
      }
    }
  }
</script>
<style scoped>
*{
  font-family: "微软雅黑"
}
  .Ghead {
    background:  #d0d5f5;
    height: 40px;
    line-height: 40px;
    color: black;
  }
  .btnStyle .el-button {
    width: 160px;
    height: 50px;
    font-size: 18px;
    color: white;
    background: #8c96d9;
    border: none  ;
  }
</style>
