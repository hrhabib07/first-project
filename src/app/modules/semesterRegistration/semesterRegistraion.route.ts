import { Router } from "express";
import { SemesterRegistrationController } from "./semesterRegistraion.controller";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationValidation } from "./semesterRegistration.validation";

const router = Router();
router.post("/create-semester", validateRequest(SemesterRegistrationValidation.createSemesterRegistrationValidationSchema), SemesterRegistrationController.createSemesterRegistration);
router.patch("/:id", validateRequest(SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema), SemesterRegistrationController.updateSemesterRegistration);
router.get("/", SemesterRegistrationController.getAllSemesterRegistration);
router.get("/:id", SemesterRegistrationController.getSingleSemesterRegistration);

export const SemesterRegistrationRoutes = router;