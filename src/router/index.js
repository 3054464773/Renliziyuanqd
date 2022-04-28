import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Home from "../components/Home.vue";
import shebaofangan from '../components/shebaofangan.vue'
import user from '../components/user.vue'
import Quanxian from "../components/Quanxian.vue";
const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children:[
        {
          path:'/goshebao',
          name:'shebao',
          component:shebaofangan
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
