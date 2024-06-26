import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidations } from '../admin/admin.validation';
import { facultyValidations } from '../faculty/faculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { userValidation } from './user.validation';
import { upload } from '../../utils/sendImgToCloudinary';

const router = express.Router();

router.post("/create-student", auth(USER_ROLE.admin),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next()
    },
    validateRequest(studentValidations.createStudentValidationSchema),
    userController.createUser);

router.post("/change-status/:id", auth(USER_ROLE.admin, USER_ROLE.faculty), validateRequest(userValidation.changeStatusValidationSchema), userController.changeStatus)

router.post("/create-faculty", validateRequest(facultyValidations.createFacultyValidationSchema), userController.createFaculty);

router.post("/create-admin", validateRequest(AdminValidations.createAdminValidationSchema), userController.createAdmin)
export const UserRoute = router;
