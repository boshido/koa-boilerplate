require('dotenv').load()
require('babel-register')({
  extensions: ['.es6', '.es', '.jsx', '.js']
})
module.exports = require('../app/cores/configs/sequelize.config.js').default
