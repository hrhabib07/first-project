import { Schema, model } from "mongoose";

const adminSchema = new Schema<TAdmin>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    contactNo: {
        type: String,
        required: true
    },
    emergencyContactNo: {
        type: String,
        required: true
    },
    presentAddress: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    managementDepartment: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

adminSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
adminSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

adminSchema.pre("findOneAndUpdate", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
})

export const Admin = model<TAdmin>("Admin", adminSchema); 