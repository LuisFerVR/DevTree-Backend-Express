import express from 'express'; // ESM EcmaScript Module
import 'dotenv/config'; // Importamos dotenv para poder usar las variables de entorno
import router from './router'; // Importamos el router
import { connectBD } from './config/db';

const app = express();

connectBD(); // Conectamos a la base de datos
app.use(express.json()); // Leer datos en json
app.use('/', router); // Usamos el router en la ruta raíz


export default app; // Exportamos la app para poder importarla en otro archivo
