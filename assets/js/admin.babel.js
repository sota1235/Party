/**
 * admin.babel.js
 *
 * Description:
 *   Admin page to controll questions
 *
 * Author:
 *  sota1235
 */
'use strict';

import React      from 'react';
import { render } from 'react-dom';
import $          from 'jquery';

var socket = io();

/* make quiz form */
class QuizAdmin extends React.Component {
  render() {
    return (
      <div className='quizAdmin'>
        <h1>Hello, quiz admin</h1>
      </div>
    );
  }
}

/* rendering */
render(
  <QuizAdmin />,
  document.getElementById('quiz-admin')
);
