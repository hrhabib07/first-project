import { Schema, model } from "mongoose";
import { TCourse, TPreRequisiteCourse } from "./course.interface";
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
});

export const Course = model<TCourse>("Course", courseSchema)