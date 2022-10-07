require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const {Snowflake} = require('@theinternetfolks/snowflake');
const server = http.createServer(app);
const { socketio } = require('./sockets/socketio');

app.use(cookieParser());
app.use(express.json());
app.use(cors({}));

app.get('/favicon.ico', (req, res) => {
    res.sendFile(__dirname + '/public/images/favicon.ico');
});
app.get('/room', (req, res) => {
    res.redirect(`/room/${Snowflake.generate()}`);
});
app.get('/room/:id', (req, res) => {
    res.cookie('meta', JSON.stringify({ roomId: req.params.id }));
    res.sendFile(__dirname + '/public/room.html');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

socketio(server);
const port = process.env.PORT || 5656;

server.listen(port, () => console.log("server start..."));
//Welcome to LolMegle ,this is an open public opinion and discussion application . Anyone can share their opinion . (Note-Please don't use slangs ,Thank you)