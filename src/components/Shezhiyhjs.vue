<template>
  <el-input placeholder="请输入用户名称"  style="width:300px;margin-top: 40px;margin-bottom: 40px"/>
    <el-table :data="tableData" style="width: 100%;height:430px;">
      <el-table-column  width="195"></el-table-column>
      <el-table-column type="index" label="序号" width="190"></el-table-column>
      <el-table-column prop="date" label="名字" width="200" />
      <el-table-column prop="name" label="职位" width="200" />
      <el-table-column prop="address" label="角色" width="250" >
       <el-tag closable>11</el-tag>
        <el-tag closable>22</el-tag>
        <el-tag closable>33</el-tag>
        <el-tag closable>44</el-tag>
        <el-tag closable>55</el-tag>
      </el-table-column>
      <el-table-column label="新增权限"  >
        <el-button type="primary">添加</el-button>
      </el-table-column>
    </el-table>
  <div style="width: 100%;display: flex;align-items: center;justify-content: center;margin-top:50px">
    <el-pagination background layout="prev, pager, next" :total="10" />
  </div>


</template>

<script>
export default {
  name: "Shezhiyhjs",
  data(){
    return{
      tableData :[
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        }
    ]
    }
  }
}
</script>

<style scoped>

</style>