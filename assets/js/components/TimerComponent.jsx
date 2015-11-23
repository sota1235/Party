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

var Component = React.Component;

/* React components */
export default class TimerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 15,
      style: {
        bottom: '20%',
        right: '20%',
        padding: '20px 30px',
        fontSize: '50px',
        color: '#505050',
        border: '10px green solid',
        backgroundColor: '#D1F5CD',
        position: 'fixed'
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
