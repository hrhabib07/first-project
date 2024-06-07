import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidation } from '../faculty/faculty.validation';

const router = express.Router();

router.post("/create-student", validateRequest(studentValidations.createStudentValidationSchema), userController.createUser);
router.post("/create-faculty", validateRequest(facultyValidation.createFacultyValidationSchema), userController.createFaculty);

export const UserRoute = router;
