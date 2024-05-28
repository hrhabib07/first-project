import mongoose, { Schema, Document, model } from 'mongoose';
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from './academicSemester.interface';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constant';


// Create the schema
const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        enum: AcademicSemesterName,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        enum: AcademicSemesterCode,
        required: true,
    },
    startMonth: {
        type: String,
        enum: Months,
        required: true,
    },
    endMonth: {
        type: String,
        enum: Months,
        required: true,
    }
});


academicSemesterSchema.pre("save", async function (next) {
    const isSemesterExist = await AcademicSemester.findOne({
        year: this.year,
        name: this.name,
    });
    if (isSemesterExist) {
        throw new Error("semester already exist")
    }
    next();
})

// Export the model
export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);
