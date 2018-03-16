<template>
<div class="all allCell"  >
<el-row type="flex" justify="space-around" >
  <el-col :span="2">
    <el-row type="flex" style="height:100%;">
      <el-col style="align-self:center" :span="3">
        <img src="../../assets/yunyingguanli/票务管理.png">
      </el-col>
    </el-row>
  </el-col>

  <el-col :span="18">
    <el-row type="flex" justify="space-around">
      <el-col :span="3" style="text-align:center;display:flex;flex-direction: column;justify-content:space-between" >
        <el-button
          style="margin:0;border:0;background:transparent;"
          v-for="(x, i) in 2"
          :key="i"
          @click="addTab(OperationManagement[i])">
          <img :src="OperationManagement[i].imgPath" style="width:100%;max-width:80px"  alt=""><br><br>{{OperationManagement[i].name}}
        </el-button>
      </el-col>
      <el-col :span="4">
        <img src="../../assets/yunyingguanli/3.png" style="height:100%;width:100%" alt="" >
      </el-col>
      <el-col :span="3" style="align-self:center; text-align:center">
        <el-button style="margin:0;border:0;background:transparent;"
         @click="addTab(OperationManagement[2])">
          <img :src="OperationManagement[2].imgPath" style="width:100%;max-width:80px" alt="" >
          <br><br>{{OperationManagement[2].name}}
        </el-button>
      </el-col>
      <el-col :span="4">
        <img  src="../../assets/yunyingguanli/5.png" style="height:100%;width:100%" alt="">
      </el-col>
      <el-col :span="3" style="display:flex;text-align:center;flex-direction: column;justify-content:space-between;">
        <el-button
          style="margin:0;border:0;background:transparent"
          v-for="(x, i) in 3"
          :key="i"
          @click="addTab(OperationManagement[i+3])">
          <img :src="OperationManagement[i+3].imgPath"  style="width:100%;max-width:80px" alt=""><br><br>{{OperationManagement[i+3].name}}
        </el-button>
      </el-col>
      <el-col  :span="3" style="align-self:center;text-align:center">
        <img src="../../assets/yunyingguanli/heng.png" style="width:100%"  alt="" >
      </el-col>
      <el-col :span="3"  style="align-self:center;text-align:center;">
        <el-button style="margin:0;border:0;background:transparent"  @click="addTab(OperationManagement[6])">
          <img :src="OperationManagement[6].imgPath"  style="width:100%;max-width:80px" alt="">
          <br><br>{{OperationManagement[6].name}}</el-button>
      </el-col>
    </el-row>
  </el-col>
</el-row>

<el-row type="flex" justify="space-around">
  <el-col :span="2">
    <el-row type="flex" style="height:100%;text-align:center">
      <el-col style="align-self:center" :span="3">
        <img src="../../assets/yunyingguanli/回单回付.jpg">
      </el-col>
    </el-row>
  </el-col>
  <el-col :span="18">
    <el-row type="flex" justify="space-around">
      <!-- <el-col v-for="(x,i) in 3" :key="i" :span="7" >
        <el-button @click="addTab(OperationManagement[8 + i])" style="margin:0;border:0px;background:transparent">
          <img :src="OperationManagement[8 + i].imgPath" alt=""><br><br>{{OperationManagement[8 + i].name}}
        </el-button>
      </el-col> -->
      <el-col :span="3" style="text-align:center">
        <el-button @click="addTab(OperationManagement[7])" style="margin:0;border:0px;background:transparent">
          <img :src="OperationManagement[7].imgPath" style="width:100%;max-width:80px;" alt=""><br><br>{{OperationManagement[7].name}}
        </el-button>
      </el-col>
      <el-col :span="4" ></el-col>
      <el-col :span="3" style="text-align:center">
        <el-button @click="addTab(OperationManagement[8])" style="margin:0;border:0px;background:transparent">
          <img :src="OperationManagement[8].imgPath" style="width:100%;max-width:80px;" alt=""><br><br>{{OperationManagement[8].name}}
        </el-button>
      </el-col>
      <el-col :span="4"></el-col>
      <el-col :span="3" style="text-align:center">
        <el-button @click="addTab(OperationManagement[9])"
        style="margin:0;border:0px;background:transparent;">
          <img :src="OperationManagement[9].imgPath" style="width:100%;max-width:80px;" alt=""><br><br>{{OperationManagement[9].name}}
        </el-button>
      </el-col>
      <el-col :span="3"></el-col>
      <el-col :span="3"></el-col>
    </el-row>
  </el-col>
</el-row>
  </div>
</template>
<script>
export default {
  // props: ['OperationManagement', 'OperationManagementTF'],
  props: {
    OperationManagement: Array,
    OperationManagementTF: Object
  },
  created () {
    // console.log(this.OperationManagement)
  },
  methods: {
    addTab (item) {
      this.$emit('addTab', item)
    }
  }
}
</script>
<style scoped>
.all{
  overflow: auto;
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  width:100%;
  height:100%;
}
</style>
