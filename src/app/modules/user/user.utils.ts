import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

export const generateStudentId = (payLoad: TAcademicSemester) => {
    // first time
    const currentId = (0).toString();
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `${payLoad.year}${payLoad.code}${incrementId}`
    return incrementId;
}