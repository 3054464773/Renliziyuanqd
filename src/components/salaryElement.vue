<template>
  <div class="big-salaryElement">
      <div class="big-salaryElement2">

        <div class="btn-salaryElement">
          <div class="select-salaryElement">
            <el-input v-model="data.ysxmc" placeholder="请输入要素项名称查询"  style="width: 200px;margin-left: 80px"></el-input>
            <el-button class="btnSelect-salaryElement" :icon="Search" @click="findSalaryElementByYsmc" @keyup.enter="findSalaryElementByYsmc"  type="primary" round>
              <span style="vertical-align: middle" >搜索</span>
            </el-button>
            <el-button class="btnadd-salaryElement" type="success" :icon="DocumentAdd" @click="dialogVisible = true" round>
              <span style="vertical-align: middle;"> 添加 </span>
            </el-button>
          </div>
        </div>

        <el-divider />

        <div>
          <!-- 表格-->
          <el-table
              ref="multipleTableRef"
              :data="data.salaryElement"
              style="width: 100%"

          >
            <el-table-column prop="xzysbh" label="薪资要素编号" width="300">

            </el-table-column>
            <el-table-column  prop="xzysmc" label="薪资要素名称" width="300"  />
            <el-table-column prop="xzysje"  label="薪资要素金额" width="400" />
            <el-table-column label="操作" >
              <template #default="scope" v-slot="scope">
                <el-button type="primary" :icon="Edit" @click="dialogVisible2=true;findSalaryElementByYsbh(scope.row.xzysbh)" round>

                  <span style="vertical-align: middle;" >编辑</span>
                </el-button>

                <el-button class="btndel" type="danger" @click="findSalaryElementByYsbh(scope.row.xzysbh);del()"  round>
                  <el-icon style="vertical-align: middle;">
                    <document-delete />
                  </el-icon>
                  <span style="vertical-align: middle;" > 删除 </span>
                </el-button>
              </template>
            </el-table-column>

          </el-table>
          <el-empty description="没有找到相关数据！" v-if="data.isShow"/>
        </div>
      </div>

      <!-- 分页-->
      <div class="page-salaryElement">
        <el-pagination background layout="prev, pager, next"
                       v-model:current-page="this.data.pageNum"
                       v-model:page-size="this.data.pageSize"
                       :total="data.total"
                       @current-change="page"  />
      </div>
  </div>

  <!-- 新增要素项名称 -->
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
      <el-form-item label="要素项名称" prop="xzysmc">
        <el-input   v-model="form.xzysmc"/>
      </el-form-item>
      <el-form-item label="要素项金额" prop="xzysje">
        <el-input v-model="form.xzysje"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="insertSalaryElement">保存</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 修改要素项信息-->
  <el-dialog
      v-model="dialogVisible2"
      title="修改"
      width="30%"
      :before-close="handleClose2"
  >
    <el-form
        :model="updateForm"
        label-width="120px"
        class="demo-ruleForm"
        :rules="rules"
    >
      <el-form-item label="薪资要素项编号" >
        <el-input   v-model="updateForm.xzysbh" disabled/>
      </el-form-item>
      <el-form-item label="薪资要素项名称" prop="xzysmc">
        <el-input   v-model="updateForm.xzysmc"/>
      </el-form-item>
      <el-form-item label="薪资要素项金额" prop="xzysje">
        <el-input v-model="updateForm.xzysje" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2=false">关闭</el-button>
        <el-button type="primary" @click="updateSalaryElement">保存</el-button>
      </span>
    </template>
  </el-dialog>

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
  salaryElement:[],
  pages:0,
  pageNum:1,
  pageSize:5,
  total:0,
  isShow:false,
  ysxmc:'',

})

onBeforeMount(()=>{
  axios.get("/findAllSalaryElement",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize}
  }).then(function (res){
    console.log(res.data.data)

    data.salaryElement=res.data.data.list
    data.total=res.data.data.total
  })
})
//刷新用
function reload(){
  axios.get("/findAllSalaryElement",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize}
  }).then(function (res){
    console.log(res.data.data)
    data.total=res.data.data.total
    data.salaryElement=res.data.data.list
  })
}

//分页
function page(){
  axios.get("/findAllSalaryElement",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize}
  }).then(function (res){
    console.log(res.data.data)
    data.total=res.data.data.total
    data.salaryElement=res.data.data.list
  }).catch(function (error){
    console.log(error)
  })
}

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
const form=reactive({
  xzysmc:'',
  xzysje:''
})
//验证
const rules=reactive({
  xzysmc:[
    {required:true,message:'请输入要素项名称',trigger:'blur'},
    {min:2,message:'长度最少2个字符',trigger:'blur'}
  ],
  xzysje:[
    {required:true,message:'请输入要素项金额',trigger:'blur'}
  ]
})
//添加要素项
function insertSalaryElement(){
  axios.post("/insertSalaryElement",form).then(function (res){
    console.log(res.data.data)
    form.xzysmc=res.data.xzysmc
    form.xzysje=res.data.xzysje
    dialogVisible.value=false//添加成功关闭窗口
    open()//提示弹窗
    reload()//添加成功刷新
  }).catch(function (error){
    console.log(error)
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
const updateForm=reactive({
  xzysbh:'',
  xzysmc:'',
  xzysje:''
})
//根据编号 拿到单条数据
function findSalaryElementByYsbh(e){
  axios.get("/findSalaryElementByYsbh?xzysbh="+e).then(function (res){
    console.log(res.data.data)
    updateForm.xzysbh=res.data.data.xzysbh
    updateForm.xzysmc=res.data.data.xzysmc
    updateForm.xzysje=res.data.data.xzysje
    //dialogVisible2.value=true
  })
}

//修改 要素项信息
function updateSalaryElement() {
  axios.put("/updateSalaryElement",updateForm).then(function (res){
    console.log(res.data.data)
    updateForm.xzysbh=res.data.data.xzysbh
    updateForm.xzysmc=res.data.data.xzysmc
    updateForm.xzysje=res.data.data.xzysje
    dialogVisible2.value=false
    open2()
    reload()
  })
}


//模糊查询
function findSalaryElementByYsmc(){
  axios.get("/findSalaryElementByYsmc",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize,xzysmc:data.ysxmc}
  }).then(function (res){
    console.log(res.data.data)
    data.salaryElement=res.data.data.list
    data.total=res.data.data.total
    if(res.data.data.list.length==0){
      data.isShow=true
    }else {
      data.isShow=false
    }
  })
}

//删除要素项方法
const del=()=>{
  ElMessageBox.confirm('是否确认删除?','提示',{
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:'warning'
  }).then(()=>{
  axios.delete("/deleteSalaryElementByYsbh?xzysbh="+updateForm.xzysbh).then(function (res){
    if(res.data.code==200){
      console.log(res.data.data)
      open3()
      reload()
      }
    })
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

onMounted(()=>{
  Listener();
})
//键盘事件
function Listener(){
  document.onkeyup = e =>{

    if (e.keyCode === 13 ) {
      findSalaryElementByYsmc()
      updateSalaryElement()
    }
  }
}

</script>

<style scoped>
.big-salaryElement{
  margin: 0px auto;
  width: 100%;
}
.big-salaryElement2{
  width: 100%;
  height: 457px;
}
.btn-salaryElement{
  margin-top: 10px;
  margin-left: -260px;
}
.select-salaryElement{
  margin-top: 10px;
  margin-left: 120px;
}
.btnSelect-salaryElement{
  margin-left: 10px;
}
.page-salaryElement{
  margin-left: 560px;
  margin-top: 78px;
}
</style>