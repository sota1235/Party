/**
 * IndexComponent.jsx
 *
 * Description:
 *   React Component for user page
 *
 * Author:
 *   @sota1235
 */
'use strict';

import React from 'react';
import $     from 'jquery';

var socket = io();

/* make quiz form */
var IndexComponent = React.createClass({
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
  clickSubmit: function(e) {
    e.preventDefault();
    var comment = this.refs.comment.value.trim();
    if (!comment) {
      return;
    }
    this.refs.comment.value = '';
    console.log(`send comment ${comment}`);
    socket.emit('comment', comment);
    return;
  },
  render: function() {
    return (
      <div className="quizInputForm">
        <input type="text" placeholder="Enter the chat text here!" ref="comment" />
        <input type="submit" value="コメントを送信" onClick={this.clickSubmit} />
      </div>
    );
  }
});

var QuizButton = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    var num = this.refs.button.value;
    console.log(`send quiz num ${num}`);
    socket.emit('vote', num);
    return;
  },
  render: function() {
    return (
      <div className="quizButton">
        <button value={this.props.val} key={this.props.key} onClick={this.handleClick} ref="button">
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

export default IndexComponent;
