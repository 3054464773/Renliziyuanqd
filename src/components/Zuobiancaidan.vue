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
      <el-menu-item index="/goshebao">社保方案</el-menu-item>
      <el-menu-item index="/goshebaopeople">参保人员</el-menu-item>
      <el-menu-item index="/goshebaojiaofei">社保缴费</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>员工管理</template>
      <el-menu-item index="/gousersss">员工到岗信息</el-menu-item>
      <el-menu-item index="/goUsersXz">员工薪资信息</el-menu-item>
      <el-menu-item index="/goUserwdg">未到岗人员</el-menu-item>
      <el-menu-item index="/goYhlz">离职员工</el-menu-item>
      <el-menu-item index="/gouser">黑名单</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>系统设置</template>
      <el-menu-item index="/goquanxian">权限管理</el-menu-item>
      <el-menu-item index="/gojiaose">角色管理</el-menu-item>
      <el-menu-item index="/gobumen">部门管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="5">

      <template #title>招聘管理</template>
      <el-menu-item index="/gorecruit">简历信息</el-menu-item>

      <el-menu-item index="/gointerview">招聘者初面</el-menu-item>
      <el-menu-item index="/gorencaizhub">应聘者次面</el-menu-item>
      <el-menu-item index="/goZpjh">招聘计划</el-menu-item>

    </el-sub-menu>
    <el-sub-menu index="6">

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