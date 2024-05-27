import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
const createUser: RequestHandler = async (req, res, next) => {
    try {
        const { password, student: studentData } = req.body;
        // const zodParsedData = userValidation.userValidationSchema.parse(userData);
        const result = await userServices.createUserIntoDB(password, studentData);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Student is created successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
};
export const userController = {
    createUser
}