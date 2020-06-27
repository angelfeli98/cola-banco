
const { asyncGetLastTicket, asyncSaveTicket } = require('../controllers/ticket.js');
const { io } = require('../app');

io.on('connection', async (client) => {

    console.log('Client connected');

    asyncGetLastTicket().then(data => {
        client.emit('firtsTicket', data);
    })

    client.on('saveTicket', async(data) => {
        const savedData = await asyncSaveTicket(data);
        client.emit('firtsTicket', data);
    })
})
