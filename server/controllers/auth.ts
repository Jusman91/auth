import { RequestHandler } from 'express';
import prisma from '../lib/prisma';
import { createError } from '../middleware/error';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const register: RequestHandler = async (
	req,
	res,
	next,
) => {
	const { username, email, password } = req.body;
	try {
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});
		if (existingUser) {
			return next(createError(400, 'Email already exists'));
		}
		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password,
			},
		});

		res.status(200).json(newUser);
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
