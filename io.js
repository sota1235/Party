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
  });
};
