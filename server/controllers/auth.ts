import { RequestHandler } from 'express';
import prisma from '../lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
	comparePassword,
	encrypPassword,
	generateAccessToken,
	validation,
} from '../lib/utils';
import { createError } from '../middleware';

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

		const { hashedPassword } = await encrypPassword(
			password,
		);

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
			return next(createError(400, 'User does not exist'));

		await comparePassword(password, existingUser.password);

		const accessToken = generateAccessToken({
			id: existingUser.id,
			role: existingUser.role,
		});
		console.log(accessToken);
		res.status(200).json({
			message: 'Login successful',
			accessToken,
		});
	} catch (error) {
		next(error);
	}
};
