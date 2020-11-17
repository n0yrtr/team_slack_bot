# Description
#   A Hubot script for cron excute
#
# Configuration:
#   None
#
# Author:
#   n0yrtr
cronJob = require('cron').CronJob


module.exports = (robot) ->

  channel = '#投稿チームチャンネル'
  # 平日の9:30時にGoogleCalendarのスクリーンショットをチームのチャンネルに投稿する
  new cronJob('0 30 9 * * 1-5', () ->
    robot.send {room: channel}, "@here みんなのカレンダーをはるよー。"
    calendar_screen_shot = require('./screen_shot_google_calendar/calendar_screen_shot.js')
    calendar_screen_shot.screenshot().then(
      (result) =>
        child_process = require 'child_process'
        child_process.exec "curl -F file=@#{result} -F channels=#{channel} -F token=#{process.env.HUBOT_SLACK_TOKEN} https://slack.com/api/files.upload", (err, stdout, stderr) ->
          console.log(stdout)
          console.log(err)
          console.log(stderr)
          if err
            msg.send " :patlite: カレンダーのスクショアップに失敗しちゃいました。 #{err}"
    ).catch(
      (error) =>
        console.log "error" + error
        msg.send " :patlite: カレンダーのスクショアップに失敗しちゃいました。 #{error}"
    )
  ).start()