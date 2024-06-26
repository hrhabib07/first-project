import { NextFunction, Request, RequestHandler, Response } from "express"
import { academicDepartmentService } from "./academicDepartment.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error))
    }
}


const createAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
    const result = await academicDepartmentService.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "academic Department created successfully",
        data: result
    })
});

const getAllAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
    const result = await academicDepartmentService.getAllAcademicDepartmentFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Departments are retrieved successfully",
        data: result
    })
});

const getASingleAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await academicDepartmentService.getASingleAcademicDepartmentFromDB(departmentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department has retrieved successfully",
        data: result
    })
});

const updateAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await academicDepartmentService.updateAcademicDepartmentIntoDB(departmentId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department updated successfully",
        data: result
    })
});





export const academicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    getASingleAcademicDepartment,
    updateAcademicDepartment
}