<template>
  <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  :before-close="close"
  size="tiny">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="aaad">保存并继续</el-button>
  </span>
</el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: Boolean
  },
  created () {
    this.aaa = this.dialogVisible
  },
  data () {
    return {
      aaa: false
    }
  },
  methods: {
    aaad () {
      this.$emit('aaad')
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style>

</style>
