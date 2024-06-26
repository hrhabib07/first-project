import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
        id: z.string({ required_error: "id is required" }),
        password: z.string({ required_error: "password is required" })
    })
});
const forgetPasswordValidationSchema = z.object({
    body: z.object({
        id: z.string({ required_error: "id is required" })
    })
});
const resetPasswordValidationSchema = z.object({
    body: z.object({
        id: z.string({ required_error: "id is required" }),
        newPassword: z.string({ required_error: "new password is required" })
    })
});

export const AuthValidation = {
    loginValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema
}
