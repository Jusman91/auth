import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { IUserPayload, IUserRequest } from '../types';
import { ACCESS_TOKEN_SECRET_KEY } from '../config';
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
			next(createError(400, 'Invalid token.'));
		}
	} else return next(createError(401, 'Unauthorized'));
};
