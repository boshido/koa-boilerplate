import {BaseError} from 'app/cores/modules/error/base-error'
import {errorCode} from 'app/cores/modules/error/error-code'
export class BadRequestError extends BaseError {
  constructor (message, code = errorCode.BAD_REQUEST) {
    super(message)
    this.name = 'BadRequestError'
    this.status = 400
    this.code = code
  }
}
