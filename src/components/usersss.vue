<script setup>
//组合式api
import {
  Delete,
  Edit
} from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import {ElNotification} from 'element-plus'

import {
  ref,
  reactive,
  onBeforeMount,
  inject
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
  cx2:{}
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
    console.log(data.users)
  }).catch(function(error) {

  })
})
function mohuchaxun(){
  axios.get("/mohuRenyygg?rzname="+data.rzname).then(function(response){
    data.users=response.data.data
    console.log(response.data.data.users)
  })
}
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
        data.cx=response.data.data//简单来说就是把修改后的数据重新赋值给data.cx对象
      })
}
const del=(ybh)=>{
  ElMessageBox.confirm('是否确认删除?','提示',{
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:'warning'
  }).then(()=>{
    axios.post("/delete/"+ybh).then(function(response){
      reload()
    }).catch(function(error){
      if (response.data.code==200){
        console.log(response.data.data)
        open1()
      }
    })
  })
}


//修改方法
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

</script>
<template >

  <div>

    <br>
    <el-button @click="dialogFormVisible2=true" style="position: relative;right: -710px;">新增</el-button>

    <el-button style="position: relative;right: -166px;" @click="mohuchaxun">查询</el-button>
    <el-input v-model="data.rzname" placeholder="请输入姓名" clearable style="width: 200px;position: relative;right: 105px;" />
  </div>
  <div>
    <!-- 员工展示 -->
    <el-table v-bind:data="data.users" style="width: 100%" height="400">
      <el-table-column prop="ybh"   label="员工编号" />
      <el-table-column prop="rzname" label="姓名" />
      <el-table-column prop="rzsex" label="性别" />
      <el-table-column prop="rzcsrq" label="出生日期" />
      <el-table-column prop="rzhyzk" label="婚姻状况" />
      <el-table-column prop="rzzzmm" label="政治面貌" />
      <el-table-column prop="rzxl" label="学历" />
      <el-table-column prop="rzgzjl" label="工作经历" />
      <el-table-column  label="员工状态" >
        <template #default="scope">
          <span v-if="scope.row.ygzt==3">正式员工</span>
          <span v-else-if="scope.row.ygzt==2">实习员工</span>
        </template>
      </el-table-column>
      <el-table-column  label="操作" >
        <template #default=scope v-slot="scope">
          <el-button size="20px" type="success" plain @click="dialogFormVisible3=true,cc(scope.row.ybh)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column  label="操作" width="200">

        <template #default=scope v-slot="scope">
          <!-- 删除 -->

          <el-button type="primary" :icon="Delete" plain @click="del(scope.row.ybh)" />
          <!--          <el-button size="20px"  type="success" @click="a(scope.row.ybh),dialogFormVisible=true" >编辑</el-button>-->
          <el-button size="20px" type="success" plain @click="dialogFormVisible=true,a(scope.row.rzbh)">查看</el-button>
        </template>

      </el-table-column>

    </el-table>
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

  <!-- 弹出的修改页面 -->
  <el-dialog v-model="dialogFormVisible" title="查看员工信息" >
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
	  		<el-button type="primary" @click="dialogFormVisible = false,xiugai(cx),open(),reload()">确定</el-button>
	  	</span>

    </template>
  </el-dialog>
  <!-- 弹出新增弹窗 -->
  <el-dialog v-model="dialogFormVisible2" title="新增员工信息" :modal="insers">
    <el-form>

      <el-form-item label="员工状态:" :label-width="formLabelWidth">
        <el-select v-model="insers.ygzt" placeholder="员工状态"  >
          <el-option label="黑名单" value="黑名单" />
          <el-option label="实习" value="实习" />
          <el-option label="正式员工" value="正式员工" />
          <el-option label="离职" value="离职" />
        </el-select>
      </el-form-item>
      <el-form-item label="账号" :label-width="formLabelWidth">
        <el-input  v-model="insers.yzh"/>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="insers.ymm" show-password  maxlength="10"/>
      </el-form-item>
      <el-form-item label="人才子表编号" :label-width="formLabelWidth">
        <el-input  v-model="insers.rzbh"/>
      </el-form-item>
      <el-form-item label="职位表id" :label-width="formLabelWidth">
        <el-input v-model="insers.zwbh" show-password  maxlength="10"/>
      </el-form-item>
      <el-form-item label="班次表编号" :label-width="formLabelWidth">
        <el-input  v-model="insers.bcbh"/>
      </el-form-item>
      <el-form-item label="社保方案编号" :label-width="formLabelWidth">
        <el-input v-model="insers.sbbh" show-password  maxlength="10"/>
      </el-form-item>
    </el-form>
    <template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible2 = false">关闭</el-button>
				<el-button type="primary" @click="dialogFormVisible2 = false,xinzeng(),open2(),reload()">确定</el-button>
			</span>

    </template>

  </el-dialog>
</template>

<style>

</style>
