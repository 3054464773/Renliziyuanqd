<!--绩效月报-->
<template>
  <div class="dataView">
    <el-card>
      <div id="main1"></div>
    </el-card>
    <el-card>
      <div id="main2"></div>
    </el-card>

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
      num:[]
    }
  },
  mounted() {
    this.setChart();
  },
  methods:{
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

      axios.get("findAllScore").then(res=>{
        console.log('访问后台');
        console.log(res.data);
        //后台取值赋值给前端
        this.name=res.data.data.name
        this.num=res.data.data.num
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
</script>

<style>
.dataView {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.dataView .el-card {
  width: 50%;
}

.dataView .el-card #main1, #main2 {
  height: 500px;
}
</style>