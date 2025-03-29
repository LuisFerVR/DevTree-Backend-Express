import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from './middleware/validation';
import { UserAccount, getUser, login, updateProfile, uploadImage } from './handlers';
import { authenticate } from './middleware/auth';

const router = Router();

// Autenticación y registro
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacío'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede ir vacío'),
    body('email')
        .isEmail()
        .withMessage('El correo no es válido'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres'),
    handleInputErrors,
    UserAccount
);

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('El correo no es válido'),
    body('password')
        .notEmpty()
        .withMessage('Ingrese una contraseña válida'),
    handleInputErrors,
    login
);

router.get('/user',authenticate,getUser);

router.patch('/user',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacío'),
    body('description')
        .notEmpty()
        .withMessage('La descripción no puede ir vacío'),
    handleInputErrors,
    authenticate,
    updateProfile
)

router.post('/user/image',authenticate,uploadImage)

export default router;