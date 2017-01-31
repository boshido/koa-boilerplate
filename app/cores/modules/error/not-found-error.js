import {BaseError} from 'app/cores/modules/error/base-error'
import {errorCode} from 'app/cores/modules/error/error-code'
export class NotFoundError extends BaseError {
  constructor (message, code = errorCode.NOT_FOUND) {
    super(message)
    this.name = 'NotFoundError'
    this.status = 404
    this.code = code
  }
}
