import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, student: studentData } = req.body;
        // const zodParsedData = userValidation.userValidationSchema.parse(userData);
        const result = await userServices.createUserIntoDB(password, studentData);
        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};
export const userController = {
    createUser
}