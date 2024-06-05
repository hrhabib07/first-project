import { NextFunction, Request, Response } from "express";
import { stat } from "fs";
import { ZodError, ZodIssue, } from "zod";
import config from "../config";
import { TErrorSource } from "../interface/erroreSource.interface";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";

const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || "something went wrong";


    let errorSource: TErrorSource = [
        {
            path: "",
            message: "something went wrong"
        }
    ];



    if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSources
    }
    else if (error.name === "ValidationError") {
        const simplifiedError = handleValidationError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSources
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        stack: config.NODE_ENV === "development" ? error.stack : null,
    })
};

export default globalErrorHandler;