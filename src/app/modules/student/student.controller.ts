import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import { EventEmitterAsyncResource } from "events";

const createStudent = async (req: Request, res: Response) => {
    try {
        const student = req.body;
        const result = await StudentServices.createStudentIntoDB(student);
        res.status(200).json({
            success: true,
            message: "Student is created successfully",
            data: result
        })
    } catch (error) {
        console.log(EventEmitterAsyncResource);
    }
};


export const StudentController = {
    createStudent
}

