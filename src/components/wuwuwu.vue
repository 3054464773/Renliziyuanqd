<template>
  <el-button text @click="dakai()">招聘者信息新增</el-button>
  <el-button size="10px" type="success" plain @click="dialogFormVisible=true,a(26)">编辑</el-button>
    <el-dialog v-model="dialogFormVisible" title="招聘者信息新增" width="70%">
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
      <div style="border: 1px solid red; width: 100%; height: 200px;" v-if='xs==1'>
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
    <el-button style="margin-top: 12px" @click="ee(),xiugai(cx)" v-show="cc" v-if="active==1">确认</el-button>
      <el-button style="margin-top: 12px" @click="aa()" v-show="cc" v-if="active==0">下一步</el-button>
      <el-button style="margin-top: 12px" @click="bb()" v-show="cc" >上一步</el-button>


      <template #footer>
        <!-- <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false"
                  >Confirm</el-button
                >
              </span> -->

      </template>
  </el-form>
    </el-dialog>
</template>
<script lang="ts" setup>
import axios from '../axios' //引入axios
import {
  ref,
  reactive,
  onBeforeMount
} from 'vue'
import {ElMessage} from "element-plus";
import {ElNotification} from "element-plus/es";
const open10000 = () => {
  ElNotification({
    title: '修改',
    message: '修改成功',
    type: 'success',
  })
}
function xiugai(){
  axios.put("/updata",data.cx).then(function(response){
    open10000
    if(response.data.code!=200){
      alert('修改失败'+response.data.code)
      return
    }
  }).catch(function(error){
    return
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
function xinzeng(insers){
  if(this.insers.rzname==""){
    ElMessage({
      message:'姓名不能为空',
      type:'warning',
    })
  }else if(this.insers.rzcsrq==""){
    ElMessage({
      message:'出生日期不能为空',
      type:'warning',
    })
  }else if(this.insers.rzsex==""){
    ElMessage({
      message:'性别不能为空',
      type:'warning',
    })
  }
  else if(this.insers.rzxl==""){
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
  }
  else if(this.insers.rzsfz==""){
    ElMessage({
      message:'身份证不能为空',
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
  else if(this.insers.rzdz==""){
    ElMessage({
      message:'现居地址不能为空',
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
  else if(this.insers.rzmz==""){
    ElMessage({
      message:'名族不能为空',
      type:'warning',
    })
  }



  else if(this.insers.gryx==""){
    ElMessage({
      message:'邮箱不能为空',
      type:'warning',
    })
  }
  else if(this.insers.rzzzmm==""){
    ElMessage({
      message:'政治面貌不能为空',
      type:'warning',
    })
  }else {

    axios.post("/inserttttt",insers).then(function(response){

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




    }).catch(function(error) {
      console.log(Error)
    })
  }
}

const dialogFormVisible = ref(false)
const cc = ref(true)
const dd = ref(false)
const xs = ref(0)
const active = ref(0)

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
      cc.value = false;
      dd.value = true;
    }
  }
}
}
function dakai(){
  dialogFormVisible.value = true
  xs.value = 0;
}
const insers = reactive({
  rzbh: '',
  rzname: '',
  rzsex: '',
  rzcsrq: '',
  rzage: '',
  rzxl: '',
  rzsfz: '',
  rzphone: '',
  rzdz: '',
  rzgzjl: '',
  rzhyzk: '',
  rzmz: '',
  rzzzmm: '',
  rzt: '',
  rsj: '',
  rsf: '',
  ybh: '',
  zwbh: '',
  img: '',
  gryx: '',
  byxy: '',
  zymc: '',
  rxsj:'',
  byssj:'',
  yijixk:'',
  xxxz:''
})

function bb() {
  if (active.value-- < 0) active.value = 0
  if (xs.value-- < 1) {
    xs.value = 0
    this.cc != this.cc;
  }
}

function ee() {


  dialogFormVisible.value = false;

  cc.value = true;
  dd.value = false;
}

const data = reactive({
  two2: [],
  cx:{}
})
/*//分页挂载前
onBeforeMount(() => {
  axios.get("http://localhost:8080/client/selectcg").then(function(a) { //无参查询
    console.log(a.data.data) //打印后端响应的结果
    data.two2= a.data.data//存入到定义好的响应式对象中
    console.log(data.two2)
  })
})*/

const defaultProps = {
  children: 'children',
  label: 'label',
}

</script>
<style></style>
