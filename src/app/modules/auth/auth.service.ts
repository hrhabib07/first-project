import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";

const loginUser = async (payload: TLoginUser) => {
    const user = await User.isUserExistByCustomId(payload.id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "this user does not exist");
    }
    const isPasswordMatched = await User.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.NOT_FOUND, "Password do not matched");
    }
    // // check if the user exist 
    // const isUserExists = await User.findOne({ id: payload.id });
    // if (!isUserExists) {
    //     throw new AppError(httpStatus.NOT_FOUND, "this user does not exist");
    // }
    // // if the user is deleted
    // const isUserDeleted = isUserExists?.isDeleted;
    // if (isUserDeleted) {
    //     throw new AppError(httpStatus.FORBIDDEN, "this user is deleted");
    // };
    // // if the user is blocked
    // const isUserBlocked = isUserExists?.status;
    // if (isUserBlocked === "blocked") {
    //     throw new AppError(httpStatus.FORBIDDEN, "this user is blocked");
    // };

    // // match the password 
    // const isPasswordMatched = await bcrypt.compare(payload.password, isUserExists?.password);
    // console.log(isPasswordMatched);



};

export const AuthServices = { loginUser };