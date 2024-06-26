import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res, next) => {
    const result = await CourseServices.createCourseIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "course created successfully",
        data: result,
    })
})
const getAllCourses = catchAsync(async (req, res, next) => {
    const result = await CourseServices.getAllCoursedFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "courses are retrieved successfully",
        data: result,
    })
})
const getSingleCourse = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await CourseServices.getSingleCourseFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "course has been retrieved successfully",
        data: result,
    })
})
const deleteCourse = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourseFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "course deleted successfully",
        data: result,
    })
});
const updateCourse = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const result = await CourseServices.updateCourseIntoDB(id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "course is updated successfully",
        data: result,
    })
});

const assignCourseFacultiesWithCourse = catchAsync(async (req, res, next) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.assignCourseFacultiesWithCourseIntoDB(courseId, faculties);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "courseFaculty is updated successfully",
        data: result,
    })

});
const removeCourseFacultiesFromCourse = catchAsync(async (req, res, next) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.removeCourseFacultiesFromCourseFromDB(courseId, faculties);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Faculty has removed  successfully",
        data: result,
    })

});

export const courseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse,
    assignCourseFacultiesWithCourse,
    removeCourseFacultiesFromCourse
}