import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET_KEY } from '../../config';
export const generateAccessToken = (payload: object) => {
	return jwt.sign(payload, `${ACCESS_TOKEN_SECRET_KEY}`, {
		expiresIn: '1d',
	});
};
