import { Schema, Types, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { academicFaculty } from "../academicFaculty/academicFaculty.model";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.ObjectId, ref: academicFaculty, required: true }
}, {
    timestamps: true
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isDepartmentExist = await AcademicDepartment.findOne(query);

    if (!isDepartmentExist) {
        throw new Error('This department does not exist! ');
    }

    next();
});

export const AcademicDepartment = model<TAcademicDepartment>("AcademicDepartment", academicDepartmentSchema);