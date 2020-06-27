
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
module.exports.io = socketIO(server);
require('./sockets/sockets');

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended : false}))
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(cors())

module.exports = {
    server
}