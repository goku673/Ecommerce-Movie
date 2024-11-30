const server = require('./src/app');
const axios = require('axios');
const {conn}  = require('./src/db');
const PORT = 3002;

conn.sync({force:false}).then(() => {
     
    server.listen( PORT , async () => {
        console.log("escuchando en el puerto 3002");
    });
})

