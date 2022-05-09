<template>

    <el-tabs
        type="card"
        class="demo-tabs"
        model-value="second"
        @tab-click="djxxk"
    >
      <el-tab-pane label="部门管理" name="second">

        <div class="qxheaddiv">
          <el-input  v-model="bmname" placeholder="请输入您要查找的部门名称" />
          <el-button type="primary" @click="chaxun" plain>查询</el-button>
          <el-button type="success" @click="xinzengquanxian" plain>新增部门</el-button>
        </div>

        <div class="qxheaddivtwo">
          <el-table :data="bmlist" style="width: 100%">
            <el-table-column  width="110" />
            <el-table-column  type="index" label="序号" width="150" />
            <el-table-column prop="bmmc" label="部门名称" width="220" />
            <el-table-column prop="bmjs" label="部门介绍" width="220"  />
            <el-table-column prop="bmsj" label="部门创建时间" width="380"  />

            <el-table-column label="编辑" width="70" >
              <template #default="scope">
                <el-button @click="bianjibm(scope.row)" type="primary" :icon="Edit" circle />
              </template>
            </el-table-column>

            <el-table-column label="删除" >
              <template #default="scope">
                <el-popconfirm title="确定删除删吗？"  @confirm="shanchubm(scope.row)" confirmButtonText="确定" cancelButtonText="取消">
                  <template #reference>
                    <el-button type="danger" :icon="Delete" circle />
                  </template>
                </el-popconfirm>
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
              ref="bmstl"
              :model="bmstl"
              label-width="120px"
              class="demo-ruleForm"
              :rules="rules"
          >
            <el-form-item label="部门名称" prop="bmmc">
              <el-input v-model="bmstl.bmmc" />
            </el-form-item>
            <el-form-item label="部门介绍" prop="bmjs">
              <el-input v-model="bmstl.bmjs" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="xinzenandxiugai('bmstl')">确定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-tab-pane>

      <el-tab-pane label="职位管理" name="first">
        <div class="qxheaddiv">
          <el-input  v-model="bmname" placeholder="请输入您要查找的职位名称" />
          <el-button type="primary" @click="chaxun" plain>查询</el-button>
          <el-button type="success" @click="xinzengquanxian" plain>新增职位</el-button>
        </div>
        <div class="qxheaddivtwo">
          <el-table :data="zwlist" style="width: 100%">
            <el-table-column  width="110" />
            <el-table-column  type="index" label="序号" width="150" />
            <el-table-column prop="zwmc" label="职位名称" width="220" />
            <el-table-column prop="zwjs" label="职位介绍" width="220"  />
            <el-table-column prop="zwsj" label="职位创建时间" width="380"  />

            <el-table-column label="编辑" width="70" >
              <template #default="scope">
                <el-button @click="bianjibm(scope.row)" type="primary" :icon="Edit" circle />
              </template>
            </el-table-column>

            <el-table-column label="删除" >
              <template #default="scope">
                <el-popconfirm title="确定删除删吗？"  @confirm="shanchubm(scope.row)" confirmButtonText="确定" cancelButtonText="取消">
                  <template #reference>
                    <el-button type="danger" :icon="Delete" circle />
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>

          </el-table>
          <el-empty description="没有找到可用数据！" v-if="iszdsj"/>
        </div>
        <div class="qxheaddivthree">
          <el-pagination background layout="prev, pager, next" :total="zts2" @current-change="xiayiye" @next-click="xiayiye" @prev-click="xiayiye"/>
        </div>
      </el-tab-pane>

    </el-tabs>

</template>

<script>
import {Edit,Delete} from "@element-plus/icons-vue";
import axios from "../axios";
export default {
  name: "Bumen",
  data(){
    return{
      rules: {
        bmmc: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 4, message: '长度最少4个字符', trigger: 'blur' }
        ],
        bmjs: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
          { min: 4, message: '长度最少4个字符', trigger: 'blur' }
        ]
      },
      Edit:Edit,
      Delete:Delete,
      bmlist:[],
      zwlist:[],
      zts:0,
      zts2:0,
      bmname:'',
      zwname:'',
      iszdsj:false,
      bmstl:{
        bmbh:'',
        bmmc:'',
        bmjs:'',
        bmsj:''
      },
      dialogVisible:false,
      pdxzorxg:true
    }
  },
  created() {
    this.findallbm()
  },
  methods:{
    djxxk(TabsPaneContext,Event){
      if(TabsPaneContext.props.label=='职位管理'){
        this.findallzw();
      }else {
        this.findallbm();
      }

    },
    findallbm(){
      axios.get("/findallbm?ym=1").then((e)=>{
          this.bmlist=e.data.data.bmlist;
          this.zts=parseInt(e.data.data.zts)*10;
      })
    },
    findallzw(){
      axios.get("/findallzw?ym=1").then((e)=>{
        this.zwlist=e.data.data.zwlist;
        this.zts2=parseInt(e.data.data.zts)*10;
      })
    },
    chaxun(){
      axios.get("/mohufindallbm?page=1&bmname="+this.bmname).then((e)=>{
        this.bmlist=e.data.data.bmlist
        this.zts=parseInt(e.data.data.zys)*10
        if(e.data.data.bmlist.length==0){
          this.iszdsj=true
        }else {
          this.iszdsj=false
        }
        console.log(e)
      })
    },
    xiayiye(ee){
      if(this.bmname==''){
        axios.get("/findallbm?ym="+ee).then((e)=>{
          this.bmlist=e.data.data.bmlist;
          this.zts=parseInt(e.data.data.zts)*10;
        })
      }else {
        axios.get("/mohufindallbm?page="+ee+"&bmname="+this.bmname).then((e)=>{
          this.bmlist=e.data.data.bmlist
          this.zts=parseInt(e.data.data.zys)*10
        })
      }

    },
    shanchubm(e){
      axios.delete("/deletebm?bmbh="+e.bmbh).then((e)=>{
        if (e.data.data){
          this.$message.success("删除成功！")
          this.findallbm()
        }
      })
    },
    xinzengquanxian(){
      this.dialogVisible = true;
      this.bmstl={};
    },
    bianjibm(e){
      this.bmstl=e;
      this.dialogVisible=true
      this.pdxzorxg=false;
    },
    xinzenandxiugai(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.pdxzorxg){
            axios.post("/insertbm",this.bmstl).then((e)=>{
              if (e.data.data){
                this.dialogVisible=false
                this.$message.success("新增成功！")
               this.findallbm()
              }
            })
          }else {
            //updatquanxian
            axios.put("/updatbm",this.bmstl).then((e)=>{
              if (e.data.data){
                this.dialogVisible=false
                this.pdxzorxg=true;
                this.$message.success("修改成功！")
                this.findallbm()
              }
            })
          }
        } else {
          return false;
        }
      });
    }

  }
}
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.el-input{
  width:350px;
  margin-right: 50px;
}
.qxheaddiv{
  margin-top:30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.qxheaddivtwo{
  margin-top:30px;
  height: 480px;

}
.qxheaddivthree{
  display: flex;
  justify-content: space-around;
}
</style>