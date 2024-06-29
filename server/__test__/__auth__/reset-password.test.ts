import request from 'supertest';
import {
	mockEncrypPassword,
	mockPrisma,
	mockValidationBody,
	mockVerifyTokenResetPassword,
} from '../mocks';
import { BASE_URL } from '../../config';
import createServer from '../../lib/utils/server';
import { createError } from '../../middleware';

jest.mock('../../lib/prisma', () => ({
	user: mockPrisma.user,
}));
jest.mock('../../lib/utils', () => ({
	encrypPassword: mockEncrypPassword,
	validation: mockValidationBody,
}));
jest.mock('../../middleware', () => {
	const originalMiddleware = jest.requireActual(
		'../../middleware',
	);
	return {
		...originalMiddleware,
		verifyTokenResetPassword: mockVerifyTokenResetPassword,
	};
});

const app = createServer();

describe('Auth controller - Reset Password', () => {
	it('should reset password and return 200', async () => {
		const userId = 'userId';
		const token = 'resetToken';
		const newPassword = 'newPassword';
		mockPrisma.user.findUnique.mockResolvedValue({
			id: userId,
			email: 'user@example.com',
			role: 'user',
		});
		mockVerifyTokenResetPassword.mockResolvedValue(true);
		mockEncrypPassword.mockResolvedValue({
			hashedPassword: 'newHashedPassword',
		});
		mockPrisma.user.update.mockResolvedValue(true);

		const response = await request(app)
			.put(
				`${BASE_URL}/auth/reset_password/${userId}/${token}`,
			)
			.send({ password: newPassword });

		expect(
			mockVerifyTokenResetPassword,
		).toHaveBeenCalledWith(token, userId);
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			message: 'Reset password success',
		});
	});

	it('should return 401 if token verification fails', async () => {
		const userId = 'userId';
		const token = 'invalidToken';
		const newPassword = 'newPassword';

		mockVerifyTokenResetPassword.mockRejectedValue(
			createError(401, 'Invalid or expired token'),
		);

		const response = await request(app)
			.put(
				`${BASE_URL}/auth/reset_password/${userId}/${token}`,
			)
			.send({ password: newPassword });

		console.log('Response body:', response.body);

		expect(response.status).toBe(401);
		expect(response.body.message).toBe(
			'Invalid or expired token',
		);
	});
});
