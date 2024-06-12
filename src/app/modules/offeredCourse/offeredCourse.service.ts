import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Types } from "mongoose";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
    const { semesterRegistration, academicDepartment, academicFaculty, faculty, course } = payload;
    const isSemesterRegistrationExist = await SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "semester Registration not found")
    };
    const academicSemester = isSemesterRegistrationExist?.academicSemester;

    const isAcademicDepartmentExist = await AcademicDepartment.findById(academicDepartment);
    if (!isSemesterRegistrationExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Academic Department not found")
    };

    const result = await OfferedCourse.create({ ...payload, academicSemester });
    return result;
};

export const OfferedCourseService = {
    createOfferedCourseIntoDB
}