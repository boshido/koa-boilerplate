import loader from 'app/cores/libraries/loader'
import fs from 'fs'
import path from 'path'
import moment from 'moment'
import debug from 'debug'

const EXTENSION = 'cron'
const PATH = 'commands/cron'
const TMP_PATH = path.resolve('.tmp')
const CRON_BASE_TIME_PATH = path.resolve(TMP_PATH, 'cron-base-time')
const logger = debug('cron')
export default async function () {
  let tasks = loader(PATH, EXTENSION)
  let baseTime = {}
  let selectedTasks = {}
  let promises = []
  logger(`Perform cronjobs : ${Object.keys(tasks).concat(',')}`)

  if (!fs.existsSync(TMP_PATH)) {
    fs.mkdirSync(TMP_PATH)
  }

  try {
    baseTime = JSON.parse(fs.readFileSync(CRON_BASE_TIME_PATH, 'utf8'))
  } catch (e) {}

  for (let index in tasks) {
    if (!baseTime[index]) {
      baseTime[index] = {start: moment().toISOString(), running: false}
    }
    logger(`Job ${index}, Passed Seconds : ${moment().diff(moment(new Date(baseTime[index].start)), 'seconds')}, Limit Seconds : ${tasks[index].intervalTime}`)
    if (moment().diff(moment(new Date(baseTime[index].start)), 'seconds') > tasks[index].intervalTime && !baseTime[index].running) {
      baseTime[index].start = moment().toISOString()
      selectedTasks[index] = tasks[index]
    }
  }
  for (let index in selectedTasks) {
    baseTime[index].running = true
  }
  fs.writeFileSync(CRON_BASE_TIME_PATH, JSON.stringify(baseTime), 'utf8')
  for (let index in selectedTasks) {
    let promise = selectedTasks[index].run()
    promise.catch(function (error) {
      console.error(error)
      baseTime[index].running = false
    })
    promise.then(function () {
      baseTime[index].running = false
    })
    promises.push(promise)
  }
  try {
    await Promise.all(promises)
  } catch (exception) {
    for (let index in selectedTasks) {
      baseTime[index].running = false
    }
  }
  fs.writeFileSync(CRON_BASE_TIME_PATH, JSON.stringify(baseTime), 'utf8')
}
