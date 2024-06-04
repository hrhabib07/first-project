import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model"

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
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
    const result = await AcademicDepartment.updateOne({ _id: id }, payload);
    return result;
}

export const academicDepartmentService = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentFromDB,
    getASingleAcademicDepartmentFromDB,
    updateAcademicDepartmentIntoDB
}
