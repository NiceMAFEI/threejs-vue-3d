/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'


const factorSettingRouter = {
  path: '/setting',
  component: Layout,
  redirect: '/setting/complex-table',
  name: 'Table',
  meta: {
    title: '数据维护',
    icon: '维护'
  },
  children: [{
      path: 'emission-factor',
      component: () => import('@/views/emissionview/calculation-results/emission-factor.vue'),
      name: 'emissionFactor',
      meta: {
        title: '排放因子计算结果'
      },
    },
    {
      path: 'emissions',
      component: () => import('@/views/emissionview/calculation-results/emissions.vue'),
      name: 'emissions',
      meta: {
        title: '排放量计算结果'
      }
    }
  ]
}
export default factorSettingRouter
