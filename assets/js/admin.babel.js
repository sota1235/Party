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

import React             from 'react';
import { render }        from 'react-dom';
import $                 from 'jquery';
import { EventEmitter2 } from 'eventemitter2';
import _                 from 'lodash';
// react bootstrap
import {
  ListGroup, ListGroupItem, Panel,
  ButtonToolbar, Button, Input,
  Table
} from 'react-bootstrap';
// own files
import {
  getQuestions,
  addQuestion,
  deleteQuestion
} from './ajax.babel.js';

var socket    = io();
var emitter   = new EventEmitter2();
var Component = React.Component;

/* commponents */
// form to add question
class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      choices: ['', '', '', '']
    };
    this.handleQuestionClick = this.handleQuestionClick.bind(this);
    this.handleChange        = this.handleChange.bind(this);
  }

  handleQuestionClick() {
    var choices = [];
    for(let i=0;i<4;i++) {
      choices.push(this.refs[`choice${i+1}`].getValue());
    }
    var text = this.refs.input.getValue();
    emitter.emit('onQuestionClick', text, choices);
    this.setState({value: '', choices: ['', '', '', '']});
    return;
  }

  handleChange() {
    this.setState({
      value: this.refs.input.getValue()
    });
    this.setState({choices: [
      this.refs.choice1.getValue(),
      this.refs.choice2.getValue(),
      this.refs.choice3.getValue(),
      this.refs.choice4.getValue()
    ]});
  }

  render() {
    let choices = [];
    for(let i=0;i<4;i++) {
      choices.push(
        <Input
          type='text'
          placeholder={`選択肢${i+1}を入力`}
          value={this.state.choices[i]}
          ref={`choice${i+1}`}
          key={i}
          required
          onChange={this.handleChange}
        />
      );
    };

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
        {choices}
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
        //float: 'right'
      }
    }
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick() {
    var id = this.props.id;
    emitter.emit('onDeleteClick', id);
    return;
  }

  render() {
    var that = this;
    let choiceElm = this.props.choices.map(function(choice) {
      let index = _.indexOf(that.props.choices, choice) + 1;
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{choice}</td>
        </tr>
      );
    });
    return (
      <div className='question'>
        <ListGroupItem>
          <div>
            {this.props.children}
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>選択肢文</th>
                </tr>
              </thead>
              <tbody>
                {choiceElm}
              </tbody>
            </Table>
            <Button
              bsStyle='danger'
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
    var questionNodes = this.props.questions.map(function(question) {
      return (
        <Question
          id={question._id}
          key={question._id}
          choices={question.choice}
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
    let that = this;
    this.loadQuestions();
    // event listener
    emitter.on('onDeleteClick', function(id) {
      that.handleDeleteClick(id);
    });
    emitter.on('onQuestionClick', function(text, choice) {
      that.handleQuestionClick(text, choice);
    });
  }

  render() {
    return (
      <div className='questionAdmin'>
        <h1>Hello, question admin</h1>
        <QuestionForm />
        <QuestionList questions={this.state.questions}/>
      </div>
    );
  }
}

/* rendering */
render(
  <QuestionAdmin />,
  document.getElementById('question-admin')
);
