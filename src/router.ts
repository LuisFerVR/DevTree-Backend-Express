import {Router} from 'express';
import { body } from 'express-validator';
import { UserAccount } from './handlers';

const router = Router();

//autentificación y registro
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede ir vacio'),
    body('email')
        .isEmail()
        .withMessage('El correo no es valido'),
    body('password')
        .isLength({min : 8})
        .withMessage('La contraseña debe tener al menos 8 caracteres')
    ,UserAccount)

export default router; // Exportamos la app para poder importarla en otro archivo