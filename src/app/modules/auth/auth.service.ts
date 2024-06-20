import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../../config";
import { sendEmail } from "../../utils/sendEmail";
import bcrypt from "bcrypt";
import { Student } from "../student/student.model";
import { Admin } from "../admin/admin.model";
import { Faculty } from "../faculty/faculty.model";

const loginUserService = async (payload: TLoginUser) => {


    // check if the user exist 
    const user = await User.isUserExistsByCustomId(payload.id);

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
    };
};

const forgetPasswordServices = async (userId: string) => {
    // check if the user exist 
    const user = await User.isUserExistsByCustomId(userId);
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
    console.log(resetUrlLink);
};

const resetPassword = async (id: string, newPassword: string, accessToken: string) => {
    // check if the user exist 
    const user = await User.isUserExistsByCustomId(id);
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

    const decoded: JwtPayload = await jwt.verify(accessToken, config.jwt_access_secret as string) as JwtPayload;
    const userId = decoded?.id;

    if (id !== userId) {
        throw new AppError(httpStatus.BAD_REQUEST, "user id is not valid")
    };

    const hashedNewPassword = await bcrypt.hash(newPassword, Number(config.bcrypt_salt_rounds));


    const result = await User.findOneAndUpdate({ id }, { password: hashedNewPassword, needsPasswordChange: false }, { new: true },);

    return result;

}

const getMeService = async (id: string, role: string) => {
    let result = null;
    if (role === "student") {
        result = await Student.findOne({ id });
    } else if (role === "admin") {
        result = await Admin.findOne({ id });
    } else if (role === "faculty") {
        result = await Faculty.findOne({ id });
    }
    return result;
}

export const AuthServices = {
    loginUserService,
    forgetPasswordServices,
    resetPassword,
    getMeService
};