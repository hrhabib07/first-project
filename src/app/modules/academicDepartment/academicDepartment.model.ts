import { Schema, Types, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import AppError from "../../errors/appError";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.ObjectId, ref: AcademicFaculty, required: true }
}, {
    timestamps: true
});



academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query: any = this.getQuery();
    const isDepartmentExist = await AcademicDepartment.findOne(query);

    if (!isDepartmentExist) {
        throw new AppError(404, 'This department does not exist! ');
    }

    next();
});

export const AcademicDepartment = model<TAcademicDepartment>("AcademicDepartment", academicDepartmentSchema);