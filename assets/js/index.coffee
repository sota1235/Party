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
  ws.send JSON.stringify
    text: text
  $('#input-text')[0].value = ''
