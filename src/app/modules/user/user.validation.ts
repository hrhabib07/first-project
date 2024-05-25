import { z } from "zod";

const userValidationSchema = z.object({

    password:
        z.string({
            invalid_type_error: "password must be string"
        })
            .max(20, { message: "password can not be more than 20 characters" }),

    needPasswordChange: z.boolean().optional().default(true),
    isDeleted: z.boolean().default(false)
});

export const userValidation = {
    userValidationSchema,
} 