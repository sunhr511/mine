<template>
<div style="height:100%;">
  <el-row type="flex" style="height:100%" justify="center" align="middle">
    <el-col :span="10" >
      <el-row class="All">
        <el-col :span="24">
          <!--第一行文字  -->
          <el-row class="one">
            <el-col :span="20">&nbsp;&nbsp;&nbsp;打印机设置</el-col>
          </el-row>
          <!--内容  -->
          <el-row type="flex" justify="center">
            <el-col :span="20" style="margin-top:2.25rem; ">
              <el-form :model="mozhu" ref="mozhu" label-width="60px">
                <!--标签  -->
                <el-form-item label="标签" prop="Print_Biaoqianxuan">
                  <el-select 
                    filterable
                    clearable
                    v-model="mozhu.Print_Biaoqianxuan"
                    placeholder="请选择打印机"  >
                    <el-option
                      v-for="(con, index) in Option"
                      :key="con.label"
                      :label="con.label"
                      :value="con.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <!--小票  -->
                <el-form-item label="小票" prop="Print_Xiaopiao">
                  <el-radio-group v-model="mozhu.Print_Xiaopiao">
                    <el-radio :label="1">针式打印机</el-radio>
                    <el-radio :label="2">热敏打印机</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="" prop="Print_Xiaopiaoxuan">
                  <el-select  clearable
                  v-model="mozhu.Print_Xiaopiaoxuan"
                  placeholder="请选择打印机"  >
                    <el-option
                      v-for="(con, index) in Option"
                      :key="con.label"
                      :label="con.label"
                      :value="con.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <!--清单  -->
                <el-form-item label="清单" prop="Print_Qingdan">
                  <el-radio-group v-model="mozhu.Print_Qingdan">
                    <el-radio :label="1">针式打印机</el-radio>
                    <el-radio :label="2">热敏打印机</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="" prop="Print_Qingdanxuan">
                  <el-select
                    clearable
                    v-model="mozhu.Print_Qingdanxuan"
                    placeholder="请选择打印机"  >
                    <el-option
                      v-for="(con, index) in Option"
                      :key="con.label"
                      :label="con.label"
                      :value="con.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <!--第二行文字  -->
          <!-- <el-row class="two">
            <el-col :span="24">&nbsp;&nbsp;&nbsp;小票打印设置</el-col>
          </el-row> -->
          <!--第二行内容  -->
          <!-- <el-row type="flex" justify="center">
            <el-col :span="20" style="height:6.25rem;margin-top:1.25rem">
              <el-form :model="mozhu" ref="mozhu" label-width="100px" class="demo-ruleForm"> -->
                <!--标签  -->
                <!-- <el-form-item label="上边距(毫米)" prop="Print_topBian">
                  <el-input v-model="mozhu.Print_topBian" style="width:12.5rem"></el-input>
                </el-form-item>
                <el-form-item label="左边距(毫米)" prop="Print_leftBian">
                  <el-input v-model="mozhu.Print_leftBian" style="width:12.5rem"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row> -->
          <div style="width:100%;text-align:center">
            <el-button size="large" :loading="saveLoading" type="warning" @click="editSave">保  存</el-button>
          </div>
        </el-col>
      </el-row>
    </el-col>
    
  </el-row>
  <el-dialog
    title="请根据电脑操作系统位数下载相应的安装包"
    :visible.sync="dialogVisible"
    size="tiny"
    >
      <font color='#FF00FF'>打印控件未安装!点击这里
        <a href='http://oss.kuaihuoyun.com/ktms/resource/Lodop6.205/install_lodop32.exe' target='_self'>执行安装</a>
        ,安装后请刷新页面或重新进入。(32位)
      </font>
      <br>
      <font color='#FF00FF'>打印控件未安装!点击这里
        <a href='http://oss.kuaihuoyun.com/ktms/resource/Lodop6.205/install_lodop64.exe' target='_self'>
        执行安装</a>,安装后刷新页面或重新进入。(64位)
      </font>
      (二选其一即可)
      <br><br>
      
      <font color='#FF00FF'>CLodop云打印服务(localhost本地)未安装启动!点击这里
        <a href='http://oss.kuaihuoyun.com/ktms/resource/Lodop6.205/CLodop_Setup_for_Win32NT.exe' target='_self'>执行安装</a>
      ,安装后请刷新页面。
      </font>
      (必装)
    </el-dialog>
</div>
</template>
<script>
  import {PrintsShow, PrintsEdit} from '../../api/jichushezhi/dysz'
  import {LODOP} from '../../../static/vendor/a.js'
  export default {
    data () {
      return {
        saveLoading: false,
        abc: '打印设置',
        mozhu: {
          Print_Xiaopiao: 2,
          Print_Xiaopiaoxuan: '',
          Print_Qingdan: 2,
          Print_Qingdanxuan: '',
          Print_topBian: '',
          Print_leftBian: '',
          showID: ''
        },
        Option: [],
        dialogVisible: false
      }
    },
    async created () {
      await this.show()
      this.defaultShow()
    },
    methods: {
      defaultShow () {
        if ((LODOP == null) || (typeof (LODOP.VERSION) === 'undefined')) {
          if (!this.dialogVisible) {
            this.dialogVisible = true
            // sessionStorage.removeItem('dialogTF')
          }
        } else {
          for (let i = 0; i <= LODOP.GET_PRINTER_COUNT(); i++) {
            this.$set(this.Option, i, {value: LODOP.GET_PRINTER_NAME(i)})
          }
        }
      },
      async show () {
        let ps = await PrintsShow()
        this.mozhu = ps.data.info
        this.showID = ps.data.info['Print_Id']
        this.mozhu['Print_Xiaopiao'] = parseInt(ps.data.info['Print_Xiaopiao'])
        this.mozhu['Print_Qingdan'] = parseInt(ps.data.info['Print_Qingdan'])
      },
      async editSave () {
        this.saveLoading = true
        let pe = await PrintsEdit(this.mozhu)
        if (pe.data.result === '1') {
          this.$message({
            showClose: true,
            message: pe.data.info,
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: '保存失败',
            type: 'info'
          })
        }
        await this.show()
        this.saveLoading = false
      }
    }
  }
</script>
<style scoped>
  button {
    /* width: 100px; */
    padding-left:40px;
    padding-right:40px;
    margin-top: 1.875rem
  }
  .All {border: .0625rem solid #aeaeae; padding:30px;}
  .All .one,.All .two {height: 2.5rem;border-bottom: .0625rem solid #aeaeae;color: #666666;font-size: 20px;line-height: 2.5rem}
</style>

