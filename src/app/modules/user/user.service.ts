import { TUser } from "./user.interface";

const createStudentIntoDB = async (studentData: TUser) => {
    // const result = await StudentModel.create(student);
    // const student = new user(studentData);
    // const result = await student.save();
    // return result;
};
export const userServices = {
    createStudentIntoDB
}