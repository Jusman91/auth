import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRoutes from '../../routes/auth';
import usersRoutes from '../../routes/users';
import { errorHandler } from '../../middleware';
import { BASE_URL } from '../../config';

const createServer = () => {
	const app = express();

	// middleware
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cors());
	app.use(morgan('dev'));
	app.use(cookieParser());

	// routes
	app.use(`${BASE_URL}/auth`, authRoutes);
	app.use(`${BASE_URL}/users`, usersRoutes);

	// errors handler should be the last middleware
	app.use(errorHandler);

	return app;
};

export default createServer;
