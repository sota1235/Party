/**
 * AdminComponent.jsx
 *
 * Description:
 *   React Component for admin page
 *
 * Author:
 *  sota1235
 */
'use strict';

import React             from 'react';
import { EventEmitter2 } from 'eventemitter2';
// react bootstrap
import {
  ListGroup, ListGroupItem, Panel,
  ButtonToolbar, Input, Table
} from 'react-bootstrap';
// custom components
import {
  CreateQuestionButton,
  DeleteQuestionButton,
  OpenQuestionButton,
  OpenAnswerButton,
  FinishQuestionButton
} from './AdminButtonComponent.jsx';
// action, stores
import AdminAction    from '../action/AdminAction.jsx';
import SocketAction   from '../action/SocketAction.jsx';
import AdminStore     from '../store/AdminStore.jsx';
import AdminFormStore from '../store/AdminFormStore.jsx';

var socket       = io();
var emitter      = new EventEmitter2();
var Component    = React.Component;
var adminStore   = new AdminStore(emitter);
var formStore    = new AdminFormStore(emitter);
var adminAction  = new AdminAction(emitter, socket);
var socketAction = new SocketAction(socket);

/* commponents */
// form to add question
class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.loadStore           = this.loadStore.bind(this);
    this.handleQuestionClick = this.handleQuestionClick.bind(this);
    this.handleChangeText    = this.handleChangeText.bind(this);
    this.handleChangeAnswer  = this.handleChangeAnswer.bind(this);
    this.handleChangeChoices = this.handleChangeChoices.bind(this);
    // listen store
    formStore.on('formChange', this.loadStore);
  }

  componentWillMount() {
    this.setState(formStore.get());
  }

  loadStore() {
    this.setState(formStore.get());
  }

  handleQuestionClick() {
    adminAction.createQuestion(this.state);
    adminAction.clearForm();
  }

  handleChangeText() {
    adminAction.changeText(this.refs.input.getValue());
  }

  handleChangeAnswer() {
    adminAction.changeAnswer(this.refs.answer.getValue());
  }

  handleChangeChoices() {
    adminAction.changeChoices([
        {text: this.refs.choice1.getValue()},
        {text: this.refs.choice2.getValue()},
        {text: this.refs.choice3.getValue()},
        {text: this.refs.choice4.getValue()}
      ]
    );
  }

  render() {
    let that = this;
    let choices = this.state.choices.map((choice, i) => {
      return (
        <Input
          type='text'
          placeholder={`選択肢${i+1}を入力`}
          value={choice.text}
          ref={`choice${i+1}`}
          key={i}
          onChange={that.handleChangeChoices}
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
          onChange={this.handleChangeText} />
        {choices}
        <Input
          type='text'
          placeholder='正解の番号を入力してください(1 ~ 4)'
          hasFeedback
          value={this.state.answer}
          ref='answer'
          onChange={this.handleChangeAnswer} />
        <ButtonToolbar>
          <CreateQuestionButton handleClick={this.handleQuestionClick} />
        </ButtonToolbar>
      </div>
    );
  }
}

class UploadImg extends Component {
  render() {
    return (
      <form action={`/upload?id=${this.props.id}&index=${this.props.index}`}
        encType="multipart/form-data"
        method="POST"
      >
        <input type="file" name="questionImg" />
        <input type="submit" />
      </form>
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
          <td>{choice.text}</td>
          <td>
            <UploadImg index={i+1} id={that.props.id} />
          </td>
        </tr>
      );
    });

    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>選択肢文</th>
            <th>画像</th>
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
      openStatus: false,
      disabled: {
        open: true,
        finish: true
      }
    };
    this.handleDeleteClick         = this.handleDeleteClick.bind(this);
    this.handleOpenClick           = this.handleOpenClick.bind(this);
    this.handleOpenAnswerClick     = this.handleOpenAnswerClick.bind(this);
    this.handleFinishQuestionClick = this.handleFinishQuestionClick.bind(this);
  }

  handleDeleteClick() {
    adminAction.deleteQuestion(this.props.id);
  }
  // 問題公開
  handleOpenClick() {
    this.setState({
      openStatus: true,
      disabled: {
        open: false
      }
    });
    socketAction.broadcastQuestion(this.props.id);
  }
  // 解答オープン
  handleOpenAnswerClick() {
    this.setState({
      disabled: {
        open: true,
        finish: false
      }
    });
    socketAction.openAnswer(this.props.answer);
  }
  // 終了
  handleFinishQuestionClick() {
    this.setState({
      openStatus: false,
      disabled: {
        open: true,
        finish: true
      }
    });
    socketAction.finishQuestion();
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
              <OpenAnswerButton handleClick={this.handleOpenAnswerClick} disabled={this.state.disabled.open} />
              <FinishQuestionButton handleClick={this.handleFinishQuestionClick} disabled={this.state.disabled.finish} />
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
export default class QuestionAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {questions: []};
    this.loadQuestions = this.loadQuestions.bind(this);
    adminStore.on('questionChange', this.loadQuestions);
  }

  loadQuestions() {
    this.setState({questions: adminStore.getQuestions()});
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
