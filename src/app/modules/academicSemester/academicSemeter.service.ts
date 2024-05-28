import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterModel } from "./academicSemesterModel";

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
    // semester name --> semester code


    if (academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code) {
        throw new Error("Invalid code!!!")
    }

    const result = await AcademicSemesterModel.create(payLoad);
    return result;
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}