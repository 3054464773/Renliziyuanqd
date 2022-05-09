<template>
  <el-tabs
      :model-value="mrxz"
      type="card"
      class="demo-tabs"
  >
    <el-tab-pane label="新增权限" name="1">
      <div style="text-align: center">
        <el-transfer
            v-model="weiyongyou"
            style="text-align: left; display: inline-block"
            filterable
            :titles="['未拥有', '已选中']"
            :button-texts="['取消', '添加']"
            :data="weiyongyousj"
            filter-placeholder="请输入权限名称"
        >
          <template #right-footer>
            <el-button class="transfer-footer" size="small"  type="primary" @click="xinzen" :disabled="isjy">确定修改</el-button>
          </template>
        </el-transfer>
      </div>
    </el-tab-pane>

    <el-tab-pane label="移除权限" name="2">
      <div style="text-align: center">
        <el-transfer
            v-model="yiyongyou"
            style="text-align: left; display: inline-block"
            filterable
            :titles="['已拥有', '已选中']"
            :button-texts="['取消', '移除']"
            :data="yiyongyousj"
            filter-placeholder="请输入权限名称"
        >
          <template #right-footer>
            <el-button class="transfer-footer" size="small"  type="primary" @click="shanchu" >确定修改</el-button>
          </template>
        </el-transfer>
      </div>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
import axios from "../axios";
export default {
  props:{
    yiyongyousj:Array,
    weiyongyousj:Array,
    jsid:Number
  },
  name: "JiaoseQuanxian",
  data(){
    return{
      mrxz:'1',
      isjy:true,
      yiyongyou:[],
      weiyongyou:[]
    }
  },
  watch:{
    weiyongyou(a,b){
      if(a.length>0){
        this.isjy=false
      }else {
        this.isjy=true
      }
    }
  },
  created() {

  },
  methods:{
    xinzen(){
     axios.get("/insertjiaoseqx?jsid="+this.jsid+"&qxs="+this.weiyongyou).then((e)=>{
        if(e.data.data==true){
          this.$emit('shuaxin');
        }
     })
    },
    shanchu(){
      axios.get("/deletejiaoseqx?jsid="+this.jsid+"&qxs="+this.yiyongyou).then((e)=>{
        if(e.data.data==true){
          this.$emit('shuaxin');
        }
      })

    }
  }
}
</script>

<style >
.transfer-footer {
  margin-left: 15px;
  padding: 6px 5px;
}
.demo-tabs{
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>