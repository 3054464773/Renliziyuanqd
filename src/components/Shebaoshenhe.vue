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

    <el-tab-pane label="转正/离职审核" name="b">
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

    <el-tab-pane label="请假审核" name="c">
      <el-table :data="yggzjl2" style="width: 100%">
        <el-table-column type="index" label="序号" width="100px"/>
        <el-table-column prop="rzname" label="姓名" width="180" />
        <el-table-column prop="jqsqkssj" label="开始时间" width="180" />
        <el-table-column prop="jqsqjssj" label="结束时间" width="180" />
        <el-table-column prop="kqjqmc" label="休假类型" width="180" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click="shygqj(1,scope.row.shjlbh)">通过</el-button>
            <el-button @click="shygqj(2,scope.row.shjlbh)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>



    <el-tab-pane label="出差审核" name="d">
      <el-table :data="ygcc" style="width: 100%">
        <el-table-column type="index" label="序号" width="100px"/>
        <el-table-column prop="rzname" label="姓名" width="130" />
        <el-table-column prop="ccfd" label="出发地" width="130" />
        <el-table-column prop="cmdd" label="目的地" width="130" />
        <el-table-column prop="ckssj" label="开始时间" width="130" />
        <el-table-column prop="cyjsj" label="结束时间" width="130" />
        <el-table-column prop="cccnr" label="出差内容" width="130" />
        <el-table-column  label="状态" width="130" >未出发</el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click="shygcc(1,scope.row.shjlbh)">通过</el-button>
            <el-button @click="shygcc(2,scope.row.shjlbh)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>


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
      yggzjl:[],
      yggzjl2:[],
      ygcc:[]
    }
  },
  methods:{
    djkp( TabsPaneContext){
      if(TabsPaneContext.props.name=='a'){
        this.findzpjh()
      }else if(TabsPaneContext.props.name=='b'){
        this.findygzz()
      }else if(TabsPaneContext.props.name=='c'){
        this.findqj()
      }else  if(TabsPaneContext.props.name=='d'){
        this.findygcc()
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
    },
    findqj(){
      axios.get("/findqj").then((e)=>{
              this.yggzjl2=e.data.data
      })
    },
    shygqj(pdtj,shjlbh){
      axios.get("/shygqjia?pdtj="+pdtj+"&shjlbh="+shjlbh).then((e)=>{
           this.$message.success("操作成功！");
            this.findqj()
      })
    },
    findygcc(){
      axios.get("/findygcc").then((e)=>{
          this.ygcc=e.data.data
      })
    },
    shygcc(pdtj,shjlbh){
      axios.get("/shygcc?pdtj="+pdtj+"&shjlbh="+shjlbh).then((e)=>{
        this.$message.success("操作成功！");
        this.findygcc()
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