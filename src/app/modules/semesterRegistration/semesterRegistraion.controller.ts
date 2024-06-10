import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationServices } from "./semesterRegistraion.service";

const createSemesterRegistration = catchAsync(async (req, res, next) => {
    const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Semester Registration created successfully",
        data: result
    })
});

const getAllSemesterRegistration = catchAsync(async (req, res, next) => {
    const result = await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Semester Registration are retrieved successfully",
        data: result
    })
});

const getSingleSemesterRegistration = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Semester Registration has retrieved successfully",
        data: result
    })
});

const updateSemesterRegistration = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Semester Registration has updated successfully",
        data: result
    })
})

export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
};