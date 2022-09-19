require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
require('./config/database').connect();
const Chat = require('./models/chat');
const port = process.env.PORT || 5656;
const msgLimit = 5;
//var clients=0;
var clients = [];
var userMap = new Map();
var tempMap = new Map();

app.use(express.json());

app.get('/favicon.ico', (req, res) => {
    res.sendFile(__dirname + '/public/images/favicon.ico');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const nsp = io.of('/chat');
nsp.on('connection', async (socket) => {
    let nchats = 0;
    nchats = await Chat.count();
    clients.push(socket.id);
    nsp.emit('no_client', { type: 'serverMessage', message: clients.length + " clients connected!" });

    socket.on('setUser', (data) => {
        if (userMap.has(data))
            return socket.emit('userExist', data + " is already exist <br/> Try new name");
        userMap.set(data, socket.id);
        tempMap.set(socket.id, data);
        socket.emit('userSet', data);
    });
    socket.on('msg', async (data) => {
        nsp.emit('newMsg', data);
        let d = await Chat.create(data);
    });
    socket.on('loadPrev', async (d) => {
        let prevm = await Chat.find().skip((nchats - msgLimit) < 0 ? 0 : (nchats - msgLimit)).limit(msgLimit);
        socket.emit('prev_message', prevm);
        nchats = nchats - msgLimit;
    });
    socket.on('disconnect', function () {
        let i = clients.indexOf(socket.id);
        clients.splice(i, 1);
        userMap.delete(tempMap.get(socket.id));
        tempMap.delete(socket.id);
        nsp.emit('no_client', { type: 'serverMessage', message: clients.length + " clients connected!" });
    });
});

server.listen(port, () => console.log("server start..."));
//Welcome to LolMegle ,this is an open public opinion and discussion application . Anyone can share their opinion . (Note-Please don't use slangs ,Thank you)