import { createRouter, createWebHashHistory } from 'vue-router'
// 路由规则
const routes = [
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../views/layout/layout.vue'),
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
    meta: { title: 'home' },
    component: () => import('../views/home/home.vue'),
  },
]

const router = createRouter({
  // vueRouter@3版本的mode改成了history，hash模式配置createWebHashHistory，history模式配置createWebHistory
  history: createWebHashHistory(),
  routes
})

export default router