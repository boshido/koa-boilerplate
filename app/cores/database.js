import Sequelize from 'sequelize'
import ContinuationLocalStorage from 'continuation-local-storage'
import {config} from 'app/cores/config'
import {getLogger} from 'app/cores/modules/logger'
let sequelizeObject = {}
const logger = getLogger('app:database')

export function init () {
  const namespace = ContinuationLocalStorage.createNamespace('default-namespace')
  let env = config.app.env
  let db = config.sequelize[env]

  Sequelize.cls = namespace
  sequelizeObject = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    dialect: db.dialect,
    port: db.port,
    logging: logger,
    pool: {
      min: 0,
      max: 15
    }
  })
}

export let database = {
  get: function () {
    return sequelizeObject
  }
}
