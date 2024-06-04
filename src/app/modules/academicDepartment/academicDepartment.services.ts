import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model"

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
    // Check for existing name (optional)
    const existingUser = await AcademicDepartment.findOne({ name: payload.name });
    if (existingUser) {
        throw new Error('Department Name already exists!'); // Or create a custom Zod validation error
    }
    const result = await AcademicDepartment.create(payload);
    return result;
};

const getAllAcademicDepartmentFromDB = async () => {
    const result = await AcademicDepartment.find();
    return result;
};

const getASingleAcademicDepartmentFromDB = async (id: string) => {
    const result = await AcademicDepartment.findById(id);
    return result
};

const updateAcademicDepartmentIntoDB = async (id: string, payload: Partial<TAcademicDepartment>) => {
    // Check for existing name (optional)
    const existingUser = await AcademicDepartment.findOne({ name: payload.name });
    if (existingUser) {
        throw new Error('Department Name already exists!'); // Or create a custom Zod validation error
    }
    const result = await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
}

export const academicDepartmentService = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentFromDB,
    getASingleAcademicDepartmentFromDB,
    updateAcademicDepartmentIntoDB
}
