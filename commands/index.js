var dotenv = require('dotenv')
require('babel-polyfill')
require('babel-register')({
  extensions: ['.es6', '.es', '.jsx', '.js']
})
dotenv.config({silent: true})
dotenv.load()
let bootstrap = require('app/bootstrap').default

var commandLineArgs = require('command-line-args')

bootstrap()
  .then(function () {
    var runner = require(`./${process.argv[2]}`)
    const options = commandLineArgs(runner.optionDefinitions)
    return runner.default(options)
  })
  .then(function () {
    process.exit()
  })
  .catch(function (err) {
    console.log(err)
    console.log(err.stack)
    process.exit()
  })
