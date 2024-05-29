import { Router } from "express";
import { AcademicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./AcademicFaculty.validation";




const router = Router();

router.get('/', AcademicFacultyController.getAllAcademicFaculty);
router.get('/:facultyId', AcademicFacultyController.getASingleAcademicFaculty);
router.post('/create-faculty', validateRequest(AcademicFacultyValidation.AcademicFacultyValidationSchema), AcademicFacultyController.createAcademicFaculty);
router.patch('/', validateRequest(AcademicFacultyValidation.AcademicFacultyValidationSchema), AcademicFacultyController.updateAcademicFaculty);

export const AcademicFacultyRoute = router;

