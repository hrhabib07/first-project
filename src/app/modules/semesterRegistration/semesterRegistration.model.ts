import mongoose, { Schema, model } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
    {
        academicSemester: { type: Schema.Types.ObjectId, required: true, unique: true, ref: "AcademicSemester" },
        status: { type: String, enum: SemesterRegistrationStatus, default: "UPCOMING" },
        startDate: { type: Date, required: true, unique: true },
        endDate: { type: Date, required: true, unique: true },
        minCredit: { type: Number, default: 3 },
        maxCredit: { type: Number, default: 16 }
    }, { timestamps: true }
);

export const SemesterRegistration = mongoose.model<TSemesterRegistration>("SemesterRegistration", semesterRegistrationSchema);