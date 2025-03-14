import express from 'express'; // ESM EcmaScript Module
import router from './router'; // Importamos el router

const app = express();

app.use(express.json()); // Leer datos en json
app.use('/', router); // Usamos el router en la ruta raíz


export default app; // Exportamos la app para poder importarla en otro archivo
