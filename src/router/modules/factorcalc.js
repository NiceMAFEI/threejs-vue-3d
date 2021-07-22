/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const factorCalcRouter = {
  path: '/factorcalc',
  component: Layout,
  redirect: '/factorcalc/complex-table',
  name: 'Table',
  meta: {
    title: '排放计算',
    icon: '计算'
  },
  children: [{
      path: 'home',
      component: () => import('@/views/emissionview/home.vue'),
      name: 'home',
      meta: {
        title: '新建模拟场景'
      },
    },
    {
      path: 'history-first-step',
      component: () => import('@/views/emissionview/history/first-step.vue'),
      name: 'historyFirstStep',
      meta: {
        title: '历史模拟场景'
      }
    }
  ]
}

export default factorCalcRouter
