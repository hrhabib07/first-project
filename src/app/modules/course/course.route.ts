import { Router } from "express";
import { courseController } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidation } from "./course.validation";

const router = Router();
router.post("/create-course", validateRequest(courseValidation.createCourseValidationSchema), courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getSingleCourse);
router.delete("/:id", courseController.deleteCourse);
export const CourseRoutes = router;