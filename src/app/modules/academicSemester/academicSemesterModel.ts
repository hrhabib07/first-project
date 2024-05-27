import mongoose, { Schema, Document } from 'mongoose';
import { TAcademicSemester } from './academincSemester.interface';

// Create the schema
const AcademicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        enum: ['autumn', 'summer', 'fall'],
        required: true,
    },
    code: {
        type: String,
        enum: ['01', '02', '03'],
        required: true,
    },
    year: {
        type: Date,
        required: true,
    },
    startMonth: {
        type: String,
        enum: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        required: true,
    },
    endMonth: {
        type: String,
        enum: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        required: true,
    }
});

// Export the model
export const AcademicSemesterModel = mongoose.model<TAcademicSemester>('AcademicSemester', AcademicSemesterSchema);
