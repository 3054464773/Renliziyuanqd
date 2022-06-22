<template>

    <el-row style="height:100px">
      <el-col :span="12" >
        <el-input v-model="shname" @input="findallshlist(shname,1)" placeholder="请输入审核名称" style="width: 300px"/>
      </el-col>

      <el-col :span="12">
        <div style="text-align: left">
          <el-input v-model="shstl.shbmc" placeholder="请输入审核名称" style="width: 220px;margin-right: 30px"/>
          <el-select v-model="shstl.jsbh"  placeholder="选择所需权限" style="margin-right: 30px">
            <el-option v-for="a in jslist" :value="a.jsbh" :label="a.jsmc"/>
          </el-select>
          <el-button type="primary" round @click="insertshenhe">确定添加</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row style="height:400px">
      <el-col :span="12">
        <el-table @row-dblclick="findsxqx" :data="shlist" style="width: 100%;height: 280px;">
          <el-table-column width="70px"/>
          <el-table-column type="index" label="序号" width="150px"></el-table-column>
          <el-table-column prop="shbmc" label="审核名称" width="180px" />
          <el-table-column prop="jsmc" label="所需权限" width="160px"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="danger" :icon="Delete" circle @click="deleteshenhe(scope.row.shbid)"/>
              <el-button type="primary" :icon="Edit" circle @click="tk(scope.row.shbid)" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table :data="sxlist" style="width: 100%;height: 280px">
          <el-table-column width="120px"/>
          <el-table-column type="index" label="序号" width="150px"></el-table-column>
          <el-table-column prop="jsmc" label="所需审核权限"  />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="danger" :icon="Delete" circle @click="deletesxqx(scope.row)"/>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row style="height:185px">
      <el-col :span="12">
        <div style="display: flex;justify-content: center;align-items: center">
          <el-pagination background layout="prev, pager, next" :total="zts" />
        </div>
      </el-col>

      <el-col :span="12">
        <div style="display: flex;justify-content: center;align-items: center">
          <el-pagination background layout="prev, pager, next" :total="zts2" />
        </div>
      </el-col>
    </el-row>


  <el-dialog
      v-model="dialogVisible"
      title="添加审核所需流程"
      width="30%"

  >
    <el-select v-model="shstl2.jsbhh" :multiple="true"  placeholder="选择所需权限" style="margin-right: 30px">
      <el-option v-for="a in jslist2" :value="a.jsbh" :label="a.jsmc"/>
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false,shstl2={
        shbid:'',
        jsbh:[]
      }">取消</el-button>
        <el-button type="primary" @click="insertsxqxx"
        >确定</el-button
        >
      </span>
    </template>
  </el-dialog>


</template>

<script>
import axios from  '../axios'
import {Edit,Delete} from "@element-plus/icons-vue";
export default {
  name: "Shenheshezhi",
  data(){
    return{
      Edit:Edit,
      Delete:Delete,
      shname:'',
      shlist:[],
      zts:0,
      sxlist:[],
      zts2:0,
      jslist:[],
      shstl:{
        shbmc:'',
        jsbh:''
      },
      dialogVisible:false,
      jslist2:[],
      shstl2:{
        shbid:'',
        jsbhh:[]
      }

    }
  },
  methods:{
      findallshlist(shname,ym){
        this.sxlist=[];
        axios.get("/findallshenhe?shname="+shname+"&ym="+ym).then((e)=>{
              this.shlist=e.data.data.shlist;
              this.zts=e.data.data.zts*10;
              this.jslist=e.data.data.jslist;
        })
      },
     findsxqx(row){
        axios.get("/findsxqx?ym="+1+"&shbid="+row.shbid).then((e)=>{
          this.sxlist=e.data.data.sxlist;
          this.zts2=e.data.data.zts*10;
        })
     },
    insertshenhe(){
        axios.post("/insertshenhe",this.shstl).then((e)=>{
            if (e.data.data>0){
              this.$message.success("添加成功！")
              this.shstl={
                    shbmc:'',
                    jsbh:''
              }
              this.findallshlist(this.shname,1);
            }
        })
    },
    deleteshenhe(id){
        axios.delete("/deleteshenhe/"+id).then((e)=>{
              if (e.data.data>0){
                this.$message.success("删除成功！")
                this.findallshlist(this.shname,1)
              }else {
                this.$message.error("不能删除！")
              }
        })
    },
    deletesxqx(row){
        axios.delete("/deletesxqx/"+row.shsxid).then((e)=>{
              if(e.data.data>0){
                this.$message.success("删除成功！")
                this.findsxqx(row);
              }
        })
    },
    tk(id){
        this.dialogVisible=true;
        this.shstl2.shbid=id;
        axios.get("/insertsxqx?id="+id).then((e)=>{
              this.jslist2=e.data.data
        })
    },
    insertsxqxx(){
        console.log(this.shstl2)
       axios.post("/insertsxqxx",this.shstl2).then((e)=>{
            this.$message.success("添加成功！");
            this.shstl2={
                shbid:'',
                jsbhh:[]
         }
       })
    }
  },
  created() {
    this.findallshlist(this.shname,1)
  }
}
</script>

<style scoped>

</style>