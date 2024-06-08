
import { any } from "joi";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemesterModel";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { Faculty } from "../faculty/faculty.model";
import { TFaculty } from "../faculty/faculty.interface";

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

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const newUser = await User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError(httpStatus.NOT_FOUND, "Failed to create user");
        }

        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        const newStudent = await Student.create([payload], { session });
        if (!newStudent) {
            throw new Error("Failed to create student")
        }
        await session.commitTransaction();
        await session.endSession();
        return newStudent


    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }


};
// create a single faculty into db
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object 
    const userData: Partial<TUser> = {};
    // if password is not given , use default pass
    userData.password = password || config.default_pass as string;

    // set student role 
    userData.role = "faculty"


    //set  generated id
    userData.id = await generateFacultyId();
    const newUser = await User.create([userData]);
    if (!newUser.length) {
        throw new Error("failed to create user")
    }
    payload.id = newUser[0].id;
    const newFaculty = await Faculty.create([payload]);
    if (!newFaculty) {
        throw new Error("failed to create faculty")
    }
    return newFaculty;
};

const createAdminIntoDB = async (req: Request) => {
    // const result = await 
}
export const userServices = {
    createUserIntoDB,
    createFacultyIntoDB
}