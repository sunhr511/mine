<template>
  <div>
    <!--查询功能-->
    <el-row type="flex" justify="center" >
      <el-col :span="23">
        <!-- <el-row type="flex" justify="center">
          <el-col>
            <el-row >
              <el-col :span="10"  style="margin-bottom:20px">
                <el-row type="flex" justify="center">
                  <el-col :span="10" style="line-height:35px;">
                    员工姓名
                  </el-col>
                  <el-col :span="14">
                    <el-input
                      icon="search"
                      v-model="Staff_Name"
                      placeholder="请输入要查询的员工姓名"
                    >
                    </el-input>
                  </el-col>
                  <el-col :span="5" :offset="4"><el-button @click="searchInfo()" type="warning">搜索</el-button></el-col>
                  <el-col :span="5" :offset="1"><el-button @click="add()" type="primary">新增</el-button></el-col>
                </el-row>
              </el-col>
            </el-row>
         </el-col>
        </el-row> -->
        <el-row type="flex" justify="start">
          <el-col :span="24">

            <el-form :inline="true" :model="formInline" class="formLabel">
                <el-form-item label="员工姓名">
                  <el-input v-model="formInline.Staff_Name" placeholder="请输入员工姓名" style="width:160px"></el-input>
                </el-form-item>
                <el-form-item style="float:right">
                  <el-button :loading = "searchLoading" type="warning" @click="searchInfo()">查询</el-button>
                  <el-button type="primary" @click="add()">新增</el-button>
                  <el-button  type="info" @click="showInfo()">显示全部</el-button>
                </el-form-item>
              <!--</el-col>-->
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="Ghead">&nbsp;&nbsp;&nbsp;员工资料</el-col>
        </el-row>
        <br>
        <!--表格-->
        <el-row type="flex" justify="center" class="tableStyle">
          <el-table
            :data="tableData"
            border
            height="525"
            style="width: 100%;">
            <el-table-column
              prop="Staff_Code"
              label="员工编号">
            </el-table-column>
            <el-table-column
              prop="Staff_Name"
              label="员工名称">
            </el-table-column>
            <el-table-column
              prop="Staff_Pw"
              label="员工密码">
            </el-table-column>
            <el-table-column
              prop="Staff_Role"
              label="所属角色">
            </el-table-column>
            <el-table-column
              prop="Staff_Net"
              label="归属网点">
            </el-table-column>
            <el-table-column
              prop="Staff_Tel"
              label="手机号码(登录名称)">
            </el-table-column>
            <el-table-column
              prop="caozuo"
              label="操作" width="160" align="center">
              <template scope="scope" >
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

        </el-row>
        <br>
        <el-row type="flex" justify="center">
          <div class="block" style="text-align:center">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pageCount"
              layout="total, prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <!--新增员工信息-->
    <el-dialog  :visible.sync="adddialog" size="tiny">
      <el-row type="flex" justify="center" class="dialog_top">
        <el-col :span="22">新增员工信息</el-col>
      </el-row>
      <el-form :model="info" :rules="rules" ref="info" label-width="100px" class="demo-ruleForm">
        <el-form-item label="员工名称" prop="Staff_Name">
          <el-input v-model="info.Staff_Name" placeholder="员工名称" class="pubWidth"></el-input>
        </el-form-item>
        <el-form-item label="所属角色" prop="Staff_Role">
          <el-select v-model="info.Staff_Role" placeholder="所属角色" class="pubWidth">
            <el-option :label="item.Part_Group" :value="item.Part_Id.toString()"
             v-for="(item, index) in jueseInfo" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属网点" prop="Staff_Net">
          <el-select v-model="info.Staff_Net" placeholder="归属网点" class="pubWidth">
            <el-option v-for="item in wangdianInfo" :key="item" :label="item.Net_Name" :value="item.Net_Name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="Staff_Tel">
          <el-input v-model="info.Staff_Tel" placeholder="电话" class="pubWidth"></el-input>
        </el-form-item>
        <el-form-item label-width="0px" style="text-align:center">
          <el-button @click="adddialog = false">取 消</el-button>
          <el-button type="primary" @click="addInfo('info')">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--编辑dialog-->
    <el-dialog  :visible.sync="dialogFormVisible" size="tiny" @before-close="qingkongEditData">
      <el-row type="flex" justify="center" class="dialog_top">
        <el-col :span="22">编辑员工信息</el-col>
      </el-row>
      <el-form :model="info1" :rules="rules" ref="info1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="员工名称" prop="Staff_Name" >
          <el-input v-model="info1.Staff_Name" placeholder="员工名称" class="pubWidth"></el-input>
        </el-form-item>
        <el-form-item label="员工密码" prop="Staff_Pw">
          <el-input v-model="info1.Staff_Pw" placeholder="员工密码" class="pubWidth"></el-input>
        </el-form-item>
        <el-form-item label="所属角色" prop="Staff_Role">
          <!-- <el-input v-model="info.Staff_Role" placeholder="所属角色" class="pubWidth"></el-input> -->
          <el-select v-model="info1.Staff_Role" placeholder="所属角色" class="pubWidth">
            <el-option :label="item.Part_Group"
                :value="item.Part_Id.toString()"
                v-for="(item, index) in jueseInfo" :key="index">
                <span style="float: left">{{ item.Part_Group }}</span>
             </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属网点" prop="Staff_Net">
          <el-select v-model="info1.Staff_Net" placeholder="请选择网点" class="pubWidth">
            <el-option
              v-for="item in wangdianInfo"
              :key="item.Net_Name"
              :label="item.Net_Name"
              :value="item.Net_Name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="Staff_Tel">
          <el-input v-model="info1.Staff_Tel" placeholder="电话" class="pubWidth"></el-input>
        </el-form-item>
        <el-form-item label-width="0px" style="text-align:center">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updata('info1')">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import {StaffinfoShow, StaffinfoEdit, StaffinfoAdd, StaffinfoDel, StaffinfoSearch, StaffinfoRole} from '../../api/jichushezhi/yuangongziliao.js'
  import {NetinfoNet} from '../../api/jichushezhi/gongsicaiwushuxingshezhi.js'
  // import Pinyin from 'simple-pinyin'
  // import router from '../../router/index.js'
  export default {
    data () {
      return {
        // 分页
        searchLoading: false,
        currentPage: 1,
        pageCount: 10,
        total: 0,
        // 结束
        wangdianInfo: [],
        jueseInfo: [],
        Staff_Name: '',
        tableData: [],
        info: {
          Staff_Name: '',
          Staff_Pw: '123456',
          Staff_Role: '',
          Staff_Net: '',
          Staff_Tel: '',
          Staff_Code: ''
        },
        info1: {
          Staff_Name: '',
          Staff_Pw: '123456',
          Staff_Role: '',
          Staff_Net: '',
          Staff_Tel: '',
          Staff_Code: ''
        },
        rules: {
          Staff_Name: [
            { required: true, message: '请输入员工名称', trigger: 'change' }
          ],
          Staff_Pw: [
            { required: true, message: '请输入员工密码', trigger: 'change' }
          ],
          Staff_Role: [
            { required: true, message: '请输入所属角色', trigger: 'change' }
          ],
          Staff_Net: [
            { required: true, message: '请输入所属网点', trigger: 'change' }
          ],
          Staff_Tel: [
            { required: true, message: '请输入员工电话', trigger: 'change' },
            { pattern: /^1[34578]\d{9}$/, message: '请输入正确员工电话' }
          ]
        },
        formLabelWidth: '70px',
        dialogFormVisible: false,
        adddialog: false,
        formInline: {
          Staff_Name: ''
        }
      }
    },
    created () {
      this.showInfo()
      this.wangdian()
      this.juese()
    },
    methods: {
      wangdian () {
        NetinfoNet().then((res) => {
          this.wangdianInfo = res.data.info
        }).catch(error => {
          console.log(error)
        })
      },
      juese () {
        StaffinfoRole().then((res) => {
          this.jueseInfo = res.data.info
        }).catch(error => {
          console.log(error)
        })
      },
      showInfo () {
        let data = {
          currentPage: this.currentPage,
          pageCount: 10
        }
        StaffinfoShow(data).then((res) => {
          this.tableData = res.data.info
          this.total = res.data.count
        }).catch(error => {
          console.log(error)
        })
      },
      editInfo () {
        for (let i in this.jueseInfo) {
          if (this.info1.Staff_Role === this.jueseInfo[i].Part_Group) {
            this.info1.Staff_Role = this.jueseInfo[i].Part_Id
          }
        }
        StaffinfoEdit(this.info1).then((res) => {
          if (res.data.result === '1') {
            this.showInfo()
          }
          this.$message(res.data.info)
        }).catch(error => {
          console.log(error)
        })
      },
      tianjiaInfo () {
        StaffinfoAdd(this.info).then((res) => {
          if (res.data.result === '1') {
            this.showInfo()
            this.adddialog = false
            this.$message(res.data.info)
          } else if (res.data.result === '0') {
            this.$message.error(res.data.info)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      delInfo () {
        StaffinfoDel(this.info1).then((res) => {
          if (res.data.result === '1') {
            this.showInfo()
          }
          this.$message(res.data.info)
        }).catch(error => {
          console.log(error)
        })
      },
      async searchInfo () {
        // console.log(1, Pinyin(this.formInline.Staff_Name, {pinyinOnly: true}))
        let data = {
          Staff_Name: this.formInline.Staff_Name,
          currentPage: this.currentPage,
          pageCount: 10
        }
        this.searchLoading = true
        StaffinfoSearch(data).then((res) => {
          if (res.data.result === '1') {
            this.tableData = res.data.info
            this.total = res.data.count
          } else if (res.data.result === '0') {
            this.showInfo()
          }
          this.searchLoading = false
        }).catch(error => {
          this.searchLoading = false
          console.log(error)
        })
      },
      add () {
        if (this.$refs['info']) {
          this.$refs['info'].resetFields()
        }
        this.adddialog = true
      },
      addInfo (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.tianjiaInfo()

            // this.$message('修改陈宫')
          } else {
            return false
          }
        })
        // this.$refs[formName].resetFields()
      },
      handleEdit (index, row) {
        this.info1 = row
        this.dialogFormVisible = true
      },
      handleDelete (index, row) {
        this.info1 = row
        this.delInfo()
      },
      // 跟新数据
      updata (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            this.editInfo()
          } else {
            return false
          }
        })
      },
      qingkongEditData () {
        this.$refs['info1'].resetFields()
      },
      handleSizeChange (val) {},
      handleCurrentChange (val) {
        this.currentPage = val
        if (this.Staff_Name === '') {
          this.showInfo()
        } else {
          this.searchInfo()
        }
      }
    }
  }
</script>
<style>
.Ghead {
    background:  #8c96d9;
    height: 40px;
    line-height: 40px;
     color: white
  }
.dialog_top{background: #8c96d9 ;height: 40px;line-height: 40px;color: black;font-size: 18px;margin-bottom: 20px}
.tableStyle .el-table th {
    background: #8c96d9;
  }
.tableStyle .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
    background: #8c96d9;
    color: white
  }
  .pubWidth{width: 90%}
</style>
