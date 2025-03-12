import {Router} from 'express';

const router = Router();

//autentificación y registro
router.post('/auth/register', (req, resp) => {
    console.log(req.body);
    
})

export default router; // Exportamos la app para poder importarla en otro archivo