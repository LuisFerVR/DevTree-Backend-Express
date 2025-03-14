import server from './server';
import colors from 'colors';

const port = process.env.port || 4000;
try {
    server.listen(port, '0.0.0.0', () => {
      console.log(colors.bgBlue.white.bold.italic(`Servidor corriendo en el puerto: ${port}`));
    });
  } catch (error) {
    console.error(colors.red.bold.white.italic(`Error al iniciar el servidor: ${error.message}`));
}