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

    console.log(req.body);

    const existingUser = await UserModel.findOne({email});

    if(existingUser) {
        const error = new Error("El usuario ya existe. Por favor ingresa otro correo");

        return(res.json({msg: error.message}));
    }

    if(!validateEmail(email)) {
        const error = new Error("El correo debe ser de la forma '@estudiantec.cr'");

        return(res.json({msg: error.message}));
    }

    try {
        const user = new UserModel(req.body);
        user.save();

        res.json({succes: "Usuario creado correctamente"});
    } catch (error: any) {
        console.log("createUser error", error);
    }
}

// This function checks if the user exists
export const userLogin = async(req: Request, res: Response) => {
    const { email, password } = req.query as {email: string, password: string};

    const user = await UserModel.findOne({email});
    
    if(!user) {
        const error = new Error("El usuario no existe. Por favor crea una cuenta");
        
        return(res.json({msg: error.message}));
    }

    if(await user.verifyPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
        });
    } else {
        const error = new Error("La contraseña ingresada es incorrecta");

        return(res.json({msg: error.message}));
    }
}

// This function change the user password
export const changePassword = async(req: Request, res: Response) => {
    const { email, password }: {email: string, password: string} = req.body;

    const user = await UserModel.findOne({email});

    if(!user) {
        const error = new Error("El usuario no existe. Por favor crea una cuenta");

        return(res.json({msg: error.message}));
    }

    // It is necessary to add more validations to implement this functionality.

    try {
        user.password = password;
        await user.save();

        res.json({msg: "Contraseña modificada correctamente"});
    } catch (error) {
        console.log("New Password error: ", error);
    }
}