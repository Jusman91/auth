import request from 'supertest';
import {
	mockEncrypPassword,
	mockPrisma,
	mockUser,
	mockValidationBody,
	mockVerifyTokenResetPassword,
} from '../__mocks__';
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
	const newPassword = 'newPassword';
	it('should reset password and return 200', async () => {
		const token = 'resetToken';
		mockPrisma.user.findUnique.mockResolvedValue(mockUser);
		mockPrisma.user.update.mockResolvedValue(true);

		const response = await request(app)
			.put(
				`${BASE_URL}/auth/reset_password/${mockUser.id}/${token}`,
			)
			.send({ password: newPassword });

		expect(
			mockVerifyTokenResetPassword,
		).toHaveBeenCalledWith(token, mockUser.id);
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			message: 'Reset password success',
		});
	});

	it('should return 401 if token verification fails', async () => {
		const token = 'invalidToken';

		mockVerifyTokenResetPassword.mockRejectedValue(
			createError(401, 'Invalid or expired token'),
		);

		const response = await request(app)
			.put(
				`${BASE_URL}/auth/reset_password/${mockUser.id}/${token}`,
			)
			.send({ password: newPassword });

		console.log('Response body:', response.body);

		expect(response.status).toBe(401);
		expect(response.body.message).toBe(
			'Invalid or expired token',
		);
	});
});
