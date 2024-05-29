import { Request, RequestHandler, Response } from "express";
import { academicFacultyService } from "./academicFaculty.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { error } from "console";
import { NextFunction } from "express-serve-static-core";


const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error))
    }
}

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
    const result = await academicFacultyService.createAcademicFacultyIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "academic semester created successfully",
        data: result
    })
});

const getAllAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
    const result = await academicFacultyService.getAllAcademicFacultyFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculties are retrieved successfully",
        data: result
    })
});

const getASingleAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await academicFacultyService.getASingleAcademicFacultyFromDB(facultyId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Faculty has retrieved successfully",
        data: result
    })
});

const updateAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await academicFacultyService.updateAcademicFacultyIntoDB(facultyId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty updated successfully",
        data: result
    })
});

export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getASingleAcademicFaculty,
    updateAcademicFaculty
}