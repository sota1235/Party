/**
 * QuizComponent.jsx
 *
 * Description:
 *   React Component for quiz
 *
 * Author:
 *   @sota1235
 */
'use strict';

import React from 'react';
import { EventEmitter2 } from 'eventemitter2';

import QuizAction from '../action/QuizAction.jsx';
import QuizStore  from '../store/QuizStore.jsx';
import { getQuestion } from '../lib/ajax.jsx';

import TimerComponent from './TimerComponent.jsx';

var socket    = io();
var emitter   = new EventEmitter2();
var Component = React.Component;
var Action    = new QuizAction(emitter, socket);
var Store     = new QuizStore(emitter);

/* React components */
class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: '',
        choices: []
      }
    };
    this.loadQuiz = this.loadQuiz.bind(this);
    Store.on('quizChanged', this.loadQuiz);
  }

  componentWillUnmount() {
    Store.off('quizChanged', this.loadQuiz);
  }

  loadQuiz() {
    this.setState({ data: Store.getQuiz() });
  }

  render() {
    return (
        <div className="quizComponent container">
          <QuizTitle title={this.state.data.title} />
        <ChoiceDisplayList data={this.state.data.choices} />
        <TimerComponent />
      </div>
    );
  }
}

class QuizTitle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="quizTitle">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

class ChoiceDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { voteNum: 0 };
    this.loadVote = this.loadVote.bind(this);
    Store.on('quizChanged', this.loadVote);
  }

  componentWillUnmount() {
    Store.off('quizChanged', this.loadVote);
  }

  loadVote() {
    this.setState({voteNum: Store.getQuiz().choices[this.props.index].count});
  }

  render() {
    return (
      <div className="choiceDisplay" style={this.props.style}>
        <h1>{this.props.num}</h1>
        <p>選択肢: {this.props.text}</p>
        <div>回答者数
          <span>{this.state.voteNum}</span>
        </div>
      </div>
    );
  }
}

class ChoiceDisplayList extends Component {
  render() {
    var displayNodes = this.props.data.map(function(displays, i) {
      return (
        <div className="col-md-6" key={i}>
          <ChoiceDisplay
            style={displays.style}
            num={displays.num}
            index={i}
            text={displays.text}
          />
        </div>
      );
    });
    return (
      <div className="choiceDisplayList row">
        {displayNodes}
      </div>
    )
  }
}

export default QuizComponent;
