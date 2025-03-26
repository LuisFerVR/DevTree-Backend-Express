import User from "../models/User";
import { Request, Response } from "express";
import { checkPassword, HashPassword } from "../utils/auth";
import slug from "slug";
import { generateToken } from "../utils/jwt";

export const UserAccount = async (req:Request, res:Response) => {

    //await User.create(req.body);

    const userExist = await User.findOne({email: req.body.email});

    const handle = slug(req.body.handle,'');

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
