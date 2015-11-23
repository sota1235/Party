/**
 * AdminButtonComponent.jsx
 *
 * Description:
 *   Button components for admin page
 *
 * Author:
 *   sota1235
 */
'use string';

import React from 'react';
import { Button } from 'react-bootstrap';

let Component = React.Component;

// 'クイズを作成' button
export class CreateQuestionButton extends Component {
  render() {
    return (
      <Button
        bsStyle='primary'
        onClick={this.props.handleClick}
      >
        クイズを作成
      </Button>
    );
  }
}

// '公開' button
export class OpenQuestionButton extends Component {
  render() {
    return (
      <Button
        bsStyle='info'
        onClick={this.props.handleClick}
      >
        {this.props.children}
      </Button>
    );
  }
}

// '解答' button
export class OpenAnswerButton extends Component {
  render() {
    return (
      <Button
        bsStyle='success'
        onClick={this.props.handleClick}
        disabled={this.props.disabled}
      >
        解答
      </Button>
    );
  }
}

// '終了' button
export class FinishQuestionButton extends Component {
  render() {
    return (
      <Button
        bsStyle='warning'
        onClick={this.props.handleClick}
        disabled={this.props.disabled}
      >
        終了
      </Button>
    );
  }
}

// '削除' button
export class DeleteQuestionButton extends Component {
  render() {
    return (
      <Button
        bsStyle='danger'
        onClick={this.props.handleClick}
      >
        削除
      </Button>
    );
  }
}
