import { Ticket } from './classes/ticket-constrol.js';
const buttonNewTicket = document.getElementById('newTicket');
import { socktesEvent } from './sockets.js'
const socket = io();

const config = async () => {

    const ticket = new Ticket();
    const res = await ticket.getLastTicket();

    if(!!!res.ok) Ticket.setTurne = 0 ;
    else if(res.tickets.day != new Date().getDay())
        Ticket.setTurne = 0;
    else Ticket.setTurne = res.tickets.turne + 1;
}

const events = () => {
    buttonNewTicket.addEventListener('click', () => {
        const ticket = new Ticket()
        ticket.getLastTicket().then(data => {
            return ticket.saveTicket();
        }).then(data => {
            console.log(`Ticket guardado ${data}`);
        }).catch(console.log)
    })
}


const init = () => {
    config();
    socktesEvent();
    events();
}

export{
    init
}




