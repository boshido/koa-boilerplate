import {config} from 'app/cores/config'
import {database} from 'app/cores/database'

const databaseInstance = database.get()
class UploadController {
  async getHealth (context, next) {
    context.body = await databaseInstance.query('SELECT 1+1', {type: databaseInstance.QueryTypes.SELECT})
    context.body.push('hello')
  }
  async postEnableDebugMode (context, next) {
    config.slack.enabled = context.request.body.enabled || false
  }
}

export default UploadController
