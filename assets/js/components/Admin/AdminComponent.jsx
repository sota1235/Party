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
  CreateQuestionButton, QuestionButtons
} from './AdminButtonComponent.jsx';
// action, stores
import AdminAction  from '../../action/Admin/AdminAction.jsx';
import ButtonAction from '../../action/Admin/AdminButtonAction.jsx';
import SocketAction from '../../action/Admin/SocketAction.jsx';
import AdminStore   from '../../store/Admin/AdminStore.jsx';
import FormStore    from '../../store/Admin/AdminFormStore.jsx';
import ButtonStore  from '../../store/Admin/AdminButtonStore.jsx';

var socket       = io();
var emitter      = new EventEmitter2();
var Component    = React.Component;
var adminStore   = new AdminStore(emitter);
var formStore    = new FormStore(emitter);
var buttonStore  = new ButtonStore(emitter);
var adminAction  = new AdminAction(emitter);
var buttonAction = new ButtonAction(emitter);
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
        {index: 1, text: this.refs.choice1.getValue()},
        {index: 2, text: this.refs.choice2.getValue()},
        {index: 3, text: this.refs.choice3.getValue()},
        {index: 4, text: this.refs.choice4.getValue()}
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
    if(this.props.path === undefined) {
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
    let style = {
      height: "50px"
    }
    return (
      <img src={`/uploads/${this.props.path}`} style={style}/>
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
            <UploadImg index={i+1} id={that.props.id} path={choice.imgPath} />
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
        <tbody className="questionChoiceTableTbody">
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
    buttonStore.on('buttonStatusChange', this.loadButtonStatus.bind(this));
    this.handleDeleteClick         = this.handleDeleteClick.bind(this);
    this.handleOpenClick           = this.handleOpenClick.bind(this);
    this.handleOpenAnswerClick     = this.handleOpenAnswerClick.bind(this);
    this.handleFinishQuestionClick = this.handleFinishQuestionClick.bind(this);
  }

  componentWillMount() {
    this.setState({
      buttonStatus: buttonStore.get()
    });
  }

  loadButtonStatus() {
    this.setState({
      buttonStatus: buttonStore.get()
    });
  }
  // 問題を削除
  handleDeleteClick() {
    adminAction.deleteQuestion(this.props.id);
  }
  // 問題公開
  handleOpenClick() {
    console.log('open');
    buttonAction.openQuestionButton();
    socketAction.broadcastQuestion(this.props.id, this.props.text);
  }
  // 解答オープン
  handleOpenAnswerClick() {
    if(this.state.buttonStatus.answer.text === 'AnswerCheck') {
      buttonAction.answerCheckButton();
    } else {
      buttonAction.openAnswerButton();
    }
    socketAction.openAnswer(this.props.answer);
  }
  // 終了
  handleFinishQuestionClick() {
    buttonAction.finishButton();
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
              <QuestionButtons store={this.state.buttonStatus}
                openQuestionClick={this.handleOpenClick}
                answerClick={this.handleOpenAnswerClick}
                finishClick={this.handleFinishQuestionClick}
                deleteClick={this.handleDeleteClick}
              />
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
          text={question.text}
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
