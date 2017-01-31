import Slack from 'slack-node'
import {config} from 'app/cores/config'

let slackClient = new Slack()
slackClient.setWebhook(config.slack.webhookUri)

export function send (message) {
  if (!config.slack.enabled) {
    return
  }
  return new Promise(function (resolve, reject) {
    slackClient.webhook({
      channel: config.slack.channel,
      username: config.slack.username,
      text: '```' + message + '```'
    }, function (err, response) {
      if (err) {
        reject(err)
      }
      resolve(response)
    })
  })
}
