import { createApp } from 'vue'
import App from './App.vue'
import elementPlus from "element-plus";
import "element-plus/theme-chalk/index.css"
import router from "./router";
import * as ElIcons from '@element-plus/icons-vue'

const app=createApp(App)
for(const iconName in ElIcons){
    app.component(iconName,ElIcons[iconName])
}

createApp(App).use(elementPlus).use(router).mount('#app')
