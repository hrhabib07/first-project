import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();
router.post('/create-student', StudentController.createStudent) // will call controller function

export const StudentRoute = router;