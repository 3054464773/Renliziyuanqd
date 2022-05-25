<script setup>
    import {
        Search,
        Plus,
        Edit,
        Delete
    } from '@element-plus/icons-vue'
    import axios from '../axios.js'

    import { ref,reactive,onBeforeMount } from 'vue'

    var data=reactive({
        pageNum: 1,//当前显示页码
        pageSize: 5,//每一页显示的条数
        total: 0,//总条数
        pages: 0,
        rzname:'', //员工姓名
    })
    const tableData = ref([])

    //查询社保缴费信息
    onBeforeMount(() => {
        axios.get("/selectsbjfxx",{
            params:{
                pageNum:data.pageNum,
                pageSize:data.pageSize
            }
        }).then(function (response) {
            console.log(response)
            tableData.value=response.data.data.list
            data.total = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })
    })
    //分页
    function page() {
        axios.get("/selectsbjfxx", {
            params: {pageNum: data.pageNum, pageSize: data.pageSize}
        }).then(function (response) {
            tableData.value=response.data.data.list
            data.total = response.data.data.total
        }).catch(function (error) {
            console.log(error)
        })
    }
    //根据员工姓名模糊查询员工信息
    function mohucx() {
        axios.get("/selectygByname1",{
            params:{
                rzname:data.rzname
            }
        }).then(function (response) {
            tableData.value = response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }

</script>
<template>
    <div id="head">
        <span id="title">社保缴费</span>
        <input type="text" placeholder="请输入员工姓名" v-model="data.rzname" id="txt">
        <el-button type="primary" :icon="Search"  class="cx" @click="mohucx">查询</el-button>
        <el-button type="primary" :icon="Plus" class="btns">新增</el-button>
        <el-button type="primary" :icon="Edit" class="btns" disabled>编辑</el-button>
        <el-button type="primary" :icon="Delete" class="btns" disabled>删除</el-button>
    </div>
    <!--表格-->
    <el-table
            :data="tableData"
            height="400px"
    >
<!--        <el-table-column type="selection" width="55" />-->
        <el-table-column property="ybh" label="员工编号" width="120px"/>
        <el-table-column property="sbbh" label="社保方案编号" width="120px"/>
        <el-table-column property="ygzt" label="员工状态" width="120px"/>
        <el-table-column property="rzname" label="姓名" width="120px"/>
        <el-table-column property="rzsex" label="性别" width="120px"/>
        <el-table-column property="rzcsrq" label="出生日期" width="130px" sortable/>
        <el-table-column property="rzage" label="年龄" width="120px"/>
        <el-table-column property="rzxl" label="学历" width="120px"/>
        <el-table-column property="rzsfz" label="身份证" width="120px"/>
        <el-table-column property="rzphone" label="联系电话" width="120px"/>
        <el-table-column property="rzdz" label="现居地址" width="120px"/>
        <el-table-column property="rzgzjl" label="工作经历" width="120px"/>
        <el-table-column property="rzhyzk" label="婚姻状况" width="120px"/>
        <el-table-column property="rzmz" label="民族" width="120px"/>
        <el-table-column property="rzzzmm" label="政治面貌" width="120px"/>
    </el-table>
    <!--分页标签-->
    <div class="page">
        <el-pagination background layout="prev, pager, next"
                       v-model:current-page="this.data.pageNum"
                       v-model:page-size="this.data.pageSize"
                       :total="data.total"
                       @current-change="page"/>
    </div>
</template>

<style scoped>
    #head {
        margin: 10px;
    }

    #title {
        font-weight: bold;
        font-size: 18px;
    }

    #txt {
        width: 200px;
        height: 20px;
        margin: 0px 0px 0px 50%;
    }

    .cx {
        width: 66px;
        height: 25px;
        margin: 0px 10px 0px 0px;
    }

    .btns {
        width: 66px;
        height: 25px;
        margin: 0px 10px 0px 10px;
    }
</style>