<template>
  <div>
    <el-row type="flex" justify="center" class="all">
      <el-col :span="23">
        <el-row>
          <el-col :span="3" class="leftnav">
            <el-row class="navtitle">{{navtitle}}</el-row>
            <el-row class="btngroup">
              <el-button @click="addData"> 新增用户组</el-button>
            </el-row>
            <el-row v-for="(item, index) in Info" :key="item.Part_Id" class="btngroup">
              <el-button  @click="leftGo(item.Part_Id, index)" :class="{'selected':flag===index}">
                {{item.Part_Group}}
                 <!-- <i class="el-icon-circle-close"></i>  -->
              </el-button>
            </el-row>

          </el-col>
          <!-- <el-col class="jianxi">&nbsp;</el-col> -->
          <el-col :span="21" class="rightcon" >
            <br>
            <el-form ref="momo" :model="momo" label-width="120px" :rules="rules">
            <el-row type="flex" justify="space-between">
             <el-col :span="9">
              <el-form-item label="当前用户组" prop="input">
                  <el-input  v-model="momo.input" :disabled="editTF"></el-input>
                </el-form-item>
             </el-col>
             <el-col :span="5">
                <el-button-group>
                  <el-button v-if="editTF === true&flag!=0" style="background:#8c96d9;color:white" @click="editTF = false">编辑</el-button>
                  <el-button v-if="editTF === true&flag!=0" @click="delData" >删除</el-button>
                  <el-button :loading="saveLoading" style="background:#8c96d9;color:white" v-if="editTF === false"  @click="saveData">保存</el-button>
                  <el-button v-if="editTF === false" @click="cancel">取消</el-button>
                </el-button-group>
             </el-col>
            </el-row>
            </el-form>
            <br>

            <el-row v-for="(x, index) in mozhu" :key="x" type="flex" style="overflow-x:hidden;">
              <el-col :offset="1">
                <!-- {{x.label}} -->
                <el-checkbox-group v-model="x.value">
                  <el-checkbox :label="x.label" :disabled="editTF" @change="checkThisAll($event, index)"></el-checkbox>
                </el-checkbox-group>
                <el-row >
                  <el-col v-for="(y, i) in x.children" :key="y"  style="color:red;" :offset="1">
                      <!-- {{y.label}} -->
                        <el-checkbox-group v-model="y.value">
                          <el-checkbox :label="y.label" style="color:red" :disabled="editTF" @change="checkRed($event, index, i)"></el-checkbox>
                        </el-checkbox-group>
                      <el-row type="flex" style="flex-wrap:wrap">

                        <el-col v-for="(v, vi) in y.children" :key="vi" style="color:blue;margin-top:5px;margin-bottom:5px;" :span="6" :offset="1">
                          <!-- {{v.label}} -->
                          <el-checkbox-group v-model="v.value" x>
                            <el-checkbox :label="v.label" style="color:blue" :disabled="editTF" @change="checkBlue($event, index, i, vi)"></el-checkbox>
                          </el-checkbox-group>
                          <el-row type="flex" >
                            <el-col v-for="z in v.children" :key="z"  style="color:green;width:100px;margin-top:5px;margin-bottom:5px;" :offset="1">
                              <!-- {{z.label}}  -->
                              <el-checkbox-group v-model="z.value" >
                                <el-checkbox :label="z.label" style="color:green" :disabled="editTF"></el-checkbox>
                              </el-checkbox-group>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                  </el-col>
                </el-row>
                <br>
              </el-col>
            </el-row>

          </el-col>
        </el-row>
          </el-col>
        </el-row>
      <!-- </el-col>
    </el-row> -->
  </div>
</template>
<script>
  import {AuthorityAddShow, AuthorityPartShow, AuthorityShow, AuthorityAdd, AuthorityDel, AuthorityEdit} from '../../api/jichushezhi/quanxianshezhi'
  export default {
    data () {
      return {
        saveLoading: false,
        navtitle: '用户组',
        Info: [],
        flag: 0,
        editTF: true,
        mozhu0: [
          {
            value: false,
            label: '基础设置',
            name: '',
            children: [{
              value: false,
              label: '公司主体设置',
              name: '',
              children: [
                {
                  value: false,
                  label: '费率设置',
                  name: '',
                  children: [
                    { value: false, label: '新增', name: '' },
                    { value: false, label: '编辑', name: '' },
                    { value: false, label: '删除', name: '' }
                  ]
                }, {
                  value: false,
                  label: '网点设置',
                  name: '',
                  children: [
                    { value: false, label: '新增', name: '' },
                    { value: false, label: '编辑', name: '' },
                    { value: false, label: '删除', name: '' }
                  ]
                }
              ]
            }, {
              value: false,
              label: '费用字典',
              name: '',
              children: [
                { value: '新增', label: '新增', name: '' },
                { value: '编辑', label: '编辑', name: '' },
                { value: '删除', label: '删除', name: '' }
              ]
            }]
          }
        ],
        mozhu: [],
        momo: {
          input: ''
        },
        rules: {
          input: [
            { required: true, message: '请输入用户组名称', trigger: 'change' }
          ]
        }
      }
    },
    async created () {
      await this.leftShow()
      this.showInfo()
    },
    methods: {
      async leftShow () {
        let psRes = await AuthorityPartShow()
        if (psRes.data.info === '') {
          this.Info = []
        } else {
          this.Info = []
          for (let i in psRes.data.info) {
            this.$set(this.Info, i, psRes.data.info[i])
          }
        }
      },
      async showInfo () {
        this.momo.input = this.Info[this.flag].Part_Group
        let asRes = await AuthorityShow({'Part_Id': this.Info[this.flag].Part_Id})
        if (asRes.data.info === '') {
          this.mozhu = []
        } else {
          this.mozhu = []
          for (let j in asRes.data.info) {
            this.$set(this.mozhu, j, asRes.data.info[j])
          }
        }
      },
      leftGo (id, index) {
        this.flag = index
        this.editTF = true
        this.momo.input = this.Info[this.flag].Part_Group
        this.showInfo()
      },
      async addData () {
        this.editTF = false
        this.flag = -1
        let aas = await AuthorityAddShow()
        for (let j in aas.data.info) {
          this.$set(this.mozhu, j, aas.data.info[j])
        }
        this.resetData()
      },
      saveData () {
        this.$refs['momo'].validate(async(valid) => {
          if (valid) {
            this.saveLoading = true
            for (let x in this.mozhu) {
              if (this.mozhu[x].value) {
                this.mozhu[x].name = this.mozhu[x].label
              } else {
                this.mozhu[x].name = ''
              }
              for (let y in this.mozhu[x].children) {
                if (this.mozhu[x].children[y].value) {
                  this.mozhu[x].children[y].name = this.mozhu[x].children[y].label
                } else {
                  this.mozhu[x].children[y].name = ''
                }
                for (let v in this.mozhu[x].children[y].children) {
                  if (this.mozhu[x].children[y].children[v].value) {
                    this.mozhu[x].children[y].children[v].name = this.mozhu[x].children[y].children[v].label
                  } else {
                    this.mozhu[x].children[y].children[v].name = ''
                  }
                  for (let z in this.mozhu[x].children[y].children[v].children) {
                    if (this.mozhu[x].children[y].children[v].children[z].value) {
                      this.mozhu[x].children[y].children[v].children[z].name = this.mozhu[x].children[y].children[v].children[z].label
                    } else {
                      this.mozhu[x].children[y].children[v].children[z].name = ''
                    }
                  }
                }
              }
            }
            if (this.flag === -1) {
              let res = await AuthorityAdd({'mozhu': this.mozhu, 'Part_Group': this.momo.input})
              if (parseInt(res.data.result)) {
                this.$message({
                  showClose: true,
                  message: res.data.info,
                  type: 'success'
                })
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.info,
                  type: 'info'
                })
              }
              this.saveLoading = false
            } else {
              let editres = await AuthorityEdit({'mozhu': this.mozhu, 'Part_Group': this.momo.input})
              if (parseInt(editres.data.result)) {
                this.$message({
                  showClose: true,
                  message: editres.data.info,
                  type: 'success'
                })
              } else {
                this.$message({
                  showClose: true,
                  message: editres.data.info,
                  type: 'info'
                })
              }
              this.saveLoading = false
            }
            if (this.$refs['momo']) {
              this.$refs['momo'].resetFields()
            }
            this.saveLoading = false
            await this.leftShow()
            this.flag = this.Info.length - 1
            this.showInfo()
            this.editTF = true
          }
        })
      },
      async delData () {
        let delRes = await AuthorityDel(this.Info[this.flag])
        if (delRes.data.result === '1') {
          this.$message({
            showClose: true,
            message: delRes.data.info,
            type: 'success'
          })
          await this.leftShow()
          this.flag = this.Info.length - 1
          await this.showInfo()
        } else {
          this.$message({
            showClose: true,
            message: delRes.data.info,
            type: 'info'
          })
        }
      },
      resetData () {
        for (let x in this.mozhu) {
          this.mozhu[x].value = false
          this.mozhu[x].name = ''
          for (let y in this.mozhu[x].children) {
            this.mozhu[x].children[y].value = false
            this.mozhu[x].children[y].name = ''
            for (let v in this.mozhu[x].children[y].children) {
              this.mozhu[x].children[y].children[v].value = false
              this.mozhu[x].children[y].children[v].name = ''
              for (let z in this.mozhu[x].children[y].children[v].children) {
                this.mozhu[x].children[y].children[v].children[z].value = false
                this.mozhu[x].children[y].children[v].children[z].name = ''
              }
            }
          }
        }
        this.momo.input = ''
      },
      checkThisAll (event, index) {
        if (event.target.checked) {
          for (let y in this.mozhu[index].children) {
            this.mozhu[index].children[y].value = true
            for (let v in this.mozhu[index].children[y].children) {
              this.mozhu[index].children[y].children[v].value = true
              for (let z in this.mozhu[index].children[y].children[v].children) {
                this.mozhu[index].children[y].children[v].children[z].value = true
              }
            }
          }
        } else {
          for (let y in this.mozhu[index].children) {
            this.mozhu[index].children[y].value = false
            for (let v in this.mozhu[index].children[y].children) {
              this.mozhu[index].children[y].children[v].value = false
              for (let z in this.mozhu[index].children[y].children[v].children) {
                this.mozhu[index].children[y].children[v].children[z].value = false
              }
            }
          }
        }
      },
      checkRed (event, GFI, FI) {
        if (event.target.checked) {
          this.mozhu[GFI].value = true
          for (let y in this.mozhu[GFI].children[FI].children) {
            this.mozhu[GFI].children[FI].children[y].value = true
            for (let v in this.mozhu[GFI].children[FI].children[y].children) {
              this.mozhu[GFI].children[FI].children[y].children[v].value = true
            }
          }
        } else {
          // this.mozhu[GFI].value = false
          for (let y in this.mozhu[GFI].children[FI].children) {
            this.mozhu[GFI].children[FI].children[y].value = false
            for (let v in this.mozhu[GFI].children[FI].children[y].children) {
              this.mozhu[GFI].children[FI].children[y].children[v].value = false
            }
          }
        }
      },
      checkBlue (event, GFI, FI, I) {
        if (event.target.checked) {
          this.mozhu[GFI].value = true
          this.mozhu[GFI].children[FI].value = true
          for (let y in this.mozhu[GFI].children[FI].children[I].children) {
            this.mozhu[GFI].children[FI].children[I].children[y].value = true
            for (let v in this.mozhu[GFI].children[FI].children[I].children[y].children) {
              this.mozhu[GFI].children[FI].children[I].children[y].children[v].value = true
            }
          }
        } else {
          for (let y in this.mozhu[GFI].children[FI].children[I].children) {
            this.mozhu[GFI].children[FI].children[I].children[y].value = false
            for (let v in this.mozhu[GFI].children[FI].children[I].children[y].children) {
              this.mozhu[GFI].children[FI].children[I].children[y].children[v].value = false
            }
          }
        }
      },
      cancel () {
        if (this.$refs['momo']) {
          this.$refs['momo'].resetFields()
        }
        this.editTF = true
        this.flag = 0
        this.saveLoading = false
      }
    }
  }
</script>
<style scoped>
  .all{
    margin-top: 5px;
  }
  .all .leftnav{border: 1px solid #d4d3d3;border-radius: 8px;height: 680px;background: #f6f5f5;overflow :auto}
  .all .leftnav .navtitle{background: #8c96d9;height: 40px;border-top-left-radius: 8px;border-top-right-radius: 8px;color: white;text-align:center;line-height: 40px;font-size: 20px }
  .all .leftnav .btngroup .el-button{width: 100%;height: 36px;}
  .all .rightcon{padding-left:10px;  border: 1px solid #d4d3d3;border-radius: 8px;height: 680px;background: #f6f5f5;overflow :auto}

  .selected {
    background: #8c96d9;
    color: white
  }
  .all .jianxi{width: 2px}
</style>
