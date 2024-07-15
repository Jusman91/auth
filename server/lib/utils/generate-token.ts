import jwt from 'jsonwebtoken';
import {
	ACCESS_TOKEN_SECRET_KEY,
	FORGOT_PASSWORD_TOKEN_SECRET_KEY,
} from '../../config';

export const generateAccessToken = (payload: object) => {
	return jwt.sign(payload, `${ACCESS_TOKEN_SECRET_KEY}`, {
		expiresIn: '1d',
	});
};

export const generateForgotPasswordToken = (
	payload: object,
) => {
	return jwt.sign(
		payload,
		`${FORGOT_PASSWORD_TOKEN_SECRET_KEY}`,
		{
			expiresIn: '5m',
		},
	);
};
