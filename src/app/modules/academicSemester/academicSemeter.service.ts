import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemesterModel";

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
    const result = await AcademicSemesterModel.create(payLoad);
    return result;
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}