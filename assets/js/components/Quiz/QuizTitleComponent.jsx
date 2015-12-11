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
import { app, style } from '../../config/config.js';

var Component = React.Component;

/* React components */
export default class QuizTitleComponent extends Component {
  constructor(props) {
    super(props);
    this.hStyle = {
      textAlign: 'center'
    }
    this.imgStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      margin: 'auto'
    }
  }
  render() {
    let content = app.imgLogo ?
      <img style={this.imgStyle} src={style.background} /> :
      <h1 style={this.hStyle}>{app.title}</h1>;
    return (
      <div className="quizTitleComponent">
        {content}
      </div>
    );
  }
}
