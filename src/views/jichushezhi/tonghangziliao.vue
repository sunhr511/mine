<template>
  <div>
    <el-row type="flex" justify="center" >
      <el-col :span="23">

        <el-row type="flex" justify="start">
          <el-col :span="24">

            <el-form :inline="true" :model="formInline" class="formLabel">
              <!--<el-col :span="5">-->
                <el-form-item label="同行名称">
                  <el-input v-model="formInline.Peer_Name" placeholder="同行名称" style="width:160px"></el-input>
                </el-form-item>
              <!--</el-col>
              <el-col :span="5">-->
                <el-form-item label="联系电话">
                  <el-input v-model="formInline.Peer_LinkTel" placeholder="联系电话" style="width:160px"></el-input>
                </el-form-item>
              <!--</el-col>
              <el-col :span="5">-->
                <el-form-item label="业务关系">
                  <el-select v-model="formInline.Peer_Business" placeholder="业务关系" style="width:160px" clearable >
                    <el-option v-for="item in Dictionary" :key="item" :label="item.Dic_Title" :value="item.Dic_Title"></el-option>
                  </el-select>
                </el-form-item>
              <!--</el-col>-->
              <!--<el-col :span="3" :offset="6">-->
                <el-form-item style="float:right">
                  <el-button type="warning" @click="searchInfo()" :loading="loadingTF">查询</el-button>
                  <el-button type="primary" @click="add()">新增</el-button>
                  <el-button type="info" @click="showInfo()">显示全部</el-button>
                </el-form-item>
              <!--</el-col>-->
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="Ghead">&nbsp;&nbsp;&nbsp;同行资料</el-col>
        </el-row>
      <br>
        <el-row type="flex" justify="center" class="tableStyle" id="pdf-wrap">
          <el-table
            height="525"
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column align="center"
              prop="Peer_Name"
              label="同行名称"
              >
            </el-table-column>
            <el-table-column align="center"
              prop="Peer_Net"
              label="归属网点">
            </el-table-column>
            <el-table-column align="center"
              prop="Peer_Linker"
              label="联系人">
            </el-table-column>
            <el-table-column align="center"
              prop="Peer_LinkTel"
              label="联系电话">
            </el-table-column>
            <el-table-column align="center"
              prop="Peer_City"
              label="所在地址">
            </el-table-column>
            <el-table-column align="center"
              prop="Peer_Business"
              label="业务关系">
            </el-table-column>
            <el-table-column
              prop="caozuo" align="center"
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
    <el-dialog :visible.sync="adddialog" size="tiny">
      <el-row type="flex" justify="center" class="dialog_top">
        <el-col :span="22" style="color:white">新增同行资料</el-col>
      </el-row>
      <el-form :model="info" :rules="rules" ref="info" label-width="100px" class="demo-ruleForm">
        <el-form-item label="同行名称" prop="Peer_Name">
          <el-input v-model="info.Peer_Name" placeholder="同行名称" class="pubWidth"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="Peer_Linker">
          <el-input v-model="info.Peer_Linker" placeholder="联系人" class="pubWidth"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="Peer_LinkTel">
          <el-input v-model="info.Peer_LinkTel" placeholder="联系人电话" class="pubWidth"></el-input>
        </el-form-item>
        <el-form-item label="所在地址" prop="Peer_City">
          <el-input v-model="info.Peer_City" placeholder="所在地址" class="pubWidth"></el-input>
        </el-form-item>
        <el-form-item label="业务关系" prop="Peer_Business">
          <el-select v-model="info.Peer_Business" placeholder="业务关系" class="pubWidth">
            <el-option v-for="item in Dictionary" :key="item" :label="item.Dic_Title" :value="item.Dic_Title"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属网点" prop="Peer_Net">
          <el-select v-model="info.Peer_Net" placeholder="归属网点" class="pubWidth">
            <el-option v-for="item in wangdianInfo" :key="item" :label="item.Net_Name" :value="item.Net_Name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="0px" style="text-align:center">
          <el-button @click="adddialog = false">取 消</el-button>
          <el-button type="primary" @click="addInfo('info')">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--编辑dialog-->
    <el-dialog :visible.sync="dialogFormVisible" size="tiny">
      <el-row type="flex" justify="center" class="dialog_top">
        <el-col :span="22">修改同行信息</el-col>
      </el-row>
      <el-form :model="info2" :rules="rules" ref="info2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="同行名称" prop="Peer_Name">
          <el-input v-model="info2.Peer_Name" placeholder="同行名称" class="pubWidth"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="Peer_Linker">
          <el-input v-model="info2.Peer_Linker" placeholder="联系人" class="pubWidth"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="Peer_LinkTel">
          <el-input v-model="info2.Peer_LinkTel" placeholder="联系人电话" class="pubWidth"></el-input>
        </el-form-item>
        <el-form-item label="所在地址" prop="Peer_City">
          <el-input v-model="info2.Peer_City" placeholder="所在地址" class="pubWidth"></el-input>
        </el-form-item>
        <el-form-item label="业务关系" prop="Peer_Business">
          <el-select v-model="info2.Peer_Business" placeholder="业务关系" class="pubWidth">
            <el-option v-for="item in Dictionary" :key="item" :label="item.Dic_Title" :value="item.Dic_Title"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属网点" prop="Peer_Net">
          <el-select v-model="info2.Peer_Net" placeholder="归属网点" class="pubWidth">
            <el-option v-for="item in wangdianInfo" :key="item" :label="item.Net_Name" :value="item.Net_Name"></el-option>
          </el-select>
        </el-form-item>
            <el-form-item label-width="0px" style="text-align:center">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="updata('info2')">保 存</el-button>
            </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import {PeerShow, PeerEdit, PeerDel, PeerSearch, PeerAdd, DictionaryShow} from '../../api/jichushezhi/tonghangziliao.js'
  import {NetinfoNetin} from '../../api/jichushezhi/gongsicaiwushuxingshezhi.js'
  export default {
    data () {
      return {
        loadingTF: false,
        wangdianInfo: [],
        currentPage: 1,
        pageCount: 10,
        total: 0,
        formInline: {
          Peer_Name: '',
          Peer_LinkTel: '',
          Peer_Business: ''
        },
        Staff_Name: '',
        tableData: [],
        Dictionary: [],
        // 新增
        info: {
          Peer_Name: '',
          Peer_Corporation: '',
          Peer_Linker: '',
          Peer_LinkTel: '',
          Peer_Business: '',
          Peer_Id: '',
          Peer_City: '',
          Peer_Net: ''
        },
        // 编辑
        info2: {
          Peer_Name: '',
          Peer_Corporation: '',
          Peer_Linker: '',
          Peer_LinkTel: '',
          Peer_Business: '',
          Peer_Id: '',
          Peer_City: '',
          Peer_Net: ''
        },
        rules: {
          Peer_Name: [
            { required: true, message: '请输入同行名称', trigger: 'change' }
          ],
          Peer_Linker: [
            { required: true, message: '请输入联系人', trigger: 'change' }
          ],
          Peer_LinkTel: [
            { required: true, message: '请输入联系电话', trigger: 'change' },
            { pattern: /^1[34578]\d{9}$/, message: '请输入正确联系电话' }
          ],
          Peer_Business: [
            { required: true, message: '请输入选择业务关系', trigger: 'change' }
          ],
          Peer_City: [
            { required: true, message: '请输入所在地址', trigger: 'change' }
          ],
          Peer_Net: [
            { required: true, message: '请选择归属网点', trigger: 'change' }
          ]
        },
        formLabelWidth: '70px',
        dialogFormVisible: false,
        adddialog: false
      }
    },
    created () {
      this.showInfo()
      this.DictionaryShow()
      this.wangdian()
    },
    methods: {
      wangdian () {
        NetinfoNetin().then((res) => {
          this.wangdianInfo = res.data.info
        }).catch(error => {
          console.log(error)
        })
      },
      DictionaryShow () {
        let data = {
          Dic_Remarks: '业务关系'
        }
        DictionaryShow(data).then((res) => {
          this.Dictionary = res.data.info
        }).catch(error => {
          console.log(error)
        })
      },
      showInfo () {
        let data = {
          currentPage: this.currentPage,
          pageCount: 10
        }
        PeerShow(data).then((res) => {
          this.tableData = res.data.info
          this.total = res.data.count
        }).catch(error => {
          console.log(error)
        })
      },
      editInfo () {
        PeerEdit(this.info2).then((res) => {
          this.$message(res.data.info)
        }).catch(error => {
          console.log(error)
        })
      },
      tianjiaInfo () {
        PeerAdd(this.info).then((res) => {
          if (res.data.result === '1') {
            this.showInfo()
            this.info.Peer_Name = ''
            this.info.Peer_Corporation = ''
            this.info.Peer_Linker = ''
            this.info.Peer_LinkTel = ''
            this.info.Peer_Business = ''
            this.info.Peer_City = ''
            this.info.Peer_Net = ''
          }
          this.$message(res.data.info)
        }).catch(error => {
          console.log(error)
        })
      },
      delInfo () {
        PeerDel(this.info).then((res) => {
          if (res.data.result === '1') {
            this.showInfo()
          }
          this.$message(res.data.info)
        }).catch(error => {
          console.log(error)
        })
      },
      searchInfo () {
        this.loadingTF = true
        let data = {
          Peer_Name: this.formInline.Peer_Name,
          Peer_LinkTel: this.formInline.Peer_LinkTel,
          Peer_Business: this.formInline.Peer_Business,
          currentPage: this.currentPage,
          pageCount: 10
        }
        PeerSearch(data).then((res) => {
          this.loadingTF = false
          if (res.data.result === '1') {
            this.tableData = res.data.info
            this.total = res.data.count
          } else if (res.data.result === '0') {
            this.showInfo()
          }
        }).catch(error => {
          console.log(error)
        })
      },
      add () {
        this.adddialog = true
        if (this.$refs['info']) {
          this.$refs['info'].resetFields()
        }
        if (this.$refs['info2']) {
          this.$refs['info2'].resetFields()
        }
      },
      addInfo (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.adddialog = false
            this.tianjiaInfo()
            // this.$message('修改陈宫')
          } else {
            return false
          }
        })
        // this.$refs[formName].resetFields()
      },
      handleEdit (index, row) {
        if (this.$refs['info']) {
          this.$refs['info'].resetFields()
        }
        if (this.$refs['info2']) {
          this.$refs['info2'].resetFields()
        }
        this.dialogFormVisible = true
        this.info2 = row
      },
      handleDelete (index, row) {
        this.info = row
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
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      onSubmit () {},
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
.tableStyle .el-table th {
  background: #8c96d9;
}
.tableStyle .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
    background: #8c96d9;
    color: white
}
.dialog_top{
  background: #8c96d9 ;height: 40px;
  line-height: 40px;color: black;
  font-size: 18px;margin-bottom: 20px
}
.pubWidth{ width: 90% }
.formLabel .el-form-item__label {
  font-size:16px;
  font-weight:500;
  font-family: "微软雅黑"
}
</style>
