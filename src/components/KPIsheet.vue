<!-- 绩效评分-->
<template>

  <el-tabs
      v-model="data.value"
      type="card"
      class="demo-tabs"
      @tab-click="handoff"
  >
    <el-tab-pane label="已评分" name="first">
      <div class="big">
        <div class="big-2">

          <div class="btn">
            <div class="select">
              <el-input v-model="data.rzname" placeholder="请输入员工姓名查询"  style="width: 200px;margin-left: 80px"></el-input>
              <el-button class="btnSelect" :icon="Search" @click="selectGradeByName()" @keyup.enter="selectGradeByName"  type="primary" round>
                <span style="vertical-align: middle" >搜索</span>
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
    </el-tab-pane>
    <el-tab-pane label="未评分" name="second">
      <div class="big1">
        <div class="big-2">

          <div class="btn">
            <div class="select">
              <el-input v-model="data2.rzname" placeholder="请输入员工姓名查询"  style="width: 200px;margin-left: 80px"></el-input>
              <el-button class="btnSelect" :icon="Search" @click="findGrade2ByName()"  type="primary" round>
                <span style="vertical-align: middle" >搜索</span>
              </el-button>
            </div>
          </div>

          <el-divider />

          <div class="table">
            <el-table
                ref="multipleTableRef"
                :data="data2.jixiao"
                style="width: 100%"

            >
              <el-table-column prop="ybh" label="员工编号" width="200"/>
              <el-table-column prop="rzname"  label="员工姓名" width="200" />
              <el-table-column  prop="jmc" label="绩效名称" width="200"  />
              <el-table-column prop="jnr"  label="绩效内容" width="200" />
              <el-table-column label="操作" >
                <template #default="scope" v-slot="scope">
                  <el-button type="success"  round>
                    <el-icon style="vertical-align: middle">
                      <edit />
                    </el-icon>
                    <span style="vertical-align: middle;" @click="dialogVisible=true;findGradeByJxbh(scope.row.jxbh)">评分</span>
                  </el-button>
                </template>
              </el-table-column>

            </el-table>
            <el-empty description="没有找到相关数据！" v-if="data2.isShow"/>
          </div>

          <!-- 评分定级-->
          <el-dialog
              v-model="dialogVisible"
              title="修改"
              width="30%"
              :before-close="handleClose"
              :modal="selectForm2"
          >
            <el-form-item label="绩效分数" >
              <el-input v-model="selectForm2.jxfs"/>
            </el-form-item>
            <el-form-item label="绩效等级" >
              <el-input   v-model="selectForm2.jdjb"/>
            </el-form-item>
            <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">关闭</el-button>
              <el-button type="primary" @click="updataGradePf();dialogVisible=false;open4()">保存</el-button>
            </span>
            </template>
          </el-dialog>

        </div>

        <!--  分页-->
        <div class="page">
          <el-pagination background layout="prev, pager, next"
                         v-model:current-page="this.data2.pageNum"
                         v-model:page-size="this.data2.pageSize"
                         :total="data2.total"
                         @current-change="page2"  />
        </div>

      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import { onBeforeMount } from "vue";
import axios from '../axios'
import {
  Search,
  DocumentAdd,
  Edit,
  DocumentDelete,
} from '@element-plus/icons-vue'
import {ElMessageBox} from "element-plus/es";
import {ElMessage} from "element-plus";
import type { TabsPaneContext } from 'element-plus'
var data=reactive({jixiao:[],pageNum:1,pageSize:5,total:0,rzname:'',isShow:false,value:'first'})
var data2=reactive({jixiao:[],pageNum:1,pageSize:5,total:0,rzname:'',isShow:false,value:'first'})
function handoff(TabsPaneContext,Event){
  if (TabsPaneContext.props.label=='已评分'){
    findAllGrade()
  }else {
    findAllGrade2()
  }
}

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

//刷新用
function findAllGrade(){
  axios.get("/findGrade",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize}
  }).then(function (res){
    console.log(res.data.data)

    data.jixiao=res.data.data.list;
    data.total=res.data.data.total
  }).catch(function (error){
    console.log(error)
  })
}

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
//查全部未评分的员工
function findAllGrade2(){
  axios.get("/findGrade2",{
    params:{pageNum:data2.pageNum,pageSize:data2.pageSize}
  }).then(function (res){
    console.log(res.data.data)

    data2.jixiao=res.data.data.list;
    data2.total=res.data.data.total
  }).catch(function (error){
    console.log(error)
  })
}
//分页
function page2(pageNum){
  axios.get("/findGrade2",{
    params:{pageNum:data2.pageNum,pageSize: data2.pageSize}
  }).then(function (res){
    data2.total=res.data.data.total
    data2.jixiao=res.data.data.list
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

function findGrade2ByName(){
  axios.get("/findGrade2ByName",{
    params:{pageNum:data2.pageNum,pageSize:data2.pageSize,rzname: data2.rzname}
  }).then((res)=>{
    console.log(res.data.data)
    data2.jixiao=res.data.data.list
    data2.total=res.data.data.total
    if(res.data.data.list.length==0){
      data2.isShow=true
    }else {
      data2.isShow=false
    }
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

})

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
    findAllGrade()
  }).catch(function (error){
    console.log(error)
  })
}


const selectForm2=reactive({
  jxbh:0,
  jdbh:0,
  jxsj:'',
  jxfs:0,
  jdjb:'',
  jdfs:0
})
//拿评分编号
function findGradeByJxbh(e){
  axios.get("/findGradeByJxbh?jxbh="+e).then(function (res){
    console.log(res.data)
    selectForm2.jxfs=res.data.data.jxfs
    selectForm2.jxbh=res.data.data.jxbh
  })
}
//评分定级记录
function updataGradePf(){
  axios.put("/updataGradePf",selectForm2).then(function (res){
    console.log(res.data)
     selectForm2.jxfs=res.data.jxfs
     selectForm2.jdjb=res.data.jdjb
     //selectForm2.jdfs=res.data.jxfs
     findAllGrade2()
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
        findAllGrade()
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
  ElMessage.success('评分成功！')
}
onMounted(()=>{
  Listener()
})
//键盘事件
function Listener(){
  document.onkeyup = e =>{

    if (e.keyCode === 13 ) {
      selectGradeByName()
      findGrade2ByName()
    }
  }
}

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