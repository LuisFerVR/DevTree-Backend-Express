import server from './server';

const port = process.env.port || 4000;
server.listen(server.port, () => {
    console.log('Servidor corriendo en el puerto:', port);
})