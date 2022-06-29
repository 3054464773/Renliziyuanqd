<template>
  <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="djkp"
  >
    <el-tab-pane label="招聘计划审核" name="a">
      <el-table :data="zpjihua" style="width: 100%">
        <el-table-column type="index" label="序号" width="100px"/>
        <el-table-column prop="zwmc" label="职位" width="180" />
        <el-table-column prop="zrs" label="人数" width="180" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click="shzpjh(1,scope.row.shjlbh)">通过</el-button>
            <el-button @click="shzpjh(2,scope.row.shjlbh)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>

    <el-tab-pane label="转正审核" name="b">
      <el-table :data="yggzjl" style="width: 100%">
        <el-table-column type="index" label="序号" width="100px"/>
        <el-table-column prop="rzname" label="姓名" width="180" />
        <el-table-column width="180" label="状态">
          <template #default="scope">
            <span v-if="scope.row.yggzzt==2">转正</span>
            <span v-if="scope.row.yggzzt==3">离职</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click="shygzz(1,scope.row.shjlbh,scope.row.ybh,scope.row.yggzzt)">通过</el-button>
            <el-button @click="shygzz(2,scope.row.shjlbh,scope.row.ybh,scope.row.yggzzt)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-tab-pane>



    <el-tab-pane label="Role" name="c">Role</el-tab-pane>
    <el-tab-pane label="Task" name="d">Task</el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from "../axios";
export default {
  name: "Shebaoshenhe",
  data(){
    return{
      activeName:'a',
      zpjihua:[],
      yggzjl:[]
    }
  },
  methods:{
    djkp( TabsPaneContext){
      if(TabsPaneContext.props.name=='a'){
        this.findzpjh()
      }else if(TabsPaneContext.props.name=='b'){
        this.findygzz()
      }
    },
    findzpjh(){
        axios.get("/findzpjh").then((e)=>{
              this.zpjihua=e.data.data;
        })
    },
    shzpjh(pdtj,shjlbh){
      axios.get("/shzpjh?pdtj="+pdtj+"&shjlbh="+shjlbh).then((e)=>{
          if (e.data.data>0){
            this.$message.success("操作成功！");
            this.findzpjh();
          }
      })
    },
    findygzz(){
      axios.get("/findyggzjl").then((e)=>{
          this.yggzjl=e.data.data
      })
    },
    shygzz(pdtj,shjlbh,ygid,ygzt){
        axios.get("/shygzz?pdtj="+pdtj+"&shjlbh="+shjlbh+"&ygid="+ygid+"&ygzt="+ygzt).then((e)=>{
            if (e.data.data>0){
              this.$message.success("操作成功！");
              this.findygzz()
            }
        })
    }
  },
  created() {
    this.findzpjh()
  }
}
</script>

<style scoped>

</style>