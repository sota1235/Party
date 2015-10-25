# comments.coffee
#
# Description:
#   受け取った文字列ををニコ動風に流す
#
# Author:
#   @sota1235
#
# Required:
#   jQuery 1.x

class @Comment
  @dom     = null
  @comment = null

  constructor: (comment) ->
    @comment = comment

  run: () ->
    create @comment
    # run

  ### private methods ###
  create = (comment) ->
    commentElm = '<div id="comment">' + comment + '</div>'
    $('body').append commentElm
    @dom = $ commentElm

  deleteDom = () ->
    @dom.remove()
