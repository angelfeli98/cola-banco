const socket = io();

class Escritorio{

    constructor(){
        socket.emit('getId', id => {
            this.id = id;
        })
    }

    atTicket(){
        
    }

}

export{
    Escritorio
}