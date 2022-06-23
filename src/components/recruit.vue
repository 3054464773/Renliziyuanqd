<script lang="ts" setup>
	import {
		Delete,
		Edit
	} from '@element-plus/icons-vue'
  import type {FormRules} from 'element-plus'
  import {
    ref,
    reactive,
    onBeforeMount
  } from 'vue'
  import { Plus } from '@element-plus/icons-vue'

  import type { UploadProps } from 'element-plus'

  const imageUrl = ref('')

	import axios from '../axios'
  import {ElMessage, ElNotification} from "element-plus"
  import type { ElTable } from 'element-plus'

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



  const ruleFormRef = ref<FormInstance>()
  const formSize = ref('default')
	const  dialogFormVisible2 = ref(false)
  const dialogFormVisible = ref(false)
  const dialogTableVisible666 = ref(false)
  //获取页面展示的值和弹窗里的值
  function  tanchuang(data){
    dialogTableVisible666.value=true;
    insers2.rid=data.rid
    insers2.zwbh=data.zwbh;

  }
	var data = reactive({
			Recruit: [],//存入查询后端响应过来的数据
			total: 0,//总页数
			pageNum: 1,//当前显示页码
			pageSize: 4,//每一页显示的条数
			cx:{}, //根据id传后端查询返回的值
    cx2:[],
      zts:0,

      zs:0,
    zhiweiname:'',
    rzname:'',
    maishiguany:''


	})
		// const insers=reactive({
    //   rzbh:'',
    //   rzname:'',
    //   rzsex:'',
    //   rzcsrq:'',
    //   rzage:'',
    //   rzxl:'',
    //   rzsfz:'',
    //   rzphone:'',
    //   rzdz:'',
    //   rzgzjl:'',
    //   rzhyzk:'',
    //   rzmz:'',
    //   rzzzmm:''
    // })
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
    zwbh:'',
    img:'',
    gryx:'',
    byxy:'',
    zymc:'',
    yijixk:'',
    xxxz:'',
    byssj:'',
    rxsj:''
  })
  const insers2=reactive({
     mjsj:"",
    ybh:"",
    zwbh:"",
    rid:""
  })
//面试问题
  function mianshiwenti(){
    dialogTableVisible666 .value= false
    // dialogTableVisible666.value=true,

    axios.get("/mianshiwenti/"+insers2.zwbh+"/"+insers2.rid+"/"+insers2.ybh+"/"+insers2.mjsj)
        //.then相当于ajax中的success:function成功回调函数
        .then(function(response){
          insers2.ybh=""
          insers2.mjsj=""
          insers2.rid=""
          insers2.zwbh=""
          //获取后端传入的数据
          console.log(response)

          console.log(data.cx2)
        })
  }
  //刷新
  function reload(){
    axios.get("/selectMs", {
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
  //生命周期
	onBeforeMount(() => {
		axios.get("/selectMs", {
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
			console.log(error)
		})
	})
	function page() {
		axios.get("/selectMs", {
			params: {
				pageNum: data.pageNum,
				pageSize: data.pageSize
			}
		}).then(function(response) {
			data.total = response.data.data.total
			data.Recruit = response.data.data.list
			console.log(data.Recruit)
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
  //根据id删除
  const del=(rzbh)=>{
    ElMessageBox.confirm('是否确认删除?','提示',{
      confirmButtonText:'确定',
      cancelButtonText:'取消',
      type:'warning'
    }).then(()=>{
      axios.post("/delecte/"+rzbh).then(function(response){
        if (response.data.code==200){
          console.log(response.data.data)
          open1()
          reload()
        }

      }).catch(function(error){

      })
    })
  }
    import { ElMessageBox } from 'element-plus'
  import {FormInstance} from "element-plus/es";
  //修改员工状态
  function xiugairuzhi(){
    axios.get("/xgmszt/"+insers2.rid).then(function(response){
      reload()
      console.log("7777777"+insers2.rid);
      if(response.data.code!=200){
        alert('修改失败'+response.data.code)
        return
      }
    }).catch(function(error){
      return
    })
  }
  const open100 = () => {
    ElNotification({
      title: '新增',
      message: '新增成功',
      type: 'success',
    })
  }
  const open2222 = () => {
    ElNotification({
      title: '修改',
      message: '修改成功',
      type: 'success',
    })
  }
  //新增
  function xinzeng(){


    axios.post("/inserttttt",insers).then(function(response){
      reload()
      open100()
      insers.rzbh=""
      insers.rzname=""
      insers.rzsex=""
      insers.rzcsrq=""
      insers.rzage=""
      insers.rzxl=""
      insers.rzsfz=""
      insers.rzphone=""
      insers.rzdz=""
      insers.rzgzjl=""
      insers.rzhyzk=""
      insers.rzmz=""
      insers.rzzzmm=""
      insers.rzt=""
      insers.rsj=""
      insers.rsf=""
      insers.ybh=""
      insers.zwbh=""
      insers.img=""
      insers.gryx=""
     insers.zymc=""
      insers.yijixk=""
      insers.xxxz=""
      insers.byssj=""
      insers.rxsj=""
      insers.byxy=""
      active.value=0;



    }).catch(function(error) {
      console.log(Error)
    })

  }

  //验证
  const rules=reactive<FormRules>({
    rzname:[
      {required:true,message:'请输入名称',trigger:'blur'},
      {min:2,message:'长度最少2个字符',trigger:'blur'}
    ],
    rzsfz:[
      {required:true,message:'请输入身份证信息',trigger:'blur'},
      {min:16,message: '不符合身份证格式',trigger: 'blur'}
    ],
    rzphone:[
      {required:true,message:'请输入手机号码',trigger:'blur'},
      {min:11,message: '不符合手机号码格式',trigger: 'blur'}
    ],
    rzcsrq:[
      {required:true,message:'请输入日期',trigger:'blur'}
    ],
    rzxl:[
      {required:true,message:'请输入内容',trigger:'blur'}
    ],
    rzage:[
      {required:true,message:'请输入年龄',trigger:'blur'}
    ],
    rzdz:[
      {required:true,message:'请输入地址',trigger:'blur'}
    ],
    rzgzjl:[
      {required:true,message:'请输入工作经历',trigger:'blur'}
    ]

  })
  function mohuchaxun(){
    axios.get("/mohujianli",{
      params:{pageNum:data.pageNum,pageSize:data.pageSize,rzname:data.rzname}
    }).then(function(response){
      data.Recruit=response.data.data.list
      data.total=response.data.data.total
      console.log(response.data.data.users)
    })
  }
  function zhiwei(){
    axios.get("/zhaoppp").then(function (c){

      data.zhiweiname=c.data.data;
    }).catch(function (error){
      console.log(error)
    })
  }
  function zhiwei999(){
    axios.get("/zhaoppp").then(function (c){

      data.zhiweiname=c.data.data;
    }).catch(function (error){
      console.log(error)
    })
  }
  import FileSaver from 'file-saver'
  import * as XLSX from 'xlsx'
  //导出
function daochu(){

  let tables = document.getElementById("ou");
  let table_book = XLSX.utils.table_to_book(tables);
  var table_write =XLSX.write(table_book, {
    bookType: "xlsx",
    bookSST: true,
    type: "array",
  });
  try {
    FileSaver.saveAs(
        new Blob([table_write], { type: "application/octet-stream" }),
        "简历导出.xlsx"
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e, table_write);
  }
  return table_write;

}
//面试记录
  function insetmsjlmg(y){
    axios.post("/insetyymsjlmg",y).then(function(response){

      reload()
    }).catch(function(error) {
      console.log(Error)
    })
  }
  function zhiwei2(){
    axios.get("/zhiweiw").then(function (c){

      data.maishiguany=c.data.data;
      console.log(data.maishiguany)
    }).catch(function (error){
      console.log(error)
    })
  }

  function mianshiguaneee(){
    axios.get("/mianshiguaneee").then(function (c){
      console.log(c.data.data)
        data.maishiguany=c.data.data;


    }).catch(function (error){
      console.log(error)
    })
  }
  function mianshiguan(rid){
    axios.get("/mianshiguan/"+rid).then(function (c){
      console.log(c.data.data)
      if(c.data.data!=""){
        data.maishiguany=c.data.data;
      }else{
        mianshiguaneee()
      }

    }).catch(function (error){
      console.log(error)
    })
  }

  const dialogFormVisible7777 = ref(false)
  const cc = ref(true)
  const dd = ref(false)
  const xs = ref(0)
  const active = ref(0)

  function aa() {
    if(this.insers.rzname==""){
      ElMessage({
        message:'姓名不能为空',
        type:'warning',
      })
    }
    else if(this.insers.rzsex==""){
      ElMessage({
        message:'性别不能为空',
        type:'warning',
      })
    }
    else if(this.insers.rzsfz==""){
      ElMessage({
        message:'身份证不能为空',
        type:'warning',
      })
    }
    else if(this.insers.rzcsrq==""){
      ElMessage({
        message:'出生日期不能为空',
        type:'warning',
      })
    }



    else if(this.insers.rzphone==""){
      ElMessage({
        message:'联系电话不能为空',
        type:'warning',
      })
    }
    else if(this.insers.rzage==""){
      ElMessage({
        message:'年龄不能为空',
        type:'warning',
      })
    }
    else if(this.insers.gryx==""){
      ElMessage({
        message:'邮箱不能为空',
        type:'warning',
      })
    }
    else if(this.insers.rzgzjl==""){
      ElMessage({
        message:'工作经历不能为空',
        type:'warning',
      })
    }
    else if(this.insers.rzhyzk==""){
      ElMessage({
        message:'婚姻状况不能为空',
        type:'warning',
      })
    }
    else if(this.insers.rzzzmm==""){
      ElMessage({
        message:'政治面貌不能为空',
        type:'warning',
      })

    }
    else if(this.insers.rzmz==""){
      ElMessage({
        message:'名族不能为空',
        type:'warning',
      })
    }

    else if(this.insers.zwbh==""){
      ElMessage({
        message:'职位不能为空',
        type:'warning',
      })
    }
    else if(this.insers.rzdz==""){
      ElMessage({
        message:'现居地址不能为空',
        type:'warning',
      })
    }
    else{
      if (active.value++ > 1) active.value = 0
      if (xs.value++ > 1) {
        xs.value = 0;
        if (xs.value = 2) {
          cc.value = false;
          dd.value = true;
        }
      }
    }
  }
  function dakai(){
    dialogFormVisible7777.value = true
    xs.value = 0;
  }
  function bb() {
    if (active.value-- < 0) active.value = 0
    if (xs.value-- < 2) {
      xs.value = 0
      this.cc != this.cc;
    }
  }

  function ee() {
    if(this.insers.rzxl==""){
      ElMessage({
        message:'学历不能为空',
        type:'warning',
      })
    }
    else if(this.insers.zymc==""){
      ElMessage({
        message:'专业名称不能为空',
        type:'warning',
      })
    }
    else if(this.insers.byxy==""){
      ElMessage({
        message:'毕业学校不能为空',
        type:'warning',
      })
    }else {
      xinzeng()
    dialogFormVisible7777.value = false;

    cc.value = true;
    dd.value = false;
    }
  }
  function eee() {


    dialogFormVisible.value = false;

    cc.value = true;
    dd.value = false;
  }
  function aaa() {
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
          cc.value = false;
          dd.value = true;
        }
      }
    }
  }
</script>
<template>

<br>

    <el-button type="success"  style="position: relative;right: -600px;" @click="daochu">导出</el-button>
<!--  <el-icon style="position: relative;right: -600px;" @click="daochu"><Top /></el-icon>-->
  <el-button type="success"  style="position: relative;right: -600px;" @click="daoru">导入</el-button>

  <el-button type="success"  @click="dakai(),zhiwei(),reload()" style="position: relative;right: -650px;">新增</el-button>
<!--  dialogFormVisible2=true-->

	<el-button style="position: relative;right: -40px;" @click="mohuchaxun()" @keyup.enter="mohuchaxun">查询</el-button>
	<el-input v-model="data.rzname" placeholder="请输入姓名" clearable style="width: 200px;position: relative;right: 225px;" />
	<div>

		<el-table :data="data.Recruit" style="width: 100%" height="400" id="ou">
<!--			<el-table-column prop="rid" label="编号" />-->
      <el-table-column  type="index" label="序号" width="55" />
			<el-table-column prop="rzname" label="姓名" />
			<el-table-column prop="rzsex" label="性别" />
			<el-table-column prop="rzcsrq" label="出生日期" />
			<el-table-column prop="rzxl" label="学历" />
			<el-table-column prop="byxy" label="毕业学院" />
			<el-table-column prop="zymc" label="专业名称" />

<!--			<el-table-column prop="rzgzjl"  label="工作经历" />-->
			<el-table-column prop="zwmc" label="职位" />
<!--      			<el-table-column prop="bmmc" label="部门" />-->
			<el-table-column prop="rzmz" label="名族" />
			<el-table-column prop="rzzzmm" label="政治面貌" />
<!--      <el-table-column prop="rzt"  label="状态" />-->
      <el-table-column label="操作"  width="100">
        <template #default=scope v-slot="scope">

<!--    最有用的      <el-button size="10px" type="success" plain @click="mianshiwenti(scope.row.zwbh,scope.row.rid),xiugairuzhi(scope.row.rid)">预面试</el-button>-->
        <el-button size="10px" type="success" plain @click="tanchuang(scope.row),mianshiguan(scope.row.rid)">预面试</el-button>
<!--                    <el-button size="10px" type="success" plain @click="dialogTableVisible = true,xiugairuzhi(scope.row.rid)">预面试</el-button>&lt;!&ndash;1.修改人主表状态 @click="xiugairuzhi(scope.row.rid)"&ndash;&gt;-->
        </template>

      </el-table-column>
			<el-table-column label="操作"  width="200">
				<template #default=scope v-slot="scope">
          <el-button type="primary" :icon="Delete" plain  @click="del(scope.row.rzbh)"/>	<!-- 删除 -->
          <el-button size="10px" type="success" plain @click="dialogFormVisible=true,a(scope.row.rzbh)">编辑</el-button><!--          查看招聘者个人信息以及修改-->
				</template>

			</el-table-column>

		</el-table>
		<el-pagination style="position: relative;right: -520px;" v-model:currentPage="this.data.pageNum"
			v-model:page-size="this.data.pageSize" layout="prev,pager,next" :total="this.data.total"
			@current-change="page" prev-text="上一页" next-text="下一页" />

	</div>
  <el-dialog v-model="dialogFormVisible7777" title="招聘者信息新增" width="70%">
    <el-form :model="insers">
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
              <el-input v-model="insers.rzname" style="width: 200px;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="rzsex">
              <el-radio-group v-model="insers.rzsex">
                <el-radio label="男"/>
                <el-radio label="女"/>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证:" prop="rzsfz">
              <el-input v-model="insers.rzsfz" style="width: 200px;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期" prop="rzcsrq">

              <el-date-picker
                  v-model="insers.rzcsrq"
                  type="date"

                  style="width: 200px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话:" prop="rzphone">
              <el-input v-model="insers.rzphone" style="width: 200px;" maxlength="11"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年龄:" prop="rzage">
              <el-input v-model="insers.rzage" style="width: 200px;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱:" prop="">
              <el-input v-model="insers.gryx" style="width: 200px;" clearable/>
            </el-form-item>

          </el-col>



          <el-col :span="8">
            <el-form-item label="工作经历:" prop="rzgzjl">
              <el-input v-model="insers.rzgzjl" style="width: 200px;"/>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="婚姻状况:">
              <el-select v-model="insers.rzhyzk" placeholder="婚姻状况">
                <el-option label="已婚" value="已婚"/>
                <el-option label="未婚" value="未婚"/>
                <el-option label="丧偶" value="丧偶"/>
                <el-option label="离婚" value="离婚"/>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="政治面貌:">
              <el-select v-model="insers.rzzzmm" placeholder="政治面貌">
                <el-option label="少先队员" value="少先队员"/>
                <el-option label="共青团员" value="共青团员"/>
                <el-option label="中共党员" value="中共党员"/>
                <el-option label="群众" value="群众"/>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="名族:">
              <el-select v-model="insers.rzmz" placeholder="名族">
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

            <el-form-item label="职位:">
              <el-select v-model="insers.zwbh" placeholder="职位">
                <el-option v-for="cc in data.zhiweiname" :key="cc.zwbh" :label="cc.zwmc" :value="cc.zwbh"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="现居地址:" prop="rzdz">
              <el-input v-model="insers.rzdz" style="width: 200px;" type="textarea"/>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div style="width: 100%; height: 200px;" v-if='xs==1'>
        <el-row>
          <el-col :span="8">
            <el-form-item label="学历:" prop="rzxl">
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
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业名称:" prop="">
              <el-input v-model="insers.zymc" style="width: 200px;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业学校:">
              <el-input v-model="insers.byxy" style="width: 200px;" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入学时间" prop="rzcsrq">

              <el-date-picker
                  v-model="insers.rxsj"
                  type="date"

                  style="width: 200px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业时间" prop="rzcsrq">

              <el-date-picker
                  v-model="insers.byssj"
                  type="date"

                  style="width: 200px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="一级学科:" prop="rzxl">
              <el-select v-model="insers.yijixk" placeholder="学科">
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
              <el-input v-model="insers.xxxz" style="width: 200px;" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div style="border: 1px solid red; width: 100%; height: 200px;" v-if='xs==2'>简历完成</div>

      <el-button style="margin-top: 12px" @click="ee()" v-show="cc" v-if="active==1">确认</el-button>
      <el-button style="margin-top: 12px" @click="aa()" v-show="cc" v-if="active==0">下一步</el-button>
      <el-button style="margin-top: 12px" @click="bb()" v-show="cc" >上一步</el-button>

      <template #footer>


      </template>
    </el-form>
  </el-dialog>
  <!--  弹出面试问题-->
  <el-dialog v-model="dialogTableVisible666" title="预约面试" >
    <el-from :model="insers2">
      <el-col :span="14">

        <span>面试官</span>:&nbsp;&nbsp;&nbsp; <el-select v-model="insers2.ybh" placeholder="面试官">
        <el-option v-for="cc in data.maishiguany" :key="cc.ybh" :label="cc.rzname" :value="cc.ybh"/>
      </el-select><br><br>

      </el-col>

      <span>面试时间：</span> <el-date-picker

              v-model="insers2.mjsj"
              type="date"
              style="width: 200px"
              />

    </el-from>
    <template #footer>
	  	<span class="dialog-footer">
	  		<el-button @click="dialogTableVisible666 = false">关闭</el-button>
	  		<el-button type="primary" @click="mianshiwenti(insers2),xiugairuzhi(insers2)">确定</el-button>
	  	</span>

    </template>
  </el-dialog>
  <el-dialog v-model="dialogFormVisible2" title="新增招聘者信息"  >
    <el-form    :model="insers" :rules="rules" ref="ruleFormRef" :size="formSize" >
      <el-row>


        <el-col :span="11">
          <el-form-item label="姓名:" prop="rzname">
            <el-input v-model="insers.rzname" style="width: 200px;" clearable/>
          </el-form-item>
        </el-col>

        <el-form-item label="性别" prop="rzsex">
          <el-radio-group v-model="insers.rzsex" >
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>


        <el-form-item label="出生日期" prop="rzcsrq">
          <el-col :span="14">
            <el-date-picker
                v-model="insers.rzcsrq"
                type="date"

                style="width: 200px"
            />
          </el-col>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </el-form-item>
        <el-form-item label="学历:" prop="rzxl">
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
          <el-form-item label="专业名称:" prop="">
            <el-input v-model="insers.zymc" style="width: 200px;" clearable/>
          </el-form-item>
        </el-col>
        <el-form-item label="毕业学校:">
          <el-input v-model="insers.byxy" style="width: 200px;" clearable/>
        </el-form-item>

        <el-col :span="11">
          <el-form-item label="身份证:" prop="rzsfz">
            <el-input v-model="insers.rzsfz" style="width: 200px;" clearable/>
          </el-form-item>
        </el-col>
        <el-form-item label="联系电话:" prop="rzphone">
          <el-input v-model="insers.rzphone" style="width: 200px;"  maxlength="11"/>
        </el-form-item>

        <el-col :span="11">
          <el-form-item label="年龄:" prop="rzage">
            <el-input v-model="insers.rzage" style="width: 200px;" clearable/>
          </el-form-item>
        </el-col>
        <el-form-item label="现居地址:" prop="rzdz">
          <el-input v-model="insers.rzdz" style="width: 200px;" type="textarea" />
        </el-form-item>

        <el-col :span="11">
          <el-form-item label="工作经历:" prop="rzgzjl">
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
        <el-col :span="11">

            <el-form-item label="职位:">
              <el-select v-model="insers.zwbh" placeholder="职位">
                <el-option v-for="cc in data.zhiweiname" :key="cc.zwbh" :label="cc.mmc" :value="cc.zwbh"/>
              </el-select>
            </el-form-item>
        </el-col>
        <el-form-item label="邮箱:" prop="">
          <el-input v-model="insers.gryx" style="width: 200px;" clearable/>
        </el-form-item>
      </el-row>







    </el-form>
    <template #footer>
	  	<span class="dialog-footer">
	  		<el-button @click="dialogFormVisible2 = false">关闭</el-button>
	  		<el-button type="primary" @click="dialogFormVisible2 = false,xinzeng(insers)">确定</el-button>
	  	</span>

    </template>
  </el-dialog>
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
      <div style="width: 100%; height: 200px;" v-if='xs==1'>
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
      <el-button style="margin-top: 12px" @click="eee(),xiugai(cx)" v-show="cc" v-if="active==1">确认</el-button>
      <el-button style="margin-top: 12px" @click="aaa()" v-show="cc" v-if="active==0">下一步</el-button>
      <el-button style="margin-top: 12px" @click="bb()" v-show="cc" >上一步</el-button>
    </el-form>
  </el-dialog>
<!--  <el-dialog v-model="dialogFormVisible" title="查看招聘者信息" >-->
<!--    <el-form :model="data.cx" >-->
<!--      <el-row>-->

<!--        <el-col :span="11">-->
<!--          <el-form-item label="姓名:">-->
<!--            <el-input v-model="data.cx.rzname" style="width: 200px;" clearable/>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-form-item label="性别">-->
<!--          <el-radio-group v-model="data.cx.rzsex">-->
<!--            <el-radio label="男" />-->
<!--            <el-radio label="女" />-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->


<!--        <el-form-item label="出生日期">-->
<!--          <el-col :span="14">-->
<!--            <el-date-picker-->
<!--                v-model="data.cx.rzcsrq"-->
<!--                type="date"-->
<!--                style="width: 200px"-->
<!--            />-->
<!--          </el-col>-->
<!--          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
<!--        </el-form-item>-->
<!--        <el-form-item label="学历:">-->
<!--          <el-select v-model="data.cx.rzxl" placeholder="学历">-->
<!--            <el-option label="硕士" value="硕士" />-->
<!--            <el-option label="研究生" value="研究生" />-->
<!--            <el-option label="本科" value="本科" />-->
<!--            <el-option label="大专" value="大专" />-->
<!--            <el-option label="高中" value="高中" />-->
<!--            <el-option label="初中" value="初中" />-->
<!--            <el-option label="小学" value="小学" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-col :span="11">-->
<!--          <el-form-item label="毕业学院:">-->
<!--            <el-input v-model="data.cx.byxy" style="width: 200px;" clearable/>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-form-item label="专业名称:">-->
<!--          <el-input v-model="data.cx.zymc" style="width: 200px;" clearable/>-->
<!--        </el-form-item>-->

<!--        <el-col :span="11">-->
<!--          <el-form-item label="身份证:">-->
<!--            <el-input v-model="data.cx.rzsfz" style="width: 200px;" clearable/>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-form-item label="联系电话:">-->
<!--          <el-input v-model="data.cx.rzphone" style="width: 200px;" clearable/>-->
<!--        </el-form-item>-->

<!--        <el-col :span="11">-->
<!--          <el-form-item label="年龄:">-->
<!--            <el-input v-model="data.cx.rzage" style="width: 200px;" clearable/>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-form-item label="现居地址:">-->
<!--          <el-input v-model="data.cx.rzdz" style="width: 200px;" type="textarea" />-->
<!--        </el-form-item>-->

<!--        <el-col :span="11">-->
<!--          <el-form-item label="工作经历:">-->
<!--            <el-input v-model="data.cx.rzgzjl" style="width: 200px;"/>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-form-item label="婚姻状况:">-->
<!--          <el-select v-model="data.cx.rzhyzk" placeholder="婚姻状况">-->
<!--            <el-option label="已婚" value="已婚" />-->
<!--            <el-option label="未婚" value="未婚" />-->
<!--            <el-option label="丧偶" value="丧偶" />-->
<!--            <el-option label="离婚" value="离婚" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->

<!--        <el-col :span="11">-->
<!--          <el-form-item label="政治面貌:">-->
<!--            <el-select v-model="data.cx.rzzzmm" placeholder="政治面貌">-->
<!--              <el-option label="少先队员" value="少先队员" />-->
<!--              <el-option label="共青团员" value="共青团员" />-->
<!--              <el-option label="中共党员" value="中共党员" />-->
<!--              <el-option label="群众" value="群众" />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-form-item label="名族:">-->
<!--          <el-select v-model="data.cx.rzmz" placeholder="名族">-->
<!--            <el-option label="汉族" value="汉族" />-->
<!--            <el-option label="壮族" value="壮族" />-->
<!--            <el-option label="回族" value="回族" />-->
<!--            <el-option label="满族" value="满族" />-->
<!--            <el-option label="维吾尔族" value="维吾尔族" />-->
<!--            <el-option label="苗族" value="苗族" />-->
<!--            <el-option label="彝族" value="彝族" />-->
<!--            <el-option label="土家族" value="土家族" />-->
<!--            <el-option label="藏族" value="藏族" />-->
<!--            <el-option label="蒙古族" value="蒙古族" />-->
<!--            <el-option label="侗族" value="侗族" />-->
<!--            <el-option label="布依族" value="布依族" />-->
<!--            <el-option label="瑶族" value="瑶族" />-->
<!--            <el-option label="白族" value="白族" />-->
<!--            <el-option label="朝鲜族" value="朝鲜族" />-->
<!--            <el-option label="哈尼族" value="哈尼族" />-->
<!--            <el-option label="黎族" value="黎族" />-->
<!--            <el-option label="哈萨克族" value="哈萨克族" />-->
<!--            <el-option label="傣族" value="傣族" />-->
<!--            <el-option label="畲族" value="畲族" />-->
<!--            <el-option label="傈僳族" value="傈僳族" />-->
<!--            <el-option label="东乡族" value="东乡族" />-->
<!--            <el-option label="仡佬族" value="仡佬族" />-->
<!--            <el-option label="拉祜族" value="拉祜族" />-->
<!--            <el-option label="佤族" value="佤族" />-->
<!--            <el-option label="水族" value="水族" />-->
<!--            <el-option label="纳西族" value="纳西族" />-->
<!--            <el-option label="羌族" value="羌族" />-->
<!--            <el-option label="土族" value="土族" />-->
<!--            <el-option label="仫佬族" value="仫佬族" />-->
<!--            <el-option label="柯尔克孜族" value="柯尔克孜族" />-->
<!--            <el-option label="锡伯族" value="锡伯族" />-->
<!--            <el-option label="柯尔克孜族" value="柯尔克孜族" />-->
<!--            <el-option label="达斡尔族" value="达斡尔族" />-->
<!--            <el-option label="撒拉族" value="撒拉族" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->

<!--      </el-row>-->
<!--      <el-form-item label="邮箱:">-->
<!--        <el-input v-model="data.cx.gryx" style="width: 200px;" clearable/>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--    <template #footer>-->
<!--	  	<span class="dialog-footer">-->
<!--	  		<el-button @click="dialogFormVisible = false">关闭</el-button>-->
<!--	  		<el-button type="primary" @click="dialogFormVisible = false,xiugai(cx),open()">确定</el-button>-->
<!--	  	</span>-->

<!--    </template>-->
<!--  </el-dialog>-->

</template>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
