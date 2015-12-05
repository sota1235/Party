/**
 * IndexApp.jsx
 *
 * Description:
 *   jsx file for user page
 *
 * Author:
 *   @sot1235
 */

import $ from 'jquery';

var socket = io();

$(() => {
  /* Event listners */
  // send vote
  $('.choice-form button').on('click', function(event) {
    event.preventDefault();
    let target = $(this).val();
    console.log(`send quiz vote for ${target}`);
    socket.emit('vote', target);
  });
  // send comment
  $('.comment-form button').on('click', (event) => {
    event.preventDefault();
    var text = $('.comment-form textarea')[0].value;
    console.log('send comment');
    socket.emit('comment', text);
    $('.comment-form textarea')[0].value = '';
  });
});
