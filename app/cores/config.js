import loader from 'app/cores/libraries/loader'
import appConfig from 'app/cores/configs/app.config'
let configContainer = {}

const loaderConfig = appConfig.loader.config

/**
 * Loader configuration file by path and extension.
 * @param  {[STRING]} loaderConfig.path      [Path of file]
 * @param  {[STRING]} loaderConfig.extension [description]
 * @return {[Dictionary]} [Dictionary of Configuration]
 */
let files = loader(loaderConfig.path, loaderConfig.extension)

for (let key in files) {
  configContainer[key] = files[key]
}

export let config = configContainer
