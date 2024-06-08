import { Faculty } from "./faculty.model";
import { TFaculty } from "./faculty.interface";
import mongoose from "mongoose";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
// get all the faculties from db
const getAllFacultyFromDB = async () => {

    const result = await Faculty.find();
    return result;
};
//get a single faculty from db
const getASingleFacultyFromDB = async (id: string) => {
    const result = await Faculty.find({ id });
    return result;
};
// update a single faculty into db
const updateASingleFacultyFromDB = async (id: string, payload: Partial<TFaculty>) => {
    const result = await Faculty.findOneAndUpdate({ id }, payload, { new: true });
    return result;
};
// delete a single faculty from db
const deleteASingleFacultyFromDB = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const deleteUser = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true });
        if (!deleteUser) {
            throw new AppError(httpStatus.BAD_REQUEST, "failed to delete user")
        };
        const deleteFaculty = await Faculty.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deleteFaculty) {
            throw new AppError(httpStatus.BAD_REQUEST, "failed to delete faculty")
        };
        (await session).commitTransaction();
        (await session).endSession();
        return deleteFaculty;
    } catch (error) {
        (await session).abortTransaction();
        (await session).endSession();
        throw new AppError(httpStatus.BAD_REQUEST, "No faculty found")
    }
}
// export all teh function
export const facultyServices = {
    getAllFacultyFromDB,
    getASingleFacultyFromDB,
    updateASingleFacultyFromDB,
    deleteASingleFacultyFromDB
}