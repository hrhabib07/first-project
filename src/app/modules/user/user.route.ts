import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidation } from '../faculty/faculty.validation';
import { adminValidations } from '../admin/admin.validation';

const router = express.Router();

router.post("/create-student", validateRequest(studentValidations.createStudentValidationSchema), userController.createUser);
router.post("/create-faculty", validateRequest(facultyValidation.createFacultyValidationSchema), userController.createFaculty);
router.post("/create-admin", validateRequest(adminValidations.createAdminValidationSchema), userController.createAdmin)
export const UserRoute = router;
