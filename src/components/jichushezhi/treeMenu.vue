<template id="tree-menu">
  <div>
    <tree-component :model="model">
      <li>111</li>
    </tree-component>
  </div>
</template>
<script>
export default {
  name: 'treeComponent',
  props: ['model']
}
</script>
