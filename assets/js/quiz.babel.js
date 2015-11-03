/**
 * quiz.babel.js
 *
 * Description:
 *  receive vote data and show it
 *
 * Author:
 *  sota1235
 */
'use strict';

var $       = require('jquery');
var Comment = require('./comments.babel.js');

var socket  = io();

// 指定されたjquery Objectの数字をカウントアップする
var countUp = (selector) => {
  var now = selector.text();
  selector.text(Number(now) + 1);
};

$(() => {
  var $a = [];
  for(let i=1;i<=4;i++) {
    $a.push($('div.a' + i.toString() + ' span'));
  }
  var $comment = $('.comment');

  // Socket.io events
  socket.on('comment', (msg) => {
    console.log('comment: ' + msg);
    var comment = new Comment(msg);
    comment.run();
  });

  socket.on('vote', (msg) => {
    console.log('vote: ' + msg);
    if(['1', '2', '3', '4'].indexOf(msg) === -1) {
      return;
    }
    countUp($a[Number(msg) - 1]);
  });
});
