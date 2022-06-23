<template>
  <div id="head">
    <input type="text" placeholder="请输入纳税缴纳比例···" v-model="data.nsjnbl" id="txt">
    <el-button type="primary" :icon="Search" class="cx" @click="mohucxnsxx()">查询</el-button>
    <el-button type="primary" :icon="Plus" class="btns" @click="insertNashui=true">新增</el-button>
  </div>
  <!--表格-->
  <el-table
      :data="data.NashuiData"
      height="400px"
  >
    <el-table-column property="nsbbh" label="纳税编号" sortable/>
    <el-table-column property="nszdjne" label="最低缴纳额"/>
    <el-table-column property="nszgjne" label="最高缴纳额"/>
    <el-table-column property="nsjnbl" label="缴纳比例"/>
    <el-table-column>
      <template #default="scope">
        <el-button size="default" type="primary" :icon="Edit"
                   @click="updateNashui=true,nashuibyid(scope.row.nsbbh)">
          编辑
        </el-button>
        <el-button size="default" type="danger" :icon="Delete" @click="scnsxx(scope.row.nsbbh)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页-->
  <div class="page">
    <el-pagination background layout="prev, pager, next"
                   v-model:current-page="this.data.pageNum"
                   v-model:page-size="this.data.pageSize"
                   :total="data.total"
                   @current-change="page"/>
  </div>
  <!--新增纳税弹窗-->
  <el-dialog v-model="insertNashui" title="新增纳税信息">
    <el-form
        :model="ruleForm"
        :rules="rules"
        label-width="130px"
        :size="formSize"
    >
      <el-form-item label="最低缴纳额" prop="nszdjne">
        <el-input v-model="ruleForm.nszdjne" class="wbk"/>
      </el-form-item>
      <el-form-item label="最高缴纳额" prop="nszgjne">
        <el-input v-model="ruleForm.nszgjne" class="wbk"/>
      </el-form-item>
      <el-form-item label="缴纳比例" prop="nsjnbl">
        <el-input v-model="ruleForm.nsjnbl" class="wbk"/>&nbsp;&nbsp;(%)
      </el-form-item>
    </el-form>
    <template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="xznashui(ruleForm)">新增</el-button>
					<el-button @click="insertNashui = false">取消</el-button>
				</span>
    </template>
  </el-dialog>
  <!-- 修改纳税弹窗 -->
  <el-dialog v-model="updateNashui" title="修改纳税信息" width="50%" center>
    <el-form
        label-width="120px"
    >
      <el-form-item label="纳税编号">
        <el-input v-model="data.xgnsxx.nsbbh" disabled class="wbk"/>
      </el-form-item>
      <el-form-item label="最低缴纳额">
        <el-input v-model="data.xgnsxx.nszdjne" class="wbk"/>
      </el-form-item>
      <el-form-item label="最高缴纳额">
        <el-input v-model="data.xgnsxx.nszgjne" class="wbk"/>
      </el-form-item>
      <el-form-item label="纳税缴纳比例">
        <el-input v-model="data.xgnsxx.nsjnbl" class="wbk"/>&nbsp;&nbsp;(%)
      </el-form-item>
    </el-form>

    <template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="xgnsxx(data.xgnsxx)">修改</el-button>
					<el-button @click="updateNashui = false">取消</el-button>
				</span>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import {
  Search,
  Plus,
  Edit,
  Delete
} from '@element-plus/icons-vue'
import axios from '../axios.js'
import {reactive, ref, onBeforeMount, inject} from 'vue'
import type {
  FormRules
} from '@element-plus'
import {ElMessage} from 'element-plus'

let insertNashui = ref(false)//新增纳税弹窗
const updateNashui = ref(false)//修改纳税弹窗
const data = reactive({
  NashuiData: [],//纳税
  pageNum: 1,//当前显示页码
  pageSize: 5,//每一页显示的条数
  total: 0,//总条数
  pages: 0,
  nsjnbl: '',//纳税缴纳比例查询条件
  xgnsxx: {},//纳税信息修改

})
//新增表单
const formSize = ref('default')
const ruleForm = reactive({
  nszdjne: '',
  nszgjne: '',
  nsjnbl: ''
})
//新增表单数据验证
const rules = reactive<FormRules>({
  nszdjne: [
    {required: true, message: '请输入纳税最低缴纳额!', trigger: 'blur'},
  ],
  nszgjne: [
    {required: true, message: '请输入纳税最高缴纳额!', trigger: 'blur'},
  ],
  nsjnbl: [
    {required: true, message: '请输入纳税缴纳比例!', trigger: 'blur'},
  ],
})

//Message消息提示
//1、新增成功
const xz = () => {
  ElMessage({
    showClose: true,
    message: '新增成功！',
    type: 'success'
  })
}
//2、修改成功
const xg = () => {
  ElMessage({
    showClose: true,
    message: '修改成功！',
    type: 'success'
  })
}
//3、删除成功
const sc = () => {
  ElMessage({
    showClose: true,
    message: '删除成功！',
    type: 'success'
  })
}
//4、已取消
const qx = () => {
  ElMessage({
    showClose: true,
    message: '已取消！',
  })
}

//查询所有纳税信息
onBeforeMount(() => {
  axios.get("/selectnashuixx", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function (response) {
    data.NashuiData = response.data.data.list
    data.total = response.data.data.total
  }).catch(function (error) {
    console.log(error)
  })
})

function refresh() {
  axios.get("/selectnashuixx", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function (response) {
    data.NashuiData = response.data.data.list
    data.total = response.data.data.total
  }).catch(function (error) {
    console.log(error)
  })
}

//查询所有纳税信息——分页
function page() {
  axios.get("/selectnashuixx", {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then(function (response) {
    data.NashuiData = response.data.data.list
    data.total = response.data.data.total
  }).catch(function (error) {
    console.log(error)
  })
}

//新增纳税信息
function xznashui(ruleForm) {
  axios.post("/insertnashuixx", ruleForm).then(function (response) {
    xz()
    refresh()
  }).catch(function (error) {
    console.log(error)
  })
}

//模糊查询纳税信息
function mohucxnsxx() {
  axios.get("/mhcxnsxx", {
    params: {
      nsjnbl: data.nsjnbl
    }
  }).then(function (response) {
    data.NashuiData = response.data.data
  }).catch(function (error) {
    console.log(error)
  })
}

//根据纳税id查询纳税信息
function nashuibyid(nsbbh) {
  axios.get("/cxnashuibyid", {
    params: {
      nsbbh: nsbbh
    }
  }).then(function (response) {
    data.xgnsxx = response.data.data
  }).catch(function (error) {
    console.log(error)
  })
}

//修改纳税信息
function xgnsxx(xgnsxx) {
  axios.put("/updatensxx", xgnsxx).then(function (response) {
    console.log(response)
    xg()
    refresh()
  }).catch(function (error) {
    console.log(error)
  })
}

//删除纳税信息
function scnsxx(nsbbh) {
  if (confirm("确认删除吗？")) {
    axios.delete("/deletensxx", {
      params: {
        nsbbh: nsbbh
      }
    }).then(function (response) {
      if (response.data.code != 200) {
        console.log("删除失败！" + response.data.message)
        return
      }
      sc()
      refresh()//删除完成刷新界面
    }).catch(function (error) {
      console.log(error)
    })
  } else {
    console.log("已取消！")
    qx()
  }
}
</script>

<style scoped>
#head {
  margin: 15px;
}

#txt {
  width: 200px;
  height: 20px;
}

.cx {
  width: 66px;
  height: 25px;
  margin: 0px 10px 0px 0px;
}

.btns {
  width: 66px;
  height: 25px;
  margin: 0px 10px 0px 10px;
}

.wbk {
  width: 530px;
}

</style>