import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Portfolio And Blog Application is Running 🎈');
});

app.use(globalErrorHandler);
app.use(notFound);
// console.log(process.cwd());
export default app;
