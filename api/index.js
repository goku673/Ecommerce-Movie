const server = require('./src/app');
const axios = require('axios');
const {conn}  = require('./src/db');
const PORT = 3002;

conn.sync({alter : true}).then(() => {
     
    server.listen( PORT , async () => {
        console.log("escuchando en el puerto 3002");
    });
})

// si se hacer cambios en los modelos o cambios grandes alter : true en vez de force : true
