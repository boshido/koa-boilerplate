import {database} from 'app/cores/database'
import {getLogger} from 'app/cores/modules/logger'

const logger = getLogger('app:resources:sample:hook')
let sampleModel = database.get().model('sample')

sampleModel.afterCreate(async (params) => {
  logger('After create hook has been called')
})

sampleModel.afterUpdate(async (params, options) => {
  logger('After update hook has been called')
})
