import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { AcademicSemester } from "../academicSemester/academicSemesterModel";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
    const academicSemesterID = payload.academicSemester;
    const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
        $or: [{ status: "UPCOMING" }, { status: "ONGOING" }],
    });
    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError(httpStatus.BAD_REQUEST, `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} semester existing.`)
    }

    const isAcademicSemesterExist = await AcademicSemester.findById(academicSemesterID);
    if (!isAcademicSemesterExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Academic Semester does not exits!")
    };
    const isSemesterRegistrationExist = await SemesterRegistration.findOne({ academicSemester: academicSemesterID });
    if (isSemesterRegistrationExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Semester Registration already exits!")
    };
    const result = await SemesterRegistration.create(payload);
    return result;
};

const getAllSemesterRegistrationFromDB = async (query: Record<string, unknown>) => {
    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate("academicSemester"), query).filter().sort().paginate().fields();
    const result = await semesterRegistrationQuery.modelQuery;
    return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
    const result = await SemesterRegistration.findById(id).populate("academicSemester");
    return result;
};
const updateSemesterRegistrationIntoDB = async (id: string, payload: Partial<TSemesterRegistration>) => {
    const isSemesterRegistrationExist = await SemesterRegistration.findById(id);
    if (!isSemesterRegistrationExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Requested semester not fount!")
    };
    const currentSemesterStatus = isSemesterRegistrationExist.status;
    const requestedStatus = payload?.status;
    if (currentSemesterStatus === RegistrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST, "Requested semester is already ENDED!")
    };
    if (currentSemesterStatus === RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST, `You can not directly change the status from ${currentSemesterStatus} to ${requestedStatus}`);
    }
    if (currentSemesterStatus === RegistrationStatus.ONGOING && requestedStatus === RegistrationStatus.UPCOMING) {
        throw new AppError(httpStatus.BAD_REQUEST, `You can not directly change the status from ${currentSemesterStatus} to ${requestedStatus}`);
    }
    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    return result;
};

export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB

};