import { z } from "zod";

const userValidationSchema = z.object({
    password:
        z.string({
            invalid_type_error: "password must be string"
        }).max(20, { message: "password can not be more than 20 characters" }).optional(),
    email: z.string()
});

export const userValidation = {
    userValidationSchema,
} 