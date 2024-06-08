import { z } from "zod";

const createAdminValidationSchema = z.object({
    admin: z.object({
        id: z.string().nonempty(),
        designation: z.string().nonempty(),
        name: z.string().nonempty(),
        gender: z.enum(['male', 'female']),
        dateOfBirth: z.string().nonempty(), // Assuming dateOfBirth is a string in the format 'YYYY-MM-DD'
        email: z.string().email(),
        contactNo: z.string().nonempty(),
        emergencyContactNo: z.string().nonempty(),
        presentAddress: z.string().nonempty(),
        permanentAddress: z.string().nonempty(),
        profileImage: z.string().nonempty(),
        managementDepartment: z.string().nonempty(),
        idDeleted: z.boolean().default(false)
    })
})
const updateAdminValidationSchema = z.object({
    admin: z.object({
        id: z.string().nonempty().optional(),
        designation: z.string().nonempty().optional(),
        name: z.string().nonempty().optional(),
        gender: z.enum(['male', 'female']).optional(),
        dateOfBirth: z.string().nonempty().optional(), // Assuming dateOfBirth is a string in the format 'YYYY-MM-DD'
        email: z.string().email().optional(),
        contactNo: z.string().nonempty().optional(),
        emergencyContactNo: z.string().nonempty().optional(),
        presentAddress: z.string().nonempty().optional(),
        permanentAddress: z.string().nonempty().optional(),
        profileImage: z.string().nonempty().optional(),
        managementDepartment: z.string().nonempty().optional(),
        idDeleted: z.boolean().optional()
    })
});

export const adminValidations = {
    createAdminValidationSchema,
    updateAdminValidationSchema
}