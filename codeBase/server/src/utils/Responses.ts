import type {Request, Response} from "express";


export const sendSuccessResponse = (res: Response, statusCode: number, message: string, data?: any) => {
    res.status(statusCode).json({
        success: true,
        message,
        data
    });

}

export const sendErrorResponse = (res: Response, statusCode: number, message: string, error?: any) => {
    res.status(statusCode).json({
        success: false,
        message,
        error
    });
}