import {Request, Response, NextFunction} from "express";
import {ZodObject, ZodError} from "zod";

export const validate = (Schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try{
        Schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
            files: req.files,
        })
        next();
    }catch(error){
        if(error instanceof ZodError){
            return res.status(400).json({
                status: "error",
                message: error.issues.map((err) => err.message).join(", "),
            });
        }
        next(error);
    }
}