import { RequestHandler } from 'express';
import { IUserRequest } from '../types';
import mongoose from 'mongoose';
import { createError } from '../middleware';
import prisma from '../lib/prisma';

export const userLoggedIn: RequestHandler = async (
	req: IUserRequest,
	res,
	next,
) => {
	try {
		const { id } = req.user!;
		if (!mongoose.Types.ObjectId.isValid(id))
			return next(createError(404, 'User not allowed'));

		const user = await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
				avatar: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!user)
			return next(createError(404, 'User not Allowed'));

		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};
