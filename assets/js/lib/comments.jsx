/**
 * comments.jsx
 *
 * Description:
 *  受け取った文字列ををニコ動風に流す
 *
 * Author:
 *  @sota1235
 */
'use strict';

import $ from 'jquery';
import _ from 'lodash';

export default class Comment {
  constructor(comment) {
    this.comment = comment;
    this.time    = 4000;
  }

  run() {
    this.create(this.comment)
      .then(this.setStyle)
      .then(this.deleteDom)
      .catch((err) => {
        console.log(err);
      });
  }

  // private methods
  create(comment) {
    return new Promise((resolve, reject) => {
      var idName     = 'comment' + Math.random().toString(36).slice(-8);
      var commentElm =
        `<div id="${idName}" class="quiz_comment" style="display: none">${_.escape(comment)}</div>`;
      $('body').append(commentElm);
      var dom = $(`#${idName}`);
      resolve(dom);
    });
  }

  setStyle(dom) {
    return new Promise((resolve, reject) => {
      var top = Math.floor(Math.random() * 100 % 96 + 1);
      dom.css({
        'font-size': '30px',
        display: 'block',
        position: 'fixed',
        left: '150%',
        top: top.toString() + '%',
        'transition-duration': '12s',
        'z-index': '-9999',
        'white-space': 'nowrap'
      });
      setTimeout(function() {
        dom.css({
          transform: 'translate(-2800px, 0)',
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
      }, 12000);
    });
  }
}
