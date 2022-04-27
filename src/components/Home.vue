<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
      <Zuobiancaidan></Zuobiancaidan>
      </el-aside>
      <el-container>
        <el-header>
          <strong>欢迎来到Tr02504班人力资源管理系统</strong>
          <div class="headlan">
              <el-dropdown>
                 <span class="el-dropdown-link">
                   {{username}}  你好！
                 </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-link @click="tuichu">退出</el-link>
          </div>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import store from '../store/index'
import axios from '../axios'
import router from '../router/index'
import Zuobiancaidan from "../components/Zuobiancaidan.vue";
export default {
  name: "Home",
  data(){
    return{
      username:store.getters.getdtly.yname
    }
  },
  components:{
    Zuobiancaidan
  },
  methods:{
    tuichu(){
      axios.get("/YuangongLogout").then((e)=>{
          if(e.data.success){
            store.commit('resetdtly');
            sessionStorage.clear()
            router.push('/')
          }
      })


    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo{
  height: 100%;
}
.common-layout{
  height: 100%;
}
.el-container{
  height: 100%;
}

.headlan{
  height: 100%;
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-header{
padding: 0px;
  margin: 0px;
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
a{
  text-decoration: none;
}
</style>