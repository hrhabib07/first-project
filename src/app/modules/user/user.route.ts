import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidations } from '../admin/admin.validation';
import { facultyValidations } from '../faculty/faculty.validation';

const router = express.Router();

router.post("/create-student", validateRequest(studentValidations.createStudentValidationSchema), userController.createUser);
router.post("/create-faculty", validateRequest(facultyValidations.createFacultyValidationSchema), userController.createFaculty);
router.post("/create-admin", validateRequest(AdminValidations.createAdminValidationSchema), userController.createAdmin)
export const UserRoute = router;
