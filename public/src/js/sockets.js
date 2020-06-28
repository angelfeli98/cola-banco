
const labelTicket = document.getElementById('lblNuevoTicket');
const labelTicket1 = document.getElementById('lblTicket1');
const labelTicket2 = document.getElementById('lblTicket2');
const labelTicket3 = document.getElementById('lblTicket3');
const labelTicket4 = document.getElementById('lblTicket4');
const labelEscritorio1 = document.getElementById('lblEscritorio1');
const socket = io();
const labels = [labelTicket2, labelTicket3, labelTicket4];

const socktesEvent = () =>{
    socket.on('connect', () => {
        console.log('Connected server');

        if(labelTicket1){
            const labels = [labelTicket2, labelTicket3, labelTicket4];
            socket.emit('startDash', data => {
                labels.map((label, i) => label.innerText = ` ${ (data.tickets[i] ) ? 'Ticket ' + data.tickets[i].turne : 'NO TICKET'}` )
                labelEscritorio1.innerText = ``;
                labelTicket1.innerText = `NOT TICKET`
            })
        }
    })

    socket.on('disconnect', () => {
        console.log('Lost Conection');
    })

    socket.on('firtsTicket', data => {
        if(data.ok && labelTicket) labelTicket.innerText = `Ultimo ticket: ${data.ticket.turne}`
    })

    socket.on('newTicket', data => {
        if(data.ok && labelTicket) labelTicket.innerText = `Ultimo ticket: ${data.ticket.turne}`
    })

    socket.on('tickets4', async(tickets4, escritorio) =>{
        if(tickets4.ok && labelTicket1){
            if(escritorio){
                const labels = [labelTicket1, labelTicket2, labelTicket3, labelTicket4];
                labels.map((label, i) => label.innerText = ` ${ (tickets4.tickets[i] ) ? 'Ticket ' + tickets4.tickets[i].turne : 'NO TICKET'}`)
                labelEscritorio1.innerText = `Desktop ${escritorio}`;
                const audio = new Audio('/audio/new-ticket.mp3');
                await audio.play();
            }
            else{
                const labels = [labelTicket2, labelTicket3, labelTicket4];
                labels.map((label, i) => label.innerText = ` ${ (tickets4.tickets[i] ) ? 'Ticket ' + tickets4.tickets[i].turne : 'NO TICKET'}`)
            }
        }
    });
}


export{
    socktesEvent
}

