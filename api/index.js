const { conn } = require('./src/db');
const server = require('./src/app');
const PORT = process.env.PORT || 3002;


conn.sync() 
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Escuchando en el puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err);
    });