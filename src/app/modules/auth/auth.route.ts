import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import auth from "../../middlewares/auth";

const router = Router();
router.post("/login", validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser);
router.post("/forget-password", validateRequest(AuthValidation.forgetPasswordValidationSchema),
    AuthControllers.forgetPassword
);
router.post("/reset-password", validateRequest(AuthValidation.resetPasswordValidationSchema),
    AuthControllers.resetPassword
);
router.get("/me",
    auth("student", "admin", "faculty"),
    AuthControllers.getMe
);
export const AuthRoutes = router; 