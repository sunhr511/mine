<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="22">
        <el-row type="flex" justify="center" class="fhkd">
          <el-col>
            <el-row>
              <el-col :span="24">
                <el-form :inline="true" :model="formInline">              <!--<el-col :span="5">-->
                    <el-form-item label="客户名称">
                      <el-input v-model="formInline.yundan" placeholder="客户民称" style="width:160px"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary">查询</el-button>
                    </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" class="fhkdtable">
              <el-col>
                <el-row class="fhkdtabletit"><el-col :span="2" :offset="22"><el-button type="text" @click="dialogadd"><i class="el-icon-plus"></i>新增</el-button></el-col></el-row>
                <el-row style="margin-top:20px">
                  <el-col>
                    <el-table
                      :data="tableData"
                      border
                      style="width: 100%">
                      <el-table-column
                        label="日期"
                        width="180">
                        <template scope="scope">
                          <el-icon name="time"></el-icon>
                          <span style="margin-left: 10px">{{ scope.row.date }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="姓名"
                        width="180">
                        <template scope="scope">
                          <el-popover trigger="hover" placement="top">
                            <p>姓名: {{ scope.row.name }}</p>
                            <p>住址: {{ scope.row.address }}</p>
                            <div slot="reference" class="name-wrapper">
                              <el-tag>{{ scope.row.name }}</el-tag>
                            </div>
                          </el-popover>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作">
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
          </el-col>
        </el-row>
      </el-col>
    </el-row>
<!-- <el-dialog
  title=""
  :visible.sync="dialogVisible"

  >
  <el-row type="flex" justify="center" >
    <el-col :span="22">
      <el-row><el-col :span="24" class="Ghead">&nbsp;&nbsp;&nbsp;{{name}}</el-col></el-row>
      <br><br><br>
  <el-form  :rules="rules" :model="momo.model" ref="momo.model" label-width="100px"  label-position="left">
    <el-row type="flex" justify="space-between" style="flex-wrap: wrap">
      <el-col :span="11"  v-for="(item, index) in momo.shuju" :key="index" >
        <el-form-item :label="item.label" :prop="item.props" >
          <el-input  v-if="!item.select" v-model="momo.model[item.props]" :placeholder="item.placeholder"></el-input>
          <el-select clearable v-if="item.select" v-model="momo.model[item.props]" :placeholder="item.placeholder">
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
    <div style="width:100%;text-align:center;">
    <el-form-item  class="btnStyle" label-width="0px">
      <el-button  @click="submitForm(true)" v-if="enniu == true">保存并继续</el-button>
      <el-button  @click="submitForm(false)" v-if="enniu == false">保存</el-button>
    </el-form-item>
    </div>
  </el-form>
    </el-col>
  </el-row>
</el-dialog> -->

  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '发货开单',
      formInline: {
        yundan: ''
      },
      tableData: [],
      dialogVisible: false
    }
  },
  methods: {
    handleEdit (index, row) {
      // console.log(index, row)
    },
    handleDelete (index, row) {
      // console.log(index, row)
    }
  }
}
</script>
<style>
.fhkd{margin-top: 20px}
.fhkd .fhkdtable {border: 1px solid #d0d5f5;height: 500px}
.fhkd .fhkdtable .fhkdtabletit{background:#d0d5f5;height: 40px}
</style>

