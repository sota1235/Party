/**
 * QuizTitleComponent.jsx
 *
 * Description:
 *   React Component for quiz title page
 *
 * Author:
 *   @sota1235
 */
'use strict';

import React from 'react';
import { EventEmitter2 } from 'eventemitter2';

var Component = React.Component;

/* React components */
export default class QuizTitleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        textAlign: 'center'
      }
    }
  }
  render() {
    return (
      <div className="quizTitleComponent">
        <h1 style={this.state.style}>Quiz Title</h1>
      </div>
    );
  }
}
