import { Router } from "express";
import { adminControllers } from "./admin.controller";

const router = Router();
router.get("/", adminControllers.getAllAdmin);
router.get("/:adminId", adminControllers.getASingleAdmin);
router.patch("/:adminId", adminControllers.updateAdmin);
router.delete("/:adminId", adminControllers.deleteAdmin);
export const adminRoutes = router;
