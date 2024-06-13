import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { request } from "http";

const loginUser = catchAsync(async (req, res, next) => {
    const result = await AuthServices.loginUser(req.body);
    console.log(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "user is logged in successfully",
        data: result
    })
});

export const AuthControllers = {
    loginUser
} 