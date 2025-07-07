import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export const constantRoutes = [
  {
    path: '/redirect',
    component: () => import('@/views/home/index'),
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/',
    name: 'Home',
    components: { default: () => import('@/views/home/index') },
    props: { default: true },
    meta: {
      title: '',
      desc: ''
    },
  },
  {
    path: '/video',
    name: 'Video',
    components: { default: () => import('@/views/video/index') },
    props: { default: true },
    meta: {
      title: ''
    }
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    meta: {
      title: '页面找不到了'
    },
    hidden: true
  },
  {
    path: '/408',
    component: () => import('@/views/408'),
    // component: () => import('@/views/ceshi/index'),
    meta: {
      title: '网络超时'
    },
    hidden: true
  },
  {
    path: '/500',
    component: () => import('@/views/500'),
    // component: () => import('@/views/ceshi/index'),
    meta: {
      title: ''
    },
    hidden: true
  },
  {
    path: '/510',
    component: () => import('@/views/510'),
    // component: () => import('@/views/ceshi/index'),
    meta: {
      title: ''
    },
    hidden: true
  },
  {
    path: '/503',
    component: () => import('@/views/503'),
    // component: () => import('@/views/ceshi/index'),
    meta: {
      title: '系统维护中'
    },
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]

export const elseRouter = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // require service support  https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
  // https://blog.csdn.net/Wcharles666/article/details/88391034
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

