
const express = require('express');
const app = express.Router();
const Tiket = require('../controllers/ticket');

app.get('/getLastTicket', Tiket.getLasTicket)
app.post('/saveTicket', Tiket.saveTicket)

module.exports = app;