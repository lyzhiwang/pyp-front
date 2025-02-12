import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
      component: () => import('@/App'),
      children: [
        {
          path: '',
          components: { default: () => import('@/views/home/index') },
          props: { default: true, sidebar: false },
          name: '拓客王',
          meta: {
            title: '拓客王'
          }
        }
      ]
    },
    {
      path: '/video',
      components: { default: () => import('@/views/video/index') },
      props: { default: true, sidebar: false },
      name: 'Video',
      meta: {
        title: '视频详情'
      }
    },
    {
      path: '/404',
      component: () => import('@/views/404'),
      // component: () => import('@/views/ceshi/index'),
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
})

