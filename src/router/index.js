import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

let _import=file =>()=> import('@/containers/' + file + '.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/dialog',
      name: 'dialog',
      component: _import('dialog/index')
    }
  ]
})
