<script setup>
//组合式api
import {
  Delete,
} from '@element-plus/icons-vue'
import {ElNotification} from 'element-plus'
import { ElMessageBox } from 'element-plus'
import {
  ref,
  reactive,
  onBeforeMount,
  inject
} from 'vue'
import axios from '../axios'


const dialogFormVisible = ref(false)
const dialogFormVisible2 = ref(false)
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
  zts:0,
  rzname:'',
  zs:0,
  bumen:'',
  bbbmmm:'',
  rzsexxx:''
})
function reload(){
  axios.get("/findwdg", {
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

//生命周期s
onBeforeMount(() => {
  axios.get("/findwdg", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function(response) {
    bumenn()
    console.log(response.data.data)
    data.users = response.data.data.list
    data.total = response.data.data.total
    console.log(data.users)
  }).catch(function(error) {

  })
})
//修改员工信息
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
//修改员工状态
const xiugairuzhi=(ybh)=>{
  ElMessageBox.confirm('是否确认报道?','提示',{
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:'warning'
  }).then(()=>{
    axios.get("/xgtgrz?yhb="+ybh).then(function(response){
      open1111()
      reload()
      console.log("7777777"+ybh);
      if(response.data.code!=200){
        alert('修改失败'+response.data.code)
        return
      }
    }).catch(function(error){
      return
    })
  })
}

// function xiugairuzhi(ybh){
//   axios.get("/xgtgrz?yhb="+ybh).then(function(response){
//     reload()
//     console.log("7777777"+ybh);
//     if(response.data.code!=200){
//       alert('修改失败'+response.data.code)
//       return
//     }
//   }).catch(function(error){
//     return
//   })
// }
function mohuchaxunyghmdxx(){
  axios.get("/mohuchaxunygwbd",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize,rzname:data.rzname,rzsex:data.rzsexxx}
  }).then(function(response){
    data.users=response.data.data.list
    data.total=response.data.data.total
    console.log(response.data.data.users)
  })
}
//模糊查询
// function mohuchaxunyghmd(){
//   if(data.rzname==""){
//   axios.get("/mohuchaxunygwbd",{
//   params:{pageNum:data.pageNum,pageSize:data.pageSize,rzname:data.rzname,rzsex:""}
// }).then(function(response){
//   data.users=response.data.data.list
//   data.total=response.data.data.total
//     data.rzsexxx=""
//   console.log(response.data.data.users)
// })
//   }else {
//     axios.get("/mohuchaxunygwbd",{
//       params:{pageNum:data.pageNum,pageSize:data.pageSize,rzname:data.rzname,rzsex:data.rzsexxx}
//     }).then(function(response){
//       data.users=response.data.data.list
//       data.total=response.data.data.total
//       console.log(response.data.data.users)
//     })
//   }
// }
//查询所有以及分页
function page() {
  if(data.bbbmmm!=""){
    axios.get("/bumenchauxwbd",{
      params:{pageNum:data.pageNum,pageSize:data.pageSize,bmmc:data.bbbmmm}

    }).then(function(response){
      data.users=response.data.data.list
      data.total=response.data.data.total

      //data.bumen=response.data.data
      console.log(response.data.data.users)
    })
  }else{
  axios.get("/findwdg", {
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
//根据id查询

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
        refresh()
      }
    })
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
const open1111 = () => {
  ElNotification({
    title: '报道',
    message: '报道成功',
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

//部门
function bumenn(){
  axios.get("/suoybumen").then(function (c){

    data.bumen=c.data.data;

  }).catch(function (error){
    console.log(error)
  })
}
//根据部门查询
function bumenchauxwbd(){
  axios.get("/bumenchauxwbd",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize,bmmc:data.bbbmmm}
  }).then(function(response){
    data.users=response.data.data.list
    data.total=response.data.data.total

  })
}
</script>
<template >

  <div>

    <br>

    <el-button style="position: relative;right: -166px;" @click="mohuchaxunyghmdxx">查询</el-button>
    <el-input v-model="data.rzname" placeholder="请输入姓名" clearable style="width: 200px;position: relative;right: 105px;" />

    <el-select v-model="data.rzsexxx"  @change="mohuchaxunyghmdxx" style="position: relative;right: 10px;"  placeholder="性别" clearable >
      <el-option label="男"  value="男" />
      <el-option label="女"   value="女" />

    </el-select>
    <span>部门:</span>  <el-select   placeholder="部门"  v-model="data.bbbmmm"  @change="bumenchauxwbd" clearable>
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


      <el-table-column  label="员工状态" >
        <template #default="scope">
          <span v-if="scope.row.ygzt==1">未到岗</span>
        </template>
      </el-table-column>
      <el-table-column  label="操作" >
        <template #default=scope v-slot="scope">
        <el-button size="20px" type="success" plain @click="xiugairuzhi(scope.row.ybh)">报道</el-button>
        </template>
      </el-table-column>
<!--      <el-table-column  label="操作" width="200">-->
<!--        <template #default=scope v-slot="scope">-->
<!--          &lt;!&ndash; 删除 &ndash;&gt;-->
<!--          <el-button type="primary" :icon="Delete" plain @click="del(scope.row.ybh),open1()" />-->
<!--          &lt;!&ndash;          <el-button size="20px"  type="success" @click="a(scope.row.ybh),dialogFormVisible=true" >编辑</el-button>&ndash;&gt;-->
<!--          <el-button size="20px" type="success" plain @click="dialogFormVisible=true,a(scope.row.rzbh)">查看</el-button>-->
<!--        </template>-->

<!--      </el-table-column>-->

    </el-table>
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
	  	<el-button type="primary" @click="dialogFormVisible = false,xiugai(cx),open()">确定</el-button>
	  	</span>

    </template>
  </el-dialog>
  <!-- 弹出新增弹窗 -->
  <el-dialog v-model="dialogFormVisible2" title="新增员工信息" :modal="insers">
    <el-form>
      <el-form-item label="员工状态" :label-width="formLabelWidth">
        <el-input v-model="insers.ygzt"/>
      </el-form-item>
      <el-form-item label="账号" :label-width="formLabelWidth">
        <el-input  v-model="insers.yzh"/>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="insers.ymm" show-password  maxlength="10"/>
      </el-form-item>
    </el-form>
    <template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible2 = false">关闭</el-button>
				<el-button type="primary" @click="dialogFormVisible2 = false,xinzeng(),open2()">确定</el-button>
			</span>

    </template>

  </el-dialog>
</template>

<style>

</style>
