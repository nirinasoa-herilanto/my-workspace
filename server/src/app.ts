import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import mongoSanitize from 'express-mongo-sanitize';

import { wording, AppError } from '@project/utils';

const app = express();

app.use(cors());

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({ limit: '5mb' }));
app.use(mongoSanitize());

// welcoming route
app.get('/api/v1/', (_, res) => {
  res.status(200).json({
    message: wording.message,
  });
});

// Handling, unhandled routes
app.use('/api/v1/*', (req, res, next) => {
  const error = new AppError(
    `Can not find ${req.originalUrl} on the server!`,
    404
  );

  next(error);
});

// catch all errors on the server such as validation, programming, etc.
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.status ||= 'error';
  err.statusCode ||= 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;
