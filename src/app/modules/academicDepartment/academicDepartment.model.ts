import { Schema, Types, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { academicFaculty } from "../academicFaculty/academicFaculty.model";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.ObjectId, ref: academicFaculty, required: true }
});

export const AcademicDepartment = model<TAcademicDepartment>("academic-department", academicDepartmentSchema);