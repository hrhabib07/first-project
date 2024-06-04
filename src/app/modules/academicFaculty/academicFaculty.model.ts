import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: { type: String, required: true, unique: true },
});


academicFacultySchema.pre("updateOne", async function (next) {
    const query = this.getQuery();
    const existingFaculty = await academicFaculty.findOne(query);
    if (!existingFaculty) {
        throw new Error("faculty does not exist")
    };
    next();
})


export const academicFaculty = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);