/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: '/organization/components',
  name: '文档',
  meta: {
    title: '文档',
    icon: 'documentation'
  },
  children: [
    {
      path: '/organization/components',
      component: () => import('@/views/organization/components'),
      name: 'User',
      meta: {
        title: '文档',
        icon: 'documentation'
      }
    }
  ]
}

export default componentsRouter
