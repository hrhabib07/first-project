import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error))
    }
}
const createUser: RequestHandler = catchAsync(async (req, res, next) => {
    const { password, student: studentData } = req.body;
    // const zodParsedData = userValidation.userValidationSchema.parse(userData);
    const result: any = await userServices.createUserIntoDB(password, studentData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student is created successfully",
        data: result
    })
});
// call the service function to create a new faculty
const createFaculty = catchAsync(async (req, res, next) => {
    const { password, faculty: facultyData } = req.body;
    const result = await userServices.createFacultyIntoDB(password, facultyData);
    // send response using customized response
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "faculty has been created successfully",
        data: result
    })
});

const createAdmin = catchAsync(async (req, res, next) => {
    const { password, admin: adminData } = req.body;
})
export const userController = {
    createUser,
    createFaculty,
    createAdmin
}