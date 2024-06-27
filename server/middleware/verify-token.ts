import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { IUserPayload, IUserRequest } from '../types';
import {
	ACCESS_TOKEN_SECRET_KEY,
	FORGOT_PASSWORD_TOKEN_SECRET_KEY,
} from '../config';
import { createError } from './error';

export const verifyToken: RequestHandler = (
	req: IUserRequest,
	res,
	next,
) => {
	const authHeader =
		req.headers.authorization || req.headers.Authorization;
	if (authHeader && typeof authHeader === 'string') {
		const token = authHeader.split(' ')[1];

		try {
			const decoded = jwt.verify(
				token,
				`${ACCESS_TOKEN_SECRET_KEY}`,
			) as IUserPayload;
			req.user = decoded;
			next();
		} catch (err) {
			next(createError(401, 'Unauthorized'));
		}
	} else return next(createError(401, 'Unauthorized'));
};

export const verifyTokenResetPassword = async (
	token: string,
	id: string,
) => {
	try {
		const decoded = jwt.verify(
			token,
			`${FORGOT_PASSWORD_TOKEN_SECRET_KEY}`,
		) as IUserPayload;
		if (decoded.id !== id) {
			throw createError(401, 'Invalid token');
		}
	} catch (error) {
		throw createError(401, 'Invalid or expired token');
	}
};

export const verifyUser: RequestHandler = (
	req: IUserRequest,
	res,
	next,
) => {
	verifyToken(req, res, () => {
		if (req.user?.id === req.params.id) {
			next();
		} else {
			return next(
				createError(403, 'You are not authorized'),
			);
		}
	});
};
