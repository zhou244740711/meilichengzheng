import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BasicLayout from "../layout/BasicLayout";
import StadyLaout from "@/layout/StadyLaout";

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
    path: '/Stady',
    name: 'Stady',
    redirect: '/xueyuanindex',
    component: StadyLaout,
    children: [
      {
        path: '/xueyuanindex',
        name: 'xueyuanindex',
        component: () => import('../views/xueyuan/index')
      },
      {
        path: '/Shopcar',
        name: 'Shopcar',
        component: () => import('../views/xueyuan/ShopCar')
      },
      {
        path: '/Myself',
        name: 'Myself',
        component: () => import('../views/xueyuan/Myself')
      }
    ]
  },
  {
    path: '/ConfirmOrder',
    name: 'ConfirmOrder',
    component: () => import('../views/xueyuan/Confirm_order')
  },
  {
    path: '/Coupon',
    name: 'Coupon',
    component: () => import('../views/xueyuan/Coupon')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/componentstest')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router