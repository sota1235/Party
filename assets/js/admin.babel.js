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
  ListGroup, ListGroupItem, Panel,
  ButtonToolbar, Button, Input
} from 'react-bootstrap';
// own files
import { getQuestions } from './ajax.babel.js';

var socket    = io();
var Component = React.Component;

/* commponents */
// question
class Question extends Component {
  render() {
    return (
      <div className='question'>
        <ListGroupItem>{this.props.children}</ListGroupItem>
      </div>
    );
  }
}

// form to add question
class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
 }

  render() {
    return (
      <div className='questionForm'>
        <Input
          type='text'
          value={this.state.value}
          placeholder='クイズ本文を入力してください'
          hasFeedback
          ref='input'
          groupClassName='group-class'
          labelClassName='label-class' />
        <ButtonToolbar>
          <Button bsStyle='primary'>クイズを作成</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

// question list
class QuestionList extends Component {
  componentDidMount() {
    // access to server and get question list
  }
  render() {
    var questionNodes = this.props.questions.map(function(question) {
      return (
        <Question id={question.id}>
          {question.title}
        </Question>
      )
    });
    return (
      <div className='questionList'>
        <ListGroup>
          {questionNodes}
        </ListGroup>
      </div>
    );
  }
}

// admin page
class QuestionAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  loadQuestions() {
    var that = this;
    getQuestions()
      .then(function(questions) {
        console.log(questions);
        that.setState({questions: questions});
      });
  }

  componentDidMount() {
    this.loadQuestions();
  }

  render() {
    return (
      <div className='questionAdmin'>
        <h1>Hello, question admin</h1>
        <QuestionForm />
        <QuestionList questions={this.state.questions} />
      </div>
    );
  }
}

/* rendering */
render(
  <QuestionAdmin />,
  document.getElementById('question-admin')
);
