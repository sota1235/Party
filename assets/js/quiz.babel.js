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
        {num: 'A1', vote: 0, key: 1},
        {num: 'A2', vote: 0, key: 2},
        {num: 'A3', vote: 0, key: 3},
        {num: 'A4', vote: 0, key: 4},
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
  render: function() {
    return (
      <div className="answerDisplay" key={this.props.key}>
        <h1>{this.props.num}</h1>
        <div>回答者数
          <span>{this.props.children}</span>
        </div>
      </div>
    );
  }
});

var AnswerDisplayList = React.createClass({
  render: function() {
    var displayNodes = this.props.data.map(function(displays) {
      return (
        <AnswerDisplay num={displays.num} key={displays.key}>
          {displays.vote}
        </AnswerDisplay>
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

// 指定されたjquery Objectの数字をカウントアップする
var countUp = (selector) => {
  var now = selector.text();
  selector.text(Number(now) + 1);
};

$(() => {
  var $a = [];
  for(let i=1;i<=4;i++) {
    $a.push($('div.a' + i.toString() + ' span'));
  }
  var $comment = $('.comment');

  // Socket.io events
  socket.on('comment', (msg) => {
    console.log('comment: ' + msg);
    var comment = new Comment(msg);
    comment.run();
  });

  socket.on('vote', (msg) => {
    console.log('vote: ' + msg);
    if(['1', '2', '3', '4'].indexOf(msg) === -1) {
      return;
    }
    countUp($a[Number(msg) - 1]);
  });
});
