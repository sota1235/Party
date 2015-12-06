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

import QuizAction  from '../../action/Quiz/QuizAction.jsx';
import SoundAction from '../../action/Quiz/SoundAction.jsx';
import QuizStore   from '../../store/Quiz/QuizStore.jsx';
import VoteStore   from '../../store/Quiz/VoteStore.jsx';
import { getQuestion } from '../../lib/ajax.jsx';

import TimerComponent from '../TimerComponent.jsx';
import ChoiceDisplay  from './QuizChoice.jsx';

var socket    = io();
var emitter   = new EventEmitter2();
var Component = React.Component;
var Action    = new QuizAction(emitter, socket);
var Sound     = new SoundAction(emitter);
var quizStore = new QuizStore(emitter);
var voteStore = new VoteStore(emitter);

/* React components */
export default class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      choices: [],
      votes: [0, 0, 0, 0]
    };
    this.loadQuiz = this.loadQuiz.bind(this);
    this.loadVote = this.loadVote.bind(this);
    quizStore.on('quizChanged', this.loadQuiz);
    voteStore.on('voteChanged', this.loadVote);
  }

  componentWillUnmount() {
    quizStore.off('quizChanged', this.loadQuiz);
    voteStore.off('voteChanged', this.loadVote);
  }

  loadQuiz() {
    let quiz = quizStore.getQuiz();
    this.setState({
      title:   quiz.title,
      choices: quiz.choices
    });
  }

  loadVote() {
    this.setState({
      votes: voteStore.getVotes()
    });
  }
  render() {
    return (
      <div className="quizComponent container">
        <QuizTitle title={this.state.title} />
        <ChoiceDisplayList choices={this.state.choices} votes={this.state.votes} />
        <TimerComponent />
      </div>
    );
  }
}

class QuizTitle extends Component {
  render() {
    return (
      <div className="quizTitle">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

class ChoiceDisplayList extends Component {
  render() {
    let votes = this.props.votes;
    var displayNodes = this.props.choices.map(function(displays, i) {
      return (
        <div className="col-md-6" key={i}>
          <ChoiceDisplay
            color={displays.color}
            num={displays.num}
            style={displays.style}
            index={i}
            text={displays.text}
            img={displays.img}
            voteNum={votes[i]}
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
