/**
 * TimterComponent.jsx
 *
 * Description:
 *   React Component for measuring the time
 *
 * Author:
 *   @sota1235
 */
'use strict';

import React from 'react';
import _     from 'lodash';

import SocketAction from '../action/SocketAction.jsx';

var Component = React.Component;
var socket    = io();
var Action    = new SocketAction(socket);

/* React components */
export default class TimerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 15,
      style: {
        position: 'fixed',
        bottom: '20%',
        right: '20%',
        width: '140px',
        height: '140px',
        paddingTop: '40px',
        fontSize: '50px',
        textAlign: 'center',
        color: '#7B7B7B',
        borderRadius: '50%',
        border: '3px #9FCEFF solid',
        backgroundColor: '#E6F3FF',
        boxShadow: 'rgba(113,135,164,.65098) 3px 3px 6px 3px'
      }
    }
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.timerId = setInterval(this.countDown, 1000);
  }

  componentWillUnmount() {
    if(this.timerId) {
      clearInterval(this.timerId);
    }
  }

  countDown() {
    this.setState((prev, current) => {
      var newStyle = _.clone(prev.style);
      // coloring red when time count is 5 second
      if(prev.time === 6) {
        newStyle.color = 'red';
      }
      return {
        time: prev.time - 1,
        style: newStyle
      };
    });

    // stop count down
    if(this.state.time === 0) {
      clearInterval(this.timerId);
      Action.exitTimeLimit();
    }
  }

  render() {
    return (
      <div className="timer">
        <h1 style={this.state.style}>{this.state.time}</h1>
      </div>
    );
  }
}
