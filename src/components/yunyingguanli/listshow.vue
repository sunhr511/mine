<template >
<div>
  <el-row class="all" type="flex" justify="center" align="middle">
    <el-col :span="20">
          <el-row style="flex-wrap:wrap;margin-top:-40px" type="flex" justify="center" >
            <el-col
              :span = "6"
              style="text-align:center"
              v-for="(item, index) in PubBtnNum" :key="index">
              <el-button
              size="small"
              @click="addTab(item)" style="border:none;margin-bottom:30px;margin-top:30px;">
              <img :src="item.imgPath">
              <!--v-if="PubBtnTF[item.name]"  -->
              <br><br>
              {{item.name}}
              </el-button>
            </el-col>
          </el-row>
    </el-col>
  </el-row>
</div>
</template>
<script>
export default {
  // props: ['OperationManagement', 'OperationManagementTF'],
  // PubBtnTF: Object
  props: {
    PubBtnNum: Array
  },
  methods: {
    addTab (item) {
      this.$emit('addTab', item)
    }
  }
}
</script>
<style scoped>
.all {
  height:100%;
}
</style>
