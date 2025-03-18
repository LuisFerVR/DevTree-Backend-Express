import User from "../models/User";
import { Request, Response } from "express";
import { HashPassword } from "../utils/auth";
import slug from "slug";
import { validationResult } from "express-validator";

export const UserAccount = async (req:Request, res:Response) => {

    //await User.create(req.body);

    //Manejor de errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const userExist = await User.findOne({email: req.body.email});

    const handle = slug(req.body.handle,'');
    const HandleExist = await User.findOne({handle: handle});

    if (userExist) {
        const error = new Error("El correo ya existe");
        return res.status(409).json({error: error.message});
    }

    if(HandleExist) {
        const error = new Error("El handle ya existe");
        return res.status(409).json({error: error.message});
    }

    const user = new User(req.body);
    user.password = await HashPassword(req.body.password);
    user.handle = handle;

    await user.save();

    res.send("Registro exitoso");
}