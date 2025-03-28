import User from "../models/User";
import { Request, Response } from "express";
import { checkPassword, HashPassword } from "../utils/auth";
import slug from "slug";
import { generateToken } from "../utils/jwt";
export const UserAccount = async (req:Request, res:Response) => {

    //await User.create(req.body);

    const userExist = await User.findOne({email: req.body.email});

    const handle = slug(req.body.handle,'');
    const handleExist = await User.findOne({handle});
    if(handleExist) {
        const error = new Error('Nombre de usuario no disponible');
        return res.status(409).json({error: error.message});
    }

    if (userExist) {
        res.status(409).json({ error: "El correo ya existe" });
        return;
    }

    const user = new User(req.body);
    user.password = await HashPassword(req.body.password);
    user.handle = handle;

    await user.save();

    res.status(201).json({ message: "Registro exitoso" });
}

export const login = async (req: Request, res: Response) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        res.status(401).json({ error: "Usuario no encontrado" });
        return;
    }

    const passwordValida = await checkPassword(req.body.password, user.password);

    if (!passwordValida) {
        res.status(401).json({ error: "Contraseña incorrecta" });
        return;
    }

    const token = generateToken({id: user._id})
    res.send(token);
};

export const getUser = async (req:Request, res:Response) => {
    res.json(req.user);
}

export const updateProfile = async (req:Request, res:Response) => {
    try {
        const {description} = req.body;

        const handle = slug(req.body.handle,'');
        const handleExist = await User.findOne({handle});
        if(handleExist && handleExist.email !== req.user.email) {
            const error = new Error('Nombre de usuario no disponible');
            return res.status(409).json({error: error.message});
        }

        //Actualizar el perfil del usuario
        req.user.handle = handle;
        req.user.description = description;
        await req.user.save();
        res.send("Peril actaulizado correctamente");
        
    } catch (e) {
        const error = new Error("Error al actualizar el perfil");
        return res.status(500).json({ error: error.message });
    }
}