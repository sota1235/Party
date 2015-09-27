# question.coffee
#
# Description:
#   Recieve vote situation in real time
#
# Author:
#   sota1235

scheme = 'ws://'
uri    = scheme + window.document.location.host + '/'
ws     = new WebSocket uri

ws.onmessage = (message) ->
  data = JSON.parse message.data
  $('#chat-text').append data.text + '<br />'

$('#input-form').on 'submit', (event) ->
  event.preventDefault()
  text   = $('#input-text')[0].value
  console.log 'send comment'
  ws.send JSON.stringify
    type: 'comment'
    text: text
  $('#input-text')[0].value = ''

$('#input-quiz-form').on 'submit', (event) ->
  event.preventDefault()
  num = $('#input-quiz')[0].value
  console.log 'send quiz num'
  ws.send JSON.stringify
    type: 'vote'
    num : num
  $('#input-quiz')[0].value = ''
