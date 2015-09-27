# quiz.coffee
#
# Description:
#   receive vote data and show it
#
# Author:
#   sota1235

scheme = 'ws://'
uri    = scheme + window.document.location.host + '/'
ws     = new WebSocket uri

ws.onmessage = (message) ->
  data = JSON.parse message.data
