<template>
  <div style="display: flex;align-items: center;justify-content: center;margin-top: 30px">
    <el-input v-model="kqbiao.kqjqmc" placeholder="假期名称" style="width:200px;margin-right: 30px" />
    <el-select v-model="kqbiao.kqjqlx" placeholder="选择假期类型" style="width:130px;margin-right: 30px">
      <el-option value="1" label="个人类型">个人类型</el-option>
      <el-option value="2" label="考勤类型">考勤类型</el-option>
    </el-select>
    <el-button type="primary" @click="insertkqlx">确定</el-button>
  </div>

  <div style="margin-bottom:40px;margin-top:50px">
    <el-input v-model="cxtj" style="width: 300px" placeholder="请输入" @input="findkqlx(1)"/>
  </div>

  <div style="height: 280px;">
    <el-table :data="jqlxlist" style="width: 100%;">
      <el-table-column width="200"></el-table-column>
      <el-table-column type="index" label="序号" width="300"></el-table-column>
      <el-table-column prop="kqjqmc" label="假期名称" width="300" />
      <el-table-column prop="kqjqlx" label="假期类型" >
        <template #default="scope">
          {{scope.row.kqjqlx==1?'个人类型':'考勤类型'}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="danger" :icon="Delete" circle @click="shanchu(scope.row.kqjqbh)"/>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div style="display: flex;justify-content: center;margin-top:120px">
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
import axios from '../axios'
import {Edit,Delete} from "@element-plus/icons-vue";
export default {
  name: "Jiaqishezhi",
  data(){
    return{
        Edit:Edit,
        Delete:Delete,
        jqlxlist:[],
        zts:0,
        kqbiao:{
          kqjqlx:'',
          kqjqmc:''
        },
      cxtj:'',
    }
  },
  methods:{
    findkqlx(ym){
      axios.get("/findkqlx?ym="+ym+"&cxtj="+this.cxtj).then((e)=>{
            console.log(e)
            this.jqlxlist=e.data.data.jqlxlist;
            this.zts=e.data.data.zts*10;
      })
    },
    insertkqlx(){
      if(this.kqbiao.kqjqlx!=0&&this.kqbiao.kqjqmc.length!=0){
        axios.post("/insertkqlx",this.kqbiao).then((e)=>{
          if (e.data.data>0){
            this.$message.success("添加成功！")
            this.kqbiao={
              kqjqlx:'',
              kqjqmc:''
            }
            this.findkqlx(1);
          }
        })
      }else {
        this.$message.error("别乱点！")
      }

    },
    fanye(ee){
      this.findkqlx(ee)
    },
    shanchu(e){
      axios.get("/shanchu?jqid="+e).then((ee)=>{
              if (ee.data.data>0){
                this.$message.success("删除成功！")
                this.findkqlx(1)
              }else {
                this.$message.error("不可删除！")
              }
      })
    }
  },
  created() {
    this.findkqlx(1);
  }
}
</script>

<style scoped>

</style>