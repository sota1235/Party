/**
 * index.babel.js
 *
 * Description:
 *  Send comments and votes in real time
 *
 * Author:
 *  sota1235
 */
'use strict';

var $ = require('jquery');

var socket = io();

$('#input-form').on('submit', (event) => {
  event.preventDefault();
  var text = $('#input-text')[0].value;
  console.log('send comment');
  socket.emit('comment', text);
  $('#input-text')[0].value = '';
});

$('.a, .b, .c, .d').on('click', function (event) {
  event.preventDefault();
  var num = $(this).attr('value');
  console.log('send quiz num ' + num);
  socket.emit('vote', num);
});
