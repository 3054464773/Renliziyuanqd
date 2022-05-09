<template>
  <div class="qxheaddiv">
    <el-input  v-model="jsname" placeholder="请输入您要查找的角色名称" />
    <el-button type="primary" @click="chaxun" plain>查询</el-button>
    <el-button type="success" @click="xinzengquanxian" plain>新增角色</el-button>
  </div>
  <div class="qxheaddivtwo">
    <el-table :data="jiaoselist" style="width: 100%">
      <el-table-column  width="180" />
      <el-table-column  type="index" label="序号" width="180" />
      <el-table-column prop="jsmc" label="角色名称" width="220" />
      <el-table-column prop="jkey" label="角色标识" width="430"  />
      <el-table-column label="编辑" width="70" >
        <template #default="scope">
          <el-button @click="bianjiquanxian(scope.row)" type="primary" :icon="Edit" circle />
        </template>
      </el-table-column>
      <el-table-column label="删除" width="70">
        <template #default="scope">
          <el-popconfirm title="确定删除删吗？"  @confirm="shanchujixiao(scope.row)" confirmButtonText="确定" cancelButtonText="取消">
            <template #reference>
              <el-button type="danger" :icon="Delete" circle />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column label="权限设置">
        <template #default="scope">
          <el-button type="success" :icon="Check" circle @click="qxshezhi(scope.row.jsbh)"/>
        </template>
      </el-table-column>
    </el-table>
    <el-empty description="没有找到可用数据！" v-if="iszdsj"/>
  </div>
  <div class="qxheaddivthree">
    <el-pagination background layout="prev, pager, next" :total="zts" @current-change="xiayiye" @next-click="xiayiye" @prev-click="xiayiye"/>
  </div>

  <el-dialog
      v-model="dialogVisible"
      title="操作弹框"
      width="30%"
  >
    <el-form
        ref="jsstl"
        :model="jsstl"
        label-width="120px"
        class="demo-ruleForm"
        :rules="rules"
    >
      <el-form-item label="角色名称" prop="jsmc">
        <el-input v-model="jsstl.jsmc" />
      </el-form-item>
      <el-form-item label="角色标识" prop="jkey">
        <el-input v-model="jsstl.jkey" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="xinzenandxiugai('jsstl')">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog
      v-model="dialogVisibletwo"
      title="权限分配"
      width="50%"
      destroy-on-close="true"
  >
    <JiaoseQuanxian :yiyongyousj="yiyongyousj" :weiyongyousj="weiyongyousj" :jsid="jsid" @shuaxin="this.dialogVisibletwo=false"></JiaoseQuanxian>
  </el-dialog>
</template>

<script>
import axios from "../axios";
import {Edit,Delete,Check} from "@element-plus/icons-vue";
import JiaoseQuanxian from "./JiaoseQuanxian.vue";
export default {
  name: "Jiaose",
  components: {JiaoseQuanxian},
  data(){
    return{
      Check:Check,
      dialogVisibletwo:false,
      Edit:Edit,
      Delete:Delete,
      jiaoselist:[],
      zts:0,
      jsname:'',
      dialogVisible:false,
      jsstl:{
        jsbh:'',
        jsmc:'',
        jkey:''
      },
      rules: {
        jsmc: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
          { min: 4, message: '长度最少4个字符', trigger: 'blur' }
        ],
        jkey: [
          { required: true, message: '请输入权限标识', trigger: 'blur' },
          { min: 4, message: '长度最少4个字符', trigger: 'blur' }
        ]
      },
      iszdsj:false,
      pdxzorxg:true,//默认新增
      yiyongyousj:[],
      weiyongyousj:[],
      jsid:''
    }
    }
  ,
  created() {
    this.chaxunalllist()
  },
  methods:{
    chaxunalllist(){
      axios.get("/findalljiaose?page=1").then((e)=>{
        // this.qxlist=e.data.data.qxlist
        // this.zts=parseInt(e.data.data.zys)*10
        this.jiaoselist=e.data.data.jiaoselist;
        this.zts=parseInt(e.data.data.zys)*10;
        console.log(e)
      })
    },
  xiayiye(ee){
      axios.get("/findalljiaose?page="+ee).then((e)=>{
        this.jiaoselist=e.data.data.jiaoselist
        this.zts=parseInt(e.data.data.zys)*10
        console.log(e)
      })
  },
  chaxun(){
    axios.get("/mohufindalljiaose?page=1&jsname="+this.jsname).then((e)=>{
      this.jiaoselist=e.data.data.jslist
      this.zts=parseInt(e.data.data.zys)*10
      if(e.data.data.jslist.length==0){
        this.iszdsj=true
      }else {
        this.iszdsj=false
      }
      console.log(e)
    })
  },
  xinzenandxiugai(formName) {
    this.$refs[formName].validate((valid) => {
      if (valid) {
        if(this.pdxzorxg){
          axios.post("/insertjiaose",this.jsstl).then((e)=>{
            if (e.data.data){
              this.dialogVisible=false
              this.$message.success("新增成功！")
              this.chaxunalllist()
            }
          })
        }else {
          //updatquanxian
          axios.put("/updatjiaose",this.jsstl).then((e)=>{
            if (e.data.data){
              this.dialogVisible=false
              this.pdxzorxg=true;
              this.$message.success("修改成功！")
              this.chaxunalllist()
            }
          })
        }
      } else {
        return false;
      }
    });
  },
  bianjiquanxian(e){
    this.jsstl=e;
    this.dialogVisible=true
    this.pdxzorxg=false;
  },
  xinzengquanxian(){
    this.dialogVisible = true;
    this.jsstl={};
  },
  shanchujixiao(e){
    axios.delete("/deletejiaose?jsbh="+e.jsbh).then((e)=>{
      if (e.data.data){
        this.$message.success("删除成功！")
        this.chaxunalllist()
      }
    })
  },
    qxshezhi(e){
      this.dialogVisibletwo=true;
      axios.get('injsidfindqxs?jsid='+e).then((ee)=>{
        var sj=[];
        var sj2=[];
        for(var i=0;i<ee.data.data.yyy.length;i++){
          sj.push({key:ee.data.data.yyy[i].qxbh,label:ee.data.data.yyy[i].qxmc,disabled:false});
        }
        this.yiyongyousj=sj
        for(var i=0;i<ee.data.data.wyy.length;i++){
          sj2.push({key:ee.data.data.wyy[i].qxbh,label:ee.data.data.wyy[i].qxmc,disabled:false});
        }
        this.weiyongyousj=sj2
        this.jsid=e
      })
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