import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicDepartmentValidation } from "./academicDepartment.validation";
import { academicDepartmentController } from "./academicDepartment.controller";
const router = Router();

router.post("/", validateRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema), academicDepartmentController.createAcademicDepartment);

router.get("/", academicDepartmentController.getAllAcademicDepartment);
router.get("/:departmentId", academicDepartmentController.getASingleAcademicDepartment);
router.patch("/:departmentId", validateRequest(academicDepartmentValidation.updateAcademicDepartmentValidationSchema), academicDepartmentController.updateAcademicDepartment);

export const AcademicDepartmentRoute = router;