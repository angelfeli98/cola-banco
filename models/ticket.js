
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    day : {
        type : Number,
        required : [true, 'Not day provided']
    },
    turne : {
        type : Number,
        required : [true, 'Not turne provided']
    },
    last : {
        required : false,
        type: Schema.Types.ObjectId,
        default : null
    }
})

module.exports = mongoose.model('Ticket', TicketSchema);