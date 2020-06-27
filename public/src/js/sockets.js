
const labelTicket = document.getElementById('lblNuevoTicket');
const socket = io();

const socktesEvent = () =>{
    socket.on('connect', () => {
        console.log('Connected server');
    })

    socket.on('disconnect', () => {
        console.log('Lost Conection');
    })

    socket.on('firtsTicket', (data) => {
        if(data.ok) labelTicket.innerText = `Ultimo ticket: ${data.ticket.turne}`
    })
}


export{
    socktesEvent
}

