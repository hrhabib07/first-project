import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

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

    const basicCourseDataUpdate = await Course.findByIdAndUpdate(id, courseRemainingData, { new: true, runValidators: true });

    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
        const deletedPreRequisite = preRequisiteCourse.filter(el => el.course && el.isDeleted).map(el => el.course);
        const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
            $pull: { preRequisiteCourse: { course: { $in: deletedPreRequisite } } }
        });
    }



    return basicCourseDataUpdate;


}

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursedFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    updateCourseIntoDB
}