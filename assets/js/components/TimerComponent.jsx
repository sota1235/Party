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

var Component = React.Component;

/* React components */
export default class TimerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 15,
      style: {
        textAlign: 'center'
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
    let time = this.state.time;
    this.setState({time: time - 1});
    if(this.state.time === 0) {
      clearInterval(this.timerId);
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
