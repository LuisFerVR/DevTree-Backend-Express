import User from "../models/User";
import { Request, Response } from "express";

export const UserAccount = async (req:Request, res:Response) => {

    //await User.create(req.body);

    const userExist = await User.findOne({email: req.body.email});

    if (userExist) {
        const error = new Error("El usuario ya existe");
        return res.status(409).json({error: error.message});
    }

    const user = new User(req.body);
    await user.save();

    res.send("Registro exitoso");
}