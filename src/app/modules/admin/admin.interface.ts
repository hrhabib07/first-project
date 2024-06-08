type TAdmin = {
    id: string;
    designation: string;
    name: string;
    gender: "male" | "female";
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    profileImage: string;
    managementDepartment: string;
    isDeleted: boolean;
}