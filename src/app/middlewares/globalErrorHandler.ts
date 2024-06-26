import { NextFunction, Request, Response } from "express";
import { stat } from "fs";
import { ZodError, ZodIssue, } from "zod";
import config from "../config";
import { TErrorSource } from "../interface/error";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/appError";

const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = "something went wrong";


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
    else if (error.name === "CastError") {
        const simplifiedError = handleCastError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSources
    }
    else if (error.code === 11000) {
        const simplifiedError = handleDuplicateError(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSources
    }
    else if (error instanceof AppError) {
        statusCode = error?.statusCode;
        message = error?.message;
        errorSource = [{
            path: "",
            message: error.message
        }]
    }
    else if (error instanceof Error) {
        message = error?.message;
        errorSource = [{
            path: "",
            message: error.message
        }]
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        error,
        stack: config.NODE_ENV === "development" ? error.stack : null,
    })
};

export default globalErrorHandler;