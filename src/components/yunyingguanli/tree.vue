<template>
  <div>
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText"
      style="margin-bottom:15px;">
    </el-input>

    <el-tree
      class="tree"
      :data="data"
      :props="defaultProps"
      accordion
      @node-click="handleNodeClick"
      :filter-node-method="filterNode"
      ref="tree">
    </el-tree>

  </div>
</template>
<script>
export default {
  // props: ['OperationManagement', 'OperationManagementTF'],
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    handleNodeClick (data) {
      this.$emit('handleNodeClick', data)
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  },
  data () {
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  props: {
    data: Array
  }
}
</script>
<style scoped>
.tree {border: 0px;}
</style>
