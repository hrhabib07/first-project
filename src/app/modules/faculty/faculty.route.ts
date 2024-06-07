import { Router } from "express";
import { facultyControllers } from "./faculty.controller";

const router = Router();

// cerate Faculty
router.post("/", facultyControllers.createFaculty);
// get all faculties
router.get("/", facultyControllers.getAllFaculty);
// get a single faculty
router.get("/:facultyId", facultyControllers.getASingleFaculty);
// update faculty
router.patch("/:facultyId", facultyControllers.updateFaculty);
// delete faculty
router.patch("/:facultyId", facultyControllers.deleteFaculty);

export const facultyRoutes = router;