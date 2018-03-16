<template>
<el-form :model="formInfo" ref="formInfo" :rules="rules" label-position="right">
  <div style="display:flex;justify-content:space-between">
    <el-form-item  v-for="(item, index) in all.first.data" :key="index" :label="item.label" :prop="item.prop"  label-width="80px" >  
        <el-input disabled v-if="item.input" v-model="formInfo[item.prop]" :placeholder="item.placeholder"></el-input>
        <el-select disabled clearable v-if="item.select" v-model="formInfo[item.prop]" :placeholder="item.placeholder" style="width:100%">
          <el-option disabled
            v-for="(con, index) in item.content"
            :key="con.label"
            :label="con.label"
            :value="con.label">
          </el-option>
        </el-select>
      </el-form-item>
  </div>
 
    <el-row type="flex" justify="space-between">
      <el-col :span="11" class="tiao">发货方</el-col>
      <el-col :span="11" class="tiao">收货方</el-col>
    </el-row>
<br>
    <el-row type="flex" style="flex-wrap:wrap">
      <el-col :span="10">
        <el-row>
          <el-col :span="20" >
            <el-form-item v-for="(item, index) in all.third.data" :key="index" :label="item.label" :prop="item.prop" label-width="80px">
              <el-input disabled v-model="formInfo[item.prop]" v-if="item.input" :placeholder="item.placeholder" style="width:500px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="10" :offset="3">
        <el-row>
                       <img v-for="(item, index) in billing" v-if="item.name == aaa" :src='"../../assets/kefuguanli/"+item.name+".png"' style="width:40%;transform:rotate(-20deg);-ms-transform:rotate(-20deg); -moz-transform:rotate(-20deg); -webkit-transform:rotate(-20deg);-o-transform:rotate(-20deg);position:absolute;z-index:1;top:22%;left:50%;"/>

          <el-col :span="20" v-for="(item, index) in all.fourth.data" :key="index">
            <el-form-item :label="item.label" :prop="item.prop" label-width="80px">
              <el-input disabled v-model="formInfo[item.prop]" v-if="item.input" :placeholder="item.placeholder" style="width:500px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row><el-col class="tiao">货物信息</el-col></el-row>
    <br>
    <div style="display:flex;flex-wrap:wrap">
      <el-form-item v-for="(item, index) in all.fifth.data" :key="index" :label="item.label" :prop="item.prop" label-width="80px">
          <el-input disabled v-model="formInfo[item.prop]" v-if="item.input" :placeholder="item.placeholder" ></el-input>
           <el-select disabled clearable  v-if="item.select" v-model="formInfo[item.prop]" :placeholder="item.placeholder">
            <el-option disabled
              v-for="(con, index) in item.content"
              :key="con.label"
              :label="con.label"
              :value="con.label">
            </el-option>
          </el-select>
        </el-form-item>
    </div>
    <el-row><el-col class="tiao">费用结算</el-col></el-row>
    <br>
    <div  style="display:flex;flex-wrap:wrap">
      <el-form-item style="width:25%"  v-for="(item, index) in all.sixth.data" :key="index" :label="item.label" :prop="item.prop" label-width="120px">
          <el-input disabled v-model="formInfo[item.prop]" v-if="item.input" :placeholder="item.placeholder" ></el-input>
           <el-select disabled clearable style="width:100%" v-if="item.select" v-model="formInfo[item.prop]" :placeholder="item.placeholder" >
            <el-option disabled
              v-for="(con, index) in item.content"
              :key="con.label"
              :label="con.label"
              :value="con.label">
            </el-option>
          </el-select>
        </el-form-item>
    </div>
    <div  style="display:flex;flex-wrap:wrap">
      <el-form-item style="width:25%"  v-for="(item, index) in all.seventh.data" :key="index" :label="item.label" :prop="item.prop" label-width="120px">
         <el-input disabled v-model="formInfo[item.prop]" v-if="item.radios" :placeholder="item.placeholder" :disabled="!checked"></el-input>
          <el-input disabled v-model="formInfo[item.prop]" v-if="item.input" :placeholder="item.placeholder" ></el-input>
           <el-select disabled clearable  v-if="item.select" v-model="formInfo[item.prop]" :placeholder="item.placeholder">
            <el-option disabled
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
            <div  style="display:flex;flex-wrap:wrap">
              <el-form-item style="width:16%"  v-for="(item, index) in all.eighth.data" :key="index" :label="item.label" :prop="item.prop" label-width="100px">
                <el-input disabled v-model="formInfo[item.prop]" v-if="item.input" :placeholder="item.placeholder" ></el-input>
              </el-form-item>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>

    <!-- <el-row type="flex" style="flex-wrap:wrap">
      <el-col :span="2">
        <el-checkbox v-model="checked1" style="margin-top:8px">标签打印</el-checkbox>
      </el-col>
      <el-col :span="4">
        <el-form-item label="数量" label-width="90px">
          <el-input size="small" placeholder="请输入数量" style="width:100px"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-checkbox v-model="checked2" style="margin-top:8px">小票打印</el-checkbox>
      </el-col>

    </el-row>
    <el-row type="flex">
      <el-form-item label-width="100px" class="butstyle">
        <el-button type="warning" @click="submitForm('formInfo')" style="width:100px">保 存</el-button>
      </el-form-item> -->
    </el-row> 
  </el-form>
</template>
<script>
export default {
  props: {
    formInfo: Object,
    all: Object,
    rules: Object,
    billing: Array,
    aaa: String
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
      this.$refs[formInfo].validate((valid) => {
        if (valid) {
          // alert('submit!')
          this.$emit('submitForm', this.formInfo, this.all)
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
</style>

