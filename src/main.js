import { createApp } from 'vue'
import App from './App.vue'
import elementPlus from "element-plus";
import "element-plus/theme-chalk/index.css"
import router from "./router";
import * as ElIcons from '@element-plus/icons-vue'
// import echarts from 'echarts'
const app=createApp(App)
for(const iconName in ElIcons){
    app.component(iconName,ElIcons[iconName])
}
// app.config.globalProperties.$echarts=echarts
app.use(elementPlus).use(router).mount('#app')
