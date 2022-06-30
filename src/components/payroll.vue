<template>
  <div class="big-payroll">
    <div class="big-payroll2">


      <el-date-picker
          value-format="YYYY-MM"
          v-model="data.xzsj"
          type="month"
          @change="updateEmpInfoByMonth()"
          placeholder="请选择月份"
          style="margin-top: 20px;margin-bottom: 20px;margin-left: 0px"
      />
      <el-select   placeholder="请选择部门"  v-model="data.bmmc"  @change="bumenchauxnhmd" clearable style="margin-left: 20px">
      <el-option v-for="cc in data.bumen"  :value="cc.bmmc" :label="cc.bmmc" />
    </el-select>
      <el-input v-model="data.empName" placeholder="请输入员工姓名查询"  style="width: 200px;margin-left: 20px" @change="findPayrollByName"></el-input>


    <div>
        <!-- 表格-->
        <el-table :data="data.payroll" style="width: 100%">
<!--          <el-table-column prop="xzjlbh" label="序号" width="120" align="center" />-->
          <el-table-column prop="rzname" label="姓名" width="120" align="center" fixed="left" />
          <el-table-column prop="bmmc" label="部门" width="120" align="center" />
          <el-table-column prop="zwmc" label="职位" width="120" align="center" />
          <el-table-column prop="ygzt" label="员工状态" width="120" align="center" >
            <template #default="scope">
              {{scope.row.ygzt==2?"实习员工":"正式员工"}}
            </template>
          </el-table-column>
          <el-table-column prop="szjlsj" label="发放时间" width="120" align="center" />
          <el-table-column  label="基本工资" width="120" align="center" >
            <template #default="scope">
              <span>{{parseFloat(scope.row.xzjljbgz).toFixed(2)}}</span>
            </template>
          </el-table-column>

          <el-table-column  label="应出勤天数" width="120" align="center" >
            <template #default="scope" v-slot="scope">
              22
            </template>
          </el-table-column>
          <el-table-column prop="kqCount" label="实际出勤天数" width="120" align="center" />
          <el-table-column label="薪资要素项" width="120" align="center" >
            <template #default="scope">
              <span>{{parseFloat(scope.row.xzysje).toFixed(2)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖金" align="center" width="240">
            <el-table-column label="加班" align="center" width="120">
              <template #default="scope" v-slot="scope">
                0.00
              </template>
            </el-table-column>
            <el-table-column label="全勤" prop="quanqin" align="center" width="120">
              <template #default="scope">
                <span>{{parseFloat(scope.row.quanqin).toFixed(2)}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="应发工资" width="120" >
            <template #default="scope">
              <span>{{parseFloat(scope.row.yingfa).toFixed(2)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="社保缴费"   align="center" width="120">
            <template #default="scope">
              <span>-{{parseFloat(scope.row.sbje).toFixed(2)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="工资扣额" align="center" width="1080">
            <el-table-column label="迟到(次数)" prop="kqCount2" align="center" width="120"/>
            <el-table-column label="扣款（30%）" prop="chidao" align="center" width="120">
              <template #default="scope">
                <span>-{{parseFloat(scope.row.chidao).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="早退(次数)" prop="kqCount3" align="center" width="120"/>
            <el-table-column label="扣款(30%)" prop="zaotui" align="center" width="120">
              <template #default="scope">
                <span>-{{parseFloat(scope.row.zaotui).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="病假(天数)" prop="bingjia" align="center" width="120"/>
            <el-table-column label="扣款(20%)" prop="bingjiamoney" align="center" width="120">
              <template #default="scope">
                <span>-{{parseFloat(scope.row.bingjiamoney).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="事假(天数)" prop="shijia" align="center" width="120"/>
            <el-table-column label="扣款(100%)" prop="shijiamoney" align="center" width="120">
              <template #default="scope">
                <span>-{{parseFloat(scope.row.shijiamoney).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="个人所得税" prop="geshui" align="center" width="120">
              <template #default="scope">
                <span>-{{parseFloat(scope.row.geshui).toFixed(2)}}</span>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column align="center" label="实发工资" width="120" >
            <template #default="scope">
              <span>{{parseFloat(scope.row.shifa).toFixed(2)}}</span>
            </template>
          </el-table-column>
<!--          <el-table-column fixed="right" label="Operations" width="120">-->
<!--            <template #default>-->
<!--              <el-button link type="primary" size="small" @click="handleClick"-->
<!--              >Detail</el-button-->
<!--              >-->
<!--              <el-button link type="primary" size="small">Edit</el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
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
  num:[],
  pages:0,
  pageNum:1,
  pageSize:5,
  total:0,
  isShow:false,
  ycqt:22,
  xzsj:'',
  bmmc:'',
  bumen:'',
  empName:''
})

onBeforeMount(()=>{
  axios.get("/selectEmpInfo",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize}
  }).then(function (res){
    console.log(res.data.data)

    data.payroll=res.data.data.list
    data.total=res.data.data.total
    bumen()
  }).catch(function (err){
    console.log(err)
  })
})

function page(){
  axios.get("/selectEmpInfo",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize}
  }).then(function (res){
    console.log(res.data.data)

    data.payroll=res.data.data.list
    data.total=res.data.data.total
  }).catch(function (err){
    console.log(err)
  })
}

function selectEmpInfoByMonth(){
  axios.get("/selectEmpInfoByMonth",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize,szjlsj:data.xzsj}
  }).then(function (res){
    console.log(res.data.data)

    data.payroll=res.data.data.list
    data.total=res.data.data.total
    if(res.data.data.list.length==0){
      data.isShow=true
    }else {
      data.isShow=false
    }
  }).catch(function (err){
    console.log(err)
  })
}

function updateEmpInfoByMonth(){
  if (data.xzsj!=null){
    selectEmpInfoByMonth()
  } else{
    data.isShow=false
    axios.get("/selectEmpInfo",{
      params:{pageNum:data.pageNum,pageSize:data.pageSize}
    }).then(function (res){
      console.log(res.data.data)
      data.payroll=res.data.data.list
      data.total=res.data.data.total
    }).catch(function (err){
      console.log(err)
    })
  }
}


//部门
function bumen(){
  axios.get("/suoybumen").then(function (c){
    data.bumen=c.data.data;
  }).catch(function (error){
    console.log(error)
  })
}
//根据部门查询
function bumenchauxnhmd(){
  axios.get("/selectEmpInfoByBmmc",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize,bmmc:data.bmmc}
  }).then(function(response){
    data.payroll=response.data.data.list
    data.total=response.data.data.total
    if(response.data.data.list.length==0){
      data.isShow=true
    }else {
      data.isShow=false
    }
  })
}


function findPayrollByName(){
  axios.get("/selectEmpInfoByName",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize,rzname:data.empName}
  }).then(function(response){
    data.payroll=response.data.data.list
    data.total=response.data.data.total
    if(response.data.data.list.length==0){
      data.isShow=true
    }else {
      data.isShow=false
    }
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