import loader from 'app/cores/libraries/loader'
import {config} from 'app/cores/config'

export function init () {
  const resourceLoaderConfig = config.app.loader.resource
  const scopeLoaderConfig = config.app.loader.scope
  const hookLoaderConfig = config.app.loader.modelHook
  loader(resourceLoaderConfig.path, resourceLoaderConfig.extension)
  loader(scopeLoaderConfig.path, scopeLoaderConfig.extension)
  loader(hookLoaderConfig.path, hookLoaderConfig.extension)
}
