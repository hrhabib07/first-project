import { z } from "zod";
const AcademicFacultyValidationSchema = z.object({
    name: z.string(),
});

export const AcademicFacultyValidation = {
    AcademicFacultyValidationSchema
}