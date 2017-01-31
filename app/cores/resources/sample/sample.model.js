import Sequelize from 'sequelize'
import {database} from 'app/cores/database'

let sampleModel = database.get().define('sample', {
  sampleId: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  sample: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.DATE
  },
  deletedAt: {
    type: Sequelize.DATE
  }
}, {
  tableName: 'sample',
  freezeTableName: true,
  paranoid: true
})

export default sampleModel
