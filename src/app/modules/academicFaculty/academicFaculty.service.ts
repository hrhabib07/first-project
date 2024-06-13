import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";


const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    // Check for existing name (optional)
    const existingUser = await AcademicFaculty.findOne({ name: payload.name });
    if (existingUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'Name already exists!'); // Or create a custom Zod validation error
    }

    const result = await AcademicFaculty.create(payload);
    return result;
};

const getAllAcademicFacultyFromDB = async () => {
    const result = await AcademicFaculty.find();
    return result;
}

const getASingleAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findById(id);
    return result;
}

const updateAcademicFacultyIntoDB = async (id: string, data: TAcademicFaculty) => {
    const existingUser = await AcademicFaculty.findOne({ name: data.name });
    if (existingUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'Name already exists!'); // Or create a custom Zod validation error
    }
    const result = await AcademicFaculty.updateOne({ _id: id }, data);
    return result;
}

export const academicFacultyService = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultyFromDB,
    getASingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
}