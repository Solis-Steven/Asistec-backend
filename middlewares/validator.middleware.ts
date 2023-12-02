import { Request, Response, NextFunction } from "express";
import { Schema } from "zod";

// This function validate the request body with the schema
export const validateSchema = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        //parse the request body with the schema
      schema.parse(req.body);
      next();
    } catch (error: any) {
      console.log(error.errors);
      return res
        .status(400)
        .json({ error: error.errors.map((err: any) => err.message) });
    }
  };
};
