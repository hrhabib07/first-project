import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: { type: String, required: true },
});

// 3. Create a Model.
export const academicFaculty = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);