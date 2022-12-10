import router from "./router";
import { getToken } from "./composables/auth";
// import { toast, showFullLoading, hideFullLoading } from "./composables/util";
import store from "./store";

// 全局前置路由守卫
let hasGetInfo = false

router.beforeEach(async (to, from, next) => {
  //   console.log(to, from);

  // 加载进度条
  // showFullLoading();

  const token = getToken();
  // 没有登录 想去的页面还是要登录后才能看的页面
  if (!token && to.path !== "/login") {
    // toast("登录啊，亲！", "error");
    return next({ path: "/login" });
  }

  // 防止重复登录
  if (token && to.path === "/login") {
    // toast("别重复登录啊，亲！", "error");
    return next({ path: from.path ? from.path : "/" });
  }

  //   如果用户登录了 就自动获取用户信息 并保存在vuex中
  if (token && !hasGetInfo) {
    store.dispatch("getInfo");
    // 添加动态路由
    // hasGetInfo = true
    // hasNewRoutes = addRouter(menu)
  }

  console.log(to);
  let title = (to.meta.title ? to.meta.title : '') + '-商城后台'

  document.title = title

  next();
});

router.afterEach((to, from,) => {
  // hideFullLoading()
})