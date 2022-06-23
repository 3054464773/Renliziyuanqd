<template>

    <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="1"
            text-color="#fff"
            :router="true"
            unique-opened="true"
    >
        <el-menu-item index="/gotable">首页</el-menu-item>


        <el-sub-menu index="2">
            <template #title>社保管理</template>
            <el-menu-item index="/goshebao">社保方案</el-menu-item>
            <el-menu-item index="/goshebaojishu">社保基数</el-menu-item>
            <el-menu-item index="/goshebaopeople">未参保人员</el-menu-item>
            <el-menu-item index="/goshebaojiaofei">社保缴费</el-menu-item>
            <el-menu-item index="/gonashui">纳税</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
      <template #title>员工管理</template>
<!--      <el-menu-item index="/goCCSS">员工记录</el-menu-item>-->
      <el-menu-item index="/gousersss">在职</el-menu-item>
      <el-menu-item index="/goSxusers">实习</el-menu-item>
      <el-menu-item index="/goUserwdg">未到岗</el-menu-item>
      <el-menu-item index="/goYhlz">离职</el-menu-item>
      <el-menu-item index="/gouser">黑名单</el-menu-item>

‘
    </el-sub-menu>
        <el-sub-menu index="4">
            <template #title>系统设置</template>
            <el-menu-item index="/goquanxian">权限管理</el-menu-item>
            <el-menu-item index="/gojiaose">角色管理</el-menu-item>
            <el-menu-item index="/gobumen">部门管理</el-menu-item>
            <el-menu-item index="/goshezhiyhjs">设置用户权限</el-menu-item>
            <el-menu-item index="/gotongzhi">发布通知</el-menu-item>
            <el-menu-item index="/gogonggao">发布公告</el-menu-item>
            <el-menu-item index="/gofpygyemian">设置菜单</el-menu-item>
        </el-sub-menu>
    <el-sub-menu index="5">

      <template #title>招聘管理</template>
      <el-menu-item index="/gorecruit">简历信息</el-menu-item>
      <el-menu-item index="/gorencaizhub">应聘者面试</el-menu-item>
      <el-menu-item index="/gointerview">面试流程</el-menu-item>
      <el-menu-item index="/goZpjh">招聘计划</el-menu-item>
    </el-sub-menu>
<!--      <el-menu-item index="/goxxxx">招聘计划</el-menu-item>-->

        <el-sub-menu index="6">
            <template #title>绩效管理</template>
            <el-menu-item index="/goinsertjixiao">绩效名称</el-menu-item>
            <el-menu-item index="/gojixiaoGrade">绩效评分</el-menu-item>
            <el-menu-item index="/gojixiaoScore">绩效月报</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="7">
            <template #title>薪资管理</template>
            <el-menu-item index="/gosalary">基本工资</el-menu-item>
            <el-menu-item index="/gosalaryElement">薪资要素项</el-menu-item>
            <el-menu-item index="/gopayroll">薪资档案</el-menu-item>
        </el-sub-menu>


        <el-sub-menu index="8">
            <template #title>考勤管理</template>
            <el-menu-item index="/gojiaqishezhi">设置假期类型</el-menu-item>
            <el-menu-item index="/gopaibansz">班次设置</el-menu-item>
            <el-menu-item index="/gokaoqingjilu">考勤记录</el-menu-item>
        </el-sub-menu>

 

    <el-sub-menu index="9">
      <template #title>审核管理</template>
      <el-menu-item index="/goshenheshezhi">审核设置</el-menu-item>
      <el-menu-item index="/goshebaoshenhe">社保审核</el-menu-item>
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