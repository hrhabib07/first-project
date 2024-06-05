import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || "something went wrong";

    type TErrorSource = {
        path: string | number;
        message: string
    }[];
    const errorSource: TErrorSource = [
        {
            path: "",
            message: "something went wrong"
        }
    ];

    if (error instanceof ZodError) {
        statusCode = 400;
        message = "ami zod error "
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        error
    })
};

export default globalErrorHandler;