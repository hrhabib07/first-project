import Joi from "joi";

// Define the UserName schema
const userNameSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .required()
        .max(20)
        .custom((value, helpers) => {
            const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            if (value !== firstNameStr) {
                return helpers.error(`${value} is not in capitalized format. The first letter must be uppercase and the rest must be lowercase.`);
            }
            return value;
        }),
    middleName: Joi.string().optional(),
    lastName: Joi.string()
        .required()
        .custom((value, helpers) => {
            if (!/^[A-Za-z]+$/.test(value)) {
                return helpers.error(`${value} is not in alphabetic format.`);
            }
            return value;
        }),
});

// Define the Guardian schema
const guardianSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
});

// Define the LocalGuardian schema
const localGuardianSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
});

// Define the Student schema
const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameSchema.required(),
    gender: Joi.string()
        .valid('male', 'female')
        .required()
        .messages({ 'any.only': '{#label} is not valid' }),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string()
        .email()
        .required()
        .messages({ 'string.email': '{#value} is not a valid email.' }),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .optional(),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianSchema.required(),
    localGuardian: localGuardianSchema.required(),
    profileImg: Joi.string().optional(),
    isActive: Joi.string()
        .valid('active', 'blocked')
        .default('active'),
});


export default studentValidationSchema;