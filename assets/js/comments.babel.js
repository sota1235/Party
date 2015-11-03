/**
 * comments.babel.js
 *
 * Description:
 *  受け取った文字列ををニコ動風に流す
 *
 * Author:
 *  @sota1235
 *
 * Required:
 *  jQuery 1.x
 */
'use strict';

var $ = require('jquery');

module.exports = class Comment {
  constructor(comment) {
    this.comment = comment;
    this.time    = 4000;
  }

  run() {
    this.create(this.comment)
      .then(this.setStyle)
      //.then(this.deleteDom)
      .catch((err) => {
        console.log(err);
      });
  }

  // private methods
  create(comment) {
    return new Promise((resolve, reject) => {
      var idName     = 'comment' + Math.random().toString(36).slice(-8);
      var commentElm =
        `<div id="${idName}" class="quiz_comment" style="display: none">${comment}</div>`;
      $('body').append(commentElm);
      var dom = $(`#${idName}`);
      resolve(dom);
    });
  }

  setStyle(dom) {
    return new Promise((resolve, reject) => {
      var top = Math.floor(Math.random() * 100);
      // HACK: 綺麗に流す方法を探す
      dom.css({
        'font-size' : '30px',
        display: 'block',
        position: 'fixed',
        left: '100%',
        top: top.toString() + '%',
        'transition-duration': '10s',
        'z-index': '9999'
      });
      setTimeout(function() {
        dom.css({
          transform: 'translate(-2000px, 0)',
        });
      }, 100);
      resolve(dom);
    });
  }

  deleteDom(dom) {
    return new Promise((resolve , reject) => {
      setTimeout(() => {
        dom.remove();
        resolve();
      }, 7500);
    });
  }
}
