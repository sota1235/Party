/**
 * QuizChoice.jsx
 *
 * Description:
 *   React Component for choice display of question
 *
 * Author:
 *   @sota1235
 */
'use strict';

import React from 'react';
import _     from 'lodash';

var Component = React.Component;

/* React components */
export default class ChoiceDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        background: `-webkit-gradient(linear, left top, left bottom,  from(${this.props.color.top}), to(${this.props.color.bottom}))`
      }
    }
  }

  render() {
    return (
      <div className="choiceDisplay" style={this.props.style}>
        <h1 style={this.state.style}>{this.props.num}</h1>
        <ChoiceContent text={this.props.text} img={this.props.img} />
        <ChoiceVoteNum voteNum={this.props.voteNum} />
      </div>
    );
  }
}

class ChoiceContent extends Component {
  render() {
    // show img if data is available
    let content;
    if(this.props.img !== undefined) {
      // style for component
      let style = {
        maxWidth: "500px",
        maxHeight: "200px"
      };
      content = <img src={`/uploads/${this.props.img}`} style={style} />;
    } else {
      content = <p>{this.props.text}</p>;
    }
    return (
      <div className="choiceContent">
        {content}
      </div>
    );
  }
}

class ChoiceVoteNum extends Component {
  render() {
    return (
      <div className="voteNumber">回答者数
        <span>{this.props.voteNum}</span>
      </div>
    );
  }
}
