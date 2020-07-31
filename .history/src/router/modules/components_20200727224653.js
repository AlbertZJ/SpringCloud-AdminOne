/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: 'Components',
    icon: 'component'
  },
  children: [
    {
      path: '/organization/user',
      component: () => import('@/views/organization/user'),
      name: 'User',
      meta: {
        title: '用户管理',
        icon: 'peoples'
      }
    }
  ]
}

export default componentsRouter
