import {BaseError} from 'app/cores/modules/error/base-error'
import {errorCode} from 'app/cores/modules/error/error-code'
export class ValidationError extends BaseError {
  constructor (message, data, errors, code = errorCode.VALIDATION) {
    super(message)
    this.name = 'ValidationError'
    this.status = 400
    this.code = code
    this.data = data
    this.errors = errors
  }
}
