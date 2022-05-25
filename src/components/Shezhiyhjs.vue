<template>
  <el-input v-model="cxtj" @input="chaxunff" placeholder="请输入用户名称"  style="width:300px;margin-top: 40px;margin-bottom: 40px"/>
    <el-table :data="ygsj" style="width: 100%;height:430px;">
      <el-table-column  width="195"></el-table-column>
      <el-table-column type="index" label="序号" width="190"></el-table-column>
      <el-table-column prop="rzname" label="名字" width="200" />
      <el-table-column prop="zwmc" label="职位" width="200" />
      <el-table-column label="角色" width="250" >
        <template #default="scope">
          <el-tag v-for="a in scope.row.jslist"  @close="shanchujs(scope.row,a)" closable  >{{a.jsmc}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="新增权限"  >
        <template #default="scope">
          <el-button type="primary" @click="tjjs(scope.row)">添加</el-button>
        </template>

      </el-table-column>

    </el-table>
  <div style="width: 100%;display: flex;align-items: center;justify-content: center;margin-top:50px">
    <el-pagination background layout="prev, pager, next" :total="10" />
  </div>
  <el-dialog
      v-model="dialogVisible"
      title="添加用户角色"
      width="70%"

  >

      <el-table @select-all="xzjsshijian" @select="xzjsshijian" :data="jslist" style="width: 100%">
        <el-table-column width="130"/>
        <el-table-column type="selection"  />
        <el-table-column type="index" label="序号" width="60"/>
        <el-table-column prop="jsmc" label="角色名称" />
        <el-table-column label="权限列表" >
          <template #default="scope" >
            <el-tag v-for="a in scope.row.qxmc"  >{{a}}</el-tag>
          </template>
        </el-table-column>
      </el-table>


    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="xinzen"
        >确定</el-button
        >
      </span>
    </template>
  </el-dialog>

</template>

<script>
import axios from '../axios'
export default {
  name: "Shezhiyhjs",
  data(){
    return{
      xzjssj:[],
      ygsj:[],
      dialogVisible:false,
      jslist:[],
      jsdgsj:{
          ybh:0,
          rzname:'',
          zwmc:'',
          jslist:[]
      },
      xzyhjs:{
        ybh:0,
        jsbhs:[],
      },
      cxtj:'',
    }
  },
  created() {
    this.findallygjs()
  },
  methods:{
    xinzen(){
      this.xzyhjs.ybh=this.jsdgsj.ybh
      for(var i=0;i<this.xzjssj.length;i++){
        this.xzyhjs.jsbhs.push(this.xzjssj[i].jsbh)
      }
      console.log(this.xzyhjs)
      axios.post("/xzyhjs",this.xzyhjs).then((e)=>{
          if(e.data.data>0){
            this.dialogVisible=false;
            this.$message.success("新增成功！")
            this.xzyhjs={
              ybh:0,
              jsbhs:[],
            }
            this.findallygjs();

          }
      })
    },
    xzjsshijian(selection, row){
      this.xzjssj=selection

      // console.log(this.xzjssj[0].jsbh)
    },
    tjjs(a){
      this.jsdgsj=a;
      axios.post("/findalljs",this.jsdgsj).then((e)=>{
        console.log(e)
        this.jslist=e.data.data
        this.dialogVisible=true
      })
    },
    findallygjs(){
      axios.get("/findallygjs").then((e)=>{
        this.ygsj=e.data.data
      })
    },
    shanchujs(a,b){
      console.log(b)
      axios.delete("/deleteygjs?ybh="+a.ybh+"&jsid="+b.jsbh).then((e)=>{
          if (e.data.data>0){
            a.jslist.splice(a.jslist.indexOf(b),1)
          }
      })
    },
    chaxunff(){
      axios.get("/mohufindallygjs?cxtj="+this.cxtj).then((e)=>{
        this.ygsj=e.data.data
      })
    }
  }
}
</script>

<style scoped>

</style>