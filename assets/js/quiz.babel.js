/**
 * quiz.babel.js
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

import Comment  from './comments.babel.js';
import { getQuestion } from './ajax.babel.js';

var socket    = io();
var Component = React.Component;

/* React components */
class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {num: 'A1', text: '', val: 1},
        {num: 'A2', text: '', val: 2},
        {num: 'A3', text: '', val: 3},
        {num: 'A4', text: '', val: 4},
      ]
    };

    socket.on('open', (msg) => {
      console.log('question open: id' + msg);
      getQuestion(msg).then( result => this.handleOpenQuestion(result));
    });
  }

  handleOpenQuestion(question) {
    let choices = question[0].choice;
    this.setState({
      data: [
        {num: 'A1', text: choices[0], val: 1},
        {num: 'A2', text: choices[1], val: 2},
        {num: 'A3', text: choices[2], val: 3},
        {num: 'A4', text: choices[3], val: 4},
      ]
    });
    return;
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
