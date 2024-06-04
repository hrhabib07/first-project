import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemesterModel";

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
    // semester name --> semester code
    if (academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code) {
        throw new AppError(httpStatus.NOT_FOUND, "Invalid code!!!")
    }
    const result = await AcademicSemester.create(payLoad);
    return result;
};

const getAllSemesterFromDB = async () => {
    const result = await AcademicSemester.find();
    return result;
}
const getASingleSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
};
const updateAcademicSemesterFromDB = async (id: string, payload: Partial<TAcademicSemester>) => {
    if (payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new AppError(httpStatus.NOT_FOUND, "invalid semester code")
    }
    const result = await AcademicSemester.updateOne({ _id: id }, { $set: payload });
    return result;
};

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllSemesterFromDB,
    getASingleSemesterFromDB,
    updateAcademicSemesterFromDB
}