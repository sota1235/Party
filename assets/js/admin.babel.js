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
import {
  getQuestions,
  addQuestion,
  deleteQuestion
} from './ajax.babel.js';

var socket    = io();
var Component = React.Component;

/* commponents */
// form to add question
class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleQuestionClick = this.handleQuestionClick.bind(this);
    this.handleChange        = this.handleChange.bind(this);
  }

  handleQuestionClick() {
    var choice = ['A1', 'A2', 'A3', 'A4'];
    var text   = this.refs.input.getValue();
    this.props.onQuestionClick(text, choice);
    this.refs.input.setValue('');
    return;
  }

  handleChange() {
    this.setState({
      value: this.refs.input.getValue()
    });
  }

  render() {
    return (
      <div className='questionForm'>
        <Input
          type='text'
          placeholder='クイズ本文を入力してください'
          hasFeedback
          value={this.state.value}
          ref='input'
          groupClassName='group-class'
          labelClassName='label-class'
          onChange={this.handleChange} />
        <ButtonToolbar>
          <Button
            bsStyle='primary'
            onClick={this.handleQuestionClick}>
            クイズを作成
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

// question
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonStyle: {
        float: 'right'
      }
    }
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick() {
    var id = this.props.id;
    this.props.onDeleteClick(id);
    return;
  }

  render() {
    return (
      <div className='question'>
        <ListGroupItem>
          <div>
            {this.props.children}
            <Button
              bsStyle='danger'
              pullRight
              style={this.state.buttonStyle}
              onClick={this.handleDeleteClick}
            >
              削除
            </Button>
          </div>
        </ListGroupItem>
      </div>
    );
  }
}

// question list
class QuestionList extends Component {
  render() {
    var onDeleteClick = this.props.onDeleteClick;
    var questionNodes = this.props.questions.map(function(question) {
      return (
        <Question
          id={question._id}
          key={question._id}
          onDeleteClick={onDeleteClick}
        >
          {question.text}
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
    this.handleQuestionClick = this.handleQuestionClick.bind(this);
    this.handleDeleteClick   = this.handleDeleteClick.bind(this);
  }

  handleQuestionClick(text, choice) {
    var that = this;
    addQuestion(text, choice)
      .then(function(result) {
        console.log(`Submit comment success : ${JSON.stringify(result)}`);
        that.loadQuestions();
      });
  }

  handleDeleteClick(id) {
    var that = this;
    deleteQuestion(id)
      .then(function(result) {
        console.log(`Delete question success id : ${id}`);
        that.loadQuestions();
      });
  }

  loadQuestions() {
    var that = this;
    getQuestions()
      .then(function(questions) {
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
        <QuestionForm onQuestionClick={this.handleQuestionClick} />
        <QuestionList
          questions={this.state.questions}
          onDeleteClick={this.handleDeleteClick}
        />
      </div>
    );
  }
}

/* rendering */
render(
  <QuestionAdmin />,
  document.getElementById('question-admin')
);
