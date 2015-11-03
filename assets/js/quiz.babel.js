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

var React    = require('react');
var ReactDOM = require('react-dom');
var $        = require('jquery');
var Comment  = require('./comments.babel.js');

var socket  = io();

/* React components */
var Answers = React.createClass({
  getInitialState: () => {
    return {
      data: [
        {num: 'A1', val: 1},
        {num: 'A2', val: 2},
        {num: 'A3', val: 3},
        {num: 'A4', val: 4},
      ]
    };
  },
  render: function() {
    return (
      <div className="answers">
        <AnswerDisplayList data={this.state.data} />
      </div>
    );
  }
});

var AnswerDisplay = React.createClass({
  getInitialState: () => {
    return {
      voteNum: 0
    };
  },
  handleSocketVote: function(msg) {
    if(msg !== this.props.val.toString()) {
      return;
    }
    console.log(`vote: ${msg}`);
    var voteNum = this.state.voteNum;
    this.setState({voteNum: voteNum + 1});
    return;
  },
  componentDidMount: function() {
    socket.on('vote', this.handleSocketVote);
  },
  render: function() {
    return (
      <div className="answerDisplay" value={this.props.val}>
        <h1>{this.props.num}</h1>
        <div>回答者数
          <span>{this.state.voteNum}</span>
        </div>
      </div>
    );
  }
});

var AnswerDisplayList = React.createClass({
  render: function() {
    var displayNodes = this.props.data.map(function(displays) {
      return (
        <AnswerDisplay num={displays.num} val={displays.val} key={displays.val} />
      );
    });
    return (
      <div className="answerDisplayList">
        {displayNodes}
      </div>
    )
  }
});

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
