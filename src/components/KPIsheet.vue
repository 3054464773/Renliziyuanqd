<!-- 绩效评分-->
<template>
<div class="big">
  <div class="big-2">

    <div class="btn">
      <div class="select">
        <el-input v-model="data.rzname" placeholder="请输入员工姓名查询"  style="width: 200px;margin-left: 80px"></el-input>
        <el-button class="btnSelect" :icon="Search" @click="selectGradeByName()"  type="primary" round>
          <span style="vertical-align: middle" >搜索</span>
        </el-button>
        <el-button class="btnadd" type="success" @click="dialogVisible=true" :icon="DocumentAdd" round>
          <span style="vertical-align: middle;">评分定级</span>
        </el-button>
      </div>
    </div>

    <el-divider />

    <div class="table">
    <el-table
        ref="multipleTableRef"
        :data="data.jixiao"
        style="width: 100%"

    >
      <el-table-column prop="jxbh" label="评分编号" width="140"/>

      <el-table-column  prop="jmc" label="绩效名称" width="140"  />
      <el-table-column prop="jnr"  label="绩效内容" width="200" />
      <el-table-column prop="rzname"  label="员工姓名" width="140" />
      <el-table-column prop="jxsj"  label="时间" width="150" />
      <el-table-column  label="分数" width="180" >
        <template #default="scope" v-slot="scope">
          <el-rate v-model="scope.row.jxfs" />
        </template>
      </el-table-column>
      <el-table-column prop="jdjb"  label="等级" width="100" />
      <el-table-column label="操作" >
        <template #default="scope" v-slot="scope">
          <el-button type="primary"  round>
            <el-icon style="vertical-align: middle">
              <edit />
            </el-icon>
            <span style="vertical-align: middle;" @click="dialogVisible2=true;selectOne(scope.row.jxbh)">修改评分</span>
          </el-button>
<!--                                            先查询评分编号，根据拿到的编号删除数据-->
          <el-button class="btndel" @click="selectOne(scope.row.jxbh);del()"  type="danger" round>
            <el-icon style="vertical-align: middle;">
              <document-delete />
            </el-icon>
            <span style="vertical-align: middle;"> 删除 </span>
          </el-button>
        </template>
      </el-table-column>

    </el-table>
      <el-empty description="没有找到相关数据！" v-if="data.isShow"/>
    </div>

<!--    评分定级的表单-->
    <el-dialog
        v-model="dialogVisible"
        title="修改"
        width="30%"
        :before-close="handleClose"

    >
      <el-form :inline="true" :model="form" label-width="100px">
        <el-form-item label="员工姓名" >
          <el-input   v-model="form.rzname" />
        </el-form-item>
          <el-icon><avatar @click="findAllEmp();dialogVisible3=true" /></el-icon>
        <el-form-item label="绩效名称" >
          <el-input   v-model="form.jmc"/>
        </el-form-item>
        <el-icon><more-filled /></el-icon>
        <el-form-item label="绩效内容" >
          <el-input   v-model="form.jnr"/>
        </el-form-item>
        <el-form-item label="绩效分数" >
          <el-input   v-model="form.jxfs"/>
        </el-form-item>
        <el-form-item label="绩效等级" >
          <el-input   v-model="form.jdjb"/>
        </el-form-item>
      </el-form>
        <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="dialogVisible=false;open1()">保存</el-button>
        </span>
        </template>
    </el-dialog>

<!--    查询所有员工-->
    <el-dialog
        v-model="dialogVisible3"
        title="员工列表"
        width="30%"
        :before-close="handleClose3"
        :modal="form"
    >
      <div>
        <el-input v-model="form.name" placeholder="请输入员工名称" style="width: 200px;margin-left: 80px" />
        <el-button class="btnSelect" :icon="Search" @click="selectAllEmpByName" type="primary" round>
          <span style="vertical-align: middle" >查询</span>
        </el-button>
      </div>
      <el-table
          ref="multipleTableRef"
          :data="form.tableData"
          style="width: 100%"
          @current-change=""
          highlight-current-row
      >
        <el-table-column type="radio" width="55"  />
        <el-table-column label="员工编号" width="120" prop="ybh">
          <template #default="scope">{{ scope.row.ybh }}</template>
        </el-table-column>
        <el-table-column label="职位编号" width="120" prop="zwbh" />
        <el-table-column label="员工姓名" show-overflow-tooltip prop="rzname" />
      </el-table>
      <el-empty description="没有找到该员工！" v-if="form.isShow" style="height: 178px"/>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible3 = false">关闭</el-button>
        <el-button type="primary" @click="dialogVisible3=false">确定</el-button>
      </span>
      </template>
    </el-dialog>

    <!-- 修改绩效评分-->
    <el-dialog
        v-model="dialogVisible2"
        title="修改"
        width="30%"
        :before-close="handleClose2"
        :modal="selectForm"
    >
      <el-form-item label="评分编号" >
        <el-input   v-model="selectForm.jxbh" disabled/>
      </el-form-item>
      <el-form-item label="绩效分数" >
        <el-input   v-model="selectForm.jxfs"/>
      </el-form-item>
      <el-form-item label="绩效等级" >
        <el-input   v-model="selectForm.jdjb"/>
      </el-form-item>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">关闭</el-button>
        <el-button type="primary" @click="updateGrade();dialogVisible2=false;open2()">保存</el-button>
      </span>
      </template>
    </el-dialog>

  </div>

<!--  分页-->
  <div class="page">
    <el-pagination background layout="prev, pager, next"
                   v-model:current-page="this.data.pageNum"
                   v-model:page-size="this.data.pageSize"
                   :total="data.total"
                   @current-change="page"  />
  </div>

</div>
</template>

<script lang="ts" setup>
import {inject, reactive, ref} from "vue";
import {onBeforeMount} from "vue";
import axios from '../axios'
import {
  Search,
  DocumentAdd,
  Edit,
  DocumentDelete,
  Link, Avatar
} from '@element-plus/icons-vue'
import {ElMessageBox} from "element-plus/es";
import {ElMessage} from "element-plus";
var data=reactive({jixiao:[],pageNum:1,pageSize:5,total:0,rzname:'',isShow:false})
onBeforeMount(()=>{
  axios.get("/findGrade",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize}
  }).then(function (res){
    console.log(res.data.data)

    data.jixiao=res.data.data.list;
    data.total=res.data.data.total
  }).catch(function (error){
    console.log(error)
  })
})
const jxfs=ref(5)
//分页
function page(pageNum){
  axios.get("/findGrade",{
    params:{pageNum:data.pageNum,pageSize: data.pageSize}
  }).then(function (res){
    data.total=res.data.data.total
    data.jixiao=res.data.data.list
  }).catch(function (error){
    console.log(error)
  })
}

//条件查询
function selectGradeByName(){
  axios.get("/findGradeByName",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize,rzname:data.rzname}
  }).then((res)=>{
    console.log(res.data.data)
    data.jixiao=res.data.data.list
    data.total=res.data.data.total
    if(res.data.data.list.length==0){
      data.isShow=true
    }else {
      data.isShow=false
    }
    console.log(res.data.data)
  })
}

const dialogVisible=ref(false)
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定关闭吗?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}
const form=reactive({
  jxbh:0,
  jmc:'',
  jnr:'',
  rzname:'',
  jxsj:'',
  jxfs:0,
  jdjb:'',
  rzbh:0,
  zwbh:0,
  tableData:[],
  name:'',
  isShow:false
})
// const tableData = [
//   {
//     date: [],
//     name: [],
//     address: [],
//   }]
function findAllEmp(){
  axios.get("/findAllEmp").then(function (res){
    console.log(res.data)
    form.tableData=res.data.data

  }).catch(function (error){
    console.log(error)
  })
}
function selectAllEmpByName(){
  axios.get("/findAllEmpByName?rzname="+form.name).then(function (res){
    console.log(res.data)
    form.tableData=res.data.data
    if(res.data.data.length==0){
      form.isShow=true
    }else {
      form.isShow=false
    }
  })
}



const selectForm=reactive({
  jxbh:0,
  jxfs:0,
  jdjb:'',
  jdfs:0
})

//修改
const dialogVisible2=ref(false)
const handleClose2 = (done: () => void) => {
  ElMessageBox.confirm('确定关闭吗?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}
const dialogVisible3=ref(false)
const handleClose3 = (done: () => void) => {
  ElMessageBox.confirm('确定关闭吗?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}

//查询单条数据
function selectOne(res){
  axios.get("/findGradeById?jbh="+res).then(function (res){
    selectForm.jxbh=res.data.data.jxbh
    selectForm.jxfs=res.data.data.jxfs
    selectForm.jdfs=res.data.data.jdfs
    selectForm.jdjb=res.data.data.jdjb
    console.log(res.data.data)
  })
}

//修改评分
function updateGrade(){
  axios.put("/updateGrade",selectForm).then(function (res){
    console.log(res.data.data)
    selectForm.jxfs=res.data.data.jxfs
    console.log(selectForm.jxfs)
    selectForm.jdjb=res.data.data.jdjb
    refresh()
  }).catch(function (error){
    console.log(error)
  })
}

//删除评分记录
const del=()=>{
  ElMessageBox.confirm('是否确认删除?','提示',{
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:"warning"
  }).then(()=>{
    axios.delete("/deleteGrade?jxbh="+selectForm.jxbh).then(function (res) {
      if (res.data.code == 200) {
        console.log(res.data.data)
        open3()
        refresh()
      }
    });
  }).catch(()=>{
  })
}

//消息框
const open1 = () =>{
  ElMessage({
    message:'添加成功!',
    type:'success'
  })
}
const open2 = () =>{
  ElMessage({
    message:'修改成功!',
    type:'success'
  })
}
//消息框
const open3 = () =>{
  ElMessage({
    message:'删除成功!',
    type:'success'
  })
}
const open4 = () => {
  ElMessage.error('删除失败！')
}

//局部刷新
const refresh=inject('reload')


</script>

<style scoped>
.big{
  margin: 0px auto;
  width: 100%;
}
.big-2{
  width: 100%;
  height: 457px;
}
.btn{
  margin-top: 10px;
  margin-left: -260px;
}
.select{
  margin-top: 10px;
  margin-left: 120px;
}
.btnSelect{
  margin-left: 10px;
}
.page{
  margin-top: 78px;
}
</style>