const socket = io();

class Ticket{

    static turne = 0;

    static set setTurne(turne){
        Ticket.turne = turne;
    }

    constructor(){
        const date = new Date();
        this.last = null;
        this.day = date.getDay();
        this.aux = null;
    }

    async getLastTicket(){
        const res = await fetch('http://localhost:7070/ticket/getLastTicket');
        const data = await res.json();
        if(data.ok){
            this.last = data.tickets._id;
        }
        return data;
    }

    async saveTicket(){
        try{
            let body = {day : this.day, turne : Ticket.turne, last : this.last};
            (!!!this.last) ? delete body.last : undefined;
            Ticket.turne += 1;
            return body;
        }catch(err){
            return err;
        }
    }
}

export{
    Ticket
}
