<template>
  <div>
    <ul>
  <li v-for="item in model" :key="item" style="background:gray">

    <p v-if="item.Aut_Id > 5">{{ item.Aut_FirstMenu }}</p>
    {{item.Aut_Id}}
    {{item.Aut_TwoMenu}}
    {{item.Aut_ThreeMenu}}
    {{ item.Aut_Button }}

    <!-- <tree-component  :model="item.Aut_TwoMenu"></tree-component> -->
        <!-- <tree-menu :model="item.twomenu"></tree-menu> -->
  </li>
  </ul>
  </div>
</template>
<script>
// import treeMenu from './treeMenu'
export default {
  // components: {
  //   treeMenu
  // },
  name: 'treeComponent',
  props: ['model']
}
</script>
<style scoped>

</style>
