<script setup>
import { reactive, nextTick, provide } from 'vue'
const state = reactive({
  showRouter: true
})

//刷新事件
function reload(){
  state.showRouter = false
  nextTick( () =>{
    state.showRouter = true
  })
}
provide('reload',reload)
</script>

<template>
  <router-view v-if="state.showRouter"></router-view>
</template>

<style>
html,body{
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
}

</style>
