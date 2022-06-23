<script lang="ts" setup>
//组合式api
import {
  Delete,
  Edit
} from '@element-plus/icons-vue'
import type { TabsPaneContext } from 'element-plus'
import {ElMessage, ElMessageBox} from 'element-plus'
import {ElNotification} from 'element-plus'



import {
  ref,
  reactive,
  onBeforeMount
} from 'vue'
import axios from '../axios'


const dialogFormVisible = ref(false)
const dialogFormVisible2 = ref(false)
const dialogFormVisible3 = ref(false)
const formLabelWidth = '140px'
//新增数组
const insers=reactive({
  ybh:'',
  bcbh:'',
  rzbh:'',
  zwbh:'',
  sbbh:'',
  ygzt:'',
  yzh:'',
  ymm:''
})
var data = reactive({
  users:[],//存入查询后端响应过来的数据
  total:0,//总页数
  pageNum:1,//当前显示页码
  pageSize:4,//每一页显示的条数
  cx:{}, //根据id传后端查询返回的值
  rzname:'',
  cx2:{},
  drawer:false,
  sssjj:'',
bumen:'',
  bbbmmm:'',
  yyggrzsj:'',
  rzsexxx:''
})
//生命周期s


onBeforeMount(() => {
  axios.get("/finduserssss", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }

  }).then(function(response) {
    console.log(response.data.data)
    data.users = response.data.data.list
    data.total = response.data.data.total
    bumenn()
    console.log(data.users)
  }).catch(function(error) {

  })
})
function mohuchaxunxxx(){
  axios.get("/mohuRenyygg",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize,rzname:data.rzname,rzsex:data.rzsexxx}
  }).then(function(response){
    data.users=response.data.data.list
    data.total=response.data.data.total
    console.log(response.data.data.users)
  })
}
// function mohuchaxun(){
//   if(data.rzname==""){
//   axios.get("/mohuRenyygg",{
//   params:{pageNum:data.pageNum,pageSize:data.pageSize,rzname:data.rzname,rzsex:""}
// }).then(function(response){
//   data.users=response.data.data.list
//   data.total=response.data.data.total
//     data.rzsexxx=""
//   console.log(response.data.data.users)
// })
//   }else {
//     axios.get("/mohuRenyygg",{
//       params:{pageNum:data.pageNum,pageSize:data.pageSize,rzname:data.rzname,rzsex:data.rzsexxx}
//     }).then(function(response){
//       data.users=response.data.data.list
//       data.total=response.data.data.total
//       console.log(response.data.data.users)
//     })
//   }
// }
function page() {
  axios.get("/finduserssss", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function(response) {
    data.total = response.data.data.total
    data.users = response.data.data.list
    console.log(data.users)
  }).catch(function(error) {
    console.log(error)
  })
}
//修改方法
function xiugai2(rzbh){
  axios.put("/user",data.cx2).then(function(response){
    reload()
    if(response.data.code!=200){
      alert('修改失败'+response.data.code)
      return
    }

  }).catch(function(error){

    return
  })
}
function cc(ybh){
  console.log("用户id99999999"+ybh)
  axios.get("/findcxid/"+ybh)
      //.then相当于ajax中的success:function成功回调函数
      .then(function(response){
        //获取后端传入的数据
        data.cx2=response.data.data//简单来说就是把修改后的数据重新赋值给data.cx对象
      })
}
function a(rzbh){
  console.log("用户id2222222222"+rzbh)
  axios.get("/selectidd/"+rzbh)
      //.then相当于ajax中的success:function成功回调函数
      .then(function(response){
        //获取后端传入的数据
        console.log(response)
        data.cx=response.data.data//简单来说就是把修改后的数据重新赋值给data.cx对象
      })
}
//删除
const del=(ybh)=>{
  ElMessageBox.confirm('是否确认删除?','提示',{
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:'warning'
  }).then(()=>{
    axios.post("/delete/"+ybh).then(function(response){
      if (response.data.code==200){
        console.log(response.data.data)
        open1()
        reload()
      }

    }).catch(function(error){

    })
  })
}

const ccc = ref(true)
function aa() {
  if(this.data.cx.rzname==""){
    ElMessage({
      message:'姓名不能为空',
      type:'warning',
    })
  }else if(this.data.cx.rzcsrq==""){
    ElMessage({
      message:'出生日期不能为空',
      type:'warning',
    })
  }else if(this.data.cx.rzsex==""){
    ElMessage({
      message:'性别不能为空',
      type:'warning',
    })
  }


  else if(this.data.cx.rzsfz==""){
    ElMessage({
      message:'身份证不能为空',
      type:'warning',
    })
  }
  else if(this.data.cx.rzphone==""){
    ElMessage({
      message:'联系电话不能为空',
      type:'warning',
    })
  }
  else if(this.data.cx.rzage==""){
    ElMessage({
      message:'年龄不能为空',
      type:'warning',
    })
  }
  else if(this.data.cx.rzdz==""){
    ElMessage({
      message:'现居地址不能为空',
      type:'warning',
    })
  }
  else if(this.data.cx.rzgzjl==""){
    ElMessage({
      message:'工作经历不能为空',
      type:'warning',
    })
  }
  else if(this.data.cx.rzhyzk==""){
    ElMessage({
      message:'婚姻状况不能为空',
      type:'warning',
    })
  }
  else if(this.data.cx.rzmz==""){
    ElMessage({
      message:'名族不能为空',
      type:'warning',
    })
  }



  else if(this.data.cx.gryx==""){
    ElMessage({
      message:'邮箱不能为空',
      type:'warning',
    })
  }
  else if(this.data.cx.rzzzmm==""){
    ElMessage({
      message:'名族不能为空',
      type:'warning',
    })
  }else{
    if (active.value++ > 0) active.value = 0
    if (xs.value++ > 0) {
      xs.value = 0;
      if (xs.value = 0) {
        ccc.value = false;
        dd.value = true;
      }
    }
  }
}
function bb() {
  if (active.value-- < 0) active.value = 0
  if (xs.value-- < 1) {
    xs.value = 0
    this.cc != this.cc;
  }
}

function ee() {


  dialogFormVisible.value = false;
  active.value=0;
  ccc.value = true;
  dd.value = false;
}


function dakai(){
  dialogFormVisible.value = true
  xs.value = 0;
}
const dd = ref(false)
const xs = ref(0)
const active = ref(0)
//修改方法
function xiugai(){
  axios.put("/updata",data.cx).then(function(response){
    open()
    xs.value=0;
    reload()
    if(response.data.code!=200){
      alert('修改失败'+response.data.code)
      return
    }

  }).catch(function(error){

    return
  })
}
//新增方法
function xinzeng(){
  axios.post("/adddept",insers).then(function(response){

    insers.ybh=response.data.users.ybh
    insers.bcbh=response.data.users.bcbh
    insers.rzbh=response.data.users.rzbh
    insers.zwbh=response.data.users.zwbh
    insers.sbbh=response.data.users.sbbh
    insers.ygzt=response.data.users.ygzt
    insers.yzh=response.data.users.yzh
    insers.ymm=response.data.users.ymm
    reload()
  }).catch(function(error) {
    console.log(Error)
  })
}


const form = reactive({

  delivery: false


})

const open = () => {
  ElNotification({
    title: '修改',
    message: '修改成功',
    type: 'success',
  })
}
const open1 = () => {
  ElNotification({
    title: '删除',
    message: '删除成功',
    type: 'success',
  })
}
const open2 = () => {
  ElNotification({
    title: '新增',
    message: '新增成功',
    type: 'success',
  })
}
function reload(){
  axios.get("/finduserssss", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data.users = response.data.data.list
    data.total = response.data.data.total
    console.log(data.users)
  }).catch(function(error) {

  })
}
function gengduo(ybh){

}
const drawer = ref(false)




var data6 = reactive({
  chuhcai: [],//存入查询后端响应过来的数据
  mianshi:[],
  jixiao:[],
  xinzi:[],
  kaoqin:[],
  Jixiao:[],
  total: 0,//总页数
  pageNum: 1,//当前显示页码
  pageSize: 4

})
//员工个人出差记录
function  chuchai2(ybh){
  axios.get("/chuchaijilu/"+ybh).then(function(response) {
    console.log(response.data.data)
    data6.chuhcai = response.data.data

  }).catch(function(error) {
    console.log(error)
  })
}
//员工个人面试记录
function  mianshijilu(ybh){
  axios.get("/mianshijilu/"+ybh).then(function(response) {
    data6.mianshi = response.data.data

  }).catch(function(error) {
    console.log(error)
  })
}
//员工个人绩效记录
function  jixiao(ybh){
  axios.get("/jixiaojilu/"+ybh).then(function(response) {
    data6.jixiao = response.data.data

  }).catch(function(error) {
    console.log(error)
  })
}
//员工个人考勤记录
function  kaoqin(ybh){
  axios.get("/kaoqinjilu/"+ybh).then(function(response) {
    data6.kaoqin = response.data.data

  }).catch(function(error) {
    console.log(error)
  })
}
//员工个人薪资记录
function  xinzi(ybh){
  axios.get("/findusersxinzi/"+ybh).then(function(response) {
    data6.xinzi = response.data.data

  }).catch(function(error) {
    console.log(error)
  })
}
const activeName = ref('first')
//部门
function bumenn(){
  axios.get("/suoybumen").then(function (c){

    data.bumen=c.data.data;

  }).catch(function (error){
    console.log(error)
  })
}
//根据部门查询
function bumenccxx(){
  console.log(data.bbbmmm)
  axios.get("/bumenccxx",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize,bmmc:data.bbbmmm}
  }).then(function(response){
    data.users=response.data.data.list
    data.total=response.data.data.total

    //data.bumen=response.data.data
    console.log(response.data.data.users)
  })
}
//根据入职时间查询
function  ruzhishij(){
  console.log(data.yyggrzsj)
  axios.get("/ruzhishijian",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize,ygrzsj:data.yyggrzsj}

  }).then(function(response){
    data.users=response.data.data.list
    data.total=response.data.data.total

    //data.bumen=response.data.data
    console.log(response.data.data.users)
  })
}
</script>
<template >

  <div>

    <br>
<!--    <el-button @click="dialogFormVisible2=true" style="position: relative;right: -710px;">新增</el-button>-->
    <span style="position: relative;right: 66px;" >入职时间:</span>&nbsp;
    <el-date-picker
        value-format="YYYY-MM-DD"
        v-model="data.yyggrzsj"
        @change="ruzhishij"
      type="date"
      style="position: relative;right: 66px;"

  />
    <el-button style="position: relative;right: -166px;" @click="mohuchaxunxxx">查询</el-button>
    <el-input v-model="data.rzname" placeholder="请输入姓名" clearable style="width: 200px;position: relative;right: 105px;" />
    <el-select v-model="data.rzsexxx"  @change="mohuchaxunxxx" style="position: relative;right: 10px;"   placeholder="性别" clearable>
      <el-option label="男"  value="男"  />
      <el-option label="女"   value="女" />

    </el-select>
    <span>部门:</span>  <el-select   placeholder="部门"  v-model="data.bbbmmm"  @change="bumenccxx" clearable>
        <el-option v-for="cc in data.bumen"  :value="cc.bmmc" :label="cc.bmmc" />
      </el-select>

  </div>
  <div>
    <!-- 员工展示 -->
    <el-table v-bind:data="data.users" style="width: 100%" height="400">
<!--      <el-table-column prop="ybh"   label="员工编号" />-->
      <el-table-column  type="index" label="序号" width="55" />
      <el-table-column prop="rzname" label="姓名" />
      <el-table-column prop="rzsex" label="性别" />
      <el-table-column prop="rzcsrq" label="出生日期" />
<!--      <el-table-column prop="rzhyzk" label="婚姻状况" />-->
      <el-table-column prop="rzzzmm" label="政治面貌" />
      <el-table-column prop="rzxl" label="学历" />
      <el-table-column prop="rzgzjl" label="工作经历" />
      <el-table-column prop="bmmc" label="部门" />
      <el-table-column prop="zwmc" label="职位" />
      <el-table-column prop="ygrzsj" label="入职时间" />
      <el-table-column  label="员工状态" >
        <template #default="scope">
          <span v-if="scope.row.ygzt==3">正式员工</span>
          <span v-else-if="scope.row.ygzt==2">实习员工</span>
          <span v-else-if="scope.row.ygzt==6">最强程序员</span>
        </template>
      </el-table-column>


            <el-table-column  label="操作" >
        <template #default=scope v-slot="scope">
          <el-button size="10px" type="success" plain @click="dialogFormVisible=true,a(scope.row.rzbh)">编辑</el-button>


          <!--          <el-button size="20px" type="success" plain @click="dialogFormVisible3=true,cc(scope.row.ybh)">编辑</el-button>-->
        </template>
      </el-table-column>
      <el-table-column  label="操作" width="200">

        <template #default=scope v-slot="scope">
          <!-- 更多 -->
          <el-button size="20px" type="success" plain style="margin-left: 16px" @click="drawer = true,chuchai2(scope.row.ybh),
   mianshijilu(scope.row.ybh),kaoqin(scope.row.ybh),xinzi(scope.row.ybh),jixiao(scope.row.ybh)
">
           更多
          </el-button>
          <el-button type="primary" :icon="Delete" plain @click="del(scope.row.ybh)" />
          <!--          <el-button size="20px"  type="success" @click="a(scope.row.ybh),dialogFormVisible=true" >编辑</el-button>-->
<!--          <el-button size="20px" type="success" plain @click="dialogFormVisible=true,a(scope.row.rzbh)">查看</el-button>-->
        </template>

      </el-table-column>

    </el-table>
    <el-dialog v-model="dialogFormVisible" title="编辑招聘者信息" width="70%">
      <el-form :model="data.cx">
        <div style="text-align: left">
          <el-steps :active="active" finish-status="success">
            <el-step title="基本信息"/>
            <el-step title="教育信息"/>

          </el-steps>
        </div>
        <div style=" width: 100%; height: 300px;" v-if='xs==0' >
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名:" prop="rzname">
                <el-input v-model="data.cx.rzname" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别" prop="rzsex">
                <el-radio-group v-model="data.cx.rzsex">
                  <el-radio label="男"/>
                  <el-radio label="女"/>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证:" prop="rzsfz">
                <el-input v-model="data.cx.rzsfz" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生日期" prop="rzcsrq">

                <el-date-picker
                    v-model="data.cx.rzcsrq"
                    type="date"

                    style="width: 200px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话:" prop="rzphone">
                <el-input v-model="data.cx.rzphone" style="width: 200px;" maxlength="11"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄:" prop="rzage">
                <el-input v-model="data.cx.rzage" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱:" prop="">
                <el-input v-model="data.cx.gryx" style="width: 200px;" clearable/>
              </el-form-item>

            </el-col>



            <el-col :span="8">
              <el-form-item label="工作经历:" prop="rzgzjl">
                <el-input v-model="data.cx.rzgzjl" style="width: 200px;"/>
              </el-form-item>
            </el-col>


            <el-col :span="8">
              <el-form-item label="婚姻状况:">
                <el-select v-model="data.cx.rzhyzk" placeholder="婚姻状况">
                  <el-option label="已婚" value="已婚"/>
                  <el-option label="未婚" value="未婚"/>
                  <el-option label="丧偶" value="丧偶"/>
                  <el-option label="离婚" value="离婚"/>
                </el-select>
              </el-form-item>
            </el-col>


            <el-col :span="8">
              <el-form-item label="政治面貌:">
                <el-select v-model="data.cx.rzzzmm" placeholder="政治面貌">
                  <el-option label="少先队员" value="少先队员"/>
                  <el-option label="共青团员" value="共青团员"/>
                  <el-option label="中共党员" value="中共党员"/>
                  <el-option label="群众" value="群众"/>
                </el-select>
              </el-form-item>
            </el-col>


            <el-col :span="8">
              <el-form-item label="名族:">
                <el-select v-model="data.cx.rzmz" placeholder="名族">
                  <el-option label="汉族" value="汉族"/>
                  <el-option label="壮族" value="壮族"/>
                  <el-option label="回族" value="回族"/>
                  <el-option label="满族" value="满族"/>
                  <el-option label="维吾尔族" value="维吾尔族"/>
                  <el-option label="苗族" value="苗族"/>
                  <el-option label="彝族" value="彝族"/>
                  <el-option label="土家族" value="土家族"/>
                  <el-option label="藏族" value="藏族"/>
                  <el-option label="蒙古族" value="蒙古族"/>
                  <el-option label="侗族" value="侗族"/>
                  <el-option label="布依族" value="布依族"/>
                  <el-option label="瑶族" value="瑶族"/>
                  <el-option label="白族" value="白族"/>
                  <el-option label="朝鲜族" value="朝鲜族"/>
                  <el-option label="哈尼族" value="哈尼族"/>
                  <el-option label="黎族" value="黎族"/>
                  <el-option label="哈萨克族" value="哈萨克族"/>
                  <el-option label="傣族" value="傣族"/>
                  <el-option label="畲族" value="畲族"/>
                  <el-option label="傈僳族" value="傈僳族"/>
                  <el-option label="东乡族" value="东乡族"/>
                  <el-option label="仡佬族" value="仡佬族"/>
                  <el-option label="拉祜族" value="拉祜族"/>
                  <el-option label="佤族" value="佤族"/>
                  <el-option label="水族" value="水族"/>
                  <el-option label="纳西族" value="纳西族"/>
                  <el-option label="羌族" value="羌族"/>
                  <el-option label="土族" value="土族"/>
                  <el-option label="仫佬族" value="仫佬族"/>
                  <el-option label="柯尔克孜族" value="柯尔克孜族"/>
                  <el-option label="锡伯族" value="锡伯族"/>
                  <el-option label="柯尔克孜族" value="柯尔克孜族"/>
                  <el-option label="达斡尔族" value="达斡尔族"/>
                  <el-option label="撒拉族" value="撒拉族"/>
                </el-select>
              </el-form-item>
            </el-col>


            <el-col :span="8">
              <el-form-item label="现居地址:" prop="rzdz">
                <el-input v-model="data.cx.rzdz" style="width: 200px;" type="textarea"/>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div style=" width: 100%; height: 200px;" v-if='xs==1'>
          <el-row>
            <el-col :span="8">
              <el-form-item label="学历:" prop="rzxl">
                <el-select v-model="data.cx.rzxl" placeholder="学历">
                  <el-option label="硕士" value="硕士" />
                  <el-option label="研究生" value="研究生" />
                  <el-option label="本科" value="本科" />
                  <el-option label="大专" value="大专" />
                  <el-option label="高中" value="高中" />
                  <el-option label="初中" value="初中" />
                  <el-option label="小学" value="小学" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="专业名称:" prop="">
                <el-input v-model="data.cx.zymc" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="毕业学校:">
                <el-input v-model="data.cx.byxy" style="width: 200px;" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入学时间" prop="rzcsrq">

                <el-date-picker
                    v-model="data.cx.rxsj"
                    type="date"

                    style="width: 200px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="毕业时间" prop="rzcsrq">

                <el-date-picker
                    v-model="data.cx.byssj"
                    type="date"

                    style="width: 200px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="一级学科:" prop="rzxl">
                <el-select v-model="data.cx.yijixk" placeholder="学科">
                  <el-option label="985工程大学" value="985工程大学" />
                  <el-option label="211工程大学" value="211工程大学" />
                  <el-option label="普通公办大学" value="普通公办大学" />
                  <el-option label="民办院校" value="民办院校" />
                  <el-option label="海外院校" value="海外院校" />

                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学校性质:">
                <el-input v-model="data.cx.xxxz" style="width: 200px;" clearable/>

              </el-form-item>
            </el-col>
          </el-row>

        </div>
        <el-button style="margin-top: 12px" @click="ee(),xiugai(cx)" v-show="ccc" v-if="active==1">确认</el-button>
        <el-button style="margin-top: 12px" @click="aa()" v-show="ccc" v-if="active==0">下一步</el-button>
        <el-button style="margin-top: 12px" @click="bb()" v-show="ccc" >上一步</el-button>
      </el-form>
    </el-dialog>

    <el-drawer v-model="drawer" title="I am the title" :with-header="false"  size="60%">
      <span>员工个人记录</span>
      <div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="tym">
        <el-tab-pane label="出差记录" name="first">
          <div>
            <el-table :data="data6.chuhcai" height="350" style="width: 100%">
              <el-table-column prop="ybh" label="编号"  />
              <el-table-column prop="rzname" label="姓名"  />
              <el-table-column prop="rzsex" label="性别"  />s
              <el-table-column prop="ccfd" label="出发地"  />
              <el-table-column prop="cmdd" label="目的地"  />
              <el-table-column prop="ckssj" label="开始时间"  />
              <el-table-column prop="cyjsj" label="预计回来时间"  />
              <el-table-column prop="csjsj" label="实际回来时间"  />
              <el-table-column prop="cccnr" label="出差内容"  />
              <el-table-column  label="状态" >
                <template #default="scope">
                  <span v-if="scope.row.czt==1">未出发</span>
                  <span v-else-if="scope.row.czt==2">出差中</span>
                  <span v-else-if="scope.row.czt==3">已回来</span>
                </template>
              </el-table-column>

            </el-table>
          </div>

        </el-tab-pane>
        <el-tab-pane label="考勤记录" name="second">
          <div>
            <el-table :data="data6.kaoqin" height="350" style="width: 100%">
              <el-table-column prop="ybh" label="编号"  />
              <el-table-column prop="rzname" label="姓名"  />
              <el-table-column prop="rzsex" label="性别"  />
              <el-table-column prop="kqsbdksj" label="上班打卡时间"  />
              <el-table-column  label="上班打卡状态" >
                <template #default="scope">
                  <span v-if="scope.row.kqsbzt==1">正常</span>
                  <span v-else-if="scope.row.kqsbzt==2">迟到</span>
                  <span v-else-if="scope.row.kqsbzt==3">早退</span>
                  <span v-else-if="scope.row.kqsbzt==4">未打卡</span>
                </template>
              </el-table-column>
              <el-table-column prop="kqxbdksj" label="下班打卡时间"  />
              <el-table-column  label="下班打卡状态" >
                <template #default="scope">
                  <span v-if="scope.row.kqxbzt==1">正常</span>
                  <span v-else-if="scope.row.kqxbzt==2">迟到</span>
                  <span v-else-if="scope.row.kqxbzt==3">早退</span>
                  <span v-else-if="scope.row.kqxbzt==4">未打卡</span>
                </template>
              </el-table-column>
              <el-table-column prop="xzsj" label="时间"  />

            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="面试记录" name="third">
          <div>
            <el-table :data="data6.mianshi" height="350" style="width: 100%">
              <el-table-column prop="rid" label="编号"  />
              <el-table-column prop="rzname" label="姓名"  />
              <el-table-column prop="rzsex" label="性别"  />
              <el-table-column prop="mjsj" label="面试时间"  />
              <el-table-column  label="状态" >
                <template #default="scope">
                  <span v-if="scope.row.mjzt==1">通过</span>
                  <span v-else-if="scope.row.mjzt==2">未通过</span>
                  <span v-else-if="scope.row.mjzt==3">未面试</span>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="绩效记录" name="fourth">
          <div>
            <el-table :data="data6.jixiao" height="350" style="width: 100%">
              <el-table-column prop="ybh" label="编号"  />
              <el-table-column prop="rzname" label="姓名"  />
              <el-table-column prop="rzsex" label="性别"  />s
              <el-table-column prop="jnr" label="绩效内容"  />
              <el-table-column prop="jmc" label="绩效考核名称"  />

            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="薪资记录" name="lll">
          <div>
            <el-table :data="data6.xinzi" height="350" style="width: 100%">
              <el-table-column prop="ybh" label="编号"  />
              <el-table-column prop="rzname" label="姓名"  />
              <el-table-column prop="zwmc" label="职位"  />
              <el-table-column prop="bmmc" label="部门"  />
              <el-table-column prop="xzjbgz" label="基本工资"  />
              <el-table-column prop="ygrzsj" label="入职时间"  />

            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
      </div>
    </el-drawer>
<!--    编辑员工-->
    <el-dialog v-model="dialogFormVisible3" title="编辑员工信息" :modal="data.cx2">
      <el-form>
        <el-form-item label="员工状态:">
          <el-select v-model="data.cx2.ygzt" placeholder="员工状态">
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
            <el-option label="4" value="4" />
            <el-option label="5" value="5" />
          </el-select>
        </el-form-item>

        <!--        <el-form-item label="账号" :label-width="formLabelWidth">-->
<!--          <el-input  v-model="insers.yzh"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="密码" :label-width="formLabelWidth">-->
<!--          <el-input v-model="insers.ymm" show-password  maxlength="10"/>-->
<!--        </el-form-item>-->
      </el-form>
      <template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible3 = false">关闭</el-button>
				<el-button type="primary" @click="dialogFormVisible3 = false,open(),reload(),xiugai2(cx2)">确定</el-button>
			</span>

      </template>

    </el-dialog>

<!--分页 -->
    <el-pagination style="position: relative;right: -490px;" v-model:currentPage="this.data.pageNum"
                   v-model:page-size="this.data.pageSize" layout="prev,pager,next" :total="this.data.total"
                   @current-change="page" prev-text="上一页" next-text="下一页" />
  </div>



</template>

<style>

</style>
