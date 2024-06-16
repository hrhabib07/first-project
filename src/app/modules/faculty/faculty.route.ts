import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controller';
import auth from '../../middlewares/auth';
import { facultyValidations } from './faculty.validation';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
    '/:id',
    validateRequest(facultyValidations.updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', auth(), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;