import { createRouter, createWebHashHistory } from 'vue-router'
// 路由规则
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: '/login',
    meta: { title: '登录' },
    component: () => import('../views/login/login.vue'),
  },
  {
    path: '/404',
    meta: { title: '404' },
    component: () => import('../views/404/404.vue'),
  },
  {
    path: '/home',
    meta: { title: '主页' },
    component: () => import('../views/home/home.vue'),
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('../views/layout/layout.vue'),
    children:[  
      {
        path: 'annualScore',
        meta: { title: '成绩查询' },
        component: () => import('../views/annualScore/annualScore.vue'),
      },
      {
        path: 'physicalApply',
        meta: { title: '体测预约' },
        component: () => import('../views/physicalApply/physicalApply.vue'),
      },
      {
        path: 'graduateScore',
        meta: { title: '毕业成绩' },
        component: () => import('../views/graduateScore/graduateScore.vue'),
      },
      {
        path: 'searchBooking',
        meta: { title: '预约查询' },
        component: () => import('../views/searchBooking/searchBooking.vue'),
      },
      {
        path: 'physicaHelper',
        meta: { title: '体测助手' },
        component: () => import('../views/physicaHelper/physicaHelper.vue'),
      },
      {
        path: 'help',
        meta: { title: '预约查询' },
        component: () => import('../views/help/help.vue'),
      },
    ]
  },
  
]


const router = createRouter({
  // vueRouter@3版本的mode改成了history，hash模式配置createWebHashHistory，history模式配置createWebHistory
  history: createWebHashHistory(),
  routes
})

export default router