<template>
  <div>
    <el-row type="flex" justify="center" style="margin-top:20px">
      <el-col :span="22">
        <el-row type="flex" justify="space-around" class="Ghead">
          <el-col :span="21" >
            {{title}}
          </el-col>
          <el-col :span="1" class="addClass">
            <el-button type="text" @click="add()" ><i class="el-icon-plus"></i> 新增</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top:20px">
      <el-col :span="22">
        <el-row type="flex" justify="center" class="tableStyle">
          <el-col :span="24">
            <el-table
              :data="tableData"
              height="582"
              border
              style="width: 100%">
              <el-table-column
                prop="Dic_Name"
                label="名称">
              </el-table-column>
              <el-table-column
                prop="Dic_Identify"
                label="收支标识">
              </el-table-column>
              <el-table-column
                prop="Dic_Type"
                label="费用类型">
              </el-table-column>
              <el-table-column
                prop="Dic_BelongNet"
                label="归属网点">
              </el-table-column>
              <el-table-column
                prop="Dic_IsFlag"
                label="是否启用">
              </el-table-column>
              <el-table-column
                prop="caozuo"
                label="操作" width="150">
                <template scope="scope">
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
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin-top:20px">
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
    <!--新增-->
    <el-dialog :visible.sync="adddialog" size="tiny">
      <el-row type="flex" justify="center" class="dialog_top">
        <el-col :span="22">新增费用</el-col>
      </el-row>
      <el-form :model="info" :rules="rules" ref="info" label-width="100px" class="demo-ruleForm">
        <el-form-item label="费用名称" prop="Dic_Name">
          <el-input v-model="info.Dic_Name" placeholder="费用名称" class="pubWidth"></el-input>
        </el-form-item>
        <el-form-item label="收支标识" prop="Dic_Identify">
          <el-select v-model="info.Dic_Identify" placeholder="收支标识" class="pubWidth">
            <el-option label="收入" value="收入"></el-option>
            <el-option label="支出" value="支出"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="费用类型" prop="Dic_Type">
          <el-select v-model="info.Dic_Type" placeholder="费用类型" class="pubWidth">
            <el-option label="运营类" value="运营类"></el-option>
            <el-option label="非运营类" value="非运营类"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属网点" prop="Dic_BelongNet">
          <el-select v-model="info.Dic_BelongNet" placeholder="归属网点" class="pubWidth">
            <el-option v-for="item in wangdianInfo" :key="item" :label="item.Net_Name" :value="item.Net_Name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="Dic_IsFlag">
          <el-radio-group v-model="info.Dic_IsFlag">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
         <el-form-item label-width="0px" style="text-align:center">
              <el-button @click="adddialog = false">取 消</el-button>
            <el-button :loading="addLoading" type="primary" @click="addInfo('info')">保 存</el-button>
            </el-form-item>
      </el-form>
    </el-dialog>
    <!--编辑-->
    <el-dialog :visible.sync="dialogFormVisible" size="tiny">
      <el-row type="flex" justify="center" class="dialog_top">
        <el-col :span="22">修改费用</el-col>
      </el-row>
      <el-form :model="info2" :rules="rules" ref="info2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="费用名称" prop="Dic_Name">
          <el-input v-model="info2.Dic_Name" placeholder="费用名称" class="pubWidth"></el-input>
        </el-form-item>
        <el-form-item label="收支标识" prop="Dic_Identify">
          <el-select v-model="info2.Dic_Identify" placeholder="收支标识" class="pubWidth">
            <el-option label="收入" value="收入"></el-option>
            <el-option label="支出" value="支出"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="费用类型" prop="Dic_Type">
          <el-select v-model="info2.Dic_Type" placeholder="费用类型" class="pubWidth">
            <el-option label="运营类" value="运营类"></el-option>
            <el-option label="非运营类" value="非运营类"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属网点" prop="Dic_BelongNet">
          <el-select v-model="info2.Dic_BelongNet" placeholder="归属网点" class="pubWidth">
            <el-option v-for="item in wangdianInfo" :key="item" :label="item.Net_Name" :value="item.Net_Name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="Dic_IsFlag">
          <el-radio-group v-model="info2.Dic_IsFlag">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="0px" style="text-align:center">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button :loading="updateLoading" type="primary" @click="updata('info2')">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import {CostShow, CostEdit, CostAdd, CostDel} from '../../api/jichushezhi/feiyongzidian.js'
  import {NetinfoNet} from '../../api/jichushezhi/gongsicaiwushuxingshezhi.js'
  export default {
    data () {
      return {
        addLoading: false,
        updateLoading: false,
        currentPage: 1,
        pageCount: 10,
        total: 0,
        // 分页结束
        tableData: [],
        wangdianInfo: [],
        title: '费用字典',
        adddialog: false,
        dialogFormVisible: false,
        info: {
          Dic_Name: '',
          Dic_Identify: '',
          Dic_Type: '',
          Dic_BelongNet: '',
          Dic_IsFlag: '',
          Dic_Id: ''
        },
        info2: {
          Dic_Name: '',
          Dic_Identify: '',
          Dic_Type: '',
          Dic_BelongNet: '',
          Dic_IsFlag: '',
          Dic_Id: ''
        },
        rules: {
          Dic_Name: [
            { required: true, message: '请输入费用名称', trigger: 'blur' }
          ],
          Dic_Identify: [
            { required: true, message: '请选择收支标识', trigger: 'change' }
          ],
          Dic_Type: [
            { required: true, message: '请选择费用类型', trigger: 'change' }
          ],
          Dic_BelongNet: [
            { required: true, message: '请选择归属网点', trigger: 'change' }
          ],
          Dic_IsFlag: [
            { required: true, message: '请点击是否启用', trigger: 'change' }
          ]
        }
      }
    },
    created () {
      this.showInfo()
      this.wangdian()
    },
    methods: {
      // 接
      // 归属网点
      wangdian () {
        NetinfoNet().then((res) => {
          this.wangdianInfo = res.data.info
        }).catch(error => {})
      },
      // 显示
      showInfo () {
        let data = {
          currentPage: this.currentPage,
          pageCount: 10
        }
        CostShow(data).then((res) => {
          this.tableData = res.data.info
          this.total = res.data.count
        }).catch(error => {})
      },
      // 修改
      editInfo () {
        CostEdit(this.info).then((res) => {
          this.$message(res.data.info)
        }).catch(error => {})
      },
      // 添加
      tianjiaInfo () {
        CostAdd(this.info).then((res) => {
          if (res.data.result === '1') {
            this.showInfo()
            this.info.Dic_Name = ''
            this.info.Dic_Identify = ''
            this.info.Dic_BelongNet = ''
            this.info.Dic_Type = ''
            this.info.Dic_IsFlag = ''
          }
          this.$message(res.data.info)
        }).catch(error => {})
      },
      // 删除
      delInfo () {
        CostDel(this.info).then((res) => {
          if (res.data.result === '1') {
            this.showInfo()
          }
          this.$message(res.data.info)
        }).catch(error => {})
      },
      handleEdit (index, row) {
        this.dialogFormVisible = true
        this.info2 = row
      },
      handleDelete (index, row) {
        this.info = row
        this.delInfo()
      },
      add () {
        this.adddialog = true
        this.$message('点击了新增按钮')
      },
      addInfo (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addLoading = true
            this.adddialog = false
            this.tianjiaInfo()
            this.addLoading = false
            // this.$message('修改陈宫')
          } else {
            return false
          }
        })
        // this.$refs[formName].resetFields()
      },
      updata (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateLoading = true
            this.dialogFormVisible = false
            this.editInfo()
            this.updateLoading = false
          } else {
            return false
          }
        })
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
  .tableStyle .el-table th {
    background: #8c96d9;
  }
.tableStyle .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
    background: #8c96d9;
    color: white
  }
  .Ghead {
    background:  #8c96d9;
    height: 40px;
    line-height: 40px;
     color: white
  }
  .addClass .el-button{
    color: white
  }
  .dialog_top{background: #8c96d9 ;height: 40px;line-height: 40px;color: black;font-size: 18px;margin-bottom: 20px}
  .pubWidth{width: 90%}
</style>
