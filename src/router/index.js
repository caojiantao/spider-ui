import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/video-adult-list',
    name: 'VideoAdultList',
    component: () => import('@/views/VideoAdultList.vue')
  },
  {
    path: '/video-adult-play',
    name: 'VideoAdultPlay',
    component: () => import('@/views/VideoAdultPlay.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
