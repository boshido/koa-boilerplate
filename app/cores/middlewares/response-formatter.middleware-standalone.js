import {config} from 'app/cores/config'
import {cors} from 'app/cores/middlewares/cors.middleware-standalone'
import {UnauthorizedError} from 'app/cores/modules/error'
export default function connectMiddleware (app) {
  app.use(cors, async function (context, next) {
    try {
      await next()
      // Handle passport UnauthorizedError
      if (context.status === 401) {
        throw new UnauthorizedError('Wrong token format')
      }

      context.body = {
        statusCode: 200,
        data: context.body
      }
    } catch (error) {
      context.status = error.statusCode || error.status || 500
      context.body = {
        statusCode: context.status,
        errorCode: error.code || 'INTERNAL_ERROR',
        message: error.message,
        data: error.data,
        errors: error.errors
      }

      if (config.app.stackTrace) {
        context.body.stack = error.stack
      }
    }
  })
}
