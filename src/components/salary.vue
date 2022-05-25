<template>
  <el-tabs v-model="data.value" class="demo-tabs" @tab-click="handoff">
    <el-tab-pane label="薪资档案" name="first">
        <div class="big-salary">
          <div class="big-salary2">

            <div class="btn-salary">
                <el-input v-model="data.rzname"  placeholder="请输入员工名称" style="width: 200px;margin-left: 80px" />
                <el-button class="btnSelect-salary" :icon="Search" @click="findAllBasePayByName" type="primary" round>
                  <span style="vertical-align: middle" >查询</span>
                </el-button>
            </div>

            <el-divider/>
            <div class="table-salary">
                <el-table :data="data.salary" style="width: 100%">
                  <el-table-column prop="rzname" label="员工姓名" width="180" />
                  <el-table-column prop="zwmc" label="职位名称" width="180" />
                  <el-table-column prop="bmmc" label="部门名称" width="180" />
                  <el-table-column prop="xzjbgz" label="基本工资" width="180" />
                  <el-table-column prop="ygzt" label="员工状态" >
                    <template #default="scope" >
                      {{scope.row.ygzt==2?"实习人员":(scope.row.ygzt==1?"未到岗"
                        :(scope.row.ygzt==3?"正式人员":(scope.row.ygzt==4?"已离职人员":"黑名单")))}}
                    </template>
                  </el-table-column>
                </el-table>
              <el-empty description="没有找到相关数据！" v-if="data.isShow"/>
            </div>
          </div>

          <!-- 分页-->
          <div class="page-salary">
            <el-pagination background layout="prev, pager, next"
                           v-model:current-page="this.data.pageNum"
                           v-model:page-size="this.data.pageSize"
                           :total="data.total"
                           @current-change="page"  />
          </div>
        </div>
    </el-tab-pane>
    <el-tab-pane label="职位定薪" name="second">
      <div class="big-salary">
        <div class="big-salary2">

          <div class="btn-salary">
            <el-input v-model="data2.zwmc"  placeholder="请输入职位名称" style="width: 200px;margin-left: 80px" />
            <el-button class="btnSelect-salary" :icon="Search" @click="findAllPositionSalaryByZwmc" type="primary" round>
              <span style="vertical-align: middle" >查询</span>
            </el-button>

          </div>

          <el-divider/>
          <div class="table-salary">
            <el-table :data="data2.salary" style="width: 100%">
              <el-table-column prop="zwmc" label="职位名称" width="300"/>
              <el-table-column prop="bmmc" label="部门名称" width="300"/>
              <el-table-column prop="xzjbgz" label="基本工资" width="300">
                <template #default="scope" >
                    {{scope.row.xzjbgz==0?"":scope.row.xzjbgz}}
                    </template>
              </el-table-column>
              <el-table-column label="操作">
                <template #default="scope" v-slot="scope">
                  <el-button type="success"  round>
                    <el-icon style="vertical-align: middle">
                      <edit />
                    </el-icon>
                    <span style="vertical-align: middle;" @click="selectPositionSalaryByXzjbbh(scope.row.xzjbbh)">定薪</span>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-empty description="没有找到相关数据！" v-if="data2.isShow"/>
          </div>
        </div>

        <!-- 分页-->
        <div class="page-salary">
          <el-pagination background layout="prev, pager, next"
                         v-model:current-page="this.data2.pageNum"
                         v-model:page-size="this.data2.pageSize"
                         :total="data2.total"
                         @current-change="page2"  />
        </div>
      </div>


    </el-tab-pane>
  </el-tabs>


  <el-dialog
      v-model="dialogVisible"
      title="定薪"
      width="30%"
      :before-close="handleClose"
      :modal="Updateform"
  >
    <el-form-item label="基本工资" >
      <el-input v-model="Updateform.xzjbgz">
      </el-input>
    </el-form-item>

    <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">关闭</el-button>
              <el-button type="primary" @click="updatePositionSalaryByXzjbbh()">确定</el-button>
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
import {ElMessageBox} from "element-plus";
import {ElMessage} from "element-plus/es";
// 查询列表
var data=reactive({salary:[],pages:0,pageNum:1,pageSize:5,total:0,rzname:'',jbh:'',isShow:false,value:'first',zw:[]})
var data2=reactive({salary:[],pages:0,pageNum:1,pageSize:5,total:0,zwmc:'',jbh:'',isShow:false,value:'first'})

function handoff(TabsPaneContext,Event){
  if (TabsPaneContext.props.label=='薪资档案'){
    findAllBasePay()
  }else if (TabsPaneContext.props.label=='职位定薪'){
    findAllPositionSalary()
  }
}
onBeforeMount(()=>{
  axios.get("/findAllBasePay",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize}
  }).then(function (res){
    console.log(res.data.data)
    data.salary=res.data.data.list
    data.total=res.data.data.total

  }).catch(function (error){
    console.log(error)
  })
})
//查全部方法
function findAllBasePay(){
  axios.get("/findAllBasePay",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize}
  }).then(function (res){
    console.log(res.data.data)
    data.salary=res.data.data.list
    data.total=res.data.data.total
  }).catch(function (error){
    console.log(error)
  })
}

//查全部职位薪资
function findAllPositionSalary(){
  axios.get("/findAllPositionSalary",{
    params:{pageNum:data2.pageNum,pageSize:data2.pageSize}
  }).then(function (res){
    console.log(res.data.data)
    data2.salary=res.data.data.list
    data2.total=res.data.data.total

  }).catch(function (error){
    console.log(error)
  })
}
//分页
function page(pageNum){
  console.log(pageNum)
  axios.get("/findAllBasePay",{
    params:{pageNum:data.pageNum,pageSize: data.pageSize}
  }).then(function (res){
    data.total=res.data.data.total
    data.salary=res.data.data.list
  }).catch(function (error){
    console.log(error)
  })
}
//分页
function page2(pageNum){
  console.log(pageNum)
  axios.get("/findAllPositionSalary",{
    params:{pageNum:data2.pageNum,pageSize: data2.pageSize}
  }).then(function (res){
    data2.total=res.data.data.total
    data2.salary=res.data.data.list
  }).catch(function (error){
    console.log(error)
  })
}

//根据名称查员工--模糊查询
function findAllBasePayByName(){
  axios.get("/findAllBasePayByName",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize,rzname:data.rzname}
  }).then(function (res){
    console.log(res.data.data)
    data.salary=res.data.data.list
    data.total=res.data.data.total
    if(res.data.data.list.length==0){
      data.isShow=true
    }else {
      data.isShow=false
    }
  })
}

//根据职位名称查职位薪资--模糊查询
function findAllPositionSalaryByZwmc(){
  axios.get("/findAllPositionSalaryByZwmc",{
    params:{pageNum:data2.pageNum,pageSize:data2.pageSize,zwmc:data2.zwmc}
  }).then(function (res){
    console.log(res.data.data)
    data2.salary=res.data.data.list
    data2.total=res.data.data.total
    if(res.data.data.list.length==0){
      data2.isShow=true
    }else {
      data2.isShow=false
    }
  })
}



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
const Updateform=reactive({
  xzjbbh:'',
  xzjbgz:''
})
function selectPositionSalaryByXzjbbh(e){
  axios.get("/selectPositionSalaryByXzjbbh?xzjbbh="+e).then(function (res){
    console.log(res.data.data)
    Updateform.xzjbbh=res.data.data.xzjbbh
    Updateform.xzjbgz=res.data.data.xzjbgz
    dialogVisible.value=true
    console.log(Updateform)
  })
}

function updatePositionSalaryByXzjbbh(){
  axios.put("/updatePositionSalaryByXzjbbh",Updateform).then(function (res){
    console.log(res.data.data)
    Updateform.xzjbbh=res.data.data.xzjbbh
    Updateform.xzjbgz=res.data.data.xzjbgz
    open1()
    dialogVisible.value=false
    findAllPositionSalary()
  }).catch(function (error){
    console.log(error)
  })
}


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

//消息框
const open1 = () =>{
  ElMessage({
    message:'定薪成功!',
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
      findAllBasePayByName()
      findAllPositionSalaryByZwmc()
    }
  }
}
</script>

<style>
.big-salary{
  margin: 0px auto;
  width: 100%;
}
.big-salary2{
  width: 100%;
  height: 457px;
}
.btn-salary{
  margin-top: 10px;
  margin-left: -140px;
}
.btnSelect-salary{
  margin-left: 10px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
.page-salary{
  margin-top: 78px;
  margin-left: 560px;
}
</style>
