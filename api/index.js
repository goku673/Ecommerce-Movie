const { conn } = require('./src/db');
const server = require('./src/app');
const PORT = process.env.PORT || 3002;

// Cambia force: true a simplemente conn.sync() o conn.sync({ alter: true })
conn.sync() // O conn.sync({ alter: true }) si necesitas ajustar la estructura
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Escuchando en el puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err);
    });