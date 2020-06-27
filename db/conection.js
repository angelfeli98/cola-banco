
const mongoose = require('mongoose');
require('../config/config');

const opt = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify: false,
    useCreateIndex: true
}

mongoose.connect(process.env.MONGO_DB, opt, (err) => {
    if(!!!err) console.log('Conection to data base');
})