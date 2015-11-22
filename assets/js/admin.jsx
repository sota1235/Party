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
import { EventEmitter2 } from 'eventemitter2';
// react bootstrap
import {
  ListGroup, ListGroupItem, Panel,
  ButtonToolbar, Input, Table
} from 'react-bootstrap';
// custom components
import {
  CreateQuestionButton, DeleteQuestionButton, OpenQuestionButton
} from './adminButton.jsx';
// action, stores
import adminAction   from './action/AdminAction.jsx';
import questionStore from './store/QuestionStore.jsx';

var socket    = io();
var emitter   = new EventEmitter2();
var Component = React.Component;
var QuestionStore = new questionStore(emitter);
var AdminAction   = new adminAction(emitter, socket);

/* commponents */
// form to add question
class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      choices: ['', '', '', ''],
      answer: ''
    };
    this.handleQuestionClick = this.handleQuestionClick.bind(this);
    this.handleChange        = this.handleChange.bind(this);
    this.clearForm = () => {
      this.setState({ text: '', choices: ['', '', '', ''], answer: '' });
    }
  }

  handleQuestionClick() {
    AdminAction.createQuestion(this.state);
    this.clearForm();
    return;
  }

  handleChange() {
    this.setState({
      text: this.refs.input.getValue(),
      answer: this.refs.answer.getValue(),
      choices: [
        this.refs.choice1.getValue(),
        this.refs.choice2.getValue(),
        this.refs.choice3.getValue(),
        this.refs.choice4.getValue()
      ]
    });
  }

  render() {
    let that = this;
    let choices = this.state.choices.map((choice, i) => {
      return (
        <Input
          type='text'
          placeholder={`選択肢${i+1}を入力`}
          value={choice}
          ref={`choice${i+1}`}
          key={i}
          onChange={that.handleChange}
        />
      );
    });

    return (
      <div className='questionForm'>
        <Input
          type='text'
          placeholder='クイズ本文を入力してください'
          hasFeedback
          value={this.state.text}
          ref='input'
          onChange={this.handleChange} />
        {choices}
        <Input
          type='text'
          placeholder='正解の番号を入力してください(1 ~ 4)'
          hasFeedback
          value={this.state.answer}
          ref='answer'
          onChange={this.handleChange} />
        <ButtonToolbar>
          <CreateQuestionButton handleClick={this.handleQuestionClick} />
        </ButtonToolbar>
      </div>
    );
  }
}

class QuestionChoiceTable extends Component {
  render() {
    var that = this;
    let choiceElm = this.props.choices.map(function(choice, i) {
      let key   = that.props.id + i.toString();
      let color = that.props.answer == i + 1 ? 'red' : 'black';
      let style = {color: color};
      return (
        <tr style={style} key={key}>
          <td>{i + 1}</td>
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
    AdminAction.deleteQuestion(this.props.id);
  }

  handleOpenClick() {
    this.setState({openStatus: true});
    AdminAction.broadcastQuestion(this.props.id);
  }

  render() {
    return (
      <div className='question'>
        <ListGroupItem>
          <div>
            {this.props.children}
            <QuestionChoiceTable id={this.props.id} choices={this.props.choices} answer={this.props.answer} />
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
    var questionNodes = this.props.questions.map( question => {
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
    this.state = {questions: []};
    this.loadQuestions = this.loadQuestions.bind(this);
    emitter.on('questionChange', this.loadQuestions);
  }

  loadQuestions() {
    this.setState({questions: QuestionStore.getQuestions()});
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
