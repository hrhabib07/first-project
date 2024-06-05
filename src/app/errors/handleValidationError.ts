import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/erroreSource.interface";
import mongoose from "mongoose";

const handleValidationError = (error: mongoose.Error.ValidationError) => {
    const statusCode = 400;
    const errorSources: TErrorSource = Object.values(error.errors).map((val: any) => {
        return {
            path: val?.path,
            message: val?.message,
        };
    });
    return {
        statusCode,
        message: "validation error",
        errorSources
    }

};

export default handleValidationError;