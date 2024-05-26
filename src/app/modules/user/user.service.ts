import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
    // if (await User.isUserExist(userData.id)) {
    //     throw new Error("user already exist")
    // }
    const result = await User.create(userData); // build in static method 
    // const student = new Student(studentData);
    // if (await student.isUserExist(studentData.id)) {
    //   throw new Error("user already exist")
    // };
    // const result = await student.save(); // build in instance method
    return result;
};
export const userServices = {
    createUserIntoDB
}