import debug from 'debug'
const logger = debug('cron:aden-complete-hook')

export default {
  intervalTime: 300,
  run: async function () {
    logger('Doing sample job')
  }
}
