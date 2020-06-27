
require('./config/config');
const { server } = require('./app');


server.listen(process.env.PORT, (err) => {
    if(!!!err)console.log(`Server ready at http://localhost:${ process.env.PORT }`);
})