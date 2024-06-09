import { Router } from "express";
import { courseController } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidation } from "./course.validation";

const router = Router();
router.post("/create-course", validateRequest(courseValidation.createCourseValidationSchema), courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getSingleCourse);
router.delete("/:id", courseController.deleteCourse);
router.patch("/:id", courseController.updateCourse);
router.put("/:courseId/assign-faculties", validateRequest(courseValidation.facultiesWithCourseValidationSchema), courseController.assignCourseFacultiesWithCourse);
router.delete("/:courseId/remove-faculties", validateRequest(courseValidation.facultiesWithCourseValidationSchema), courseController.removeCourseFacultiesFromCourse);
export const CourseRoutes = router;