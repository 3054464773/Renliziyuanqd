<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="1"
      text-color="#fff"
  >
    <el-menu-item index="1">首页</el-menu-item>
    <el-sub-menu index="2">
      <template #title>权限管理</template>
      <el-menu-item index="2-1">item one</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>员工管理</template>
      <el-menu-item index="3-1">item one</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
export default {
  name: "Zuobiancaidan"
}
</script>

<style scoped>

</style>