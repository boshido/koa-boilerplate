import loader from 'app/cores/libraries/loader'
import {config} from 'app/cores/config'
import {router} from 'app/cores/router'

export function init () {
  let app = router.get()
  const loaderConfig = config.app.loader.middleware
  let middlewares = loader(loaderConfig.path, loaderConfig.extension)
  for (let key in middlewares) {
    middlewares[key](app)
  }
}
