/**
 * index.babel.js
 *
 * Description:
 *  Send comments and votes in real time
 *
 * Author:
 *  sota1235
 */
'use strict';

var React    = require('react');
var ReactDOM = require('react-dom');
var $        = require('jquery');

var socket = io();

/* make quiz form */
var QuizForm = React.createClass({
  getInitialState: () => {
    return {
      data: [
        { val: '1', text: '1番', key: 1},
        { val: '2', text: '2番', key: 2},
        { val: '3', text: '3番', key: 3},
        { val: '4', text: '4番', key: 4},
      ]
    };
  },
  render: function() {
    return (
      <div className="quizForm">
        <QuizInputForm />
        <QuizButtonList data={this.state.data} />
      </div>
    );
  }
});

var QuizInputForm = React.createClass({
  render: function() {
    return (
      <div className="quizInputForm">
        <input type="text" placeholder="Enter the chat text here!" />
        <input type="submit" value="コメントを送信" />
      </div>
    );
  }
});

var QuizButton = React.createClass({
  render: function() {
    return (
      <div className="quizButton">
        <button value={this.props.val} key={this.props.key}>
          {this.props.children}
        </button>
      </div>
    );
  }
});

var QuizButtonList = React.createClass({
  render: function() {
    var buttonNodes = this.props.data.map(function(buttons) {
      return (
        <QuizButton val={buttons.val} key={buttons.key}>
          {buttons.text}
        </QuizButton>
      );
    });
    return (
      <div className="quizButtonList">
        {buttonNodes}
      </div>
    );
  }
});

/* rendering */
ReactDOM.render(
  <QuizForm />,
  document.getElementById('quiz-form')
);

$('#input-form').on('submit', (event) => {
  event.preventDefault();
  var text = $('#input-text')[0].value;
  console.log('send comment');
  socket.emit('comment', text);
  $('#input-text')[0].value = '';
});

$('.a, .b, .c, .d').on('click', function (event) {
  event.preventDefault();
  var num = $(this).attr('value');
  console.log('send quiz num ' + num);
  socket.emit('vote', num);
});
