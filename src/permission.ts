import router from './router'
import store from './store'
const whiteList = ['/login', '/403']

// 使用钩子函数对路由进行权限跳转
router.beforeEach(async (to, from, next) => {
  if (store.getters.getUserInfo.username) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // store.dispatch('loginOut')
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})
