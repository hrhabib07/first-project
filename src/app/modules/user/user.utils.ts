import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { Admin } from "../admin/admin.model";
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


const lastCreatedAdmin = async () => {
    const lastCreatedAdmin = await User.findOne(
        { role: "admin" },
        { id: 1, _id: 0 }
    ).sort({ createdAt: -1 }).lean();
    return lastCreatedAdmin?.id;
};

export const generateAdminId = async () => {
    let currentId: string | undefined = "A-0001"; // Starting ID
    const lastAdminId = await lastCreatedAdmin();
    if (lastAdminId) {
        const lastIdNumber = parseInt(lastAdminId.substring(2));
        const nextIdNumber = lastIdNumber + 1;
        currentId = `A-${nextIdNumber.toString().padStart(4, "0")}`;
    }
    return currentId;
};

