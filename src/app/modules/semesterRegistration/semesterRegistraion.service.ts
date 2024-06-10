import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { AcademicSemester } from "../academicSemester/academicSemesterModel";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
    const academicSemesterID = payload.academicSemester;
    const isAcademicSemesterExist = await AcademicSemester.findById(academicSemesterID);
    if (!isAcademicSemesterExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Academic Semester does not exits!")
    };
    const isSemesterRegistrationExist = await SemesterRegistration.findOne({ academicSemester: academicSemesterID });
    if (isSemesterRegistrationExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Semester Registration already exits!")
    };
    const result = await SemesterRegistration.create(payload);
    return result;
};

export const SemesterRegistrationServices = { createSemesterRegistrationIntoDB };