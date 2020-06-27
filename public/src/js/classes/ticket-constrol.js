const socket = io();

class Ticket{

    static turne = 0;

    static set setTurne(turne){
        Ticket.turne = turne;
    }

    constructor(){
        this.last = null;
        this.day = new Date().getDay();
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
        let body = {day : this.day, turne : Ticket.turne};
        (!!this.last) ? body.last = this.last : undefined;
        body = JSON.stringify(body);
        const res = await fetch('http://localhost:7070/ticket/saveTicket', {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body
        });
        const data = await res.json();
        Ticket.turne += 1;
        return data;
    }
}

export{
    Ticket
}
