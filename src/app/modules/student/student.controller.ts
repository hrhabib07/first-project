import { Request, Response, response } from "express";
import { StudentServices } from "./student.service";
import { EventEmitterAsyncResource } from "events";

const createStudent = async (req: Request, res: Response) => {
    try {
        const { student: studentData } = req.body;
        const result = await StudentServices.createStudentIntoDB(studentData);
        res.status(200).json({
            success: true,
            message: "Student is created successfully",
            data: result
        })
    } catch (error) {
        console.log(EventEmitterAsyncResource);
    }
};

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentFromDB();
        res.status(200).json({
            success: true,
            message: "Students are retrieved successfully",
            data: result
        })
    } catch (error) {
        console.log(error);
    }
}

export const StudentController = {
    createStudent,
    getAllStudents
}

