<template>

  <div style="text-align: left;padding-left:100px;margin-bottom:30px">
    <el-input v-model="tongzhibiao.tzbt" style="width:21%;margin-top:20px;margin-bottom: 20px" placeholder="标题"/>
    <el-input v-model="tongzhibiao.tznr" :rows="4" type="textarea" style="width:80%;margin-right: 20px" placeholder="内容"/>
    <el-button type="primary" @click="fabutongzhi">发布</el-button>
  </div>
  <div style="margin-bottom:30px">
    <el-input v-model="cxtj" style="width: 300px" placeholder="请输入" @input="mohuchaxun"/>
    <el-select placeholder="选择部门" style="width: 150px;margin-left: 30px" v-if="isbmcx">
      <el-option v-for="a in bmlist" @click="bumenchaxun(a.bmmc,1)">{{a.bmmc}}</el-option>
    </el-select>
  </div>
  <div style="height: 280px">
    <el-table :data="tzlist" style="width: 100%;">
      <el-table-column width="100"></el-table-column>
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="rzname" label="发布人" width="180" />
      <el-table-column prop="bmmc" label="所发部门" width="180" />
      <el-table-column prop="tzbt" label="标题"/>
      <el-table-column prop="tznr" label="内容" show-overflow-tooltip="true" />
      <el-table-column prop="tzsj" label="发布时间" />
      <el-table-column prop="tzyds" label="阅读数" />
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
  name: "Tongzhi",
  data(){
    return{
      tongzhibiao:{
        tzbt:'',
        tznr:''
      },
      bmlist:[],
      tzlist:[],
      zts:0,
      cxtj:'',
      isbmcx:false,
      pdtj:1,
      bmpdtj:'',
    }
  },
  methods:{
    fabutongzhi(){
        axios.post("/insertTongzhi",this.tongzhibiao).then((e)=>{
          if (e.data.data>0){
            this.tongzhibiao={
              tzbt:'',
              tznr:''
            }
            this.findallbmandtzjilu(1);
            this.$message.success("发布成功！")
          }
        })
    },
    findallbmandtzjilu(ys,sstj){
      axios.get("/findallbmandtzjilu?dqy="+ys+"&sstj="+sstj).then((e)=>{
            this.bmlist=e.data.data.bmlist;
            this.tzlist=e.data.data.tzlist;
            this.zts=e.data.data.zts*10;
            this.isbmcx=e.data.data.isbmcx
      })
    },
    fanye(ys){
      if(this.cxtj==''&&this.bmpdtj==''){
        this.pdtj=1
      }
      if(this.pdtj==1){
        this.findallbmandtzjilu(ys,"")
      }
      if(this.pdtj==2){
        this.findallbmandtzjilu(ys,this.cxtj)
      }
      if(this.pdtj==3){
        this.bumenchaxun(this.bmpdtj,ys)
      }

    },
    mohuchaxun(){
       this.pdtj=2;
      this.bmpdtj=''
       this.findallbmandtzjilu(1,this.cxtj)
    },
    bumenchaxun(bmmc,ym){
      this.bmpdtj=bmmc;
      this.pdtj=3;
      axios.get("/mohufindallbmandtzjilu?dqy="+ym+"&sstj="+bmmc).then((e)=>{
        this.bmlist=e.data.data.bmlist;
        this.tzlist=e.data.data.tzlist;
        this.zts=e.data.data.zts*10;
        this.isbmcx=e.data.data.isbmcx
      })
    }
  },
  created() {
    this.findallbmandtzjilu(1,"")
  }
}
</script>

<style scoped>

</style>