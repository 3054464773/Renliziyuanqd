import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Home from "../components/Home.vue";
import shebaofangan from '../components/shebaofangan.vue'
import ShebaoJishu from '../components/ShebaoJishu.vue'
import canbaorenyuan from '../components/canbaorenyuan.vue'
import shebaojiaofei from '../components/shebaojiaofei.vue'
import user from '../components/user.vue'
import recruit from '../components/recruit.vue'
import interview from '../components/interview.vue'
import Quanxian from "../components/Quanxian.vue";

import rencaizhub from '../components/rencaizhub.vue'
import  usersss from '../components/usersss.vue'
import UsersXz from '../components/UsersXz.vue'
import  Userwdg from '../components/Userwdg.vue'

import CCSS from '../components/CCSS.vue'
import KPIgrade from "../components/KPIgrade.vue"
import KPIsheet from "../components/KPIsheet.vue";
import KPIscore from "../components/KPIscore.vue";

import Jiaose from "../components/Jiaose.vue";
import Bumen from "../components/Bumen.vue";


import  Yhlz from '../components/Yhlz.vue'
import Zpjh from '../components/Zpjh.vue'
import  xxxx from '../components/xxxx.vue'
import Shezhiyhjs from "../components/Shezhiyhjs.vue";


import salary from "../components/salary.vue";
import salaryElement from "../components/salaryElement.vue"
import payroll from "../components/payroll.vue"

import Tongzhi from "../components/Tongzhi.vue";
import Gonggao from "../components/Gonggao.vue";
import Jiaqishezhi from "../components/Jiaqishezhi.vue";
import PaiBanSheZhi from "../components/PaiBanSheZhi.vue";
import Kaoqingjilu from "../components/Kaoqingjilu.vue";
import Shenheshezhi from "../components/Shenheshezhi.vue";
import  wuwuwu  from "../components/wuwuwu.vue"
import Sxusers from "../components/Sxusers.vue"

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children:[
      {
        path: '/goshenheshezhi',
        name: 'shenheshezhi',
        component: Shenheshezhi
      },
      {
        path: '/gokaoqingjilu',
        name: 'kaoqingjilu',
        component: Kaoqingjilu
      },
      {
        path: '/gopaibansz',
        name: 'paibansz',
        component: PaiBanSheZhi
      },
      {
        path: '/gojiaqishezhi',
        name: 'jiaqishezhi',
        component: Jiaqishezhi
      },
      {
        path: '/gogonggao',
        name: 'gonggao',
        component: Gonggao
      },
      {
        path: '/gotongzhi',
        name: 'tongzhi',
        component: Tongzhi
      },
      {
        path:'/gobumen',
        name:'bumen',
        component:Bumen
      },
        {
          path:'/goshebao',
          name:'shebao',
          component:shebaofangan
        },
      {
        path:'/goshebaojishu',
        name:'shebaojishu',
        component:ShebaoJishu
      },
      {
        path:'/goshebaopeople',
        name:'shebaopeople',
        component:canbaorenyuan
      },
      {
        path:'/goshebaojiaofei',
        name:'shebaojiaofei',
        component:shebaojiaofei
      },
      {
        path:'/gouser',
        name:'user',
        component:user
      },
      {
        path:'/goquanxian',
        name:'quanxian',
        component:Quanxian

      },
      {
        path:'/gorecruit',
        name:'recruit',
        component:recruit
      },
      {
        path:'/gointerview',
        name:'interview',
        component:interview
      },
      {
        path:'/gorencaizhub',
        name:'rencaizhub',
        component:rencaizhub
      },
      {
        path:'/gousersss',
        name:'usersss',
        component:usersss
      },

      {
        path:'/goUsersXz',
        name:'UsersXz',
        component:UsersXz
      },
      {
        path: '/goinsertjixiao',
        name: 'jixiao',
        component: KPIgrade
      },{
        path: '/gojixiaoGrade',
        name:'jixiaoGrade',
        component: KPIsheet
      },{
        path:'/gojixiaoScore',
        name: 'jixiaoScore',
        component: KPIscore

      }
      ,{
        path:'/goYhlz',
        name:'Yhlz',
        component:Yhlz

      },

      {
        path:'/gojiaose',
        name:'jiaose',
        component:Jiaose,
        // children:[
        //     {
        //       path:'/gojsandqx',
        //       name:'jsandqx',
        //       component:JiaoseQuanxian,
        //     }
        // ]


      },{
        path:'/goUserwdg',
        name: 'Userwdg',
        component: Userwdg

      },
      {
        path:'/goZpjh',
        name: 'Zpjh',
        component: Zpjh


      },

      {
        path:'/goCCSS',
        name: 'CCSS',
        component: CCSS


      },
      {
        path: '/goshezhiyhjs',
        name: 'szyhjs',
        component: Shezhiyhjs

      },
      {

        path: '/gosalary',
        name: 'salary',
        component:salary
      },
      {
        path: '/gosalaryElement',
        name: 'salaryElement',
        component:salaryElement
      },

      {
        path: '/gowuwuwu',
        name: 'wuwuwu',
        component:wuwuwu
      },
      {
        path: '/gopayroll',
        name: 'payroll',
        component:payroll
      },
      {
        path: '/goSxusers',
        name: 'Sxusers',
        component:Sxusers
      }


    ]
  },

  // {
  //   path: '/home',
  //   name: 'home',
  //   component: HomeView,
  //   children:[
  //     {
  //       path:'/goa2',
  //       component: () => import('../components/A2.vue')
  //     },
  //     {
  //       path:'/goa3',
  //       component: () => import('../components/A3.vue')
  //     },
  //     {
  //       path:'/gob2',
  //       component: () => import('../components/B2.vue')
  //     },
  //     {
  //       path:'/gob3',
  //       component: () => import('../components/B3.vue')
  //     },
  //
  //   ]
  // },
  {
    path: '/',
    name: 'login',
    component: Login
  },

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
