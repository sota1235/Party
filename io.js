/**
 * io.js
 *
 * Description:
 *  file for WebSocket
 *
 * Author:
 *  sota1235
 */

var socket = require('socket.io');

module.exports = function(server) {
  var io = socket.listen(server);

  io.on('connection', function(socket) {
    console.log('a user connected');

    // send comment
    socket.on('comment', function(msg) {
      console.log('comment: ' + msg);
      io.emit('comment', msg);
    });
    // send vote for choices of quiz
    socket.on('vote', function(msg) {
      console.log('vote: ' + msg);
      io.emit('vote', msg);
    });
    // display quiz
    socket.on('open', function(id, text) {
      console.log('open: ' + id);
      io.emit('open', id);
      io.emit('question-open', text);
    });
    // show answer
    socket.on('openAnswer', function(msg) {
      console.log('open answer: ' + (msg + 1));
      io.emit('openAnswer', msg);
    });
    // hide quiz
    socket.on('finish', function(msg) {
      console.log('finish quiz');
      io.emit('finish');
      io.emit('question-finish');
    });
    // quiz timer finish
    socket.on('timerFinish', function(msg) {
      console.log('exit time limit of quiz');
      io.emit('timerFinish');
    });
  });
};
