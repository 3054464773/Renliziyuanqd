<template>
  <div class="qxheaddiv">
    <el-input  v-model="qxname" placeholder="请输入您要查找的权限名称" />
    <el-button type="primary" @click="chaxun" plain>查询</el-button>
    <el-button type="success" @click="dialogVisible = true" plain>新增权限</el-button>
  </div>
  <div class="qxheaddivtwo">
    <el-table :data="qxlist" style="width: 100%">
      <el-table-column  width="180" />
      <el-table-column  type="index" label="序号" width="180" />
      <el-table-column prop="qxmc" label="权限名称" width="220" />
      <el-table-column prop="qkey" label="权限标识" width="430"  />
      <el-table-column label="编辑" width="70"> <el-button type="primary" :icon="Edit" circle /></el-table-column>
      <el-table-column label="删除" > <el-button type="danger" :icon="Delete" circle /></el-table-column>
    </el-table>
    <el-empty description="没有找到可用数据！" v-if="iszdsj"/>
  </div>
  <div class="qxheaddivthree">
    <el-pagination background layout="prev, pager, next" :total="zts" @current-change="xiayiye" @next-click="xiayiye" @prev-click="xiayiye"/>
  </div>


  <el-dialog
      v-model="dialogVisible"
      title="新增权限"
      width="30%"

  >
        <el-form
            ref="qxstl"
            :model="qxstl"
            label-width="120px"
            class="demo-ruleForm"
            :rules="rules"

        >
          <el-form-item label="权限名称" prop="qxmc">
            <el-input v-model="qxstl.qxmc" />
          </el-form-item>
          <el-form-item label="权限标识" prop="qkey">
            <el-input v-model="qxstl.qkey" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('qxstl')">确定新增</el-button>
          </el-form-item>
        </el-form>
  </el-dialog>


</template>

<script>
import {Edit,Delete} from "@element-plus/icons-vue";
import axios from '../axios'
export default {
  name: "Quanxian",
  data(){
    return{
      Edit:Edit,
      Delete:Delete,
      qxname:'',
      qxlist:[],
      zts:0,
      dialogVisible:false,
      qxstl:{
        qxmc:'',
        qkey:''
      },
      rules: {
        qxmc: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
          { min: 4, message: '长度最少4个字符', trigger: 'blur' }
        ],
        qkey: [
          { required: true, message: '请输入权限标识', trigger: 'blur' },
          { min: 4, message: '长度最少4个字符', trigger: 'blur' }
        ]
      },
      iszdsj:false
    }
  },
  created() {
   this.chaxunalllist()
  },
  methods:{
    chaxunalllist(){
      axios.get("/findallquanxian?page=1").then((e)=>{
        this.qxlist=e.data.data.qxlist
        this.zts=parseInt(e.data.data.zys)*10
        console.log(e)
      })
    },
    xiayiye(ee){
      axios.get("/findallquanxian?page="+ee).then((e)=>{
        this.qxlist=e.data.data.qxlist
        this.zts=parseInt(e.data.data.zys)*10
        console.log(e)
      })
    },
    chaxun(){
      axios.get("/mohufindallquanxian?page=1&qxname="+this.qxname).then((e)=>{
        this.qxlist=e.data.data.qxlist
        this.zts=parseInt(e.data.data.zys)*10
        if(e.data.data.qxlist.length==0){
            this.iszdsj=true
        }else {
          this.iszdsj=false
        }
        console.log(e)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("/insertquanxian",this.qxstl).then((e)=>{
                if (e.data.data){
                  this.dialogVisible=false
                  this.$message.success("新增成功！")
                  this.chaxunalllist()
                }
          })
        } else {

          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.el-input{
  width:350px;
  margin-right: 50px;
}
.qxheaddiv{
  margin-top:40px;
}
.qxheaddivtwo{
  margin-top:30px;
  height: 510px;
}
.qxheaddivthree{
  display: flex;
  justify-content: space-around;
}
</style>