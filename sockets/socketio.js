const socketServer = require("socket.io");
const { chatNamespace } = require("./namespaces/chat");

function socketio(server) {
  const io = socketServer(server, {
    cors: {
      origin: "*",
    },
  });
  chatNamespace("/chat", io);
}

module.exports = { socketio };
