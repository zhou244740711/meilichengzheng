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
        meta: {
          title: '官网首页'
        }
      },
      {
        path: '/classshow',
        name: 'classshow',
        component: () => import('../views/classshow.vue'),
        meta: {
          title: '课程展示'
        }
      },
      {
        path: '/newslist',
        name: 'newslist',
        component: () => import('../views/newslist.vue'),
        meta: {
          title: '最新消息'
        }
      },
      {
        path: '/zhengce',
        name: 'zhengce',
        component: () => import('../views/zhengce.vue'),
        meta: {
          title: '政策法规'
        }
      },
      {
        path: '/zhengceDetails',
        name: 'zhengceDetails',
        component: () => import('../views/zhengceDetails.vue'),
        meta: {
          title: '政策法规详情'
        }
      },
      {
        path: '/help',
        name: 'help',
        component: () => import('../views/help.vue'),
        meta: {
          title: '帮助中心'
        }
      },
      {
        path: '/Contact',
        name: 'Contact',
        component: () => import('../views/Contact.vue'),
        meta: {
          title: '联系我们'
        }
      },
      {
        path: '/NewsDetails',
        name: 'NewsDetails',
        component: () => import('../views/newsDetails'),
        meta: {
          title: '新闻详情'
        }
      },
    ],
    meta: {
      title: '官网首页'
    }
  },
  {
    path: '/ClassDetails',
    name: 'ClassDetails',
    component: () => import('../views/ClassDetails'),
    meta: {
      title: '课程视频'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login'),
    meta: {
      title: '登陆'
    }
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('../views/xueyuan/address'),
    meta: {
      title: '收件地址'
    }
  },
  {
    path: '/addressAdd',
    name: 'addressAdd',
    component: () => import('../views/xueyuan/address_edit'),
    meta: {
      title: '地址编辑'
    }
  },
  {
    path: '/choseaddress',
    name: 'choseaddress',
    component: () => import('../views/xueyuan/choseaddress'),
    meta: {
      title: '收件地址'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/register'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/forgetpassword',
    name: 'forgetpassword',
    component: () => import('../views/login/forgetpassword'),
    meta: {
      title: '忘记密码'
    }
  },
  {
    path: '/changepassword',
    name: 'changepassword',
    component: () => import('../views/login/changepassword'),
    meta: {
      title: '修改密码'
    }
  },
  {
    path: '/changephone',
    name: 'changephone',
    component: () => import('../views/login/changephone'),
    meta: {
      title: '修改手机号码'
    }
  },
  {
    path: '/information',
    name: 'information',
    component: () => import('../views/xueyuan/information'),
    meta: {
      title: '个人信息'
    }
  },
  {
    path: '/information2',
    name: 'information2',
    component: () => import('../views/xueyuan/information2'),
    meta: {
      title: '个人信息'
    }
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
        component: () => import('../views/xueyuan/index'),
        meta: {
          title: '美丽城镇'
        }
      },
      {
        path: '/Shopcar',
        name: 'Shopcar',
        component: () => import('../views/xueyuan/ShopCar'),
        meta: {
          title: '购物车'
        }
      },
      {
        path: '/Myself',
        name: 'Myself',
        component: () => import('../views/xueyuan/Myself'),
        meta: {
          title: '我的'
        }
      }
    ],
    meta: {
      title: '美丽城镇'
    }
  },
  {
    path: '/Setting',
    name: 'Setting',
    component: () => import('../views/xueyuan/Setting'),
    meta: {
      title: '设置'
    }
  },
  {
    path: '/Yaoqing',
    name: 'Yaoqing',
    component: () => import('../views/xueyuan/Yaoqing'),
    meta: {
      title: '绑定邀请码'
    }
  },
  {
    path: '/Stadyend',
    name: 'Stadyend',
    component: () => import('../views/xueyuan/Stadyend'),
    meta: {
      title: '已完成学时'
    }
  },
  {
    path: '/kaoshi',
    name: 'kaoshi',
    component: () => import('../views/xueyuan/kaoshi'),
    meta: {
      title: '考试中'
    }
  },
  {
    path: '/kaoshilog',
    name: 'kaoshilog',
    component: () => import('../views/xueyuan/kaoshi_log'),
    meta: {
      title: '考试记录'
    }
  },
  {
    path: '/kaoshimonilog',
    name: 'kaoshimonilog',
    component: () => import('../views/xueyuan/kaoshimoni_log'),
    meta: {
      title: '考试记录'
    }
  },
  {
    path: '/moni',
    name: 'moni',
    component: () => import('../views/xueyuan/moni'),
    meta: {
      title: '模拟考试'
    }
  },
  {
    path: '/kaoshimoni',
    name: 'kaoshimoni',
    component: () => import('../views/xueyuan/kaoshimoni'),
    meta: {
      title: '模拟考试中'
    }
  },
  {
    path: '/zhengshu',
    name: 'zhengshu',
    component: () => import('../views/xueyuan/zhnegshu'),
    meta: {
      title: '证书'
    }
  },
  {
    path: '/zhengming',
    name: 'zhengming',
    component: () => import('../views/xueyuan/zhengming'),
    meta: {
      title: '学时证明'
    }
  },
  {
    path: '/MyClass',
    name: 'MyClass',
    component: () => import('../views/xueyuan/MyClass'),
    meta: {
      title: '我的课程'
    }
  },
  {
    path: '/MyClassList',
    name: 'MyClassList',
    component: () => import('../views/xueyuan/MyClass_list'),
    meta: {
      title: '课程列表'
    }
  },
  {
    path: '/CourseSection',
    name: 'CourseSection',
    component: () => import('../views/xueyuan/CourseSection'),
    meta: {
      title: '章节列表'
    }
  },
  {
    path: '/Video',
    name: 'Video',
    component: () => import('../views/xueyuan/Video'),
    meta: {
      title: '视频学习'
    }
  },
  {
    path: '/MyOrder',
    name: 'MyOrder',
    component: () => import('../views/xueyuan/MyOrder'),
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/MyOrderPay',
    name: 'MyOrderPay',
    component: () => import('../views/xueyuan/MyOrder_pay'),
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/MyOrderRefund',
    name: 'MyOrderRefund',
    component: () => import('../views/xueyuan/MyOrder_Refund'),
    meta: {
      title: '申请退款'
    }
  },
  {
    path: '/ConfirmOrder',
    name: 'ConfirmOrder',
    component: () => import('../views/xueyuan/Confirm_order'),
    meta: {
      title: '确认订单'
    }
  },
  {
    path: '/ConfirmOrder2',
    name: 'ConfirmOrder2',
    component: () => import('../views/xueyuan/Confirm_order2'),
    meta: {
      title: '确认订单2'
    }
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
    component: () => import('../views/xueyuan/Confirm_order_success'),
    meta: {
      title: '支付成功'
    }
  },
  {
    path: '/Coupon',
    name: 'Coupon',
    component: () => import('../views/xueyuan/Coupon'),
    meta: {
      title: '优惠劵'
    }
  },
  {
    path: '/clear',
    name: 'clear',
    component: () => import('../views/clear'),
    meta: {
      title: '美丽城镇'
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/componentstest'),
    meta: {
      title: '美丽城镇'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  // console.log(to.meta.title)
  // console.log(from.meta.title)
  // if (to.meta.title) {
  //   document.title = to.meta.title
  // }
  next()
})

export default router