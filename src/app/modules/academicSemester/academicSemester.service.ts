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
};

const getAllSemesterFromDB = async () => {
    const result = await AcademicSemesterModel.find();
    return result;
}
const getASingleSemesterFromDB = async (id: string) => {
    const result = await AcademicSemesterModel.findById(id);
    return result;
};
const updateAcademicSemesterFromDB = async (id: string, updateData: object) => {
    const result = await AcademicSemesterModel.updateOne({ _id: id }, { $set: updateData });
    return result;
};

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllSemesterFromDB,
    getASingleSemesterFromDB,
    updateAcademicSemesterFromDB
}