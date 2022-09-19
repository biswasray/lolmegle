const socketServer = require('socket.io');
const { chatNamespace } = require('./namespaces/chat');

function socketio(server) {
    const io = socketServer(server);
    chatNamespace('/chat', io);
}

module.exports = { socketio };