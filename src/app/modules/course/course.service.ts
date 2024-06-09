import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/appError";
import { CourseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import mongoose from "mongoose";

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
};
const getAllCoursedFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course.find().populate("preRequisiteCourse.course"), query).search(CourseSearchableFields).filter().sort().paginate().fields();
    const result = await courseQuery.modelQuery;
    return result;
};
const getSingleCourseFromDB = async (id: string) => {
    const result = await Course.findById(id).populate("preRequisiteCourse.course");
    return result;
};
const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
}
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourse, ...courseRemainingData } = payload;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const basicCourseDataUpdate = await Course.findByIdAndUpdate(id, courseRemainingData, { new: true, runValidators: true, session });
        if (!basicCourseDataUpdate) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to update basic course data")
        }
        if (preRequisiteCourse && preRequisiteCourse.length > 0) {
            const deletedPreRequisite = preRequisiteCourse.filter(el => el.course && el.isDeleted).map(el => el.course);
            const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
                $pull: { preRequisiteCourse: { course: { $in: deletedPreRequisite } } }
            }, { new: true, runValidators: true, session });
            if (!deletedPreRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete preRequisite course data")
            }
            // filter out new courses 
            const newPreRequisites = preRequisiteCourse?.filter(el => el.course && !el.isDeleted);
            const newPreRequisitesCourses = await Course.findByIdAndUpdate(id, {
                $addToSet: { preRequisiteCourse: { $each: newPreRequisites } }
            }, { new: true, runValidators: true, session });
            if (!newPreRequisitesCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, "Failed to add preRequisite course data")
            }
        }
        const result = await Course.findById(id).populate("preRequisiteCourse.course");
        await session.commitTransaction();
        await session.endSession();
        return result;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update data")
    }
};

const assignCourseFacultiesWithCourseIntoDB = async (id: string, payload: Partial<TCourseFaculty>) => {

    const result = await CourseFaculty.findByIdAndUpdate(id, {
        course: id,
        $addToSet: { faculties: { $each: payload } }
    }, { new: true, upsert: true });
    return result;
};
const removeCourseFacultiesFromCourseFromDB = async (id: string, payload: Partial<TCourseFaculty>) => {

    const result = await CourseFaculty.findByIdAndUpdate(id, {
        course: id,
        $pull: { faculties: { $in: payload } }
    }, { new: true });
    return result;
};

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursedFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    updateCourseIntoDB,
    assignCourseFacultiesWithCourseIntoDB,
    removeCourseFacultiesFromCourseFromDB
}