<!--绩效考核等级 -->
<template>
  <div class="big">
    <div class="big-2">

      <!-- 按钮-->
      <div class="btn">
          <div class="select">
              <el-input v-model="data1.jmc"  placeholder="请输入绩效名称" style="width: 200px;margin-left: 80px" />
              <el-button class="btnSelect" :icon="Search" @click="selectJixiaoByName" type="primary" round>
               <span style="vertical-align: middle" >查询</span>
              </el-button>
              <el-button class="btnadd" type="success" :icon="DocumentAdd" @click="dialogVisible = true" round>
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
      >
        <el-form
            :model="form"
            label-width="120px"
            class="demo-ruleForm"
            :rules="rules"
        >
          <el-form-item label="绩效名称" prop="jmc">
            <el-input   v-model="form.jmc"/>
          </el-form-item>
          <el-form-item label="绩效内容" prop="jnr">
            <el-input v-model="form.jnr"/>
          </el-form-item>
        </el-form>
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
      >
        <el-form
            :model="selectForm"
            label-width="120px"
            class="demo-ruleForm"
            :rules="rules"
        >
          <el-form-item label="绩效编号" >
            <el-input   v-model="selectForm.jbh" disabled/>
          </el-form-item>
          <el-form-item label="绩效名称" prop="jmc">
            <el-input   v-model="selectForm.jmc"/>
          </el-form-item>
          <el-form-item label="绩效内容" prop="jnr">
            <el-input v-model="selectForm.jnr" />
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">关闭</el-button>
        <el-button type="primary" @click="updateJixiao();dialogVisible2=false;open2()">保存</el-button>
      </span>
        </template>
      </el-dialog>

      <el-divider />

      <div>
      <!-- 表格-->
      <el-table
          ref="multipleTableRef"
          :data="data1.jixiao"
          style="width: 100%"

      >
        <el-table-column prop="jbh" label="绩效编号" width="300">

        </el-table-column>
        <el-table-column  prop="jmc" label="绩效名称" width="300"  />
        <el-table-column prop="jnr"  label="绩效内容" width="400" />
        <el-table-column label="操作" >
          <template #default="scope" v-slot="scope">
            <el-button type="primary" :icon="Edit" @click="dialogVisible2=true;selectOne(scope.row.jbh)" round>

                <span style="vertical-align: middle;" >编辑</span>
            </el-button>

            <el-button class="btndel" type="danger" @click="selectOne(scope.row.jbh);del()"  round>
              <el-icon style="vertical-align: middle;">
                <document-delete />
              </el-icon>
              <span style="vertical-align: middle;" > 删除 </span>
            </el-button>
          </template>
        </el-table-column>

      </el-table>
        <el-empty description="没有找到相关数据！" v-if="data1.isShow"/>
      </div>
    </div>
    <!-- 分页-->
    <div class="page">
      <el-pagination background layout="prev, pager, next"
                     v-model:current-page="this.data1.pageNum"
                     v-model:page-size="this.data1.pageSize"
                     :total="data1.total"
                     @current-change="page"  />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref, reactive, inject} from 'vue'
import {onBeforeMount} from "vue";
import type { ElTable } from 'element-plus'
import axios from "../axios";
import {
  Search,
  DocumentAdd,
  Edit,
  DocumentDelete
} from '@element-plus/icons-vue'


//const {proxy}=getCurrentInstance()
// 查询列表
var data1=reactive({jixiao:[],pages:0,pageNum:1,pageSize:5,total:0,jmc:'',jbh:'',isShow:false})//jixiao:[]定义一个数组 接收多个编号
onBeforeMount(()=>{
   axios.get("/findJixiao",{
    params:{pageNum:data1.pageNum,pageSize:data1.pageSize}
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
  jnr:'',
  jmc:''
})

//验证
const rules=reactive({
  jmc:[
    {required:true,message:'请输入绩效名称',trigger:'blur'},
    {min:2,message:'长度最少2个字符',trigger:'blur'}
  ],
  jnr:[
    {required:true,message:'请输入绩效内容',trigger:'blur'},
    {min:1,message: '内容不能为空',trigger: 'blur'}
  ]
})

//新增的方法
function insert() {

  axios.post("/insertJixiao",form).then(function (res) {
    form.jnr=res.data.jnr
    form.jmc=res.data.jmc
    console.log(res.data)
    refresh()
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
// function del(e){
//   axios.delete("/deleteJixiao?jbh="+e).then(function (res) {
//     if (res.data.code!=200){
//       console.log("删除失败！")
//     }
//   })
// }
const del=()=>{
  ElMessageBox.confirm('是否确认删除?','提示',{
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:'warning'
  }).then(()=>{
    axios.delete("/deleteJixiao?jbh="+selectForm.jbh).then(function (res) {
      if (res.data.code==200){
        console.log(res.data.data)
        open3()
        refresh()
      }
    })
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
    refresh()//修改完成刷新页面
  }).catch(function (error) {
    console.log(error)
  })
}

//条件查询
function selectJixiaoByName() {
  axios.get("/findJixiaoByName?page=1&jmc="+data1.jmc).then((e)=>{
    data1.jixiao=e.data.data.list
    data1.total=parseInt(e.data.data.count)*5
    if (e.data.data.list.length==0){
        data1.isShow=true
    }else {
      data1.isShow=false
    }
    console.log(e.data.data)
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

.dialog-footer button:first-child {
  margin-right: 10px;
}
.page{
  margin-top: 78px;
  margin-left: 560px;
}
</style>