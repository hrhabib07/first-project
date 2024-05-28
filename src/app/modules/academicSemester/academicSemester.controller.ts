import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";

const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error))
    }
}
const createAcademicSemester: RequestHandler = catchAsync(async (req, res, next) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester is created successfully",
        data: result
    })
});

const getAllAcademicSemester = catchAsync(async (req, res, next) => {
    const result = await AcademicSemesterServices.getAllSemesterFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semesters are retrieved successfully",
        data: result
    })
});

const getSingleAcademicSemester: RequestHandler = catchAsync(async (req, res, next) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterServices.getASingleSemesterFromDB(semesterId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semester is retrieved successfully",
        data: result
    })
});

const updateAcademicSemester: RequestHandler = catchAsync(async (req, res, next) => {
    const { semesterId } = req.params;
    const updateData = req.body;
    const result = await AcademicSemesterServices.updateAcademicSemesterFromDB(semesterId, updateData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester updated  successfully",
        data: result
    })
});

export const AcademicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
    updateAcademicSemester
}