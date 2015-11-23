/**
 * QuizApp.jsx
 *
 * Description:
 *   jsx file for quiz page
 *
 * Author:
 *   @sot1235
 */

import { Router, Route, Link } from 'react-router';
import { render }              from 'react-dom';
import React                   from 'react';
import $                       from 'jquery';

import QuizComponent from './components/QuizComponent.jsx';
import Comment       from './lib/comments.jsx';

var socket = io();

/* React rendering */
render(
  <QuizComponent />,
  document.getElementById('answers')
);

$(() => {
  // Socket.io events
  socket.on('comment', (msg) => {
    console.log('comment: ' + msg);
    var comment = new Comment(msg);
    comment.run();
  });
});
