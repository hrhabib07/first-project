import { z } from "zod";
import { USER_STATUS } from "./user.constant";
import { validateHeaderName } from "http";

const userValidationSchema = z.object({
    password:
        z.string({
            invalid_type_error: "password must be string"
        }).max(20, { message: "password can not be more than 20 characters" }).optional(),
    email: z.string()
});
const changeStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum(["blocked", "in-progress"])
    })
});

export const userValidation = {
    userValidationSchema,
    changeStatusValidationSchema
} 