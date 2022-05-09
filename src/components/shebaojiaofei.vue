<script setup>
    import {
        Search,
        Plus,
        Edit,
        Delete
    } from '@element-plus/icons-vue'
    import axios from '../axios.js'

    import { ref } from 'vue'
    // 分页标签
    const currentPage = ref(1)
    const pageSize = ref(20)
    const small = ref(false)
    const background = ref(false)
    const disabled = ref(false)
    const tableData = [
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-08',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-06',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-07',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
    ]
</script>
<template>
    <div id="head">
        <span id="title">社保缴费</span>
        <input type="text" placeholder="请输入查询条件" id="txt">
        <el-button type="primary" :icon="Search" class="cx">查询</el-button>
        <el-button type="primary" :icon="Plus" class="btns">新增</el-button>
        <el-button type="primary" :icon="Edit" class="btns" disabled>编辑</el-button>
        <el-button type="primary" :icon="Delete" class="btns" disabled>删除</el-button>
    </div>
    <!--表格-->
    <el-table
            :data="tableData"
    >
        <el-table-column type="selection" width="55" />
        <el-table-column property="date" label="Date" width="160" sortable/>
        <el-table-column property="name" label="Name" width="120" />
        <el-table-column property="address" label="Address" show-overflow-tooltip />
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