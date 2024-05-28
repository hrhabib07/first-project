import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TUserName,
  TStudent,
  StudentModel
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    maxlength: [20, "First name can't be more than 20 characters"],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return value === firstNameStr;
      },
      message: props => `${props.value} is not in capitalized format. The first letter must be uppercase and the rest must be lowercase.`,
    },
    trim: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: props => `${props.value} is not in alphabetic format.`
    }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, required: [true, "user id is required"], unique: true, ref: "User" },
  name: { type: userNameSchema, required: true },
  gender: {
    type: String,
    enum: { values: ['male', 'female'], message: "{VALUE} is not valid" },
    required: true
  },
  dateOfBirth: Date,
  email: {
    type: String, required: true, unique: true, validate:
    {
      validator: (value: string) => validator.isEmail(value),
      message: props => `${props.value} is not a valid email.`,
    }
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  profileImg: { type: String },
  admissionSemester: { type: Schema.ObjectId, ref: "AcademicSemester" },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  toJSON: {
    virtuals: true,
  }
});

studentSchema.virtual("fullName").get(function () {
  return this.name.firstName + " " + this.name.middleName + " " + this.name.lastName;
})

// query middleware 
studentSchema.pre("find", function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } })
  next()
})
studentSchema.pre("findOne", function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})


// creating a static method
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
}



// creating a instance 
// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser;
// }


export const Student = model<TStudent, StudentModel>('student', studentSchema);
