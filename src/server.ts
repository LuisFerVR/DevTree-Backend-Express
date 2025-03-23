import express from 'express'; // ESM EcmaScript Module
import cors from 'cors'; // Importamos cors
import 'dotenv/config'; // Importamos dotenv para poder usar las variables de entorno
import router from './router'; // Importamos el router
import { connectBD } from './config/db';
import { corsConfig } from './config/cors';

connectBD(); // Conectamos a la base de datos

const app = express();
app.use(cors(corsConfig))

app.use(express.json()); // Leer datos en json
app.use('/', router); // Usamos el router en la ruta raíz


export default app; // Exportamos la app para poder importarla en otro archivo