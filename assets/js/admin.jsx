/**
 * admin.jsx
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
// custom components
import {
  CreateQuestionButton, DeleteQuestionButton, OpenQuestionButton
} from './adminButton.jsx';
// custom library
import {
  getQuestions,
  addQuestion,
  deleteQuestion
} from './ajax.jsx';

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
      choices: ['', '', '', ''],
      answer: ''
    };
    this.handleQuestionClick = this.handleQuestionClick.bind(this);
    this.handleChange        = this.handleChange.bind(this);
    this.clearForm           = this.clearForm.bind(this);
  }

  clearForm() {
    this.setState({value: '', choices: ['', '', '', ''], answer: ''});
  }

  handleQuestionClick() {
    var choices = [];
    for(let i=0;i<4;i++) {
      choices.push(this.refs[`choice${i+1}`].getValue());
    }
    var text   = this.refs.input.getValue();
    var answer = this.refs.answer.getValue();
    emitter.emit('onQuestionClick', text, choices, answer);
    this.clearForm();
    return;
  }

  handleChange() {
    this.setState({
      value: this.refs.input.getValue(),
      answer: this.refs.answer.getValue()
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
        <Input
          type='text'
          placeholder='正解の番号を入力してください(1 ~ 4)'
          hasFeedback
          value={this.state.answer}
          ref='answer'
          groupClassName='group-class'
          labelClassName='label-class'
          onChange={this.handleChange} />
        <ButtonToolbar>
          <CreateQuestionButton handleClick={this.handleQuestionClick} />
        </ButtonToolbar>
      </div>
    );
  }
}

class QuestionChoices extends Component {
  render() {
    var that = this;
    let choiceElm = this.props.choices.map(function(choice, i) {
      let index = i + 1;
      let key   = that.props.id + index;
      let color = that.props.answer == index ? 'red' : 'black';
      let style = {
        color: color
      };
      return (
        <tr style={style} key={key}>
          <td>{index}</td>
          <td>{choice}</td>
        </tr>
      );
    });

    return (
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
    );
  }
}

// question
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openStatus: false
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleOpenClick   = this.handleOpenClick.bind(this);
  }

  handleDeleteClick() {
    var id = this.props.id;
    emitter.emit('onDeleteClick', id);
    return;
  }

  handleOpenClick() {
    var id = this.props.id;
    this.setState({openStatus: true});
    emitter.emit('onOpenClick', id);
    return;
  }

  render() {
    return (
      <div className='question'>
        <ListGroupItem>
          <div>
            {this.props.children}
            <QuestionChoices id={this.props.id} choices={this.props.choices} answer={this.props.answer} />
            <ButtonToolbar>
              <OpenQuestionButton handleClick={this.handleOpenClick}>
                {this.state.openStatus ? '公開中' : '公開'}
              </OpenQuestionButton>
              <DeleteQuestionButton handleClick={this.handleDeleteClick} />
            </ButtonToolbar>
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
          answer={question.answer}
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

  handleQuestionClick(text, choice, answer) {
    var that = this;
    addQuestion(text, choice, answer)
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
    emitter.on('onQuestionClick', function(text, choice, answer) {
      that.handleQuestionClick(text, choice, answer);
    });
    emitter.on('onOpenClick', function(id) {
      socket.emit('open', id);
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
