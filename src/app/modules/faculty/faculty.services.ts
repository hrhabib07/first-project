import { Faculty } from "./faculty.model";
import { TFaculty } from "./faculty.interface";
// create a single faculty into db
const createFacultyIntoDB = async (payload: TFaculty) => {
    const result = await Faculty.create(payload);
    return result;
};
// get all the faculties from db
const getAllFacultyFromDB = async () => {
    const result = await Faculty.find();
    return result;
};
//get a single faculty from db
const getASingleFacultyFromDB = async (id: string) => {
    const result = await Faculty.find({ id });
    return result;
};
// update a single faculty into db
const updateASingleFacultyFromDB = async (id: string, payload: Partial<TFaculty>) => {
    const result = await Faculty.findOneAndUpdate({ id }, payload);
    return result;
};
// delete a single faculty from db
const deleteASingleFacultyFromDB = async (id: string) => {
    const result = await Faculty.findOneAndUpdate({ id }, { isDeleted: true });
    return result;
}
// export all teh function
export const facultyServices = {
    createFacultyIntoDB,
    getAllFacultyFromDB,
    getASingleFacultyFromDB,
    updateASingleFacultyFromDB,
    deleteASingleFacultyFromDB
}