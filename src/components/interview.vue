<script  setup>

import {
  ref,
  reactive,
  onBeforeMount,
  inject
} from 'vue'
import axios from '../axios'
import {ElNotification} from "element-plus"

import { ElMessageBox } from 'element-plus'


const open = () => {
  ElNotification({
    title: '修改',
    message: '修改成功',
    type: 'success',
  })
}

//刷新
const reload = inject('reload')
const dialogFormVisible2 = ref(false)
const dialogFormVisible = ref(false)
const dialogTableVisible7778 = ref(false)


var data = reactive({
  Recruit: [],//存入查询后端响应过来的数据
  total: 0,//总页数
  pageNum: 1,//当前显示页码
  pageSize: 4,//每一页显示的条数
  cx:{}, //根据id传后端查询返回的值
  zts:0,
  rzname:'',
  zs:0,
  cx2:[],
  bumen:'',
  bbbmmm:''
})
const insers=reactive({
  mbh:'',
  ybh:'',
  ybh1:'',
  zwbh:'',
  mmc:'',
  mzwt:''


})
const insers2=reactive({
  mbh:'',
  ybh:'',
  mzbh:'',
  mzwt:''


})
function mohuchaxun(){
  axios.get("/mohuguizhan",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize,mmc:data.rzname}
  }).then(function(response){
    data.Recruit=response.data.data.list
    data.total=response.data.data.total
    console.log(response.data.data)
  })
}
function sx(){
  axios.get("/mianshiguizhang", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data.Recruit = response.data.data.list
    data.total = response.data.data.total
    console.log(data.users)
  }).catch(function(error) {
    console.log(error)
  })
}
onBeforeMount(() => {
  axios.get("/mianshiguizhang", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data.Recruit = response.data.data.list
    data.total = response.data.data.total
    bumenn()
    console.log(data.users)
  }).catch(function(error) {
    console.log(error)
  })
})
function page() {
  axios.get("/mianshiguizhang", {
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

//修改
function xiugai(mbh){
  axios.put("/xiugaigzz/",data.cx).then(function(response){
    if(response.data.code!=200){
      alert('修改失败'+response.data.code)
      return
    }
  }).catch(function(error){
    return
  })
}
const open1 = () => {
  ElNotification({
    title: '删除',
    message: '删除成功',
    type: 'success',
  })
}
const open100 = () => {
  ElNotification({
    title: '新增',
    message: '新增成功',
    type: 'success',
  })
}

const sahnchumianshiwenti=(mzbh)=>{
  ElMessageBox.confirm('是否确认删除?','提示',{
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:'warning'
  }).then(()=>{
    axios.post("/sahnchumianshiwenti/"+mzbh).then(function(response){
      if (response.data.code==200) {
        console.log(response.data.data)
        open1()
        sx()
      }
    }).catch(function(error){



    })
  })
}
//根据id删除
const delRe=(mbh)=>{
  ElMessageBox.confirm('是否确认删除?','提示',{
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:'warning'
  }).then(()=>{
    axios.post("/shanchu/"+mbh).then(function(response){
      if (response.data.code==200) {
        console.log(response.data.data)
        open1()
        sx()
      }
    }).catch(function(error){



    })
  })
}
// function delRe(mbh){
//   console.log(mbh)
//   axios.post("/shanchu/"+mbh).then(function(response){
//     sx()
//   }).catch(function(error){
//     alert("删除失败")
//     return
//   })
// }

// function mianshizi(mbh){
//   console.log("用户id2222222222"+mbh)
//   axios.get("/mianshizi/"+mbh)
//       //.then相当于ajax中的success:function成功回调函数
//       .then(function(response){
//         //获取后端传入的数据
//         data.cx=response.data.data//简单来说就是把修改后的数据重新赋值给data.cx对象
//       })
// }
import {ElMessage} from "element-plus"
function zhiwei(){
  axios.get("/zhiweiw").then(function (c){

      data.zhiweiname=c.data.data;
      console.log("没有没有"+data.zhiweiname)



  }).catch(function (error){
    console.log(error)
  })
}
//新增
function xinzeng(insers){
 if(this.insers.mmc==""){
   ElMessage({
     message:'规章名称不能为空',
     type:'warning',
    })
  }else if(this.insers.zwbh==""){

      ElMessage({
                  message:'职位不能为空',
                  type:'warning',
    })
  }else if(this.insers.mzwt==""){
    ElMessage({
      message:'面试问题不能为空',
      type:'warning',
    })
  }else{
  axios.post("/insertmsgz",insers).then(function(response){
    sx()
    open100()
    insers.zwbh=""
    insers.mmc=""
    insers.mzwt=""


  }).catch(function(error) {
    console.log(Error)
  })
}
}
function xinzeng2(insers2){
  if(this.insers2.ybh==""){
    ElMessage({
      message:'制作人员不能为空',
      type:'warning',
    })
  }else if(this.insers2.mzwt==""){
    ElMessage({
      message:'面试问题不能为空',
      type:'warning',
    })
  }else{
  axios.post("/tianjiawt",insers2).then(function(response){
    sx()
    open100()
    insers2.ybh=""
    insers2.mzwt=""


  }).catch(function(error) {
    console.log(Error)
  })
}
}
const rules=reactive({
  zwbh:[
    {required:true,message:'请输入职位',trigger:'blur'}
  ],
  mmc:[
    {required:true,message:'请输入规章名称',trigger:'blur'}
  ],

  mzwt:[
    {required:true,message:'请输入面试问题',trigger:'blur'}
  ]


})
const dialogTableVisible666 = ref(false)
const dialogTableVisible777 = ref(false)
function mianshiwenti(mbh){
  dialogTableVisible666.value=true,
      console.log("用户id2222222222-"+mbh)
  axios.get("/mianshizi/"+mbh)
      //.then相当于ajax中的success:function成功回调函数
      .then(function(response){
        //获取后端传入的数据
        console.log(response)
        data.cx2=response.data.data//简单来说就是把修改后的数据重新赋值给data.cx对象
        console.log(data.cx2)
      })
}
function bumenn(){
  axios.get("/suoybumen").then(function (c){

    data.bumen=c.data.data;

  }).catch(function (error){
    console.log(error)
  })
}
//根据部门查询
function bumenchauxnhmd(){
  axios.get("/bumenguiz",{
    params:{pageNum:data.pageNum,pageSize:data.pageSize,bmmc:data.bbbmmm}
  }).then(function(response){
    data.Recruit=response.data.data.list
    data.total=response.data.data.total

  })
}

function xinzengzi(data){
  dialogTableVisible777.value=true
  insers2.mbh=data.mbh
}
//新增子表面试问题
function xxxzzzzwt(){
  axios.get("/xinzengwenti",insers2)
      .then(function(response){
console.log("新增成功问题")

  })

}
function formatter(row,column) {

  return row.rowNum

}
</script>
<template>
  <br>

  <el-button  @click="dialogFormVisible2=true,zhiwei()" style="position: relative;right: -750px;" type="success">新增</el-button>
  <el-button style="position: relative;right: -166px;" @click="mohuchaxun">查询</el-button>
  <el-input v-model="data.rzname" placeholder="请输入姓名" clearable style="width: 200px;position: relative;right: 105px;" />

<!--  <span>部门:</span>  <el-select   placeholder="部门"  v-model="data.bbbmmm"  @change="bumenchauxnhmd" clearable>-->
<!--  <el-option v-for="cc in data.bumen"  :value="cc.bmmc" :label="cc.bmmc" />-->
<!--</el-select>-->
  <div>

    <el-table :data="data.Recruit" style="width: 100%" height="400">
      <el-table-column  type="index" label="序号" width="200" />
<!--      <el-table-column prop="ybh" label="制定员" />-->
      <el-table-column prop="zwmc" label="职位" />
<!--      <el-table-column prop="bmmc" label="部门" />-->
      <el-table-column prop="mmc" label="规章名称" />
      <el-table-column label="操作"  width="100">
        <template #default=scope v-slot="scope">
          <el-button size="10px" type="success" plain  @click="xinzengzi(scope.row)">新增</el-button><!-- 删除 -->
        </template>
      </el-table-column>
      <el-table-column label="操作"  width="200">
        <template #default=scope v-slot="scope">
          <el-button size="10px" type="success" plain  @click="delRe(scope.row.mbh)">删除</el-button><!-- 删除 -->
          <el-button size="10px" type="success" plain  @click="mianshiwenti(scope.row.mbh)">查看</el-button>
<!--          dialogFormVisible=true,-->
        </template>
      </el-table-column>
      <el-empty description="没有找到相关数据！" v-if="data.isShow2"/>
    </el-table>
    <el-pagination style="position: relative;right: -520px;" v-model:currentPage="this.data.pageNum"
                   v-model:page-size="this.data.pageSize" layout="prev,pager,next" :total="this.data.total"
                   @current-change="
                   page" prev-text="上一页" next-text="下一页" />
  </div>
  <el-dialog v-model="dialogTableVisible666" title="面试问题">
<!--    <el-button size="10px" type="success" plain  @click="dialogTableVisible7778=true">新增</el-button>-->
    <el-table :data="data.cx2" >
<!--      <el-table-column label="排序"     :formatter="formatter" show-overflow-tooltip/>-->

      <el-table-column   label="序号" type="index" align="center"  width="200"/>
      <el-table-column prop="mzwt" label="面试问题"  />
      <el-table-column label="操作"  width="200">
        <template #default=scope v-slot="scope">
          <el-button  type="success" plain  @click="sahnchumianshiwenti(scope.row.mzbh)">删除</el-button>	<!-- 删除 -->
<!--          <el-button size="10px" type="success" plain @click="dialogFormVisible=true">编辑</el-button>&lt;!&ndash;          查看招聘者个人信息以及修改&ndash;&gt;-->
        </template>

      </el-table-column>

    </el-table>
    <template #footer>
	  	<span class="dialog-footer">
	  		<el-button @click="dialogTableVisible666 = false">关闭</el-button>
	  		<el-button type="primary" @click="dialogTableVisible666 = false">确定</el-button>
	  	</span>

    </template>
  </el-dialog>
  <el-dialog v-model="dialogTableVisible7778" title="新增" >
    <el-form    :model="insers2"  :rules="rules">
      <el-row>
        <el-col :span="11">
          <el-form-item label="制作人编号" prop="ybh">
            <el-input v-model="insers2.ybh" style="width: 200px;"  maxlength="11"/>
          </el-form-item>
        </el-col>
        <el-form-item label="面试问题:" prop="mzwt" style="width: 600px;" >
          <el-input v-model="insers2.mzwt" type="textarea"  clearable/>
        </el-form-item>
      </el-row>

    </el-form>
    <template #footer>
	  	<span class="dialog-footer">
	  		<el-button @click="dialogTableVisible7778 = false">关闭</el-button>
	  		<el-button type="primary" @click="dialogTableVisible7778 = false,xinzeng2(insers2)">确定</el-button>
	  	</span>

    </template>
  </el-dialog>
  <el-dialog v-model="dialogTableVisible777" title="新增" >
    <el-form    :model="insers2"  :rules="rules">
      <el-row>
        <el-col :span="11">
        <el-form-item label="制作人编号" prop="ybh">
          <el-input v-model="insers2.ybh" style="width: 200px;"  maxlength="11"/>
        </el-form-item>
        </el-col>
          <el-form-item label="面试问题:" prop="mzwt" style="width: 600px;" >
            <el-input v-model="insers2.mzwt" type="textarea"  clearable/>
          </el-form-item>
      </el-row>

    </el-form>
    <template #footer>
	  	<span class="dialog-footer">
	  		<el-button @click="dialogTableVisible777 = false">关闭</el-button>
	  		<el-button type="primary" @click="dialogTableVisible777 = false,xinzeng2(insers2)">确定</el-button>
	  	</span>

    </template>
  </el-dialog>
  <el-dialog v-model="dialogFormVisible2" title="新增" >
    <el-form    :model="insers"  :rules="rules">
      <el-row>
        <el-col :span="11">
          <el-form-item label="规章名称:" prop="mmc">
            <el-input v-model="insers.mmc" style="width: 200px;" clearable/>
          </el-form-item>
        </el-col>
        <el-form-item label="职位:" prop="zwbh">
          <el-select v-model="insers.zwbh" placeholder="职位">
            <el-option v-for="cc in data.zhiweiname" :key="cc.zwbh" :label="cc.zwmc" :value="cc.zwbh"/>
          </el-select>
        </el-form-item>



        <el-col :span="11">
          <el-form-item label="面试问题:" prop="mzwt" style="width: 600px;">
            <el-input v-model="insers.mzwt"   type="textarea" clearable/>
          </el-form-item>


        </el-col>

      </el-row>

    </el-form>
    <template #footer>
	  	<span class="dialog-footer">
	  		<el-button @click="dialogFormVisible2 = false">关闭</el-button>
	  		<el-button type="primary" @click="dialogFormVisible2 = false,xinzeng(insers)">确定</el-button>
	  	</span>

    </template>
  </el-dialog>
  <el-dialog
      v-model="dialogFormVisible"
      title="修改"
      width="30%"

      :modal="data.cx"
  >
    <el-form-item label="id" >
      <el-input   v-model="data.cx.mzbh" disabled/>
    </el-form-item>
    <el-form-item label="制定员" >
      <el-input   v-model="data.cx.mbh"/>
    </el-form-item>
    <el-form-item label="职位" >
      <el-input   v-model="data.cx.ybh"/>
    </el-form-item>
    <el-form-item label="面试问题" >
      <el-input   v-model="data.cx.mzwt"/>
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="dialogFormVisible=false,xiugai(cx)">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style>
</style>
