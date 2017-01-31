import {BaseError} from 'app/cores/modules/error/base-error'
import {errorCode} from 'app/cores/modules/error/error-code'
export class UnauthorizedError extends BaseError {
  constructor (message, code = errorCode.UNAUTHORIZED) {
    super(message)
    this.name = 'UnauthorizedError'
    this.status = 401
    this.code = code
  }
}
