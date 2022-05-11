<template>

    <el-tabs
        type="card"
        class="demo-tabs"
        :model-value="bqk"
        @tab-click="djxxk"
    >
      <el-tab-pane label="部门管理" name="second">

        <div class="qxheaddiv">
          <el-input  v-model="bmname" placeholder="请输入您要查找的部门名称" />
          <el-button type="primary" @click="chaxun" plain>查询</el-button>
          <el-button type="success" @click="xinzengquanxian" plain>新增部门</el-button>
        </div>

        <div class="qxheaddivtwo">
          <el-table :data="bmlist" @row-click="djtb" style="width: 100%">
            <el-table-column  width="110" />
            <el-table-column  type="index" label="序号" width="150" />
            <el-table-column prop="bmmc" label="部门名称" width="220" />
            <el-table-column prop="bmjs" label="部门介绍" width="220"  />
            <el-table-column prop="bmsj" label="部门创建时间" width="380"  />

            <el-table-column label="编辑" width="70" >
              <template #default="scope">
                <el-button @click.stop="bianjibm(scope.row)" type="primary" :icon="Edit" circle />
              </template>
            </el-table-column>

            <el-table-column label="删除"  width="70" >
              <template #default="scope">
                <div @click.stop>
                  <el-popconfirm title="确定删除删吗？"  @confirm.stop="shanchubm(scope.row)" confirmButtonText="确定" cancelButtonText="取消">
                    <template #reference>
                      <el-button type="danger" :icon="Delete" circle />
                    </template>
                  </el-popconfirm>
                </div>

              </template>
            </el-table-column>

            <el-table-column label="新增职位">
              <template #default="scope">
                    <el-button @click.stop="xinzengquanxian2(scope.row)" type="primary" :icon="Check" circle />
              </template>

            </el-table-column>

          </el-table>
          <el-empty description="没有找到可用数据！" v-if="iszdsj"/>
        </div>

        <div class="qxheaddivthree">
          <el-pagination background  layout="prev, pager, next" :total="zts" @current-change="xiayiye" @next-click="xiayiye" @prev-click="xiayiye"/>
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
          <el-input  v-model="zwname" placeholder="请输入您要查找的职位名称" />
          <el-button type="primary" @click="chaxun2" plain>查询</el-button>

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
                <el-button @click="bianjizw2(scope.row)" type="primary" :icon="Edit" circle />
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
          <el-empty description="没有找到可用数据！" v-if="iszdsj2"/>
        </div>
        <div class="qxheaddivthree">
          <el-pagination background layout="prev, pager, next" :total="zts2" @current-change="xiayiye2" @next-click="xiayiye2" @prev-click="xiayiye2"/>
        </div>

      </el-tab-pane>

    </el-tabs>
  <el-dialog
      v-model="dialogVisible2"
      title="操作弹框"
      width="30%"
  >
    <el-form
        ref="zwstl"
        :model="zwstl"
        label-width="120px"
        class="demo-ruleForm"
        :rules="rules2"
    >
      <el-form-item label="职位名称" prop="zwmc">
        <el-input v-model="zwstl.zwmc" />
      </el-form-item>
      <el-form-item label="职位介绍" prop="zwjs">
        <el-input v-model="zwstl.zwjs" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="xinzenandxiugai2('zwstl')">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {Edit,Delete,Check} from "@element-plus/icons-vue";
import axios from "../axios";
export default {
  name: "Bumen",
  data(){
    return{
      bqk:'second',
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
      rules2: {
        zwmc: [
          { required: true, message: '请输入职位名称', trigger: 'blur' },
          { min: 4, message: '长度最少4个字符', trigger: 'blur' }
        ],
        zwjs: [
          { required: true, message: '请输入职位介绍', trigger: 'blur' },
          { min: 4, message: '长度最少4个字符', trigger: 'blur' }
        ]
      },
      Check:Check,
      Edit:Edit,
      Delete:Delete,
      bmlist:[],
      zwlist:[],
      zts:0,
      zts2:0,
      bmname:'',
      zwname:'',
      iszdsj:false,
      iszdsj2:false,
      bmstl:{
        bmbh:'',
        bmmc:'',
        bmjs:'',
        bmsj:''
      },
      zwstl:{
        zwbh:'',
        bmbh:'',
        zwjs:'',
        zwmc:'',
        zwsj:'',
      },
      dialogVisible:false,
      dialogVisible2:false,
      pdxzorxg:true,
      pdxzorxg2:true,
      bmid:''
    }
  },
  created() {
    this.findallbm()
  },
  methods:{
    djxxk(TabsPaneContext,Event){
      this.zwname='',
      this.bmid='',
      this.bmname='',
      this.bqk='second';
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
    chaxun2(){
      axios.get("/mohufindallzw?page=1&zwname="+this.zwname).then((e)=>{
        this.zwlist=e.data.data.zwlist
        this.zts2=parseInt(e.data.data.zys)*10
        if(e.data.data.zwlist.length==0){
          this.iszdsj2=true
        }else {
          this.iszdsj2=false
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
    xiayiye2(ee){
      if(this.zwname==''&&this.bmid==''){
        axios.get("/findallzw?ym="+ee).then((e)=>{
          this.zwlist=e.data.data.zwlist;
          this.zts2=parseInt(e.data.data.zts)*10;
        })
      }else if(this.zwname==''&&this.bmid!=''){
        axios.get("inidfindzw?id="+this.bmid+"&ym="+ee).then((e)=>{
          this.zwlist=e.data.data.zwlist;
          this.zts2=e.data.data.zts*10;
        })
      } else {
        axios.get("/mohufindallzw?page="+ee+"&zwname="+this.zwname).then((e)=>{
          this.zwlist=e.data.data.zwlist
          this.zts2=parseInt(e.data.data.zys)*10
        })
      }
    },
    shanchubm(e){
      axios.delete("/deletebm?bmbh="+e.bmbh).then((e)=>{
        if (e.data.data=='yes'){
          this.$message.success("删除成功！")
          this.findallbm()
        }else {
          this.$message.error("不能删除，该部门下有职位！")
        }
      })
    },
    xinzengquanxian(){
      this.pdxzorxg=true;
      this.dialogVisible = true;
      this.bmstl={};
    },
    xinzengquanxian2(e){
      this.pdxzorxg2=true;
      this.dialogVisible2 = true;
      this.zwstl={};
      this.zwstl.bmbh=e.bmbh
    },
    bianjibm(e){
      this.bmstl=e;
      this.dialogVisible=true
      this.pdxzorxg=false;
    },
    bianjizw2(e){
      this.zwstl=e;
      this.dialogVisible2=true
      this.pdxzorxg2=false;
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
                this.$message.success("修改成功！")
                this.findallbm()
              }
            })
          }
        } else {
          return false;
        }
      });
    },
    xinzenandxiugai2(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.pdxzorxg2){
            console.log(this.zwstl)
            axios.post("/insertzw",this.zwstl).then((e)=>{
              if (e.data.data){
                this.dialogVisible2=false
                this.$message.success("新增成功！")
                this.findallzw()
              }
            })
          }else {
            //updatquanxian
            axios.put("/updatzw",this.zwstl).then((e)=>{
              if (e.data.data){
                this.dialogVisible2=false
                this.$message.success("修改成功！")
                this.findallzw()
              }
            })
          }
        } else {
          return false;
        }
      });
    },
    djtb(row, column, event){
      this.bmid=row.bmbh
      axios.get("inidfindzw?id="+row.bmbh+"&ym=1").then((e)=>{
          this.zwlist=e.data.data.zwlist;
          this.zts2=e.data.data.zts*10;
      })
      this.bqk='first';
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