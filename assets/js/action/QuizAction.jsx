/**
 * QuizAction.jsx
 *
 * Description:
 *   Action file for quiz page
 *
 * Author:
 *   @sota1235
 */

export default class QuizAction {
  constructor(emitter, socket) {
    this.emitter = emitter;
    this.socket  = socket;
    this.socket.on('open', this.displayQuiz.bind(this));
  }
  displayQuiz(id) {
    this.emitter.emit('displayQuiz', id);
  }
}
