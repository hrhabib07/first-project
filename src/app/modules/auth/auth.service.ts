import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken"
import config from "../../config";
import { sendEmail } from "../../utils/sendEmail";

const loginUser = async (payload: TLoginUser) => {


    // check if the user exist 
    const user = await User.isUserExistByCustomId(payload.id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "this user does not exist");
    }
    // if the user is deleted
    const isUserDeleted = user?.isDeleted;
    if (isUserDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, "this user is deleted");
    };
    // if the user is blocked
    const isUserBlocked = user?.status;
    if (isUserBlocked === "blocked") {
        throw new AppError(httpStatus.FORBIDDEN, "this user is blocked");
    };

    // match the password 
    const isPasswordMatched = await User.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.NOT_FOUND, "Password do not matched");
    }
    // create token and send to the client 
    const jwtPayload = {
        id: user.id,
        role: user.role
    }
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '10d' });
    return {
        accessToken,
        needsPasswordChange: user.needsPasswordChange
    }

};

const resetPassword = async (userId: string) => {
    // check if the user exist 
    const user = await User.isUserExistByCustomId(userId);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "this user does not exist");
    }
    // if the user is deleted
    const isUserDeleted = user?.isDeleted;
    if (isUserDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, "this user is deleted");
    };
    // if the user is blocked
    const isUserBlocked = user?.status;
    if (isUserBlocked === "blocked") {
        throw new AppError(httpStatus.FORBIDDEN, "this user is blocked");
    };

    // create token and send to the client 
    const jwtPayload = {
        id: user.id,
        role: user.role
    }
    const resetToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '10m' });

    const resetUrlLink = `${config.reset_password_ui_link}?id=${user.id}&token=${resetToken}`;
    // console.log(resetUrlLink);
    sendEmail(user.email, resetUrlLink);
}

export const AuthServices = { loginUser, resetPassword };