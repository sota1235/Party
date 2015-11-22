/**
 * quiz.jsx
 *
 * Description:
 *  receive vote data and show it
 *
 * Author:
 *  sota1235
 */
'use strict';

import React    from 'react';
import ReactDOM from 'react-dom';
import $        from 'jquery';
import { EventEmitter2} from 'eventemitter2';

import Comment    from './comments.jsx';
import QuizAction from './action/QuizAction.jsx';
import QuizStore  from './store/QuizStore.jsx';
import { getQuestion } from './ajax.jsx';

var socket    = io();
var emitter   = new EventEmitter2();
var Component = React.Component;
var Action    = new QuizAction(emitter, socket);
var Store     = new QuizStore(emitter);

/* React components */
class Answers extends Component {
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
      <div className="answers">
        <AnswerDisplayList data={this.state.data} />
      </div>
    );
  }
}

class AnswerDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { voteNum: 0 };
    this.handleSocketVote  = this.handleSocketVote.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleSocketVote(msg) {
    if(msg !== this.props.val.toString()) {
      return;
    }
    console.log(`vote: ${msg}`);
    let voteNum = this.state.voteNum;
    this.setState({voteNum: voteNum + 1});
    return;
  }

  componentDidMount() {
    socket.on('vote', this.handleSocketVote);
  }

  render() {
    return (
      <div className="answerDisplay" value={this.props.val}>
        <h1>{this.props.num}</h1>
        <p>選択肢: {this.props.text}</p>
        <div>回答者数
          <span>{this.state.voteNum}</span>
        </div>
      </div>
    );
  }
}

class AnswerDisplayList extends Component {
  render() {
    var displayNodes = this.props.data.map(function(displays, i) {
      return (
        <AnswerDisplay num={displays.num} val={displays.val} text={displays.text} key={i} />
      );
    });
    return (
      <div className="answerDisplayList">
        {displayNodes}
      </div>
    )
  }
}

/* React rendering */
ReactDOM.render(
  <Answers />,
  document.getElementById('answers')
);

$(() => {
  // Socket.io events
  socket.on('comment', (msg) => {
    console.log('comment: ' + msg);
    var comment = new Comment(msg);
    comment.run();
  });
});
