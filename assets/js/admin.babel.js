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
// react bootstrap
import {
  ListGroup, ListGroupItem, Panel
} from 'react-bootstrap';

var socket    = io();
var Component = React.Component;

/* commponents */

// question
class Question extends Component {
  render() {
    return (
      <div className='question'>
        <Panel collapsible defaultExpanded header="Panel heading">
          <ListGroup fill>
            <ListGroupItem>Item 1</ListGroupItem>
            <ListGroupItem>Item 2</ListGroupItem>
          </ListGroup>
        </Panel>
      </div>
    );
  }
}

// question list
class QuestionList extends Component {
  render() {
    return (
      <div className='questionList'>
        <Question />
      </div>
    );
  }
}

// admin page
class QuestionAdmin extends Component {
  render() {
    return (
      <div className='questionAdmin'>
        <h1>Hello, question admin</h1>
        <QuestionList />
      </div>
    );
  }
}

/* rendering */
render(
  <QuestionAdmin />,
  document.getElementById('question-admin')
);
