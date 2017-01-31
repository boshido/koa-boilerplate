import 'babel-polyfill'
import bootstrap, {getLoadedServer} from 'app/bootstrap'
import mathjs from 'mathjs'
// Enable mathjs to support 64 precision
mathjs.config({number: 'BigNumber', precision: 64})

export function getServer () {
  return bootstrap().then(() => getLoadedServer().get())
}

export function start () {
  return bootstrap().then(() => getLoadedServer().start())
}
