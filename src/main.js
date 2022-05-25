import { createApp } from 'vue'
import App from './App.vue'
import elementPlus from "element-plus";
import "element-plus/theme-chalk/index.css"
import router from "./router";
import * as ElIcons from '@element-plus/icons-vue'
// vue中导出excel表格模板
import FileSaver from 'file-saver'
import XLSX from 'xlsx'




// import echarts from 'echarts'
const app=createApp(App)
for(const iconName in ElIcons){
    app.component(iconName,ElIcons[iconName])
}
// app.config.globalProperties.$echarts=echarts
app.use(elementPlus).use(router).mount('#app')
app.prototype.$FileSaver = FileSaver; //设置全局
app.prototype.$XLSX = XLSX; //设置全局
