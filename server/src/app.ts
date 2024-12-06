import express from 'express';
import authRoutes from './routes/authRoutes';
import accessRoutes from './routes/accessRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/access', accessRoutes);

export default app;
