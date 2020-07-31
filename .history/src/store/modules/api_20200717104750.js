const baseUrl = process.env.VUE_APP_BASE_API
const api = {
  state: {
    // 注册中心
    nacosServer: 'http://192.168.1.110:8848/nacos/#/configurationManagement?dataId=&group=&appName=&namespace=',
    // 配置中心
    nacosRegister: 'http://192.168.1.110:8848/nacos/#/serviceManagement?dataId=&group=&appName=&namespace=',
    sentinelDashboard: 'http://192.168.1.110:8080',
    zipkinServer: 'http://192.168.1.110:9411',
    kibanaServer: 'http://192.168.1.110:5601',
    grafanaServer: 'http://192.168.1.110:3000',
    rabbitmqServer: 'http://192.168.1.110:15672',
    mossServer: 'http://192.168.1.110:8022/#/instances/9be58f4aee71/scheduledtasks',
    // swagger
    swaggerApi: baseUrl + '/swagger-ui.html'
  }
}

export default api
