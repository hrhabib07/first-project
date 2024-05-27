import express, { NextFunction, Request, Response } from 'express';
import { userServices } from './user.service';
import { userController } from './user.controller';

const router = express.Router();

const senaBahini = (req: Request, res: Response, next: NextFunction) => {
    console.log("I am a senabashini");
    next()
}

router.post("/create-student", senaBahini, userController.createUser);

export const UserRoute = router;
