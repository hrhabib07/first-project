import { z } from "zod";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string(),
        status: z.enum([...SemesterRegistrationStatus] as [string, ...string[]]).optional(),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        minCredit: z.number().optional(),
        maxCredit: z.number().optional()
    })
});

export const SemesterRegistrationValidation = {
    createSemesterRegistrationValidationSchema
}