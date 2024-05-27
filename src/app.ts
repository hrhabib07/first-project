import express, { Application, Request, Response } from 'express';

import cors from 'cors';
import { StudentRoute } from './app/modules/student/student.route';
import { UserRoute } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
const app: Application = express();
// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoute);
app.use('/api/v1/users', UserRoute);

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

app.use(globalErrorHandler)
app.use(notFound)

export default app;
