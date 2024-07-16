import { RequestHandler } from 'express';
import prisma from '../lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import {
	createError,
	verifyTokenResetPassword,
} from '../middleware';
import { IUserRequest } from '../types';
import { BASE_URL, CLIENT_URL } from '../config';
import { sendEmail } from '../lib/nodemailer';
import {
	comparePassword,
	encrypPassword,
	generateAccessToken,
	generateForgotPasswordToken,
	validation,
} from '../lib/utils';

export const register: RequestHandler = async (
	req,
	res,
	next,
) => {
	const { username, email, password } = req.body;
	try {
		await validation.auth.register(req.body);
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return next(createError(400, 'Email already exists'));
		}

		const hashedPassword = await encrypPassword(password);

		await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});

		res
			.status(200)
			.json({ message: 'User created successfully' });
	} catch (error) {
		console.error('Error in register controller:', error);
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return next(
					createError(
						400,
						'Username or Email already in use',
					),
				);
			}
		} else {
			next(error);
		}
	}
};

export const login: RequestHandler = async (
	req,
	res,
	next,
) => {
	const { email, password } = req.body;
	try {
		await validation.auth.login(req.body);
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (!existingUser)
			return next(createError(404, 'User does not exist'));
		await comparePassword(password, existingUser.password);

		const accessToken = generateAccessToken({
			id: existingUser.id,
			role: existingUser.role,
		});
		console.log('Generated access token:', accessToken);
		res.status(200).json({
			message: 'Login successful',
			accessToken,
		});
	} catch (error) {
		next(error);
	}
};

export const forgotPassword: RequestHandler = async (
	req: IUserRequest,
	res,
	next,
) => {
	const { email } = req.body;
	try {
		await validation.auth.forgotPassword(req.body);
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});
		if (!existingUser)
			return next(createError(404, 'User does not exist'));

		const token = generateForgotPasswordToken({
			id: existingUser.id,
			role: existingUser.role,
		});
		const url = `${CLIENT_URL}/${BASE_URL}/auth/reset-password/${existingUser.id}/${token}`;

		console.log('Generated token:', token);
		console.log('Reset URL:', url);
		await sendEmail({
			to: existingUser.email,
			subject: 'Forgot_Password',
			url: url,
			btnText: 'Reset Password',
		});

		res.status(200).json({
			message: 'Success! Please check your email',
		});
	} catch (error) {
		next(error);
	}
};

export const resetPassword: RequestHandler = async (
	req: IUserRequest,
	res,
	next,
) => {
	const { id, token } = req.params;
	const { password } = req.body;
	try {
		await validation.auth.resetPassword(req.body);
		await verifyTokenResetPassword(token, id);

		const hashedPassword = await encrypPassword(password);

		await prisma.user.update({
			where: { id },
			data: {
				password: hashedPassword,
			},
		});

		res
			.status(200)
			.json({ message: 'Reset password success' });
	} catch (error) {
		next(error);
	}
};
