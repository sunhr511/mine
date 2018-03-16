<template>
  <div >
    <keep-alive><router-view ></router-view></keep-alive>
  </div>
</template>
<script>
  export default {}
</script>
<style scope>
 .el-table th {
    background: #8c96d9;
  }
 .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
    background: #8c96d9;
    color: white
  }
  .el-table__fixed-header-wrapper thead div{
    background: #8c96d9;
    color: white
  }
  .el-message-box__btns .el-button--primary{
    color: white;
    background:#8c96d9;
    border: solid 1px #8c96d9;
  }
</style>
