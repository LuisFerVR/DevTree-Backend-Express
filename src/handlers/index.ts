import User from "../models/User";
import { Request, Response } from "express";

export const UserAccount = async (req:Request, res:Response) => {

    //await User.create(req.body);

    const user = new User(req.body);
    await user.save();

    res.send("Registro exitoso");
}