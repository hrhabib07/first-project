
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemesterModel";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createUserIntoDB = async (password: string, payload: TStudent) => {

    // create a user object 
    const userData: Partial<TUser> = {};
    // if password is not given , use default pass
    userData.password = password || config.default_pass as string;

    // set student role 
    userData.role = "student"
    // set manually generated id 

    // // find academic semester info 
    // const admissionSemester = await AcademicSemesterModel.findById(payload.admissionSemester);
    // userData.id = generateStudentId(admissionSemester);


    // find academic semester info
    const admissionSemester = await AcademicSemester.findById(
        payload.admissionSemester,
    );

    //set  generated id
    userData.id = await generateStudentId(admissionSemester);




    const newUser = await User.create(userData); // build in static method 
    // creating a user data 
    if (Object.keys(newUser).length) {
        payload.id = newUser.id;
        payload.user = newUser._id;
        const newStudent = await Student.create(payload);
        return newStudent
    } else {
        throw new Error("Failed to create user");
    }
};
export const userServices = {
    createUserIntoDB
}