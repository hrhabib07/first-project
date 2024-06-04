import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: { type: String, required: true, unique: true },
});


academicFacultySchema.pre("updateOne", async function (next) {
    const query = this.getQuery();
    const existingFaculty = await academicFaculty.findOne(query);
    if (!existingFaculty) {
        throw new AppError(httpStatus.NOT_FOUND, "faculty does not exist")
    };
    next();
})


export const academicFaculty = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);