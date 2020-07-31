/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const devopsRouter = {
  path: '/devops',
  component: Layout,
  redirect: '/devops/register',
  name: 'Devops',
  meta: {
    title: '服务治理',
    icon: 'chart'
  },
  children: [
    {
      path: '/devops/nacos/register',
      name: '注册中心',
      component: () => import('@/views/devops/nacosRegister'),
      meta: {
        title: '注册中心',
        icon: 'link'
      }
    },
    {
      path: '/devops/nacos/config',
      name: '配置中心',
      component: () => import('@/views/devops/nacos'),
      meta: {
        title: '配置中心',
        icon: 'link'
      }
    },
    {
      path: '/devops/sentinel',
      name: '服务运维中心',
      component: () => import('@/views/devops/sentinel'),
      meta: {
        title: '服务运维',
        icon: 'link'
      }
    },
    {
      path: '/devops/moss',
      name: '服务管理',
      component: () => import('@/views/devops/moss'),
      meta: {
        title: '服务管理',
        icon: 'link'
      }
    },
    {
      path: '/devops/swagger',
      name: 'Swagger',
      component: () => import('@/views/devops/swagger'),
      meta: {
        title: '聚合文档',
        icon: 'link'
      }
    },
    {
      path: '/devops/rabbitmq',
      name: '消息中间件',
      component: () => import('@/views/devops/rabbitmq'),
      meta: {
        title: 'RabbitMQ',
        icon: 'link'
      }
    },
    {
      path: '/devops/zipkin',
      name: '日志收集中间件',
      component: () => import('@/views/devops/zipkin'),
      meta: {
        title: '日志收集',
        icon: 'link'
      }
    },
    {
      path: '/devops/kibana',
      name: '日志分析工具',
      component: () => import('@/views/devops/kibana'),
      meta: {
        title: '日志分析',
        icon: 'link'
      }
    },
    {
      path: '/devops/grafana',
      name: '数据可视化工具',
      component: () => import('@/views/devops/grafana'),
      meta: {
        title: '数据可视化',
        icon: 'link'
      }
    }
  ]
}

export default devopsRouter
