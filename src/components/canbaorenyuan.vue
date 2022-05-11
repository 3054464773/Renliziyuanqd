<script setup>
    import {
        Search,
        Plus,
        Edit,
        Delete
    } from '@element-plus/icons-vue'
    import axios from '../axios.js'

    import { ref,onMounted } from 'vue'

    // 分页标签
    const currentPage = ref(1)
    const pageSize = ref(20)
    const small = ref(false)
    const background = ref(false)
    const disabled = ref(false)

    const tableData = ref([])

    //查询参保人员信息
    function cxcbry(){
        axios.get("/selectcbryxx").then(function (response) {
            console.log(response)
            tableData.value=response.data.data
        }).catch(function (error) {
            console.log(error)
        })
    }
    onMounted(()=>{
        cxcbry()
    })
</script>
<template>
    <div id="head">
        <span id="title">参保人员</span>
        <input type="text" placeholder="请输入查询条件" id="txt">
        <el-button type="primary" :icon="Search" class="cx">查询</el-button>
        <el-button type="primary" :icon="Plus" class="btns">新增</el-button>
        <el-button type="primary" :icon="Edit" class="btns" disabled>编辑</el-button>
        <el-button type="primary" :icon="Delete" class="btns" disabled>删除</el-button>
    </div>
    <!--表格-->
    <el-table
            :data="tableData"
            height="450px"
    >
        <el-table-column type="selection" width="55" />
        <el-table-column property="ybh" label="员工编号" width="120px" sortable/>
        <el-table-column property="sbbh" label="社保方案编号" width="120px"/>
        <el-table-column property="ygzt" label="员工状态" width="120px"/>
        <el-table-column property="rzname" label="姓名" width="120px"/>
        <el-table-column property="rzsex" label="性别" width="120px"/>
        <el-table-column property="rzcsrq" label="出生日期" width="120px" sortable/>
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
    <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20]"
         :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
         :total="100" />
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