import { Router } from "express";
import { facultyControllers } from "./faculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { facultyValidation } from "./faculty.validation";

const router = Router();


// get all faculties
router.get("/", facultyControllers.getAllFaculty);
// get a single faculty
router.get("/:facultyId", facultyControllers.getASingleFaculty);
// update faculty
router.patch("/:facultyId", validateRequest(facultyValidation.updateFacultyValidationSchema), facultyControllers.updateFaculty);
// delete faculty
router.delete("/:facultyId", facultyControllers.deleteFaculty);

export const facultyRoutes = router;