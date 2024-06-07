import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";


const findLastStudent = async () => {
    const lastStudent = await User.findOne(
        {
            role: "student"
        }, {
        id: 1,
        _id: 0,
    }
    ).sort({ createdAt: -1 }).lean();
    return lastStudent?.id ? lastStudent?.id : undefined;
}

export const generateStudentId = async (payLoad: TAcademicSemester) => {
    // first time
    let currentId: string | undefined = (0).toString();
    const lastStudentId = await findLastStudent();
    const lastAcademicYear = lastStudentId?.substring(0, 4);
    console.log();
    const lastAcademicSemester = lastStudentId?.substring(4, 6);
    if (lastAcademicSemester === payLoad.code && lastAcademicYear === payLoad.year) {
        currentId = lastStudentId?.substring(6);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `${payLoad.year}${payLoad.code}${incrementId}`
    return incrementId;
};


const findLastFaculty = async () => {
    const lastFaculty = await User.findOne(
        {
            role: "faculty"
        }, {
        id: 1,
        _id: 0,
    }
    ).sort({ createdAt: -1 }).lean();
    return lastFaculty?.id ? lastFaculty?.id : undefined;
};

export const generateFacultyId = async () => {
    // first time
    let currentId: string | undefined = (0).toString();
    const lastFacultyId = await findLastFaculty();
    if (lastFacultyId) {
        currentId = lastFacultyId?.substring(2);
    }
    console.log();
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `F-${incrementId}`
    return incrementId;
};