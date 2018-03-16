<template>
  <el-row type="flex" justify="center">
    <el-col :span="22">
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <table border="1" ellpadding="0" cellspacing="0" style="width:100%;">
            <caption style="font-size:1.25rem;">{{Description}}</caption>
            <thead >
              <tr>
                <th style="font-weight:400" v-for="(item, index) in columnProps" :key="item" v-if="item.aaa">{{item.label}}</th>
              </tr>
            </thead>
            <tbody align="center">
              <tr  v-for="(a, index) in tableData" :key="a">
                <td  v-for="(item, index) in columnProps" :key="item" v-if="item.aaa">{{a[item.props]}}</td>
              </tr>
              <tr>
                <td>合计</td>
                <td>{{tableData.length}}票</td>
                <td v-if="!sumPay == 0">运费：{{sumPay}}元</td>
                <td v-if="!sumPayment == 0">货款：{{sumPayment}}元</td>
                <td v-if="!sumSend == 0">始发中转费：{{sumSend}}元</td>
              </tr>
            </tbody>
          </table>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    columnProps: Array,
    tableData: Array,
    Description: String,
    sumPay: Number,
    sumPayment: Number,
    sumSend: Number
  },
  methods: {
    Prints () {
      this.$emit('Prints')
    },
    PrintsView () {
      this.$emit('PrintsView')
    }
  }
}
</script>

