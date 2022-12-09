import { createRouter, createWebHashHistory } from 'vue-router'
// 路由规则
const routes = [
  {
    path: '/login',
    meta: { title: '登录' },
    component: () => import('../views/login/index.vue'),
},
]

const router = createRouter({
  // vueRouter@3版本的mode改成了history，hash模式配置createWebHashHistory，history模式配置createWebHistory
  history: createWebHashHistory(),
  routes
})

export default router