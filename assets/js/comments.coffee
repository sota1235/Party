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
  @comment = null
  time: 4000

  constructor: (comment) ->
    @comment = comment

  run: () ->
    create @comment
      .then setStyle
      .then animate
      .then deleteDom
      .catch (err) ->
        console.log err

  ### private methods ###
  create = (comment) ->
    return new Promise (resolve, reject) ->
      idName     = 'comment' + Math.random().toString(36).slice(-8)
      commentElm =
        "<div id=\"#{idName}\" style=\"display: none\">" + comment + '</div>'
      $('body').append commentElm
      dom = $ "##{idName}"
      resolve dom

  setStyle = (dom) ->
    return new Promise (resolve, reject) ->
      top = Math.floor(Math.random() * 100)
      dom.css
        display: 'block'
        position: 'fixed'
        left: '100%'
        top: top.toString() + '%'
      resolve dom

  animate = (dom) ->
    return new Promise (resolve, reject) ->
      dom.animate
        left: '-200%'
      , 7000
      resolve dom

  deleteDom = (dom) ->
    return new Promise (resolve , reject) ->
      setTimeout () ->
        dom.remove()
        resolve()
      , 7500
