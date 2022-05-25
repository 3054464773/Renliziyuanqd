<!--绩效月报-->
<template>
  <div class="dataView">

    <el-card>
      <div class="score">
            <el-select clearable placeholder="按部门查看" v-model="value" style="width: 120px;margin-left: 300px" @change="ScaleHandleChange">
              <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item,index) in options"
                  :key="index">
                {{item.label}}
              </el-option>
            </el-select>
          <div id="main1" class="plateScale" style="width:100%;height:500px"></div>
      </div>
   </el-card>

<!--    <el-card>-->
<!--      <div id="main2"></div>-->
<!--    </el-card>-->

  </div>
</template>

<script>
import echarts from 'echarts'
import axios from "../axios";
export default {
  name:'KPIscore',
  data() {
    return {
      name:[],
      num:[],
      value:'',
      scalelates:1,
      options:[
        {
          value:1,
          label:'保安部',
        },
        {
          value:2,
          label:'市场部',
        },
        {
          value:3,
          label:'研发部',
        }
      ]
    }
  },
   mounted() {
    //进入页面就显示公司所有部门的绩效
     this.initChart();
   },
  methods:{
    ScaleHandleChange(value){
      this.scalelates=value
      this.setChart();
    },

    //查询所有部门绩效的方法
    initChart(){
      //初始化echarts实例
      this.chart=echarts.init(document.getElementById("main1"));
      this.chart.setOption({
        title: {
          text:"绩效月报统计"
        },
        //tip提示
        tooltip: {},
        legend: {
          data:['人数']
        },
        //x轴坐标
        xAxis: {
          data:[]
        },
        //y轴坐标
        yAxis: {},
        series: [
          {
            name:"人数",
            type:"bar",
            data:[]
          }
        ],
      });
        axios.get("findAllScore").then(res => {
          //console.log(this.item.value)
          console.log('访问后台');
          console.log(res.data);
          //后台取值赋值给前端
          this.name = res.data.data.name
          this.num = res.data.data.num
          //后台取值过来赋给echarts实例
          this.chart.setOption({
            xAxis: {
              data: this.name
            },
            series: [
              {
                name: "人数",
                type: "bar",
                data: this.num
              }
            ]
          })
        });
      },
    setChart(){
      //初始化echarts实例
      this.chart=echarts.init(document.getElementById("main1"));
      this.chart.setOption({
        title: {
          text:"绩效月报统计"
        },
        //tip提示
        tooltip: {},
        legend: {
          data:['人数']
        },
        //x轴坐标
        xAxis: {
          data:[]
        },
        //y轴坐标
        yAxis: {},
        series: [
          {
            name:"人数",
            type:"bar",
            data:[]
          }
        ],
      });

      //选择框的value值传给后端
      if(this.scalelates==1) {
        axios.get("findAllScoreByBmbh?bmbh=1").then(res => {
          console.log('访问后台');
          console.log(res.data);
          //后台取值赋值给前端
          this.name = res.data.data.name
          this.num = res.data.data.num
          this.chart.setOption({
            xAxis: {
              data: this.name
            },
            series: [
              {
                name: "人数",
                type: "bar",
                data: this.num
              }
            ]
          })
        });
      }else if (this.scalelates==2){
        axios.get("findAllScoreByBmbh?bmbh=2").then(res => {
          //console.log(this.item.value)
          console.log('访问后台');
          console.log(res.data);
          //后台取值赋值给前端
          this.name = res.data.data.name
          this.num = res.data.data.num
          this.chart.setOption({
            xAxis: {
              data: this.name
            },
            series: [
              {
                name: "人数",
                type: "bar",
                data: this.num
              }
            ]
          })
        });
      }else if(this.scalelates==3){
        axios.get("findAllScoreByBmbh?bmbh=3").then(res => {
          //console.log(this.item.value)
          console.log('访问后台');
          console.log(res.data);
          //后台取值赋值给前端
          this.name = res.data.data.name
          this.num = res.data.data.num
          this.chart.setOption({
            xAxis: {
              data: this.name
            },
            series: [
              {
                name: "人数",
                type: "bar",
                data: this.num
              }
            ]
          })
        });
      }else if(this.scalelates==0){
        axios.get("findAllScore").then(res => {
          //console.log(this.item.value)
          console.log('访问后台');
          console.log(res.data);
          //后台取值赋值给前端
          this.name = res.data.data.name
          this.num = res.data.data.num
          this.chart.setOption({
            xAxis: {
              data: this.name
            },
            series: [
              {
                name: "人数",
                type: "bar",
                data: this.num
              }
            ]
          })
        });
      }
    }
  }

}
</script>

<style>
.dataView {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.dataView .el-card {
  width: 100%;
  height: 680px;
}
.score{
  width: 50%;
  height: 600px;
  margin-left: 200px;
}

.dataView .el-card #main1{
  height: 500px;
}

</style>