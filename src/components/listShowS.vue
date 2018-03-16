<template>
  <div>
    <el-row  type="flex" justify="center" align="middle" style="width:100%;height:100%;margin-top:-30px;">
      <el-col :span="21">
        <div style="
          display:flex;
          flex-direction:column ">
           <el-row  
            type="flex"
            v-for="(x, index) in titleArr"
            :key="index"
            align="middle"
            style="width:100%; margin:20px;margin-left:0px;"
            >
            <el-col :span="3" style="font-size:24px; ">
              <img :src="imgArr[index]" style="margin-top:2px;">
               {{x}}
            </el-col>
            <el-col :span="21">
              <el-row type="flex" >
                <!-- justify="space-around"  -->
                <el-col
                  :span = "6"
                  style="text-align:center"
                  v-for="(item, index) in PubBtnNum.slice(numArr[index],numArr[index+1])" :key="index">
                  <el-button
                    size="small"
                    @click="addTab(item)" style="border:none;">
                    <img :src="item.imgPath">
                    <br><br>
                    {{item.name}}
                  </el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row> 
        </div>
    </el-col>
  </el-row>
  <!-- <el-col
        :span = "6"
        style="text-align:center"
        v-for="(item, index) in PubBtnNum" :key="index">
        <el-button
          size="small"
          @click="addTab(item)" style="border:none;margin-bottom:30px;margin-top:30px;">
          <img :src="item.imgPath">
          <br><br>
          {{item.name}}
        </el-button>
      </el-col> -->
  </div>
</template>
<script>
export default {
  // props: ['OperationManagement', 'OperationManagementTF'],
  // PubBtnTF: Object
  props: {
    PubBtnNum: Array
  },
  data () {
    return {
      titleArr: ['统计类', '监控类', '财务类'],
      imgArr: [
        require('../assets/baobiaofenxi/统计类.png'),
        require('../assets/baobiaofenxi/监控类.png'),
        require('../assets/baobiaofenxi/财务类.png')
      ],
      numArr: [0, 2, 6, 9]
    }
  },
  methods: {
    addTab (item) {
      this.$emit('addTab', item)
    }
  }
}
</script>
<style scoped>

</style>
