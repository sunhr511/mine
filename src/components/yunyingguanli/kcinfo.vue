<template>
  <div>
<el-form :model="formData" ref="formData" :rules="rules" label-position="right">
    
    <div style="display:flex; justify-content:space-between" >
      <el-form-item
        v-for="(item, index) in kcData.first.data" :key="index"
        :label="item.label" :prop="item.props"  label-width="80px" >
        <el-input disabled size="small" v-model="kcData.first.model[item.props]"></el-input>
      </el-form-item>
    </div>
    <el-row type="flex"  justify="space-between" >
      <el-col :span="11" class="shoufa">收货方</el-col>
      <el-col :span="11" class="shoufa">发货方</el-col>
    </el-row>
<br>
    <el-row type="flex"  justify="space-between" >
      <el-col :span="11" style="display:flex;flex-wrap: wrap;justify-content:space-between" >
        <el-form-item
        style="width:49%" 
          v-for="(item, index) in kcData.second.data" :key="index" 
          :label="item.label" :prop="item.props"  label-width="65px" >
          <el-input disabled size="small" v-model="kcData.second.model[item.props]" ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" style="display:flex;flex-wrap: wrap;justify-content:space-between">
        <img v-if="billing" src="../../assets/章.png" style="position:absolute;z-index:1;top:0%;left:70%;"/>
        <img v-if="!billing" src="../../assets/已到货.png" style="position:absolute;z-index:1;top:0%;left:70%;"/>
        <el-form-item style="width:49%"  v-for="(item, index) in kcData.third.data" 
        :key="index" :label="item.label" :prop="item.props"  label-width="65px" >
          <el-input disabled size="small" v-model="kcData.third.model[item.props]" ></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row  type="flex"  justify="center">
      <el-col class="shoufa" >货物信息</el-col>
    </el-row>
<br>
<el-row  type="flex"  justify="center">
  <el-col  v-for="(item, index) in kcData.fourth.data" :key="index">
    <el-form-item  :label="item.label" :prop="item.props"  label-width="75px" >
      <el-input disabled size="small" v-model="kcData.fourth.model[item.props]" ></el-input>
    </el-form-item>
  </el-col>
</el-row>

  <el-row  type="flex"  justify="center">
    <el-col class="shoufa">费用结算</el-col>
  </el-row>
  <br>
<el-row  type="flex"  justify="start" style="flex-wrap:wrap">
  <el-col  v-for="(item, index) in kcData.fifth.data" :key="index" :span="4">
      <el-form-item  :label="item.label" :prop="item.props"  label-width="110px" >
        <el-input disabled size="small" v-model="kcData.fifth.model[item.props]" ></el-input>
      </el-form-item>
    </el-col>
</el-row>
<el-collapse>
  <el-collapse-item title="其他费用(元)" name="1">
      <el-row  type="flex"  justify="start" style="flex-wrap:wrap">
        <el-col  v-for="(item, index) in kcData.sixth.data" :key="index" :span="4">
          <el-form-item  :label="item.label" :prop="item.props"  label-width="90px" >
            <el-input disabled size="small" v-model="kcData.sixth.model[item.props]" ></el-input>
          </el-form-item>
        </el-col>
    </el-row>
  </el-collapse-item>
</el-collapse>
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
        <el-button type="warning" @click="submitForm('formData')" style="width:100px">打 印</el-button>
      </el-form-item>
    </el-row> -->
  </el-form>

  </div>
</template>
<script>
export default {
  props: {
    kcData: Object,
    formData: Object,
    billing: Boolean,
    rules: Object
  },
  created () {
    // console.log(11, this.kcData)
  }
  // data () {
  //   return {
  //     checked: false,
  //     checked1: false,
  //     checked2: false
  //   }
  // },
  // methods: {
  //   submitForm (formInfo) {
  //     this.$emit('submitForm', this.formInfo, this.all, this.checked1, this.checked2)
  //   },
  //   resetForm () {
  //     if (this.$refs['formInfo']) {
  //       this.$refs['formInfo'].resetFields()
  //     }
  //   }
  // }
}
</script>
<style scoped>
.shoufa {
  background:#8c96d9;
  color: white;
  padding: 6px;
  padding-left:16px; 
  font-size:16px;
  font-family: "微软雅黑";
  border-radius: 5px;
}
/* .tiao{height: 40px;background: #d0d5f5;line-height: 40px;font-size: 16px;border-radius: 10px;margin-bottom: 20px}
.butstyle{margin: 20px auto;} */
</style>
