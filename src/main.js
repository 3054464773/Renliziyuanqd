import { createApp } from 'vue'
import App from './App.vue'
import elementPlus from "element-plus";
import "element-plus/theme-chalk/index.css"
import router from "./router";


createApp(App).use(elementPlus).use(router).mount('#app')
