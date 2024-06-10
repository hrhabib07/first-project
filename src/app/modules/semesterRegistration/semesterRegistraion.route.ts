import { Router } from "express";
import { SemesterRegistrationController } from "./semesterRegistraion.controller";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationValidation } from "./semesterRegistration.validation";

const router = Router();
router.post("/create-semester", validateRequest(SemesterRegistrationValidation.createSemesterRegistrationValidationSchema), SemesterRegistrationController.createSemesterRegistration);

export const SemesterRegistrationRoutes = router;