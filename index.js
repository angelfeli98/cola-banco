
require('./config/config');
require('./db/conection');
const { server } = require('./app');


server.listen(process.env.PORT, (err) => {
    if(!!!err)console.log(`Server ready at http://localhost:${ process.env.PORT }`);
})