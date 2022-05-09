<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="1"
      text-color="#fff"
      :router="true"
  >
    <el-menu-item index="1">首页</el-menu-item>

    <el-sub-menu index="2">
      <template #title>社保管理</template>
      <el-menu-item index="/goshebao">社保</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>员工管理</template>
      <el-menu-item index="/gouser">员工</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>系统设置</template>
      <el-menu-item index="/goquanxian">权限管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="5">
      <template #title>绩效管理</template>
      <el-menu-item index="/goinsertjixiao">绩效名称</el-menu-item>
      <el-menu-item index="/gojixiaoGrade">绩效评分</el-menu-item>
      <el-menu-item index="/gojixiaoScore">绩效月报</el-menu-item>
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