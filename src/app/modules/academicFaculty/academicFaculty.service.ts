import { TAcademicFaculty } from "./academicFaculty.interface";
import { academicFaculty } from "./academicFaculty.model";


const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    // Check for existing name (optional)
    const existingUser = await academicFaculty.findOne({ name: payload.name });
    if (existingUser) {
        throw new Error('Name already exists!'); // Or create a custom Zod validation error
    }

    const result = await academicFaculty.create(payload);
    return result;
};

const getAllAcademicFacultyFromDB = async () => {
    const result = await academicFaculty.find();
    return result;
}

const getASingleAcademicFacultyFromDB = async (id: string) => {
    const result = await academicFaculty.findById(id);
    return result;
}

const updateAcademicFacultyIntoDB = async (id: string, data: TAcademicFaculty) => {
    const existingUser = await academicFaculty.findOne({ name: data.name });
    if (existingUser) {
        throw new Error('Name already exists!'); // Or create a custom Zod validation error
    }
    const result = await academicFaculty.updateOne({ _id: id }, { data });
    return result
}

export const academicFacultyService = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultyFromDB,
    getASingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
}