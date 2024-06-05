import { NextFunction, Request, Response } from "express";
import { stat } from "fs";
import { ZodError, ZodIssue, } from "zod";
import config from "../config";

const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || "something went wrong";

    type TErrorSource = {
        path: string | number;
        message: string
    }[];
    let errorSource: TErrorSource = [
        {
            path: "",
            message: "something went wrong"
        }
    ];

    const handleZodError = (error: ZodError) => {
        const statusCode = 400;
        const errorSources: TErrorSource = error.issues.map((issue: ZodIssue) => {
            return {
                path: issue?.path[issue.path.length - 1],
                message: issue.message,
            };
        });
        return {
            statusCode,
            message: "validation error",
            errorSources
        }

    }

    if (error instanceof ZodError) {
        const simplifiedError = handleZodError(error);
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