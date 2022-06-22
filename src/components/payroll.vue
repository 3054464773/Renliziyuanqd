<template>
  <div class="big-payroll">
    <div class="big-payroll2">

      <div>
        <!-- 表格-->
        <el-table :data="data.payroll" style="width: 100%">
          <el-table-column prop="xzjlbh" label="序号" width="150" />
          <el-table-column prop="rzname" label="姓名" width="120" />
          <el-table-column prop="bmmc" label="部门" width="120" />
          <el-table-column prop="szjlsj" label="发放时间" width="120" />
          <el-table-column prop="xzjljbgz" label="基本工资" width="120" />
          <el-table-column prop="xzysje" label="薪资要素项" width="600" />
          <el-table-column prop="zip" label="Zip" width="120" />
          <el-table-column fixed="right" label="Operations" width="120">
            <template #default>
              <el-button link type="primary" size="small" @click="handleClick"
              >Detail</el-button
              >
              <el-button link type="primary" size="small">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-empty description="没有找到相关数据！" v-if="data.isShow"/>
      </div>
    </div>

    <!-- 分页-->
    <div class="page-payroll">
      <el-pagination background layout="prev, pager, next"
                     v-model:current-page="this.data.pageNum"
                     v-model:page-size="this.data.pageSize"
                     :total="data.total"
                     @current-change="page"  />
    </div>
  </div>




</template>

<script lang="ts" setup>
import {ref, reactive, onMounted} from 'vue'
import {onBeforeMount} from "vue";
import type { ElTable } from 'element-plus'
import axios from "../axios";
import {
  Search,
  DocumentAdd,
  Edit,
  DocumentDelete
} from '@element-plus/icons-vue'
import {ElMessageBox} from "element-plus/es";

var data=reactive({
  payroll:[],
  pages:0,
  pageNum:1,
  pageSize:5,
  total:0,
  isShow:false,


})

onBeforeMount(()=>{
  axios.get("/selectEmpInfo",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize}
  }).then(function (res){
    console.log(res.data.data)

    data.payroll=res.data.data.list
    data.total=res.data.data.total
  }).catch(function (err){
    console.log(err)
  })
})







//消息框
import {ElMessage} from "element-plus";
const open = () =>{
  ElMessage({
    message:'新增成功!',
    type:'success'
  })
}
const open2 = () =>{
  ElMessage({
    message:'修改成功!',
    type:'success'
  })
}
const open3 = () =>{
  ElMessage({
    message:'删除成功!',
    type:'success'
  })
}



</script>

<style scoped>
.big-payroll{
  margin: 0px auto;
  width: 100%;
}
.big-payroll2{
  width: 100%;
  height: 457px;
}
.page-payroll{
  margin-left: 560px;
  margin-top: 78px;
}
</style>