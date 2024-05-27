import { z } from 'zod';
import validator from 'validator';

// Define UserName schema
const userNameValidationSchema = z.object({
    firstName: z.string()
        .max(20, "First name can't be more than 20 characters")
        .refine((value) => {
            const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            return value === firstNameStr;
        }, { message: "First name must be capitalized (first letter uppercase and the rest lowercase)" }),
    middleName: z.string().optional().transform((val) => val ?? ""), // Transform undefined to empty string
    lastName: z.string()
        .refine((value) => validator.isAlpha(value), { message: "Last name must contain only alphabetic characters" }),
});

// Define Guardian schema
const guardianValidationSchema = z.object({
    fatherName: z.string().min(1, { message: "Father Name is required" }),
    fatherOccupation: z.string().min(1, { message: "Father Occupation is required" }),
    fatherContactNo: z.string().min(1, { message: "Father Contact Number is required" }),
    motherName: z.string().min(1, { message: "Mother Name is required" }),
    motherOccupation: z.string().min(1, { message: "Mother Occupation is required" }),
    motherContactNo: z.string().min(1, { message: "Mother Contact Number is required" }),
});

// Define LocalGuardian schema
const localGuardianValidationSchema = z.object({
    name: z.string().min(1, { message: "Local Guardian Name is required" }),
    occupation: z.string().min(1, { message: "Local Guardian Occupation is required" }),
    contactNo: z.string().min(1, { message: "Local Guardian Contact Number is required" }),
    address: z.string().min(1, { message: "Local Guardian Address is required" }),
});

// Define the main Student schema
const createStudentValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        student: z.object({
            name: userNameValidationSchema,
            gender: z.enum(['male', 'female'], { required_error: "Gender is required" }),
            dateOfBirth: z.string().optional(),
            email: z.string()
                .email("Invalid email format")
                .min(1, { message: "Email is required" }),
            contactNo: z.string().min(1, { message: "Contact Number is required" }),
            emergencyContactNo: z.string().min(1, { message: "Emergency Contact Number is required" }),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
            presentAddress: z.string().min(1, { message: "Present Address is required" }),
            permanentAddress: z.string().min(1, { message: "Permanent Address is required" }),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            profileImg: z.string()
        })
    })
});

// export const validateStudent = (data: unknown) => studentValidationSchema.parse(data);

export const studentValidations = {
    createStudentValidationSchema
}