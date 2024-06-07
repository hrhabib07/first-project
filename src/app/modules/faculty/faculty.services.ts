import { Faculty } from "./faculty.model";
import { TFaculty } from "./faculty.interface";
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
    const result = await Faculty.findOneAndUpdate({ id }, payload, { new: true });
    return result;
};
// delete a single faculty from db
const deleteASingleFacultyFromDB = async (id: string) => {
    const result = await Faculty.findOneAndUpdate({ id }, { isDeleted: true }, { new: true });
    return result;
}
// export all teh function
export const facultyServices = {
    getAllFacultyFromDB,
    getASingleFacultyFromDB,
    updateASingleFacultyFromDB,
    deleteASingleFacultyFromDB
}