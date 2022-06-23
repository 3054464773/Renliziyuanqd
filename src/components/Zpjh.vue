<script  setup>
import {
  Edit
} from '@element-plus/icons-vue'
import {
  ref,
  reactive,
  onBeforeMount,
  inject
} from 'vue'
import { ElMessageBox } from 'element-plus'
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


//新增数组
const insers=reactive({
  zbh:'',
  shjlbh:'',
  shbid:'',
  zwbh:'',
  zrs:'',
  zmc:''

})
var data = reactive({
  zpjhr: [],//存入查询后端响应过来的数据
  total: 0,//总页数
  pageNum: 1,//当前显示页码
  pageSize: 4,//每一页显示的条数
  cx:{}, //根据id传后端查询返回的值
  rzname:'',
  zhiweiname:'',
  bumen:'',
  bbbmmm:''

})
//修改方法
function xiugai(zhb){
  axios.put("/xxxxgai",data.cx).then(function(response){
    reload()
    if(response.data.code!=200){
      alert('修改失败'+response.data.code)
      return
    }

  }).catch(function(error){

    return
  })
}
//根据id查询，将这条数据显示在修改页面中
function a(zhb){
  console.log("用户id2222222222"+zhb)
  axios.get("/findzpjhid/"+zhb)
      //.then相当于ajax中的success:function成功回调函数
      .then(function(response){
        //获取后端传入的数据
        data.cx=response.data.data//简单来说就是把修改后的数据重新赋值给data.cx对象
      })
}
function reload(){
  axios.get("/findszpjh", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data.zpjhr = response.data.data.list
    data.total = response.data.data.total
    console.log(data.users)
  }).catch(function(error) {

  })
}
onBeforeMount(() => {
  axios.get("/findszpjh", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data.zpjhr = response.data.data.list
    data.total = response.data.data.total
    bumenn()
    console.log(data.users)
  }).catch(function(error) {
    console.log(error)
  })
})

function page() {
  axios.get("/findszpjh", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function(response) {
    data.total = response.data.data.total
    data.zpjhr = response.data.data.list
    console.log(data.users)
  }).catch(function(error) {
    console.log(error)
  })
}
const open1 = () => {
  ElNotification({
    title: '删除',
    message: '删除成功',
    type: 'success',
  })
}
const del=(zhb)=>{
  ElMessageBox.confirm('是否确认删除?','提示',{
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:'warning'
  }).then(()=>{
    axios.post("/delectzhb/"+zhb).then(function(response){
      if (response.data.code==200){
        console.log(response.data.data)
        open1()
        reload()
      }

    }).catch(function(error){

    })
  })
}
function zhiwei(){
  axios.get("/zhiweiw").then(function (c){

    data.zhiweiname=c.data.data;
  }).catch(function (error){
    console.log(error)
  })
}

const open2 = () => {
  ElNotification({
    title: '新增',
    message: '新增成功',
    type: 'success',
  })
}
import {ElMessage} from "element-plus"
function xinzeng(insers){
  if(this.insers.shjlbh==""){
    ElMessage({
      message:'审核记录表不能为空',
      type:'warning',
    })
  }else if(this.insers.shbid==""){
    ElMessage({
      message:'审核表不能为空',
      type:'warning',
    })
  }else if(this.insers.zrs==""){
    ElMessage({
      message:'人数不能为空',
      type:'warning',
    })
  }else if(this.insers.zwbh==""){
    ElMessage({
      message:'职位不能为空',
      type:'warning',
    })
  }else if(this.insers.zmc==""){
    ElMessage({
      message:'招聘计划名称不能为空',
      type:'warning',
    })
  }else{

  axios.post("/addzpjh",insers).then(function(response){
    reload()
    open2()
    insers.zbh=""
    insers.shjlbh=""
    insers.shbid=""
    insers.zwbh=""
    insers.zrs=""
    insers.zmc=""

  }).catch(function(error) {
    console.log(Error)
  })
}
}
//验证
const rules=reactive({
  shjlbh:[
    {required:true,message:'请输入审核记录表id',trigger:'blur'}
  ],
  shbid:[
    {required:true,message:'请输入审核表id',trigger:'blur'}
  ],
  zrs:[
    {required:true,message:'请输入人数',trigger:'blur'}
  ]
  ,
  zmc:[
    {required:true,message:'请输入招聘计划名称',trigger:'blur'}
  ]

})
function bumenn(){
  axios.get("/suoybumen").then(function (c){

    data.bumen=c.data.data;

  }).catch(function (error){
    console.log(error)
  })
}
//根据部门查询
function bumenchauxnhmd(){
  axios.get("/bumenzpjh",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize,bmmc:data.bbbmmm}
  }).then(function(response){
    data.zpjhr=response.data.data.list
    data.total=response.data.data.total

  })
}
//模糊招聘计划名称
function mohuzpjh(){
  axios.get("/mohuzpjh",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize,zmc:data.rzname}
  }).then(function(response){
    data.zpjhr=response.data.data.list
    data.total=response.data.data.total
    console.log(response.data.data.users)
  })
}
function bbb(data){
  dialogFormVisible.value=true,

      a(data.zbh)
}
</script>
<template>
  <br>
  <el-button  @click="dialogFormVisible2=true,zhiwei()" style="position: relative;right: -750px;" type="success">新增</el-button>
  <el-button style="position: relative;right: -166px;" @click="mohuzpjh()">查询</el-button>
  <el-input v-model="data.rzname" placeholder="请输入招聘计划" clearable style="width: 200px;position: relative;right: 105px;" />


  <span>部门:</span>  <el-select   placeholder="部门"  v-model="data.bbbmmm"  @change="bumenchauxnhmd" clearable>
  <el-option v-for="cc in data.bumen"  :value="cc.bmmc" :label="cc.bmmc" />
</el-select>
  <div>

    <el-table :data="data.zpjhr" style="width: 100%" height="400">
      <el-table-column  type="index" label="序号" width="200" />
      <el-table-column prop="zwmc" label="职位" />
      <el-table-column prop="bmmc" label="部门" />
      <el-table-column prop="zrs"  label="人数" />
      <el-table-column prop="zmc"  label="招聘计划内容" />

      <el-table-column label="操作"  width="200">
        <template #default=scope v-slot="scope">
          <el-button size="10px" type="success" plain  @click="del(scope.row.zbh)">删除	</el-button><!-- 删除 -->
          <el-button size="10px" type="success" plain @click="bbb(scope.row)">查看</el-button>

        </template>

      </el-table-column>
    </el-table>
    <el-pagination style="position: relative;right: -520px;" v-model:currentPage="this.data.pageNum"
                   v-model:page-size="this.data.pageSize" layout="prev,pager,next" :total="this.data.total"
                   @current-change="page" prev-text="上一页" next-text="下一页" />
  </div>

  <!-- 弹出新增弹窗 -->
  <el-dialog v-model="dialogFormVisible2" title="新增计划信息" >
    <div>
    <el-form :model="insers" :rules="rules">
      <el-row>
      <el-col :span="11">
      <el-form-item label="审核记录表id"  prop="shjlbh">
        <el-input v-model="insers.shjlbh" style="width: 200px;"/>
      </el-form-item>
      </el-col>
      <el-form-item label="审核表id" prop="shbid">
        <el-input  v-model="insers.shbid" style="width: 200px;"/>
      </el-form-item>

      <el-col :span="11">
        <el-form-item label="人数"  prop="zrs">
          <el-input v-model="insers.zrs" style="width: 200px;"/>
        </el-form-item>
      </el-col>
      <el-form-item label="职位:" prop="zwbh">
        <el-select v-model="insers.zwbh" placeholder="职位">
          <el-option v-for="cc in data.zhiweiname" :key="cc.zwbh" :label="cc.zwmc" :value="cc.zwbh" />
        </el-select>
      </el-form-item>

        <el-form-item label="招聘计划名称:" prop="zmc">
          <el-input v-model="insers.zmc" style="width: 400px;" type="textarea" />
        </el-form-item>
      </el-row>  

    </el-form>
    </div>
    <template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible2 = false">关闭</el-button>
				<el-button type="primary" @click="dialogFormVisible2 = false,xinzeng(insers)">确定</el-button>
			</span>

    </template>

  </el-dialog>
  <el-dialog v-model="dialogFormVisible" title="查看招聘计划信息" >
    <el-row>
    <el-form :model="data.cx" label-width="120px">
<!--      <el-col :span="14">-->
<!--      <el-form-item label="审核记录表id:" >-->
<!--        <el-input v-model="data.cx.shjlbh"/>-->
<!--      </el-form-item>-->
<!--      </el-col>-->
<!--      <el-form-item label="审核表id:">-->
<!--        <el-input  v-model="data.cx.shbid"/>-->
<!--      </el-form-item>-->

      <el-col :span="20">
      <el-form-item label="职位:" >
        <el-input v-model="data.cx.zwmc"   disabled="disabled"/>
      </el-form-item>

      </el-col>
      <el-col :span="20">
      <el-form-item label="人数:" >
        <el-input v-model="data.cx.zrs"/>
      </el-form-item>
      </el-col>
      <el-col :span="20">
      <el-form-item label="招聘计划名称:" :label-width="formLabelWidth">
        <el-input v-model="data.cx.zmc" style="width: 400px;" type="textarea" />
      </el-form-item>
      </el-col>

    </el-form>
    </el-row>
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
