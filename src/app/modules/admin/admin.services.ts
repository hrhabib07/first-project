import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { Admin } from "./admin.model"
import { adminSearchableTerm } from "./adminConstant";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
    const adminQuery = new QueryBuilder(Admin.find(), query).search(adminSearchableTerm).filter().sort().paginate().fields();
    const result = await adminQuery.modelQuery;
    return result;
}

const getASingleAdminFromDB = async (id: string) => {
    const result = await Admin.findOne({ id });
    return result;
}

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
    const result = await Admin.findOneAndUpdate({ id }, payload, { new: true });
    return result;
}
const deleteAdminFromDB = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();
        const deleteUser = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deleteUser) {
            throw new AppError(httpStatus.BAD_REQUEST, "failed to delete user")
        }
        const deleteAdmin = await Admin.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deleteAdmin) {
            throw new AppError(httpStatus.BAD_REQUEST, "failed to delete admin")
        }
        await session.commitTransaction();
        await session.endSession();
        return deleteAdmin;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, "Admin not found")
    }
}

export const adminServices = {
    getAllAdminFromDB,
    getASingleAdminFromDB,
    updateAdminIntoDB,
    deleteAdminFromDB
}