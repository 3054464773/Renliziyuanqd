<script setup>
import {reactive, nextTick, provide, ref} from "vue";

const isRouterAlive=ref(true)
const reload=()=>{
  isRouterAlive.value=false;
  nextTick(()=>{
    isRouterAlive.value=true
  })
}
provide("reload",reload)
</script>

<template>
  <router-view v-if="isRouterAlive"></router-view>
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
