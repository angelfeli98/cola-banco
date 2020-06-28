
const Ticket = require('../models/ticket');

const getLasTicket = (req, res) => {
    const tickets = Ticket.findOne()
                        .sort('-turne');

    tickets.then(tickets => {
        if(!!tickets) res.status(200).json({ok : true, tickets});
        else res.status(404).json({ok : false, message : 'NOT TICKETS'});
    }).catch(err => res.status(500).json({ok: false, err}))
}

const saveTicket = (req, res) => {
    const newTicket = new Ticket(req.body);
    const savedTicket = newTicket.save();

    savedTicket.then(ticket => {
        if(ticket) res.status(200).json({ok : true, ticket});
        else res.status(400).json({ok : false, message : 'Tiket not saved'});
    }).catch(err => res.status(500).json({ok : false, err}))
}

const asyncGetfirtTicket = async () => {

    try{
        const ticket = await Ticket.findOne()
                        .sort('turne');
        return {ok : true, ticket};
    }catch(err){
        return {ok : false, err};
    }

}

const asyncGetLastTicket = async() => {
    try{
        const ticket = await Ticket.findOne()
                                .sort('-turne')

        return {ok : true, ticket};
    }catch(err){
        return {ok : false, err};
    }
}

const asyncSaveTicket = async(data) => {
    try{
        const ticket = new Ticket(data);
        const savedTicket = await ticket.save();

        return {ok : true, savedTicket};
    }catch(err){
        return {ok : false, err};
    }
}

const asyncDeleteTicket = async(id) => {
    try{
        const deletedTicket = await Ticket.findByIdAndDelete(id);
        return deletedTicket;
    }catch(err){
        return err;
    }
}

const asyncGet4Tickets = async() => {
    try{
        const tickets = await Ticket.find()
                                    .sort('turne')
                                    .limit(4);
        return {ok : true, tickets};
    }catch(err){
        return {ok : false, err};
    }
}

module.exports = {
    getLasTicket,
    saveTicket,
    asyncGetfirtTicket,
    asyncGetLastTicket,
    asyncSaveTicket,
    asyncDeleteTicket,
    asyncGet4Tickets
}