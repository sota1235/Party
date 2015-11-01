# index.coffee
#
# Description:
#   Send comments and votes in real time
#
# Author:
#   sota1235

socket = io()

$('#input-form').on 'submit', (event) ->
  event.preventDefault()
  text   = $('#input-text')[0].value
  console.log 'send comment'
  socket.emit 'comment', text
  $('#input-text')[0].value = ''

$('.a, .b, .c, .d').on 'click', (event) ->
  console.log this
  event.preventDefault()
  num = $(this).attr 'value'
  console.log 'send quiz num ' + num
  socket.emit 'vote', num
