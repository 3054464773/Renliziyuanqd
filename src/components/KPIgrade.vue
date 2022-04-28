<!--绩效考核等级 -->
<template>
  <div class="big">
    <div class="big-2">

      <!-- 按钮-->
      <div class="btn">
          <div class="select">
              <el-input v-model="input1" placeholder="请输入绩效编号" style="width: 200px;margin-left: 80px" />
              <el-button class="btnSelect" type="primary" round>
                <el-icon><search /></el-icon>
               <span style="vertical-align: middle">查询</span>
              </el-button>
              <el-button class="btnadd" type="primary" @click="dialogVisible = true" round>
                <el-icon style="vertical-align: middle;">
                  <DocumentAdd />
                </el-icon>
                <span style="vertical-align: middle;"> 添加 </span>
              </el-button>
         </div>
      </div>


      <!-- 新增名称-->
      <el-dialog
          v-model="dialogVisible"
          title="新增"
          width="30%"
          :before-close="handleClose"
          :modal="form"
      >
        <el-form-item label="绩效编号" >
          <el-input   v-model="form.jbh" />
        </el-form-item>
        <el-form-item label="绩效名称" >
          <el-input   v-model="form.jmc"/>
        </el-form-item>
        <el-form-item label="绩效内容">
          <el-input v-model="form.jnr" />
        </el-form-item>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="insert();dialogVisible=false;open()">保存</el-button>
      </span>
        </template>
      </el-dialog>

      <!-- 修改绩效信息-->
      <el-dialog
          v-model="dialogVisible2"
          title="修改"
          width="30%"
          :before-close="handleClose2"
          :modal="selectForm"
      >
        <el-form-item label="绩效编号" >
          <el-input   v-model="selectForm.jbh" disabled/>
        </el-form-item>
        <el-form-item label="绩效名称" >
          <el-input   v-model="selectForm.jmc"/>
        </el-form-item>
        <el-form-item label="绩效内容">
          <el-input v-model="selectForm.jnr" />
        </el-form-item>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">关闭</el-button>
        <el-button type="primary" @click="updateJixiao();dialogVisible2=false;open2();refresh">保存</el-button>
      </span>
        </template>
      </el-dialog>

      <el-divider />

      <!-- 表格-->
      <el-table
          ref="multipleTableRef"
          :data="data1.jixiao"
          style="width: 100%"

      >
        <el-table-column prop="jbh" label="绩效编号" width="200">

        </el-table-column>
        <el-table-column  prop="jmc" label="绩效名称" width="200"  />
        <el-table-column prop="jnr"  label="绩效内容" width="300" />
        <el-table-column label="操作" >
          <template #default="scope" v-slot="scope">
            <el-button type="primary" @click="dialogVisible2=true;selectOne(scope.row.jbh)" round>
              <el-icon style="vertical-align: middle">
                <edit />
              </el-icon>
                <span style="vertical-align: middle;" >编辑</span>
            </el-button>

            <el-button class="btndel" type="primary" round>
              <el-icon style="vertical-align: middle;">
                <document-delete />
              </el-icon>
              <span style="vertical-align: middle;" @click="del(scope.row.jbh);open3()"> 删除 </span>
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <!-- 分页-->
      <div class="page">
        <el-pagination background layout="prev, pager, next"
                       v-model:current-page="this.data1.pageNum"
                       v-model:page-size="this.data1.pageSize"
                       :total="data1.total"
                       @current-change="page"  />
      </div>
    </div>

  </div>
</template>
<script lang="ts" setup>
import {ref, reactive, inject, getCurrentInstance} from 'vue'
import {onBeforeMount} from "vue";
import type { ElTable } from 'element-plus'
import axios from "../axios";



//const {proxy}=getCurrentInstance()
// 查询列表
var data1=reactive({jixiao:[],pages:0,pageNum:0,pageSize:5,total:0,jmc:'',jbh:''})//jixiao:[]定义一个数组 接收多个编号
onBeforeMount(()=>{
   axios.get("/findJixiao",{
    params:{pageNum:1,pageSize:5}
  }).then(function (res) {
    console.log(res.data.data)

    data1.jixiao=res.data.data.list
    data1.total=res.data.data.total
    data1.jmc=res.data.data.list.jmc
    data1.jbh=res.data.data.list.jbh
  }).catch(function (error) {
    console.log(error)
  })
})
//分页
function page(pageNum) {
  console.log(pageNum)
  axios.get("/findJixiao",{
    params:{pageNum:data1.pageNum,pageSize:data1.pageSize}
  }).then(function (res) {
    data1.total=res.data.data.total
    data1.jixiao=res.data.data.list
    //console.log(res.data.data)
  }).catch(function (error) {
    console.log(error)
  })
}

const input1 = ref('')//搜索框


import { ElMessageBox } from 'element-plus'
//新增页面的控制属性
const dialogVisible = ref(false)
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定关闭吗?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}

//添加页面的表单
const form = reactive({
  jbh: '9',
  jnr:'',
  jmc:''
})
//新增的方法
function insert() {

  axios.post("/insertJixiao",form).then(function (res) {
    form.jbh=res.data.jbh
    form.jnr=res.data.jnr
    form.jmc=res.data.jmc
    console.log(res.data)
  }).catch(function (error) {
    console.log(error)
  })
}

const selectForm=reactive({
  jbh:'',
  jnr:'',
  jmc:''
})
//查询单条数据
function selectOne(e) {

  axios.get("/findJixiaoById?jbh="+e).then(function (res) {
        selectForm.jbh=res.data.data.jbh
        selectForm.jnr=res.data.data.jnr
        selectForm.jmc=res.data.data.jmc
        console.log(res.data.data.jbh)
  })
}


//删除方法
function del(e){
  axios.delete("/deleteJixiao?jbh="+e).then(function (res) {
    if (res.data.code!=200){
      console.log("删除失败！")
    }
  })
}

//修改页面的控制属性
const dialogVisible2 = ref(false)
const handleClose2 = (done: () => void) => {
  ElMessageBox.confirm('确定关闭吗?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}

//修改绩效信息方法
function updateJixiao(){
  axios.put("/updateJixiao",selectForm).then(function (res) {
    selectForm.jbh=res.data.data.jbh
    selectForm.jnr=res.data.data.jnr
    selectForm.jmc=res.data.data.jmc
    console.log(res.data.data)
  }).catch(function (error) {
    console.log(error)
  })
}
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

//局部刷新
const refresh=inject('reload')

</script>
<style>
.big{
  margin: 0px auto;
  width: 100%;
}
.big-2{
  width: 100%;
  height: 657px;
}
.btn{
  margin-top: 10px;
  margin-left: -1100px;
}
.select{
  margin-top: 10px;
  margin-left: 120px;
}
.btnSelect{
  margin-left: 10px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
.page{
  margin-top: 50px;
}
</style>