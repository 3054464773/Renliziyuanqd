<template>
  <div>
    <div style="margin-top: 10px">
      <el-input @input="chaxuncd" v-model="cxtj" style="width: 200px;margin-right: 10px" placeholder="请输入菜单名称"/><el-button type="primary" @click="this.dialogVisibletwo=true">添加菜单</el-button>
    </div>
    <div style="height: 238px;margin-top: 10px">
      <el-table :data="cdlist" style="width: 100%">
        <el-table-column width="100px"/>
        <el-table-column  label="序号" type="index" width="180"/>
        <el-table-column  label="路由地址" width="230" >
          <template #default="scope">
            <el-input style="width: 150px" v-model="scope.row.qdlydz"/>
          </template>
        </el-table-column>

        <el-table-column label="路由名称" width="230" >
          <template #default="scope">
            <el-input style="width: 150px" v-model="scope.row.qdlymc"/>
          </template>
        </el-table-column>

        <el-table-column  label="组件名称" width="230">
          <template #default="scope">
            <el-input style="width: 150px" v-model="scope.row.qdzjmc"/>
          </template>
        </el-table-column>

        <el-table-column  label="菜单名称"  width="230">
          <template #default="scope">
            <el-input style="width: 150px" v-model="scope.row.qdcdmc"/>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="success" @click="updatecd(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="display: flex;justify-content: center;margin-top: 10px">
      <el-pagination background layout="prev, pager, next" :total="zts" @current-change="xiayiye" @next-click="xiayiye" @prev-click="xiayiye" />
    </div>
    <el-dialog
        v-model="dialogVisibletwo"
        title="添加菜单"
        width="30%"
        destroy-on-close="true"
    >
      <strong>路由地址:</strong><el-input style="width: 180px;display: inline-block;margin-left: 30px" v-model="cdstl.qdlydz"/><br>
      <strong>路由名称:</strong><el-input style="width: 180px;display: inline-block;margin-left: 30px"  v-model="cdstl.qdlymc"/><br>
      <strong>组件名称:</strong><el-input style="width: 180px;display: inline-block;margin-left: 30px"  v-model="cdstl.qdzjmc"/><br>
      <strong>菜单名称:</strong><el-input style="width: 180px;display: inline-block;margin-left: 30px"  v-model="cdstl.qdcdmc"/><br>

      <el-button style="margin-top: 10px" type="danger" @click="this.dialogVisibletwo=false">取消</el-button>
      <el-button style="margin-top: 10px" type="primary" @click="insertcd">确定</el-button>
    </el-dialog>
  </div>


  <div>
    <div>
      <el-input style="width: 200px" placeholder="请输入菜单名称"/><el-button>添加菜单</el-button>
    </div>
    <div>
      <el-table :data="cdlist" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
    <div>
      <el-pagination background layout="prev, pager, next" :total="1000" />
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import {Edit,Delete,Check} from "@element-plus/icons-vue";
export default {
  name: "Fpygyemian",
  data(){
    return{
      Check:Check,
      cdlist:[],
      zts:0,
      cxtj:'',
      dialogVisibletwo:false,
      cdstl:{
        qdlydz:'',
        qdlymc:'',
        qdzjmc:'',
        qdcdmc:''
      }
    }
  },
  methods:{
    findallqd(ym,cxtj){
      axios.get("/findallqd?ym="+ym+"&cxtj="+cxtj).then((e)=>{
        this.cdlist=e.data.data.cdlsit
        this.zts=e.data.data.zts*10
      })
    },
    xiayiye(ym){
      this.findallqd(ym,this.cxtj)
    },
    chaxuncd(){
      this.findallqd(1,this.cxtj)
    },
    updatecd(qd){
      axios.post("/updatecd",qd).then((e)=>{
        if (e.data.data>0){
          this.$message.success("修改成功！")
          this.findallqd(1,"");
        }
      })
    },
    insertcd(){
      axios.post("/insertcd",this.cdstl).then((e)=>{
        if (e.data.data>0){
          this.$message.success("新增成功")
          this.cdstl={}
          this.dialogVisibletwo=false
          this.findallqd(1,"")
        }
      })
    }
  },
  created() {
    this.findallqd(1,this.cxtj)
  }
}
</script>

<style scoped>

</style>