import express from 'express';
import { userServices } from './user.service';
import { userController } from './user.controller';

const router = express.Router();

router.post("/create-student", userController.createUser);

export const UserRoute = router;
