
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { Student } from './student.model';
import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableField } from './studentConstant';


const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(Student.find().populate("admissionSemester").populate({
    path: "academicDepartment", populate: {
      path: "academicFaculty"
    }
  }), query).search(studentSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;

  // console.log("base query", query);
  // const objQuery = { ...query }
  // let searchTerm = '';
  // const studentSearchableField = ["email", "name.firstName", "presentAddress"]
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // };
  // const searchQuery = Student.find({
  //   $or: studentSearchableField.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" }
  //   }))
  // });


  // // filtering
  // const excludingFields = ["searchTerm", "sort", "limit", "page", "fields"];
  // excludingFields.forEach(element => {
  //   delete objQuery[element]
  // });

  // const filterQuery = searchQuery.find(objQuery).populate("admissionSemester").populate({
  //   path: "academicDepartment", populate: {
  //     path: "academicFaculty"
  //   }
  // });

  // let sort = "-createdAt";
  // if (query?.sort) {
  //   sort = query.sort as string;
  // };
  // const sortQuery = filterQuery.sort(sort);
  // let limit = 1;
  // let page = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = query.limit as number;
  // };
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // };
  // const paginateQuery = sortQuery.skip(skip)
  // const limitQuery = paginateQuery.limit(limit);

  // let fields = "-__v";
  // if (query.fields) {
  //   fields = (query.fields as string).split(",").join(" ");
  // };

  // const fieldsQuery = await limitQuery.select(fields);

  // return fieldsQuery;



};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id }).populate("admissionSemester").populate({
    path: "academicDepartment", populate: {
      path: "academicFaculty"
    }
  });
  // const result = await Student.aggregate([
  //   { $match: { id: id } }
  // ]);
  return result;
};
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  // console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
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
  updateStudentIntoDB,
  deleteStudentFromDB
};
