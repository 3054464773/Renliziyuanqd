<script  setup>
import {
  Delete,
  Edit
} from '@element-plus/icons-vue'
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

//刷新
const reload = inject('reload')

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

})
//修改方法
function xiugai(zhb){
  axios.put("/xxxxgai",data.cx).then(function(response){
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
//根据id删除
function delRe(zhb){
  console.log(zhb)
  axios.post("/delectzhb/"+zhb).then(function(response){
  }).catch(function(error){
    alert("删除失败")
    return
  })
}

const open2 = () => {
  ElNotification({
    title: '新增',
    message: '新增成功',
    type: 'success',
  })
}

function xinzeng(){
  axios.post("/addzpjh",insers).then(function(response){

    insers.zbh=response.data.users.zbh
    insers.shjlbh=response.data.users.shjlbh
    insers.shbid=response.data.users.shbid
    insers.zwbh=response.data.users.zwbh
    insers.zrs=response.data.users.zrs
    insers.zmc=response.data.users.zmc

  }).catch(function(error) {
    console.log(Error)
  })
}

</script>
<template>
  <br>
  <el-icon  @click="dialogFormVisible2=true" style="position: relative;right: -750px;"><edit /></el-icon>
  <el-button style="position: relative;right: -166px;">查询</el-button>
  <el-input v-model="data.rzname" placeholder="请输入姓名" clearable style="width: 200px;position: relative;right: 105px;" />
  <div>

    <el-table :data="data.zpjhr" style="width: 100%" height="400">
      <el-table-column prop="zbh" label="招聘计划id" />
      <el-table-column prop="shjlbh" label="审计表id" />
      <el-table-column prop="shbid" label="审核表id" />
      <el-table-column prop="zwbh" label="职位表id" />

      <el-table-column prop="zrs"  label="人数" />
      <el-table-column prop="zmc"  label="招聘计划内容" />

      <el-table-column label="操作"  width="200">
        <template #default=scope v-slot="scope">
          <el-button size="10px" type="success" plain  @click="delRe(scope.row.zbh),reload()">删除	</el-button><!-- 删除 -->
          <el-button size="10px" type="success" plain @click="dialogFormVisible=true,a(scope.row.zbh)">查看</el-button>

        </template>

      </el-table-column>
    </el-table>
    <el-pagination style="position: relative;right: -520px;" v-model:currentPage="this.data.pageNum"
                   v-model:page-size="this.data.pageSize" layout="prev,pager,next" :total="this.data.total"
                   @current-change="page" prev-text="上一页" next-text="下一页" />
  </div>

  <!-- 弹出新增弹窗 -->
  <el-dialog v-model="dialogFormVisible2" title="新增员工信息" :modal="insers">
    <el-form>
      <el-form-item label="审核记录表id" :label-width="formLabelWidth">
        <el-input v-model="insers.shjlbh"/>
      </el-form-item>
      <el-form-item label="审核表id" :label-width="formLabelWidth">
        <el-input  v-model="insers.shbid"/>
      </el-form-item>
      <el-form-item label="职位表id" :label-width="formLabelWidth">
        <el-input v-model="insers.zwbh" show-password  maxlength="10"/>
      </el-form-item>
      <el-form-item label="人数" :label-width="formLabelWidth">
        <el-input v-model="insers.zrs"/>
      </el-form-item>

        <el-form-item label="招聘计划名称:" :label-width="formLabelWidth">
          <el-input v-model="insers.zmc" style="width: 200px;" type="textarea" />
        </el-form-item>


    </el-form>
    <template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible2 = false">关闭</el-button>
				<el-button type="primary" @click="dialogFormVisible2 = false,xinzeng(),open2(),reload()">确定</el-button>
			</span>

    </template>

  </el-dialog>
  <el-dialog v-model="dialogFormVisible" title="查看员工信息" >
    <el-form :model="data.cx">
      <el-form-item label="审核记录表id" :label-width="formLabelWidth">
        <el-input v-model="data.cx.shjlbh"/>
      </el-form-item>
      <el-form-item label="审核表id" :label-width="formLabelWidth">
        <el-input  v-model="data.cx.shbid"/>
      </el-form-item>
      <el-form-item label="职位表id" :label-width="formLabelWidth">
        <el-input v-model="data.cx.zwbh" show-password  maxlength="10"/>
      </el-form-item>
      <el-form-item label="人数" :label-width="formLabelWidth">
        <el-input v-model="data.cx.zrs"/>
      </el-form-item>

      <el-form-item label="招聘计划名称:" :label-width="formLabelWidth">
        <el-input v-model="data.cx.zmc" style="width: 200px;" type="textarea" />
      </el-form-item>


    </el-form>
    <template #footer>
	  	<span class="dialog-footer">
	  		<el-button @click="dialogFormVisible = false">关闭</el-button>
	  	<el-button type="primary" @click="dialogFormVisible = false,xiugai(cx),open(),reload()">确定</el-button>
	  	</span>

    </template>
  </el-dialog>


</template>
<style>
</style>
