/**
 * AdminAction.jsx
 *
 * Description:
 *   Action file for admin page
 *
 * Author:
 *   @sota1235
 */

export default class AdminAction {
  constructor(emitter, socket) {
    this.emitter = emitter;
    this.socket  = socket;
  }
  createQuestion(question) {
    this.emitter.emit('onQuestionClick', question);
  }
  deleteQuestion(id) {
    this.emitter.emit('onDeleteClick', id);
  }
  changeText(text) {
    this.emitter.emit('onTextChange', text);
  }
  changeAnswer(answer) {
    this.emitter.emit('onAnswerChange', answer);
  }
  changeChoices(choices) {
    this.emitter.emit('onChoicesChange', choices);
  }
  clearForm() {
    this.emitter.emit('onFormClear');
  }
}
