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

import QuizTitleComponent from './components/Quiz/QuizTitleComponent.jsx';
import QuizImageComponent from './components/Quiz/QuizImageComponent.jsx';
import QuizComponent      from './components/Quiz/QuizComponent.jsx';
import Comment            from './lib/comments.jsx';

var socket = io();

/* React rendering */
render((
  <Router>
    <Route path='/'     component={QuizTitleComponent}/>
    <Route path='image' component={QuizImageComponent}/>
    <Route path='quiz'  component={QuizComponent}/>
  </Router>
),  document.getElementById('answers'));

$(() => {
  /* Socket.io events */
  socket.on('comment', (msg) => {
    console.log('comment: ' + msg);
    var comment = new Comment(msg);
    comment.run();
  });
  // Dynamic routing
  socket.on('open',   () => location.hash = '#/quiz');
  socket.on('finish', () => location.hash = '#/');
  socket.on('imageEvent', (msg) => {
    if(msg.type === 'open') {
      location.href = '#/image';
    } else if(msg.type === 'close') {
      location.href = '#/';
    }
  });
});
