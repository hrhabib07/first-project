import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemesterModel";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { Faculty } from "../faculty/faculty.model";
import { TFaculty } from "../faculty/faculty.interface";
import { Admin } from "../admin/admin.model";
import { TAdmin } from "../admin/admin.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";

const createUserIntoDB = async (password: string, payload: TStudent) => {

    // create a user object 
    const userData: Partial<TUser> = {};
    // if password is not given , use default pass
    userData.password = password || config.default_pass as string;

    // set email .
    userData.email = payload.email;

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

    //if password is not given , use deafult password
    userData.password = password || (config.default_pass as string);

    // set email .
    userData.email = payload.email;

    //set student role
    userData.role = 'faculty';

    // find academic department info
    const academicDepartment = await AcademicDepartment.findById(
        payload.academicDepartment,
    );

    if (!academicDepartment) {
        throw new AppError(400, 'Academic department not found');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateFacultyId();

        // create a user (transaction-1)
        const newUser = await User.create([userData], { session }); // array

        //create a faculty
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a faculty (transaction-2)

        const newFaculty = await Faculty.create([payload], { session });

        if (!newFaculty.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
        }

        await session.commitTransaction();
        await session.endSession();

        return newFaculty;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config?.default_pass as string);

    // set email .
    userData.email = payload.email;

    //set student role
    userData.role = 'admin';

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateAdminId();

        // create a user (transaction-1)
        const newUser = await User.create([userData], { session });

        //create a admin
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a admin (transaction-2)
        const newAdmin = await Admin.create([payload], { session });

        if (!newAdmin.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
        }

        await session.commitTransaction();
        await session.endSession();

        return newAdmin;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};
export const userServices = {
    createUserIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB
}