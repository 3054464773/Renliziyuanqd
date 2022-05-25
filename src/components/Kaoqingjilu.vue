<template>
<div style="display: flex;align-items: center;justify-content: center;margin-top: 80px">

  <el-input @input="findkaoqin(rzname,bmmc,dkzt,xzsj,1)" v-model="rzname" placeholder="请输入员工姓名" style="width: 250px;margin-right: 30px"/>

  <el-select @change="findkaoqin(rzname,bmmc,dkzt,xzsj,1)" placeholder="选择部门" v-model="bmmc" style="width: 150px;margin-right: 30px">
    <el-option :value="''"></el-option>
    <el-option v-for="a in this.bmlsit" :label="a.bmmc" :value="a.bmmc">{{a.bmmc}}</el-option>
  </el-select>

  <el-select @change="findkaoqin(rzname,bmmc,dkzt,xzsj,1)" placeholder="选择打卡状态" v-model="dkzt" style="width: 180px;margin-right: 30px">
    <el-option :value="''"></el-option>
    <el-option value="2" label="迟到">迟到</el-option>
    <el-option value="3" label="早退">早退</el-option>
    <el-option value="4" label="未打卡">未打卡</el-option>
  </el-select>

  <el-date-picker @change="findkaoqin(rzname,bmmc,dkzt,xzsj,1)" v-model="xzsj"  format="YYYY-MM-DD" value-format="YYYY-MM-DD" type="date" placeholder="选择时间" style="width: 120px;"/>
</div>

  <div style="height: 280px;margin-top: 80px">
    <el-table :data="kqlist" style="width: 100%;">
      <el-table-column width="50"></el-table-column>
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="rzname" label="员工姓名"  />
      <el-table-column prop="bmmc" label="部门" />
      <el-table-column prop="kqsbdksj" label="上班打卡时间" />
      <el-table-column prop="kqsbzt" label="上班打卡状态" >
        <template #default="scope">
          <span v-if="scope.row.kqsbzt==1">正常</span>
          <span v-if="scope.row.kqsbzt==2">迟到</span>
          <span v-if="scope.row.kqsbzt==3">早退</span>
          <span v-if="scope.row.kqsbzt==4">未打卡</span>
        </template>
      </el-table-column>
      <el-table-column prop="kqxbdksj" label="下班打卡时间" />
      <el-table-column prop="kqxbzt" label="下班打卡状态" >
        <template #default="scope">
          <span v-if="scope.row.kqxbzt==1">正常</span>
          <span v-if="scope.row.kqxbzt==2">迟到</span>
          <span v-if="scope.row.kqxbzt==3">早退</span>
          <span v-if="scope.row.kqxbzt==4">未打卡</span>
        </template>
      </el-table-column>
      <el-table-column prop="xzsj" label="时间" />
    </el-table>
  </div>

  <div style="display: flex;justify-content: center;margin-top:80px">
    <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="zts"
        @current-change="fanye" @next-click="fanye" @prev-click="fanye"
    />
  </div>
</template>

<script>
import axios from "../axios";
export default {
  name: "Kaoqingjilu",
  data(){
    return{
        kqlist:[],
        zts:0,
        bmlsit:[],
        rzname:'',
        bmmc:'',
        dkzt:'',
        xzsj:'',
    }
  },
  methods:{
    findkaoqin(rzname,bmmc,dkzt,xzsj,ym){
          axios.get("/findkaoqin?rzname="+rzname+"&bmmc="+bmmc+"&dkzt="+dkzt+"&xzsj="+xzsj+"&ym="+ym).then((e)=>{
                this.kqlist=e.data.data.kqlist
                this.zts=e.data.data.zts*10
                this.bmlsit=e.data.data.bmlist;
                console.log(e)
          })
    },
    fanye(ee){
      this.findkaoqin(rzname,bmmc,dkzt,xzsj,ee)
    }
  },
  created() {
      this.findkaoqin('','',0,'',1);
  }
}
</script>

<style scoped>

</style>