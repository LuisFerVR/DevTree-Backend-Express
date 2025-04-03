import User from "../models/User";
import { Request, Response } from "express";
import { checkPassword, HashPassword } from "../utils/auth";
import slug from "slug";
import formidable from "formidable";
import { v4 as uuidv4 } from "uuid";
import { generateToken } from "../utils/jwt";
import cloudinary from "../config/cloudinary";

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
        const {description, links} = req.body;

        const handle = slug(req.body.handle,'');
        const handleExist = await User.findOne({handle});
        if(handleExist && handleExist.email !== req.user.email) {
            const error = new Error('Nombre de usuario no disponible');
            return res.status(409).json({error: error.message});
        }

        //Actualizar el perfil del usuario
        req.user.handle = handle;
        req.user.description = description;
        req.user.links = links;
        await req.user.save();
        res.send("Peril actaulizado correctamente");
        
    } catch (e) {
        const error = new Error("Error al actualizar el perfil");
        return res.status(500).json({ error: error.message });
    }
}

export const uploadImage = async (req:Request, res:Response) => {

    try {
        const form = formidable({multiples : false});
        form.parse(req, (error,fields,files) => {
            cloudinary.uploader.upload(files.file[0].filepath,{public_id:uuidv4()}, async function (error,result) {
                if (error) {
                    return res.status(500).json({ error: "Error al subir la imagen" });
                }
                if (result) {
                    req.user.image = result.secure_url;
                    await req.user.save();
                    res.json({ image: result.secure_url });
                }
            });
        });
        
    } catch (e) {
        const error = new Error("Error al actualizar el perfil");
        return res.status(500).json({ error: error.message });
    }
}

export const getUserByHandle = async(req: Request, res: Response) => {
    try {
        const { handle } = req.params;
        const user = await User.findOne({ handle }).select("-_id -password -__v -email");
        if (!user) {
            const error = new Error("Usuario no encontrado");
            return res.status(404).json({ error: error.message });
        }
        res.json(user);
    } catch (e) {
        const error = new Error("Error al actualizar el perfil");
        return res.status(500).json({ error: error.message });
    }
}