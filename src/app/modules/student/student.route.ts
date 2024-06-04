import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
const router = express.Router();

router.get('/', StudentController.getAllStudents); // will call controller function
router.get('/:studentId', StudentController.getSingleStudent); // will call controller function
router.patch('/:studentId', validateRequest(studentValidations.updateStudentValidationSchema), StudentController.updateStudent);
router.delete('/:studentId', StudentController.deleteStudent);
export const StudentRoute = router;