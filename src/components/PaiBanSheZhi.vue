<template>
<div style="display: flex;align-items: center;justify-content: center;margin-top:100px;margin-bottom:80px">
<el-input v-model="bcbiao.bcmc" placeholder="班次名称" style="width:250px;margin-right: 30px"/>
  <div class="demo-time-range">
    <el-time-select
        v-model="bcbiao.bckssj"
        placeholder="上班时间"
        start="00:30"
        step="00:30"
        end="24:00"

        style="width:150px;margin-right: 30px"
    />
    <el-time-select
        v-model="bcbiao.bcjssj"
        placeholder="下班时间"
        start="00:00"
        step="00:15"
        end="24:00"

        style="width:150px;margin-right: 30px"
    />
  </div>
  <el-button type="primary" round @click="xinzenbanci">确定</el-button>
</div>

  <div style="height: 280px">
    <el-table :data="bclist" style="width: 100%;">
      <el-table-column width="100"></el-table-column>
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="bcmc" label="班次名称" width="180" />
      <el-table-column prop="bckssj" label="上班时间" width="180" />
      <el-table-column prop="bcjssj" label="下班时间"/>
      <el-table-column label="操作" >
        <template #default="scope">
          <el-button  type="primary" :icon="Edit" circle @click="dakai(scope.row)" />
          <el-button type="danger" :icon="Delete" circle  @click="shanchubanci(scope.row.bcbh)"/>
        </template>
      </el-table-column>
    </el-table>
  </div>


  <div style="display: flex;justify-content: center;margin-top:50px">
    <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="zts"
        @current-change="fanye" @next-click="fanye" @prev-click="fanye"
    />
  </div>

  <el-dialog
      v-model="dialogVisible"
      title="修改班次"
      width="50%"
  >
     <div style="display: flex;align-items: center;justify-content: center">
       <el-input v-model="bcbiao2.bcmc" style="width:150px;margin-right: 30px"/>
       <el-time-select
           v-model="bcbiao2.bckssj"
           placeholder="上班时间"
           start="00:30"
           step="00:30"
           end="24:00"

           style="width:150px;margin-right: 30px"
       />
       <el-time-select
           v-model="bcbiao2.bcjssj"
           placeholder="下班时间"
           start="00:00"
           step="00:15"
           end="24:00"

           style="width:150px;margin-right: 30px"
       />
     </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="xiugaibanci"
        >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {Edit,Delete} from "@element-plus/icons-vue";
import axios from '../axios'
export default {
  name: "PaiBanSheZhi",
  data(){
    return{
      Edit:Edit,
      Delete:Delete,
      startTime:'',
      endTime:'',
      bcbiao:{
        bcmc:'',
        bckssj:'',
        bcjssj:''
      },
      bcbiao2:{
        bcbh:'',
        bcmc:'',
        bckssj:'',
        bcjssj:''
      },
      bclist:[],
      zts:0,
      dialogVisible:false
    }
  },
  methods:{
    xinzenbanci(){
      axios.post("/insertbanci",this.bcbiao).then((e)=>{
              if(e.data.data>0){
                this.bcbiao={
                      bcmc:'',
                      bckssj:'',
                      bcjssj:''
                }
                this.findbanci(1)
                this.$message.success("添加成功！")
              }
      })
    },
    findbanci(ym){
      axios.get("/findbanci?ym="+ym).then((e)=>{
              this.bclist=e.data.data.bclist;
              this.zts=e.data.data.zts*10;
      })
    },
    fanye(ee){
      this.findbanci(ee);
    },
    shanchubanci(bcid){
        axios.delete("/shanchubanci/"+bcid).then((e)=>{
            if (e.data.data>0){
              this.findbanci(1)
              this.$message.success("删除成功！")
            }else {
              this.$message.error("不可删除！")
            }
        })
    },
    xiugaibanci(){
        axios.put("/xiugaibanci",this.bcbiao2).then((e)=>{
            if(e.data.data>0){
              this.dialogVisible=false;
              this.findbanci(1);
              this.$message.success("修改成功！");
            }
        })
    },
    dakai(e){
      this.dialogVisible=true;
      this.bcbiao2=e;
    }
  },
  created() {
    this.findbanci(1);
  }
}
</script>

<style scoped>

</style>