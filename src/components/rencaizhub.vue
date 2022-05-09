<script  setup>
import {onBeforeMount, reactive} from "vue";
import axios from '../axios'
import {
  ref,
} from 'vue'
const dialogFormVisible = ref(false)
var data = reactive({
  Recruit: [],//存入查询后端响应过来的数据
  total: 0,//总页数
  pageNum: 1,//当前显示页码
  pageSize: 4,
  cx:{}

})
onBeforeMount(() => {
  axios.get("/selecdrencai", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function(response) {
    console.log(response.data.data)
    data.Recruit = response.data.data.list
    data.total = response.data.data.total

  }).catch(function(error) {
    console.log(error)
  })
})
function  page() {
  axios.get("/selecdrencai", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function (response) {
    data.total = response.data.data.total
    data.Recruit = response.data.data.list

  }).catch(function (error) {
    console.log(error)
  })
}
  function chaxun(rzbh){
    console.log("用户id2222222222"+rzbh)
    axios.get("/selectidd/"+rzbh)
        //.then相当于ajax中的success:function成功回调函数
        .then(function(response){
          //获取后端传入的数据
          data.cx=response.data.data//简单来说就是把修改后的数据重新赋值给data.cx对象
        })
  }

</script>

<template>
  <br>
  <el-button style="position: relative;right: -166px;" @click="mohuchaxun()">查询</el-button>
  <el-input v-model="data.rzname" placeholder="请输入姓名" clearable style="width: 200px;position: relative;right: 105px;" />
  <div>
  <el-table :data="data.Recruit" height="350" style="width: 100%">
    <el-table-column prop="rid" label="编号"  />
    <el-table-column prop="ybh" label="操作员工编号"  />
    <el-table-column prop="zwbh" label="职位表id"  />
    <el-table-column prop="rzbh" label="人才子表编号"  />
    <el-table-column prop="rzt" label="状态"  />
    <el-table-column prop="rsj" label="入库时间"  />
<!--    <el-table-column prop="rsf" label="身份"  />-->
    <el-table-column label="操作" >
      <template #default=scope v-slot="scope">
        <el-button size="10px" type="success" plain @click="dialogFormVisible=true,chaxun(scope.row.rzbh)">查看</el-button><!--          查看招聘者个人信息以及修改-->
        <el-button size="10px" type="success" plain >预面试</el-button>
      </template>

    </el-table-column>
  </el-table>
  </div>
  <el-pagination style="position: relative;right: -520px;" v-model:currentPage="this.data.pageNum"
                 v-model:page-size="this.data.pageSize" layout="prev,pager,next" :total="this.data.total"
                 @current-change="page" prev-text="上一页" next-text="下一页" />
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
	  		<el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
	  	</span>

    </template>
  </el-dialog>
</template>

