
import { any } from "joi";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemesterModel";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

const createUserIntoDB = async (password: string, payload: TStudent) => {

    // create a user object 
    const userData: Partial<TUser> = {};
    // if password is not given , use default pass
    userData.password = password || config.default_pass as string;

    // set student role 
    userData.role = "student"

    // find academic semester info
    const admissionSemester: any = await AcademicSemester.findById(
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
        throw new AppError(httpStatus.NOT_FOUND, "Failed to create user");
    }
};
export const userServices = {
    createUserIntoDB
}