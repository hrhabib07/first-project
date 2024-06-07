import { z } from "zod";

const createFacultyValidationSchema = z.object({
    body: z.object({
        id: z.string().nonempty(),
        designation: z.string().nonempty(),
        name: z.string().nonempty(),
        dateOfBirth: z.date(),
        gender: z.enum(["male", "female"]),
        email: z.string().email(),
        contactNo: z.string().nonempty(),
        emergencyContactNo: z.string().nonempty(),
        presentAddress: z.string().nonempty(),
        permanentAddress: z.string().nonempty(),
        profileImage: z.string().url(),
        academicFaculty: z.string().nonempty(), // Assuming ObjectId is represented as a string
        isDeleted: z.boolean()
    })
});

const updateFacultyValidationSchema = z.object({
    body: z.object({
        id: z.string().nonempty().optional(),
        designation: z.string().nonempty().optional(),
        name: z.string().nonempty().optional(),
        dateOfBirth: z.date().optional(),
        gender: z.enum(["male", "female"]).optional(),
        email: z.string().email().optional(),
        contactNo: z.string().nonempty().optional(),
        emergencyContactNo: z.string().nonempty().optional(),
        presentAddress: z.string().nonempty().optional(),
        permanentAddress: z.string().nonempty().optional(),
        profileImage: z.string().url().optional(),
        academicFaculty: z.string().nonempty().optional(), // Assuming ObjectId is represented as a string
        isDeleted: z.boolean().optional()
    })
});


export const facultyValidation = {
    createFacultyValidationSchema,
    updateFacultyValidationSchema
}