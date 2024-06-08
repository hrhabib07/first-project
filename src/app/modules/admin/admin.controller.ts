import { NextFunction, Request, RequestHandler, Response } from "express";
import { adminServices } from "./admin.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(error => next(error));
    }
};

const getAllAdmin = catchAsync(async (req, res, next) => {
    const result = await adminServices.getAllAdminFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Admins have been retrieved successfully',
        data: result
    })
});

const getASingleAdmin = catchAsync(async (req, res, next) => {
    const { adminId } = req.params;
    const result = await adminServices.getASingleAdminFromDB(adminId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Admin has been retrieved successfully',
        data: result
    })
});

const updateAdmin = catchAsync(async (req, res, next) => {
    const { adminId } = req.params;
    const { admin } = req.body;
    const result = await adminServices.updateAdminIntoDB(adminId, admin);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Admin has been updated successfully',
        data: result
    })
});

const deleteAdmin = catchAsync(async (req, res, next) => {
    const { adminId } = req.params;
    const result = await adminServices.deleteAdminFromDB(adminId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Admin has been deleted successfully',
        data: result
    })
});

export const adminControllers = {
    getAllAdmin,
    getASingleAdmin,
    updateAdmin,
    deleteAdmin
}