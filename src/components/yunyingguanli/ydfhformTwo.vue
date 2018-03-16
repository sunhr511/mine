<template>
<div>
  <el-row type="flex" justify="center">
    <el-col :span="20">
<el-form :model="formInfo" ref="formInfo" :rules="rules" label-position="right">
  <div style="display:flex;justify-content:space-between">
    <el-form-item style="width:100%" v-for="(item, index) in all.first.data" :key="index"
         :label="item.label" :prop="item.prop"  label-width="100px" >
        <el-input  v-if="item.input" v-model="formInfo[item.prop]" :placeholder="item.placeholder"></el-input>
        <el-select clearable v-if="item.select" v-model="formInfo[item.prop]" :placeholder="item.placeholder" style="width:100%">
          <el-option
             v-for="(con, index) in item.content"
            :key="con.label"
            :label="con.label"
            :value="con.label">
          </el-option>
        </el-select>
      </el-form-item>
  </div>

    <el-row type="flex" style="flex-wrap:wrap">
      <el-col :span="11" class="tiao">收货方</el-col>
      <el-col :span="11" class="tiao" :offset="2">发货方</el-col>
    </el-row>
<br>
    <el-row type="flex" justify="space-between">
      <el-col :span="11" style="display:flex;flex-wrap:wrap;justify-content:space-between">
        <el-form-item style="width:49%" :label="item.label" :prop="item.prop" label-width="80px"  v-for="(item, index) in all.fourth.data" :key="index">
          <el-input v-model="formInfo[item.prop]" v-if="item.input" :placeholder="item.placeholder"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" style="display:flex;flex-wrap:wrap;justify-content:space-between">
        <el-form-item style="width:49%" :label="item.label" :prop="item.prop" label-width="70px" v-for="(item, index) in all.third.data" :key="index">
          <el-input v-model="formInfo[item.prop]" v-if="item.input" :placeholder="item.placeholder" ></el-input>
        </el-form-item>
      </el-col>
      
    </el-row>
    <el-row><el-col class="tiao">货物信息</el-col></el-row><br>
    <el-row>
      <el-col></el-col>
    </el-row>
    <div style="display:flex;justify-content: space-between">
      <el-form-item :label="item.label" :prop="item.prop" label-width="85px" v-for="(item, index) in all.fifth.data" :key="index">
        <el-input v-model="formInfo[item.prop]" v-if="item.input" :placeholder="item.placeholder" ></el-input>
          <el-select clearable  v-if="item.select" v-model="formInfo[item.prop]" :placeholder="item.placeholder">
          <el-option
            v-for="(con, index) in item.content"
            :key="con.label"
            :label="con.label"
            :value="con.label">
          </el-option>
        </el-select>
      </el-form-item>
    </div>
    <el-row><el-col class="tiao">费用结算</el-col></el-row><br>
    <div style="display:flex;justify-content: space-between;flex-wrap:wrap">
      <el-form-item style="width:25%" :label="item.label" :prop="item.prop" label-width="110px" v-for="(item, index) in all.sixth.data" :key="index">
          <el-input v-model="formInfo[item.prop]" v-if="item.input" :placeholder="item.placeholder" ></el-input>
           <el-select clearable style="width:100%"  v-if="item.select" v-model="formInfo[item.prop]" :placeholder="item.placeholder" >
            <el-option
              v-for="(con, index) in item.content"
              :key="con.label"
              :label="con.label"
              :value="con.label">
            </el-option>
          </el-select>
        </el-form-item>
    </div>
    <div style="flex-wrap:wrap;display:flex;justify-content:space-between;" >
      <el-checkbox v-model="checked" style="margin-top:8px;margin-right:-45px;">有回单</el-checkbox>
      <el-form-item  :label="item.label"
         :prop="item.prop" label-width="80px" 
         v-for="(item, index) in all.seventh.data" :key="index">
         <el-input v-model="formInfo[item.prop]" v-if="item.radios" :placeholder="item.placeholder"  :disabled="!checked"></el-input>
          <el-input v-model="formInfo[item.prop]" v-if="item.input" :placeholder="item.placeholder" ></el-input>
           <el-select  clearable  v-if="item.select" v-model="formInfo[item.prop]" :placeholder="item.placeholder" >
            <el-option
              v-for="(con, index) in item.content"
              :key="con.label"
              :label="con.label"
              :value="con.label">
            </el-option>
          </el-select>
        </el-form-item>
    </div>

    <el-row>
      <el-col :span="24" >
        <el-collapse>
          <el-collapse-item title="其他费用录入" name="1">
            <el-row type="flex" style="flex-wrap:wrap">
              <el-col :span="4" v-for="(item, index) in all.eighth.data" :key="index">
              <el-form-item :label="item.label" :prop="item.prop" label-width="100px">
                <el-input v-model="formInfo[item.prop]" v-if="item.input" :placeholder="item.placeholder" style="width:100px"></el-input>
              </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <div style="margin-top:6px;display:flex;height:30px" v-if="!printTF">
      <el-checkbox v-model="checked1" style="margin-top:8px;margin-right:-40px;">标签打印</el-checkbox>
      <el-form-item label="数量" label-width="90px">
        <el-input size="small" placeholder="请输入数量" ></el-input>
      </el-form-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-checkbox v-model="checked2" style="margin-top:8px">小票打印</el-checkbox>
    </div>
    <div style="width:100%;text-align:center">
      <el-button size="large" :loading="saveLoading" type="warning" @click="submitForm('formInfo')" >{{saveName}}</el-button>
    </div>
  </el-form>
  </el-col>
</el-row>
</div>
</template>
<script>
export default {
  props: {
    formInfo: Object,
    all: Object,
    rules: Object,
    printTF: Boolean,
    saveName: String,
    saveLoading: Boolean
  },
  created () {
    // console.log('222', this.all.first.data)
    this.resetForm()
  },
  data () {
    return {
      checked: false,
      checked1: false,
      checked2: false
    }
  },
  methods: {
    submitForm (formInfo) {
      console.log()
      this.$refs[formInfo].validate((valid) => {
        if (valid) {
          // alert('submit!')
          this.$emit('submitForm', this.formInfo, this.all, this.checked1, this.checked2)
        } else {
          // console.log('error submit!!')
          this.$message({
            showClose: true,
            message: '请按规则填写',
            type: 'info'
          })
          return false
        }
      })
      // this.$refs[formInfo].resetFields()
    },
    resetForm () {
      if (this.$refs['formInfo']) {
        this.$refs['formInfo'].resetFields()
      }
    }
  }
}
</script>
<style scoped>

.tiao {
  background:#8c96d9;
  color: white;
  padding: 6px;
  padding-left:16px; 
  font-size:16px;
  font-family: "微软雅黑";
  border-radius: 5px;
}
/* .tiao{height: 40px;background: #d0d5f5;line-height: 40px;font-size: 16px;border-radius: 10px;margin-bottom: 20px} */
</style>
