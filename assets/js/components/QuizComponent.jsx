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
import { getQuestion } from '../ajax.jsx';

var socket    = io();
var emitter   = new EventEmitter2();
var Component = React.Component;
var Action    = new QuizAction(emitter, socket);
var Store     = new QuizStore(emitter);

/* React components */
class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    this.loadQuiz = this.loadQuiz.bind(this);
    emitter.on('quizChanged', this.loadQuiz);
  }

  loadQuiz() {
    this.setState({ data: Store.getQuiz() });
  }

  render() {
    return (
      <div className="quizComponent">
        <ChoiceDisplayList data={this.state.data} />
      </div>
    );
  }
}

class ChoiceDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { voteNum: 0 };
    this.loadVote = this.loadVote.bind(this);
    emitter.on('quizChanged', this.loadVote);
  }

  loadVote() {
    this.setState({voteNum: Store.getQuiz()[this.props.index].count});
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
        <ChoiceDisplay
          style={displays.style}
          num={displays.num}
          index={i}
          text={displays.text}
          key={i}
        />
      );
    });
    return (
      <div className="choiceDisplayList">
        {displayNodes}
      </div>
    )
  }
}

export default QuizComponent;
