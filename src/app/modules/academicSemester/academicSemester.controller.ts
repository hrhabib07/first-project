import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error))
    }
}
const createAcademicSemester: RequestHandler = catchAsync(async (req, res, next) => {
    // const { password, student: studentData } = req.body;
    // // const zodParsedData = userValidation.userValidationSchema.parse(userData);
    // const result = await userServices.createUserIntoDB(password, studentData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student is created successfully",
        data: result
    })
});
export const AcademicSemesterController = {
    createAcademicSemester
}