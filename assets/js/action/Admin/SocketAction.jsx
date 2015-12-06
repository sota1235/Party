/**
 * SocketAction.jsx
 *
 * Description:
 *   Action file for connectiong WebSocket
 *
 * Author:
 *   @sota1235
 */

export default class SocketAction {
  constructor(socket) {
    this.socket  = socket;
  }
  exitTimeLimit() {
    console.log('exit time limit of quiz');
    this.socket.emit('timerFinish');
  }
  broadcastQuestion(id, text) {
    this.socket.emit('open', id, text);
  }
  answerCheck() {
    this.socket.emit('answerCheck');
  }
  openAnswer(index) {
    this.socket.emit('openAnswer', index - 1);
  }
  finishQuestion() {
    this.socket.emit('finish');
  }
}
