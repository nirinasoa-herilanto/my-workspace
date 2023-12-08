import express from 'express';
import cors from 'cors';
import { wording } from './wording';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/v1/', (_, res) => {
  res.status(200).json({
    message: wording.message,
  });
});

export default app;
