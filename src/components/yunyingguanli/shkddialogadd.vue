<template>
  <el-dialog
  title="新增开单"
  :visible.sync="dialogVisible"
  :before-close="close"
  size="full">
  <el-form :model="formInfo" ref="formInfo" class="demo-ruleForm">
    <el-row type="flex" style="flex-wrap:wrap">
      <el-col :span="8"  v-for="(item, index) in all.first.data" :key="index">
        <el-form-item   :label="item.label" :prop="item.props"  label-width="80px" >
          <el-date-picker
            size="small"
            style="width:120px;"
            type="daterange"
            v-if="item.date"
            v-model="all.first.model[item.prop]"
            :placeholder="item.placeholder">
          </el-date-picker>
          <el-select  size="small" clearable  v-if="item.select" v-model="all.first.model[item.props]" :placeholder="item.placeholder" style="width:100px;">
            <el-option
              v-for="(con, index) in item.content"
              :key="con.label"
              :label="con.label"
              :value="con.label">
            </el-option>
          </el-select>
          <el-input v-model="all.first.model[item.prop]" v-if="item.input" :placeholder="item.placeholder" style="width:250px;" class="inputStyle"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:15px"><hr></el-row>
    <el-row type="flex" style="flex-wrap:wrap">
      <el-col :span="8" v-for="(item, index) in all.second.data" :key="index">
        <el-form-item :label="item.label" :prop="item.prop" label-width="80px">
          <el-input v-model="all.second.model[item.prop]" v-if="item.input" :placeholder="item.placeholder" style="width:250px"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" style="flex-wrap:wrap">
      <el-col :span="11" class="tiao">&nbsp;&nbsp;收货方</el-col>
      <el-col :span="11" class="tiao" :offset="2">&nbsp;&nbsp;发货方</el-col>
    </el-row>
    <el-row type="flex" style="flex-wrap:wrap">
      <el-col :span="10">
        <el-row>
          <el-col :span="20" v-for="(item, index) in all.third.data" :key="index">
            <el-form-item :label="item.label" :prop="item.prop" label-width="80px">
              <el-input v-model="all.third.model[item.prop]" v-if="item.input" :placeholder="item.placeholder" style="width:500px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="10" :offset="3">
        <el-row>
          <el-col :span="20" v-for="(item, index) in all.fourth.data" :key="index">
            <el-form-item :label="item.label" :prop="item.prop" label-width="80px">
              <el-input v-model="all.fourth.model[item.prop]" v-if="item.input" :placeholder="item.placeholder" style="width:500px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row><el-col class="tiao">&nbsp;&nbsp;货物信息</el-col></el-row>
    <el-row type="flex" style="flex-wrap:wrap">
      <el-col :span="4" v-for="(item, index) in all.fifth.data" :key="index">
        <el-form-item :label="item.label" :prop="item.prop" label-width="80px">
          <el-input v-model="all.fifth.model[item.prop]" v-if="item.input" :placeholder="item.placeholder" style="width:120px"></el-input>
           <el-select clearable  v-if="item.select" v-model="all.fifth.model[item.props]" :placeholder="item.placeholder" style="width:120px;">
            <el-option
              v-for="(con, index) in item.content"
              :key="con.label"
              :label="con.label"
              :value="con.label">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row><el-col class="tiao">&nbsp;&nbsp;费用结算</el-col></el-row>
    <el-row type="flex" style="flex-wrap:wrap">
      <el-col :span="3" v-for="(item, index) in all.sixth.data" :key="index">
        <el-form-item :label="item.label" :prop="item.prop" label-width="90px">
          <el-input v-model="all.sixth.model[item.prop]" v-if="item.input" :placeholder="item.placeholder" style="width:100px"></el-input>
           <el-select clearable  v-if="item.select" v-model="all.sixth.model[item.props]" :placeholder="item.placeholder" style="width:100px;">
            <el-option
              v-for="(con, index) in item.content"
              :key="con.label"
              :label="con.label"
              :value="con.label">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" style="flex-wrap:wrap">
      <el-checkbox v-model="checked" style="margin-top:8px">有回单</el-checkbox>
      <el-col :span="5" v-for="(item, index) in all.seventh.data" :key="index">
        <el-form-item :label="item.label" :prop="item.prop" label-width="100px">
         <el-input v-model="all.seventh.model[item.prop]" v-if="item.radios" :placeholder="item.placeholder" style="width:200px" :disabled="!checked"></el-input>
          <el-input v-model="all.seventh.model[item.prop]" v-if="item.input" :placeholder="item.placeholder" style="width:200px"></el-input>
           <el-select clearable  v-if="item.select" v-model="all.seventh.model[item.props]" :placeholder="item.placeholder" style="width:300px;">
            <el-option
              v-for="(con, index) in item.content"
              :key="con.label"
              :label="con.label"
              :value="con.label">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" >
        <el-collapse>
          <el-collapse-item title="其他费用录入" name="1">
            <el-col :span="4" v-for="(item, index) in all.eighth.data" :key="index">
            <el-form-item :label="item.label" :prop="item.prop" label-width="90px">
              <el-input v-model="all.eighth.model[item.prop]" v-if="item.input" :placeholder="item.placeholder" style="width:100px"></el-input>
            </el-form-item>
            </el-col>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <el-row type="flex" style="flex-wrap:wrap">
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
        <!-- <el-button type="warning" @click="resetForm('formInfo')" style="width:100px">重置</el-button> -->
      </el-form-item>
    </el-row>
  </el-form>
</el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: Boolean,
    formInfo: [Object, Array],
    all: Object
  },
  created () {
    // console.log('222', this.all.first.data)
  },
  data () {
    return {
      checked: false,
      checked1: false,
      checked2: false
    }
  },
  methods: {
    aaad () {
      this.$emit('aaad')
    },
    close () {
      this.$emit('close')
      // this.resetForm()
    },
    submitForm (formInfo) {
      this.$emit('submitForm', this.formInfo, formInfo)
    },
    resetForm (formInfo) {
      this.$refs[formInfo].resetFields()
    }
  }
}
</script>
<style scoped>
.tiao{height: 40px;background: #d0d5f5;line-height: 40px;font-size: 16px;border-radius: 10px;margin-bottom: 20px}
.butstyle{margin: 20px auto;}
</style>
