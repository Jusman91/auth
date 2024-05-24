// import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectToDB from './config/db';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';
import { errorHandler } from './middleware/error';
import { PORT } from './config';

// dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

// routes
const v1 = '/api/mebuzz/v1';

app.use(`${v1}/auth`, authRoutes);
app.use(`${v1}/users`, usersRoutes);

// errors handler should be the last middleware
app.use(errorHandler);

// server listening on port
app.listen(PORT, () => {
	connectToDB();
	console.log(`Server is running on ${PORT}`);
});
