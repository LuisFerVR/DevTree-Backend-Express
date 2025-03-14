import server from './server';

const port = process.env.port || 4000;
try {
    server.listen(port, '0.0.0.0', () => {
      console.log(`Servidor corriendo en el puerto: ${port}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
}