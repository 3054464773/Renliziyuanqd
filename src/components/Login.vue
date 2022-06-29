<template>

    <el-row >
      <el-col :span="12"></el-col>
      <el-col :span="12">
        <el-form
          ref="ruleFormRef"
          :model="userinfo"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
      >
        <el-form-item label="账号" prop="yzh">
          <el-input v-model="userinfo.yzh" />
        </el-form-item>
        <el-form-item label="密码" prop="ymm">
          <el-input v-model="userinfo.ymm" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"  @keyup.enter.native="submitForm(ruleFormRef)">登录</el-button>
        </el-form-item>
      </el-form></el-col>
    </el-row>

</template>

<script lang="ts" setup>
import { reactive, ref ,onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import axios from '../axios'
import stores from '../store/index'
import router from '../router/index'

onMounted(() => {
  searchEnterFun()
})

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const userinfo = reactive({
  yzh:'',
  ymm:''
})
function searchEnterFun(){
  document.onkeyup = e =>{

    if (e.keyCode === 13 ) {
      submitForm(ruleFormRef.value);
    }
  }
}
const rules = reactive<FormRules>({
  yzh: [
    { required: true, message: '请输入账号！', trigger: 'blur' },
    { min: 1, max: 5, message: '请输入合法账号！', trigger: 'blur' },
  ],
  ymm: [
    { required: true, message: '请输入密码！', trigger: 'blur' },
    { min: 6, message: '请输入合法密码！', trigger: 'blur' },
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
     axios.post("/YuangongLogin",userinfo).then((e)=>{
          if(e.data.data){
            console.log(JSON.parse(e.data.data.dtly).length)
            stores.commit('setdtly',e.data.data)
            router.addRoute({name:'home',path:'/home',  component: () => import('../components/Home.vue')})
            router.addRoute('home',{name:"table",path:"/gotable",component:() => import('../components/YuangongTable.vue')})
            for (let item of JSON.parse(e.data.data.dtly)) {
                if(item.qdfjid!=0){
                  router.addRoute('home',{name:item.qdlymc,path:item.qdlydz,component:() => import('../components/'+item.qdzjmc+'.vue')})
                }
                // this.$router.addRoute('home',{name:item2.qdlyname,path:item2.qdlypath,component:() => import('../components/'+item2.qdzjname+'.vue')})
            }
            router.push("/gotable")
          }

     })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>
<style>
.demo-ruleForm{
  width:400px;
}
.el-row{
  background-color: #fafafa;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>