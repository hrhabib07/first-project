import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post('/create-academic-semester', validateRequest(academicSemesterValidation.createAcademicSemesterValidationSchema), AcademicSemesterController.createAcademicSemester); // will call controller function
// router.get('/:studentId', StudentController.getSingleStudent); // will call controller function
// router.delete('/:studentId', StudentController.deleteStudent)
export const AcademicSemesterRoute = router;
