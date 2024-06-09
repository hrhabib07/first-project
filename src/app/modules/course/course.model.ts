import { Schema, model } from "mongoose";
import { TCourse, TCourseFaculty, TPreRequisiteCourse } from "./course.interface";
const preRequisiteCourseSchema = new Schema<TPreRequisiteCourse>({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    prefix: {
        type: String,
        trim: true,
        required: true
    },
    code: {
        type: Number,
        trim: true,
        unique: true,
    },
    credits: {
        type: Number,
        trim: true,
        required: true
    },
    preRequisiteCourse: [preRequisiteCourseSchema],
    isDeleted: { type: Boolean, default: false }
});

export const Course = model<TCourse>("Course", courseSchema);

const CourseFacultiesSchema = new Schema<TCourseFaculty>({
    course: { type: Schema.Types.ObjectId, unique: true, ref: "Course" },
    faculties: { type: [Schema.Types.ObjectId], ref: "Faculty" }
});

export const CourseFaculty = model<TCourseFaculty>("CourseFaculty", CourseFacultiesSchema);