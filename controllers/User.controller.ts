import { Request, Response } from "express"
import UserModel from "../models/User.model.ts";

const validateEmail = (email: string): boolean => {
    // Regular expression to validate an email with domain "@estudiantec.cr"
    const regex = /^[a-zA-Z0-9._%+-]+@estudiantec\.cr$/;
    
    // Check if the email matches the regular expression
    return regex.test(email);
}

// This function takes an user object and creates new valid user
export const createUser = async(req: Request, res: Response) => {
    const { email }: {email: string} = req.body;

    const existingUser = await UserModel.findOne({email});

    if(existingUser) {
        const error = new Error("El usuario ya existe. Por favor ingresa otro correo");

        return(res.status(400).json({msg: error.message}));
    }

    if(!validateEmail(email)) {
        const error = new Error("El correo debe ser de la forma '@estudiantec.cr'");

        return(res.status(400).json({msg: error.message}));
    }

    try {
        const user = new UserModel(req.body);
        user.save();

        res.json({msg: "Usuario creado correctamente"});
    } catch (error: any) {
        console.log("createUser error", error);
    }
}

// This function checks if the user exists
export const userLogin = async(req: Request, res: Response) => {
    const { email, password }: {email: string, password: string} = req.body;

    const user = await UserModel.findOne({email});

    if(!user) {
        const error = new Error("El usuario no existe. Por favor crea una cuenta");

        return(res.status(400).json({msg: error.message}));
    }

    if(await user.verifyPassword(password)) {
        res.json({
            userId: user._id,
            name: user.name,
        });
    } else {
        const error = new Error("La contraseña ingresada es incorrecta");

        return(res.status(403).json({msg: error.message}));
    }
}