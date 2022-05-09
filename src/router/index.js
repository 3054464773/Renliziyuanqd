import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Home from "../components/Home.vue";
import shebaofangan from '../components/shebaofangan.vue'
import canbaorenyuan from '../components/canbaorenyuan.vue'
import shebaojiaofei from '../components/shebaojiaofei.vue'
import user from '../components/user.vue'
import recruit from '../components/recruit.vue'
import interview from '../components/interview.vue'
import Quanxian from "../components/Quanxian.vue";

import rencaizhub from '../components/rencaizhub.vue'
import  usersss from '../components/usersss.vue'
import UsersXz from '../components/UsersXz.vue'


import KPIgrade from "../components/KPIgrade.vue"
import KPIsheet from "../components/KPIsheet.vue";
import KPIscore from "../components/KPIscore.vue";

import Jiaose from "../components/Jiaose.vue";
import Bumen from "../components/Bumen.vue";


const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children:[
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


      },{
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
