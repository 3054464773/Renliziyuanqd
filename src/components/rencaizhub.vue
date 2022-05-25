<script  setup>

import {
  ref,
  reactive,
  onBeforeMount,
  inject
} from 'vue'
import axios from '../axios'
import {ElNotification} from "element-plus"


const open = () => {
  ElNotification({
    title: '修改',
    message: '修改成功',
    type: 'success',
  })
}



const dialogFormVisible2 = ref(false)
const dialogFormVisible = ref(false)

var data = reactive({
  Recruit: [],//存入查询后端响应过来的数据
  total: 0,//总页数
  pageNum: 1,//当前显示页码
  pageSize: 4,//每一页显示的条数
  cx:{}, //根据id传后端查询返回的值
  zts:0,
  rzname:'',
  zs:0,
  isShow2:false
})
const insers=reactive({
  rzbh:'',
  rzname:'',
  rzsex:'',
  rzcsrq:'',
  rzage:'',
  rzxl:'',
  rzsfz:'',
  rzphone:'',
  rzdz:'',
  rzgzjl:'',
  rzhyzk:'',
  rzmz:'',
  rzzzmm:'',
  rzt:'',
  rsj:'',
  rsf:'',
  ybh:'',
  mmc:'',
  rid:'',
  mzbh:''
})
function reload(){
  axios.get("/selectMsss", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data.Recruit = response.data.data.list
    data.total = response.data.data.total
    console.log(data.Recruit)
  }).catch(function(error) {

  })
}

onBeforeMount(() => {
  axios.get("/selectMsss", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data.Recruit)
    data.Recruit = response.data.data.list
    data.total = response.data.data.total
    console.log(data.Recruit)
  }).catch(function(error) {
    console.log(error)
  })
})
function page() {
  axios.get("/selectMsss", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function(response) {
    data.total = response.data.data.total
    data.Recruit = response.data.data.list
    console.log(data.users)
  }).catch(function(error) {
    console.log(error)
  })
}
//查询id为x的这条数据
function b(rzbh){
  console.log("用户id2222222222"+rzbh)
  axios.get("/selectid/"+rzbh)
      //.then相当于ajax中的success:function成功回调函数
      .then(function(response){
        //获取后端传入的数据
        data.Recruit=response.data.data//简单来说就是把查到后的数据重新赋值给data.Recruit
      })
}
//根据id查询，将这条数据显示在修改页面中
function a(rzbh){
  console.log("用户id2222222222"+rzbh)
  axios.get("/selectidd/"+rzbh)
      //.then相当于ajax中的success:function成功回调函数
      .then(function(response){
        //获取后端传入的数据
        data.cx=response.data.data//简单来说就是把修改后的数据重新赋值给data.cx对象
      })
}
//修改
function xiugai(rzbh){
  axios.put("/updata",data.cx).then(function(response){
    reload()
    if(response.data.code!=200){
      alert('修改失败'+response.data.code)
      return
    }
  }).catch(function(error){
    return
  })
}
//根据id删除
function delRe(rzbh){
  console.log(rzbh)
  axios.post("/delecte/"+rzbh).then(function(response){
    reload()
  }).catch(function(error){
    alert("删除失败")
    return
  })
}
//修改面试状态
//修改员工状态
function xiugairuzhi(rid){
  axios.get("/xgmsztt?rid="+rid).then(function(response){
    reload()
    console.log("7777777"+rid);
    if(response.data.code!=200){
      alert('修改失败'+response.data.code)
      return
    }
  }).catch(function(error){
    return
  })
}
//入职员工

function ruzhiyg(a){
  axios.post("/ruzhiyg",a).then(function(response){

    reload()
  }).catch(function(error) {
    console.log(Error)
  })
}
//面试记录新增
function insetmsjl(e){
  axios.post("/insetmsjl",e).then(function(response){

    reload()
  }).catch(function(error) {
    console.log(Error)
  })
}
//面试记录淘汰
function insetmsjlmg(y){
  axios.post("/insetmsjlmg",y).then(function(response){

    reload()
  }).catch(function(error) {
    console.log(Error)
  })
}

function mohuchaxun(){
  axios.get("/mohudiyci?rzname="+data.rzname).then(function(response){
    data.Recruit=response.data.data
    console.log(response.data.data.Recruit)
  })
}

</script>
<template>
  <br>
  <el-button style="position: relative;right: -166px;" @click="mohuchaxun()">查询</el-button>
  <el-input v-model="data.rzname" placeholder="请输入姓名" clearable style="width: 200px;position: relative;right: 105px;" />
  <div>

    <el-table :data="data.Recruit" style="width: 100%" height="400">
      <el-table-column prop="rzbh" label="人才id" />
      <el-table-column prop="rzname" label="姓名" />
      <el-table-column prop="rzsex" label="性别" />
<!--      <el-table-column prop="rzcsrq" label="出生日期" />-->
<!--      <el-table-column prop="rzage" label="年龄" />-->
      <el-table-column prop="rzxl" label="学历" />
<!--      <el-table-column prop="rzmz" label="名族" />-->
      <el-table-column prop="rzzzmm" label="政治面貌" />
      <el-table-column prop="mmc" label="职位" />
<!--      <el-table-column prop="ybh"  label="提问人" />-->
      <el-table-column prop="mzwt" label="面试问题" />
      <el-table-column prop="mjsj" label="面试时间" />
<!--      <el-table-column prop="rzt"  label="状态" />-->
      <el-table-column label="操作" >
        <template #default=scope v-slot="scope">
          <el-button size="10px" type="success" plain @click="dialogFormVisible=true,a(scope.row.rzbh)">查看</el-button><!--          查看招聘者个人信息以及修改-->
        </template>
      </el-table-column>
      <el-table-column label="操作"  width="200">
        <template #default=scope v-slot="scope">
          <el-button size="10px" type="success" plain  @click="insetmsjlmg(scope.row),xiugairuzhi(scope.row.rid)">拒绝</el-button><!-- 删除 -->
          <el-button size="10px" type="success" plain  @click="insetmsjl(scope.row),ruzhiyg(scope.row),xiugairuzhi(scope.row.rid)">通过</el-button>

        </template>

      </el-table-column>
      <el-empty description="没有找到相关数据！" v-if="data.isShow2"/>
    </el-table>
    <el-pagination style="position: relative;right: -520px;" v-model:currentPage="this.data.pageNum"
                   v-model:page-size="this.data.pageSize" layout="prev,pager,next" :total="this.data.total"
                   @current-change="page" prev-text="上一页" next-text="下一页" />
  </div>

  <el-dialog v-model="dialogFormVisible2" title="新增招聘者信息" >
    <el-form    :model="insert" >
      <el-row>
        <el-col :span="11">
          <el-form-item label="姓名:" prop="rzname">
            <el-input v-model="insers.rzname" style="width: 200px;" clearable/>
          </el-form-item>
        </el-col>
        <el-form-item label="性别">
          <el-radio-group v-model="insers.rzsex">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>


        <el-form-item label="出生日期">
          <el-col :span="14">
            <el-date-picker
                v-model="insers.rzcsrq"
                type="date"
                style="width: 200px"
            />
          </el-col>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </el-form-item>
        <el-form-item label="学历:">
          <el-select v-model="insers.rzxl" placeholder="学历">
            <el-option label="硕士" value="硕士" />
            <el-option label="研究生" value="研究生" />
            <el-option label="本科" value="本科" />
            <el-option label="大专" value="大专" />
            <el-option label="高中" value="高中" />
            <el-option label="初中" value="初中" />
            <el-option label="小学" value="小学" />
          </el-select>
        </el-form-item>


        <el-col :span="11">
          <el-form-item label="身份证:">
            <el-input v-model="insers.rzsfz" style="width: 200px;" clearable/>
          </el-form-item>
        </el-col>
        <el-form-item label="联系电话:">
          <el-input v-model="insers.rzphone" style="width: 200px;"  maxlength="11"/>
        </el-form-item>

        <el-col :span="11">
          <el-form-item label="年龄:">
            <el-input v-model="insers.rzage" style="width: 200px;" clearable/>
          </el-form-item>
        </el-col>
        <el-form-item label="现居地址:">
          <el-input v-model="insers.rzdz" style="width: 200px;" type="textarea" />
        </el-form-item>

        <el-col :span="11">
          <el-form-item label="工作经验:">
            <el-input v-model="insers.rzgzjl" style="width: 200px;"/>
          </el-form-item>
        </el-col>
        <el-form-item label="婚姻状况:">
          <el-select v-model="insers.rzhyzk" placeholder="婚姻状况">
            <el-option label="已婚" value="已婚" />
            <el-option label="未婚" value="未婚" />
            <el-option label="丧偶" value="丧偶" />
            <el-option label="离婚" value="离婚" />
          </el-select>
        </el-form-item>

        <el-col :span="11">
          <el-form-item label="政治面貌:">
            <el-select v-model="insers.rzzzmm" placeholder="政治面貌">
              <el-option label="少先队员" value="少先队员" />
              <el-option label="共青团员" value="共青团员" />
              <el-option label="中共党员" value="中共党员" />
              <el-option label="群众" value="群众" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-form-item label="名族:">
          <el-select v-model="insers.rzmz" placeholder="名族">
            <el-option label="汉族" value="汉族" />
            <el-option label="壮族" value="壮族" />
            <el-option label="回族" value="回族" />
            <el-option label="满族" value="满族" />
            <el-option label="维吾尔族" value="维吾尔族" />
            <el-option label="苗族" value="苗族" />
            <el-option label="彝族" value="彝族" />
            <el-option label="土家族" value="土家族" />
            <el-option label="藏族" value="藏族" />
            <el-option label="蒙古族" value="蒙古族" />
            <el-option label="侗族" value="侗族" />
            <el-option label="布依族" value="布依族" />
            <el-option label="瑶族" value="瑶族" />
            <el-option label="白族" value="白族" />
            <el-option label="朝鲜族" value="朝鲜族" />
            <el-option label="哈尼族" value="哈尼族" />
            <el-option label="黎族" value="黎族" />
            <el-option label="哈萨克族" value="哈萨克族" />
            <el-option label="傣族" value="傣族" />
            <el-option label="畲族" value="畲族" />
            <el-option label="傈僳族" value="傈僳族" />
            <el-option label="东乡族" value="东乡族" />
            <el-option label="仡佬族" value="仡佬族" />
            <el-option label="拉祜族" value="拉祜族" />
            <el-option label="佤族" value="佤族" />
            <el-option label="水族" value="水族" />
            <el-option label="纳西族" value="纳西族" />
            <el-option label="羌族" value="羌族" />
            <el-option label="土族" value="土族" />
            <el-option label="仫佬族" value="仫佬族" />
            <el-option label="柯尔克孜族" value="柯尔克孜族" />
            <el-option label="锡伯族" value="锡伯族" />
            <el-option label="柯尔克孜族" value="柯尔克孜族" />
            <el-option label="达斡尔族" value="达斡尔族" />
            <el-option label="撒拉族" value="撒拉族" />
          </el-select>
        </el-form-item>

      </el-row>
    </el-form>
    <template #footer>
	  	<span class="dialog-footer">
	  		<el-button @click="dialogFormVisible2 = false">关闭</el-button>
	  		<el-button type="primary" @click="dialogFormVisible2 = false,xinzeng()">确定</el-button>
	  	</span>

    </template>
  </el-dialog>
  <el-dialog v-model="dialogFormVisible" title="查看招聘者信息" >
    <el-form :model="data.cx" >
      <el-row>
        <el-col :span="11">
          <el-form-item label="姓名:">
            <el-input v-model="data.cx.rzname" style="width: 200px;" clearable/>
          </el-form-item>
        </el-col>
        <el-form-item label="性别">
          <el-radio-group v-model="data.cx.rzsex">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>


        <el-form-item label="出生日期">
          <el-col :span="14">
            <el-date-picker
                v-model="data.cx.rzcsrq"
                type="date"
                style="width: 200px"
            />
          </el-col>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </el-form-item>
        <el-form-item label="学历:">
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


        <el-col :span="11">
          <el-form-item label="身份证:">
            <el-input v-model="data.cx.rzsfz" style="width: 200px;" clearable/>
          </el-form-item>
        </el-col>
        <el-form-item label="联系电话:">
          <el-input v-model="data.cx.rzphone" style="width: 200px;" clearable/>
        </el-form-item>

        <el-col :span="11">
          <el-form-item label="年龄:">
            <el-input v-model="data.cx.rzage" style="width: 200px;" clearable/>
          </el-form-item>
        </el-col>
        <el-form-item label="现居地址:">
          <el-input v-model="data.cx.rzdz" style="width: 200px;" type="textarea" />
        </el-form-item>

        <el-col :span="11">
          <el-form-item label="工作经验:">
            <el-input v-model="data.cx.rzgzjl" style="width: 200px;"/>
          </el-form-item>
        </el-col>
        <el-form-item label="婚姻状况:">
          <el-select v-model="data.cx.rzhyzk" placeholder="婚姻状况">
            <el-option label="已婚" value="已婚" />
            <el-option label="未婚" value="未婚" />
            <el-option label="丧偶" value="丧偶" />
            <el-option label="离婚" value="离婚" />
          </el-select>
        </el-form-item>

        <el-col :span="11">
          <el-form-item label="政治面貌:">
            <el-select v-model="data.cx.rzzzmm" placeholder="政治面貌">
              <el-option label="少先队员" value="少先队员" />
              <el-option label="共青团员" value="共青团员" />
              <el-option label="中共党员" value="中共党员" />
              <el-option label="群众" value="群众" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-form-item label="名族:">
          <el-select v-model="data.cx.rzmz" placeholder="名族">
            <el-option label="汉族" value="汉族" />
            <el-option label="壮族" value="壮族" />
            <el-option label="回族" value="回族" />
            <el-option label="满族" value="满族" />
            <el-option label="维吾尔族" value="维吾尔族" />
            <el-option label="苗族" value="苗族" />
            <el-option label="彝族" value="彝族" />
            <el-option label="土家族" value="土家族" />
            <el-option label="藏族" value="藏族" />
            <el-option label="蒙古族" value="蒙古族" />
            <el-option label="侗族" value="侗族" />
            <el-option label="布依族" value="布依族" />
            <el-option label="瑶族" value="瑶族" />
            <el-option label="白族" value="白族" />
            <el-option label="朝鲜族" value="朝鲜族" />
            <el-option label="哈尼族" value="哈尼族" />
            <el-option label="黎族" value="黎族" />
            <el-option label="哈萨克族" value="哈萨克族" />
            <el-option label="傣族" value="傣族" />
            <el-option label="畲族" value="畲族" />
            <el-option label="傈僳族" value="傈僳族" />
            <el-option label="东乡族" value="东乡族" />
            <el-option label="仡佬族" value="仡佬族" />
            <el-option label="拉祜族" value="拉祜族" />
            <el-option label="佤族" value="佤族" />
            <el-option label="水族" value="水族" />
            <el-option label="纳西族" value="纳西族" />
            <el-option label="羌族" value="羌族" />
            <el-option label="土族" value="土族" />
            <el-option label="仫佬族" value="仫佬族" />
            <el-option label="柯尔克孜族" value="柯尔克孜族" />
            <el-option label="锡伯族" value="锡伯族" />
            <el-option label="柯尔克孜族" value="柯尔克孜族" />
            <el-option label="达斡尔族" value="达斡尔族" />
            <el-option label="撒拉族" value="撒拉族" />
          </el-select>
        </el-form-item>

      </el-row>
    </el-form>
    <template #footer>
	  	<span class="dialog-footer">
	  		<el-button @click="dialogFormVisible = false">关闭</el-button>
	  		<el-button type="primary" @click="dialogFormVisible = false,xiugai(cx),open()">确定</el-button>
	  	</span>

    </template>
  </el-dialog>
</template>
<style>
</style>
