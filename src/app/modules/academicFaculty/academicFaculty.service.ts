import { TAcademicFaculty } from "./academicFaculty.interface";
import { academicFaculty } from "./academicFaculty.model";


const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
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

const updateAcademicFacultyIntoDB = async (id: string, data: object) => {
    const result = await academicFaculty.updateOne({ _id: id }, { data })
}

export const academicFacultyService = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultyFromDB,
    getASingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB
}