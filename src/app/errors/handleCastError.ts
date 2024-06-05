import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericResponse } from "../interface/error";
import mongoose from "mongoose";

const handleCastError = (error: mongoose.Error.CastError): TGenericResponse => {
    const statusCode = 400;
    const errorSources: TErrorSource = [{
        path: error?.path,
        message: error?.message
    }];
    return {
        statusCode,
        message: "Invalid Id",
        errorSources
    }

};

export default handleCastError;