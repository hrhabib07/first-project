import { title } from "process";
import { z } from "zod";

const preRequisiteCourseValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean()
})

const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        prefix: z.string(),
        code: z.number(),
        credits: z.number(),
        isDeleted: z.boolean(),
        preRequisiteCourse: z.array(preRequisiteCourseValidationSchema).optional()
    })
});

export const courseValidation = {
    createCourseValidationSchema
}