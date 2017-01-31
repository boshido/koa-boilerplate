import Koa from 'koa'
import {router} from 'app/cores/router'
import {config} from 'app/cores/config'
import responseFormatterMiddleware from 'app/cores/middlewares/response-formatter.middleware-standalone'
import {NotFoundError, errorCode} from 'app/cores/modules/error'

let koaApp = {}

export function init () {
  koaApp = new Koa()
  let routeData = router.get()
  // Register error handler
  responseFormatterMiddleware(koaApp)
  // Initial routes
  koaApp.use(routeData.routes())
  koaApp.use(routeData.allowedMethods({
    throw: true,
    notImplemented: () => new NotFoundError('The resquested uri does not match to any route tables', errorCode.URI_NOT_FOUND),
    methodNotAllowed: () => new NotFoundError('The resquested uri does not match to any route tables', errorCode.URI_NOT_FOUND)
  }))

  return koaApp
}

export let server = {
  get: function () {
    return koaApp
  },
  start: function (port = config.app.port) {
    return koaApp.listen(port)
  }
}
