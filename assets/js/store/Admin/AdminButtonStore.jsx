/**
 * AdminButtonStore.jsx
 *
 * Description:
 *   Store class for buttons on admin page
 *
 * Author:
 *   @sota1235
 */

import { EventEmitter2 } from 'eventemitter2';
import _                 from 'lodash';

export default class AdminButtonStore extends EventEmitter2 {
  constructor(emitter) {
    super();
    this.emitter    = emitter;
    this.EVENT_NAME = 'buttonStatusChange';
    this.buttonStatus = {
      open:   { text: '公開',        disabled: false },
      answer: { text: 'AnswerCheck', disabled: true },
      finish: { text: '終了',        disabled: true },
      delete: { text: '削除',        disabled: false }
    };
    this.defaultStatus = _.clone(this.buttonStatus, true);
    // events
    this.emitter.on('openQuestion',    this.openQuestion.bind(this));
    this.emitter.on('answerCheck',     this.answerCheck.bind(this));
    this.emitter.on('openAnswer',      this.openAnswer.bind(this));
    this.emitter.on('standbyQuestion', this.standbyQuestion.bind(this));
  }
  get() {
    return this.buttonStatus;
  }
  openQuestion() {
    this.buttonStatus.open = { text: '公開中', disabled: true };
    this.buttonStatus.answer.disabled = false;
    this.buttonStatus.delete.disabled = true;
    this.emit(this.EVENT_NAME);
  }
  answerCheck() {
    this.buttonStatus.answer.text = '解答オープン';
    this.emit(this.EVENT_NAME);
  }
  openAnswer() {
    this.buttonStatus.answer.disabled = true;
    this.buttonStatus.finish.disabled = false;
    this.emit(this.EVENT_NAME);
  }
  standbyQuestion() {
    this.buttonStatus = _.clone(this.defaultStatus, true);
    this.emit(this.EVENT_NAME);
  }
}
