import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { sendImgToCloudinary } from "../../utils/sendImgToCloudinary";
const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error))
    }
}
const createUser: RequestHandler = catchAsync(async (req, res, next) => {
    const { password, student: studentData } = req.body;
    // const zodParsedData = userValidation.userValidationSchema.parse(userData);


    const result: any = await userServices.createUserIntoDB(password, studentData, req.file);
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
    const result = await userServices.createAdminIntoDB(password, adminData);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "admin has created successfully",
        data: result
    })
});

const changeStatus = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await userServices.changeUserStatusIntoDB(id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "admin has created successfully",
        data: result
    })
});
export const userController = {
    createUser,
    createFaculty,
    createAdmin,
    changeStatus
}