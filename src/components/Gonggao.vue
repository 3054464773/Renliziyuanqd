<template>
  <div style="text-align: left;padding-left:100px;margin-bottom:30px">
    <el-input v-model="ggbiao.ggbt"  style="width:21%;margin-top:20px;margin-bottom: 20px" placeholder="标题"/>
    <el-input v-model="ggbiao.ggnr" :rows="4" type="textarea" style="width:80%;margin-right: 20px" placeholder="内容"/>
    <el-button type="primary" @click="fabutongzhi">发布</el-button>
  </div>
  <div style="margin-bottom:30px">
    <el-input v-model="cxtj" style="width: 300px" placeholder="请输入" @input="mohuchaxun"/>
  </div>






  <div style="height: 280px">
    <el-table :data="gglist" style="width: 100%;">
      <el-table-column width="100"></el-table-column>
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="rzname" label="发布人" width="180" />
      <el-table-column prop="ggbt" label="标题"/>
      <el-table-column prop="ggnr" label="内容" show-overflow-tooltip="true" />
      <el-table-column prop="ggsj" label="发布时间" />
      <el-table-column prop="ggyds" label="阅读数" />
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
</template>

<script>
import axios from '../axios'
export default {
  name: "Gonggao",
  data(){
    return{
      ggbiao:{
        ggbt:'',
        ggnr:'',
      },
      gglist:[],
      zts:0,
      cxtj:''
    }
  },
  methods:{
    fabutongzhi(){
      axios.post("/fabugonggao",this.ggbiao).then((e)=>{
            if(e.data.data>0){
                this.ggbiao={
                  ggbt:'',
                  ggnr:'',
                }
                this.$message.success("发布成功！")
            }
      })
    },
    findallgg(ym,cxtj){
      axios.get("/findallgg?page="+ym+"&cxtj="+cxtj).then((e)=>{
            this.gglist=e.data.data.gglist;
            this.zts=e.data.data.zts*10;
      })
    },
    fanye(ee){
      if(this.cxtj==''){
        this.findallgg(ee,"");
      }else {
        this.findallgg(ee,this.cxtj);
      }
    },
    mohuchaxun(){
      this.findallgg(1,this.cxtj);
    }
  },
  created() {
    this.findallgg(1,'')
  }
}
</script>

<style scoped>

</style>