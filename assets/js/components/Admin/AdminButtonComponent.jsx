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

// button set for controling question status
export class QuestionButtons extends Component {
  render() {
    let props = this.props;
    let store = props.store
      return (
        <div className="questionButtons">
          <Button
            bsStyle="info" disabled={store.open.disabled}
            onClick={props.openQuestionClick}
          >{store.open.text}</Button>
          <Button
            bsStyle="success" disabled={store.answer.disabled}
            onClick={props.answerClick}
          >{store.answer.text}</Button>
          <Button
            bsStyle="warning" disabled={store.finish.disabled}
            onClick={props.finishClick}
            >{store.finish.text}</Button>
          <Button
            bsStyle="danger" disabled={store.delete.disabled}
            onClick={props.deleteClick}
          >{store.delete.text}</Button>
        </div>
    );
  }
}
