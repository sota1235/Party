# quiz.coffee
#
# Description:
#   receive vote data and show it
#
# Author:
#   sota1235

url = 'ws://' + window.document.location.host + '/'
ws  = new WebSocket url

ws.onopen = ->
  console.log 'Connected!'
  ws.send JSON.stringify
    type: 'master'

# 指定されたjquery Objectの数字をカウントアップする
countUp = (selector) ->
  now = selector.text()
  selector.text(Number(now) + 1)

$ ->
  $a = []
  for i in [1..4]
    $a.push $('div.a' + i.toString() + ' span')
  $comment = $ '.comment'

  ws.onmessage = (message) ->
    data = JSON.parse message.data
    type = data['type']
    console.log data

    if type is 'comment'
      $comment.append '<div id="comment">' + data['text'] + '</div>'
    else if type is 'vote'
      if data['num'] not in ['1', '2', '3', '4'] then return
      countUp $a[Number data['num'] - 1]
