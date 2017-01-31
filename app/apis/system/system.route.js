import SystemController from 'app/apis/system/system.controller'

export default {
  controller: new SystemController(),
  routes: [
    {method: 'GET', 'url': '/system/health', handler: 'getHealth'},
    {method: 'POST', 'url': '/system/debug', handler: 'postEnableDebugMode'}
  ]
}
