import express from 'express'; // ESM EcmaScript Module
import router from './router'; // Importamos el router
const app = express();

app.use('/', router); // Usamos el router en la ruta raíz
app.use(express.json()); // Middleware para parsear JSON


export default app; // Exportamos la app para poder importarla en otro archivo