import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { request } from "http";

const loginUser = catchAsync(async (req, res, next) => {
    const result = await AuthServices.loginUserService(req.body);
    // console.log(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "user is logged in successfully",
        data: result
    })
});

const forgetPassword = catchAsync(async (req, res, next) => {
    const result = await AuthServices.forgetPasswordServices(req.body.id);
    // console.log(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "reset password link generated  successfully",
        data: result
    })
});

const resetPassword = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    const result = await AuthServices.resetPassword(req.body.id, req.body.newPassword, token as string);
    // console.log(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "password is rested successfully",
        data: result
    })
})
const getMe = catchAsync(async (req, res) => {
    const { id, role } = req.user;
    const result = await AuthServices.getMeService(id, role);
    // console.log(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "user data retrieved",
        data: result
    })
})

export const AuthControllers = {
    loginUser,
    forgetPassword,
    resetPassword,
    getMe
} 