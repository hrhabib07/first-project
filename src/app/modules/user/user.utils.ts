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
    return lastStudent?.id ? lastStudent?.id.substring(6) : undefined;
}

export const generateStudentId = async (payLoad: TAcademicSemester) => {
    // first time
    const currentId = await findLastStudent() || (0).toString();

    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `${payLoad.year}${payLoad.code}${incrementId}`
    return incrementId;
}