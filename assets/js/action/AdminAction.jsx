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
  broadcastQuestion(id) {
    this.socket.emit('open', id);
  }
  openAnswer(index) {
    this.socket.emit('openAnswer', index - 1);
  }
  finishQuestion() {
    this.socket.emit('finish');
  }
}
