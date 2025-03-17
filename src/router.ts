import {Router} from 'express';
import { UserAccount } from './handlers';

const router = Router();

//autentificación y registro
router.post('/auth/register', UserAccount)

export default router; // Exportamos la app para poder importarla en otro archivo