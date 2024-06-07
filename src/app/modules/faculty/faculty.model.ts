import { Schema, model } from "mongoose";
import { TFaculty } from "./faculty.interface";
import { required } from "joi";

const facultySchema = new Schema<TFaculty>({
    id: { type: String, required: true },
    designation: { type: String, required: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: { type: String, required: true },
    academicFaculty: { type: Schema.ObjectId, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
});

export const Faculty = model<TFaculty>("Faculty", facultySchema);
