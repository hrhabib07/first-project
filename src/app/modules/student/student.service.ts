
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { Student } from './student.model';
import mongoose from 'mongoose';
import { User } from '../user/user.model';


const getAllStudentFromDB = async () => {
  const result = await Student.find().populate("admissionSemester").populate({
    path: "academicDepartment", populate: {
      path: "academicFaculty"
    }
  });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([
    { $match: { id: id } }
  ]);
  return result;
};
const deleteStudentFromDB = async (id: string) => {

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deleteUser = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to delete user ")
    }

    const deleteStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "failed to delete student ")
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Student not found or Student has already been deleted")
  }



};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
