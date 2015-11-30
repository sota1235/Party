/**
 * IndexApp.jsx
 *
 * Description:
 *   jsx file for user page
 *
 * Author:
 *   @sot1235
 */

import { Router, Route, Link } from 'react-router';
import { render }              from 'react-dom';
import React                   from 'react';
import $                       from 'jquery';

import IndexComponent from './components/IndexComponent.jsx';

var socket = io();

/* React rendering */
render(
  <IndexComponent />,
  document.getElementById('quiz-form')
);

$('#input-form').on('submit', (event) => {
  event.preventDefault();
  var text = $('#input-text')[0].value;
  console.log('send comment');
  socket.emit('comment', text);
  $('#input-text')[0].value = '';
});

