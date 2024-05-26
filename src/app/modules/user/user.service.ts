import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (password: string, studentData: TStudent) => {

    // create a user object 
    const userData: Partial<TUser> = {};
    // if password is not given , use default pass
    userData.password = password || config.default_pass as string;

    // set student role 
    userData.role = "student"
    // set manually generated id 
    userData.id = '203010001';
    const newUser = await User.create(userData); // build in static method 
    // creating a user data 
    if (Object.keys(newUser).length) {
        studentData.id = newUser.id;
        studentData.user = newUser._id;
        const newStudent = await Student.create(studentData);
        return newStudent
    } else {
        throw new Error("Failed to create user");
    }
};
export const userServices = {
    createUserIntoDB
}