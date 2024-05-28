import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();

router.post('/create-academic-semester', AcademicSemesterController.createAcademicSemester); // will call controller function
// router.get('/:studentId', StudentController.getSingleStudent); // will call controller function
// router.delete('/:studentId', StudentController.deleteStudent)
export const AcademicSemesterRoute = router;
