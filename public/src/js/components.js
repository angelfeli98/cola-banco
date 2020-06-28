import { Ticket } from './classes/ticket-constrol.js';
const buttonNewTicket = document.getElementById('newTicket');
import { socktesEvent } from './sockets.js'
const socket = io();
const labelTicket = document.getElementById('lblNuevoTicket');
const buttonGiveTicket = document.getElementById('giveTicket');
const smallTicket = document.querySelector('small');

const config = async () => {

    const ticket = new Ticket();
    const res = await ticket.getLastTicket();
    if(!!!res.ok) Ticket.setTurne = 0 ;
    else if(res.tickets.day != new Date().getDay())
        Ticket.setTurne = 0;
    else Ticket.setTurne = res.tickets.turne + 1;
}

const events = () => {

    if(labelTicket)
    buttonNewTicket.addEventListener('click', () => {
        buttonNewTicket.disabled = true;
        const ticket = new Ticket();
        ticket.getLastTicket().then(data => {
            return ticket.saveTicket();
        }).then(body => {
            socket.emit('saveTicket', body, (ultimoTicket) => {
                buttonNewTicket.disabled = false;
                labelTicket.innerText =  `Ultimo ticket ${ultimoTicket.ticket.turne} `;
            });
        }).catch(console.log)
    });

    if(buttonGiveTicket)
    buttonGiveTicket.addEventListener('click', () => {
        const urlParams = new URLSearchParams(window.location.search);
        let escritorio;
        if(!!!urlParams.has('escritorio')) window.location = 'index.html';
        else{
            escritorio = urlParams.get('escritorio');
            socket.emit('giveTicket', escritorio, (ticket) => {
                if(ticket.ticket == null) smallTicket.innerText = `NOT TICKET`;
                else if(ticket.ok && ticket.ticket) smallTicket.innerText = ticket.ticket.turne;
            })
        }

    });
}

const init = () => {
    config();
    socktesEvent();
    events();
}

export{
    init
}




