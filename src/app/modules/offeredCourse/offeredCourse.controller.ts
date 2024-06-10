import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseService } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res, next) => {
    const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Offered  course created successfully",
        data: result
    })
});

export const OfferedCourseControllers = {
    createOfferedCourse
};