import loader from 'app/cores/libraries/loader'
import {config} from 'app/cores/config'

let variables = {}

export async function init () {
  const variableLoaderConfig = config.app.loader.variable
  let loadedFileList = loader(variableLoaderConfig.path, variableLoaderConfig.extension)
  for (var variableName in loadedFileList) {
    let loadedVariable = await loadedFileList[variableName]()
    variables[variableName] = loadedVariable
  }
}

export default variables
