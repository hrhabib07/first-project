import { NextFunction, Request, RequestHandler, Response } from "express";
import { facultyServices } from "./faculty.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
// to demolish the try catch in every function
const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(error => next(error))
    }
}
// call the service function to create a new faculty
const createFaculty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await facultyServices.createFacultyIntoDB(req.body);
    // send response using customized response
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "faculty has been created successfully",
        data: result
    })
});
// call the service to get all the faculty 
const getAllFaculty = catchAsync(async (req, res, next) => {
    const result = await facultyServices.getAllFacultyFromDB();
    // send response using customized response
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "faculties has been retrieved successfully",
        data: result
    });
});
// call the service to get a single faculty 
const getASingleFaculty = catchAsync(async (req, res, next) => {
    const { facultyId } = req.params;
    const result = await facultyServices.getASingleFacultyFromDB(facultyId);
    // send response using customized response
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "faculty has been retrieved successfully",
        data: result
    });
});
// call the service to update faulty 
const updateFaculty = catchAsync(async (req, res, next) => {
    const { facultyId } = req.params;
    const result = await facultyServices.updateASingleFacultyFromDB(facultyId, req.body);
    // send response using customized response
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "faculty has been updated successfully",
        data: result
    });
});
// call the service to delete faulty 
const deleteFaculty = catchAsync(async (req, res, next) => {
    const { facultyId } = req.params;
    const result = await facultyServices.deleteASingleFacultyFromDB(facultyId);
    // send response using customized response
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "faculty has been deleted successfully",
        data: result
    });
});


export const facultyControllers = {
    createFaculty,
    getAllFaculty,
    getASingleFaculty,
    updateFaculty,
    deleteFaculty
}
