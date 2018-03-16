<template>
  <el-dialog
      title="温馨提示"
      :visible.sync="dia"
      v-if="dia"
      size="tiny"
      >
      <h3 style="text-align:center">为了您能更好的使用本系统,建议您下载chrome浏览器</h3>
      <font color='#FF00FF'>安装chrome浏览器
        <a href='http://sw.bos.baidu.com/sw-search-sp/software/b168073fdd275/ChromeStandalone_60.0.3112.90_Setup.exe' target='_self'>执行安装</a>
        ,安装后请使用chrome浏览器重新打开系统,如有不便请您谅解。
      </font>
    </el-dialog>
</template>
<script>
export default {
  props: {
    dia: Boolean
  }
}
</script>

