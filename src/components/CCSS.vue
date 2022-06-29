<template>
  <div class="about">
    <el-table :data="tableData" @select="handleSelectionChange" border ref="tabvvvvleDataRefs" style="width: 100%">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="date" label="日期" width="180"/>
      <el-table-column prop="name" label="姓名" width="180"/>
      <el-table-column prop="address" label="地址"/>
    </el-table>
  </div>
</template>

<script>
export  default {
  data(){
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }],
      obtainData: null
    }
  },
  methods: {
    handleSelectionChange(selection, row) {
      // 判断长度等于1 获取
      if (selection.length === 1) {
        this.obtainData = selection[0]
      }
      if (selection.length > 1) {
        this.obtainData = selection[1]
        // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
        // 该方法不创建新数组，而是直接修改原有的 arrayObject。
        let del_row = selection.shift()
        // 其余的都不选中
        this.$refs.tabvvvvleDataRefs.toggleRowSelection(del_row, false)
      }
      console.log(this.obtainData);
    }
  }
}


</script>