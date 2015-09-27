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

$ ->
  $q = [$('.q1'), $('.q2'), $('.q3'), $('.q4')]
  $comment = $ '.comment'

  ws.onmessage = (message) ->
    data = JSON.parse message.data
    type = data['type']
    console.log data

    if type is 'comment'
      $comment.append '<div id="comment">' + data['text'] + '</div>'
    else if type is 'vote'
      $q[Number data['num'] - 1].html 'hello'
