
const { asyncGetLastTicket, asyncSaveTicket, asyncGetfirtTicket, asyncDeleteTicket, asyncGet4Tickets } = require('../controllers/ticket.js');
const { io } = require('../app');
const escritorios = [];

io.on('connection', async (client) => {

    console.log('Client connected');

    asyncGetLastTicket().then(data => {
        client.emit('firtsTicket', data);
    })

    client.on('saveTicket', async(data, callback) => {
        let newTicket;
        asyncSaveTicket(data).then(res => {
            return asyncGetLastTicket();
        }).then((ticket) => {
            newTicket = ticket;
            return asyncGet4Tickets();
        }).then(tickets4 => {
            client.broadcast.emit('tickets4', tickets4);
            client.broadcast.emit('newTicket', newTicket);
            callback(newTicket);
        }).catch(err => client.emit('updateFirstTicket', err))
            //callback(savedTicket);
    })

    client.on('getLasticket', callback => {
        asyncGetLastTicket().then(data =>{
            callback(data);
        })
    })

    client.on('getId', callback => {
        let id;
        if(escritorios.length == 0) id = 0;
        else id = escritorios[escritorios.length - 1] + 1;
        escritorios.push(id);
        callback(id);
    })

    client.on('giveTicket', async(escriotorio, callback) => {
        const tickets4 = await asyncGet4Tickets();
        client.broadcast.emit('tickets4', tickets4, escriotorio);
        const data = await asyncGetfirtTicket();
        if(data.ticket) await asyncDeleteTicket(data.ticket._id);
        callback(data);
    })

    client.on('startDash', async(callback) => {
        const ticket4 = await asyncGet4Tickets();
        callback(ticket4);
    })

})
