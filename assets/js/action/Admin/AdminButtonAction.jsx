/**
 * AdminButtonAction.jsx
 *
 * Description:
 *   Action file for buttons on admin page
 *
 * Author:
 *   @sota1235
 */

export default class AdminButtonAction {
  constructor(emitter) {
    this.emitter = emitter;
  }
  openQuestionButton() {
    this.emitter.emit('openQuestion');
  }
  answerCheckButton() {
    this.emitter.emit('answerCheck');
  }
  openAnswerButton() {
    this.emitter.emit('openAnswer');
  }
  finishButton() {
    this.emitter.emit('standbyQuestion');
  }
}
