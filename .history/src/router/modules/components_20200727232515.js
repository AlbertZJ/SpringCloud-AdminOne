/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/organization/user',
  component: Layout,
  redirect: 'noRedirect',
  component: () => import('@/views/organization/user'),
  name: '文档',
  meta: {
    title: '文档',
    icon: 'documentation'
  }
}

export default componentsRouter
