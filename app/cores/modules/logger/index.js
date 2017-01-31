import debug from 'debug'
import {send} from 'app/cores/modules/slack'

export function getLogger (namespace) {
  let logger = debug(namespace)
  return logger
}

export function init () {
  // Intrgate slack into debug logger
  debug.log = (function (oldLogger) {
    return function () {
      oldLogger(...arguments)
      send(arguments[0])
    }
  })(debug.log)

  // Intragate slack into stdout write
  process.stdout.write = (function (write) {
    return function (string, encoding, fd) {
      write.apply(process.stdout, arguments)
      send(string)
    }
  })(process.stdout.write)
}
