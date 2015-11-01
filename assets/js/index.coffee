# question.coffee
#
# Description:
#   Recieve vote situation in real time
#
# Author:
#   sota1235

socket = io()

io.onmessage = (message) ->
  data = JSON.parse message.data
  $('#chat-text').append data.text + '<br />'

$('#input-form').on 'submit', (event) ->
  event.preventDefault()
  text   = $('#input-text')[0].value
  console.log 'send comment'
  socket.send JSON.stringify
    type: 'comment'
    text: text
  $('#input-text')[0].value = ''

$('.a, .b, .c, .d').on 'click', (event) ->
  console.log this
  event.preventDefault()
  num = $(this).attr 'value'
  console.log 'send quiz num ' + num
  socket.send JSON.stringify
    type: 'vote'
    num : num
