import { userServices } from "./user.service";
import { userValidation } from "./user.validation";


const createUser = async (req: Request, res: Response) => {
    try {
        //creating a schema validation using zod
        // const { error, value } = studentValidationSchema.validate(userData);
        // // console.log({ error }, { value });
        // if (error) {
        //   res.status(500).json({
        //     success: false,
        //     message: 'Something went wrong',
        //     error: error.details,
        //   });
        // }
        const { user: userData } = req.body;
        const zodParsedData = userValidation.userValidationSchema.parse(userData);


        const result = await userServices.createUserIntoDB(zodParsedData);

        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
};
