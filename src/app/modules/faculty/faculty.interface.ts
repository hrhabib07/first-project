import { Types } from "mongoose";

export type TFaculty = {
    id: string;
    designation: string;
    name: string;
    dateOfBirth: String;
    gender: "male" | "female";
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    profileImage: string;
    academicFaculty: Types.ObjectId;
    isDeleted: boolean;
}