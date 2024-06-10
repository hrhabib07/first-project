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

export const SemesterRegistrationController = {
    createSemesterRegistration
};