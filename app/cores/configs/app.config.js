export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  debug: process.env.DEBUG,
  stackTrace: process.env.STACK_TRACE === 'true',
  loader: {
    config: {
      path: 'app/cores/configs',
      extension: 'config'
    },
    resource: {
      path: 'app/cores/resources',
      extension: ['model', 'associate']
    },
    scope: {
      path: 'app/cores/resources',
      extension: 'scope'
    },
    modelHook: {
      path: 'app/cores/resources',
      extension: 'hook'
    },
    router: {
      path: 'app/apis',
      extension: 'route'
    },
    middleware: {
      path: 'app/cores/middlewares',
      extension: 'middleware'
    },
    middlewareRoute: {
      path: 'app/cores/middlewares',
      extension: 'middleware-route'
    },
    variable: {
      path: 'app/cores/variables',
      extension: 'variable'
    }
  },
  baseURI: process.env.BASE_URI || ''
}
