import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BasicLayout from "../layout/BasicLayout";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    redirect: '/Home',
    component: BasicLayout,
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/classshow',
        name: 'classshow',
        component: () => import('../views/classshow.vue')
      },
      {
        path: '/newslist',
        name: 'newslist',
        component: () => import('../views/newslist.vue')
      },
      {
        path: '/zhengce',
        name: 'zhengce',
        component: () => import('../views/zhengce.vue')
      },
      {
        path: '/help',
        name: 'help',
        component: () => import('../views/help.vue')
      },
      {
        path: '/Contact',
        name: 'Contact',
        component: () => import('../views/Contact.vue')
      },
      {
        path: '/NewsDetails',
        name: 'NewsDetails',
        component: () => import('../views/newsDetails')
      },
      {
        path: '/ClassDetails',
        name: 'ClassDetails',
        component: () => import('../views/ClassDetails')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/register')
  },
  {
    path: '/forgetpassword',
    name: 'forgetpassword',
    component: () => import('../views/login/forgetpassword')
  },
  {
    path: '/information',
    name: 'information',
    component: () => import('../views/xueyuan/information')
  },
  {
    path: '/xueyuanindex',
    name: 'xueyuanindex',
    component: () => import('../views/xueyuan/index')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
