# quiz.coffee
#
# Description:
#   receive vote data and show it
#
# Author:
#   sota1235

socket = io()

# 指定されたjquery Objectの数字をカウントアップする
countUp = (selector) ->
  now = selector.text()
  selector.text(Number(now) + 1)

$ ->
  $a = []
  for i in [1..4]
    $a.push $('div.a' + i.toString() + ' span')
  $comment = $ '.comment'

  # Socket.io events
  socket.on 'comment', (msg) ->
    console.log 'comment: ' + msg
    comment = new Comment msg
    comment.run()

  socket.on 'vote', (msg) ->
    console.log 'vote: ' + msg
    if msg not in ['1', '2', '3', '4'] then return
    countUp $a[Number msg - 1]
