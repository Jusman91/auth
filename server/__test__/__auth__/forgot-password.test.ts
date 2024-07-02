import request from 'supertest';
import {
	mockGenerateForgotPasswordToken,
	mockPrisma,
	mockSendEmail,
	mockUser,
	mockValidationBody,
} from '../__mocks__';
import { BASE_URL } from '../../config';
import createServer from '../../lib/utils/server';

jest.mock('../../lib/prisma', () => ({
	user: mockPrisma.user,
}));
jest.mock('../../lib/utils', () => ({
	generateForgotPasswordToken:
		mockGenerateForgotPasswordToken,
	validation: mockValidationBody,
}));
jest.mock('../../lib/nodemailer', () => ({
	sendEmail: mockSendEmail,
}));

const app = createServer();
describe('Auth controller - Forgot Password', () => {
	it('should send a password reset email and return 200', async () => {
		mockPrisma.user.findUnique.mockResolvedValue(mockUser);
		mockGenerateForgotPasswordToken.mockReturnValue(
			'resetToken',
		);

		const response = await request(app)
			.post(`${BASE_URL}/auth/forgot_password`)
			.send(mockUser.email);

		console.log(response.body, 'response body');
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			message: 'Success! Please check your email',
		});
	});

	it('should return 404 if user does not exist', async () => {
		mockPrisma.user.findUnique.mockResolvedValue(null);
		const response = await request(app)
			.post(`${BASE_URL}/auth/forgot_password`)
			.send(mockUser.email);

		expect(response.status).toBe(404);
		expect(response.body.message).toBe(
			'User does not exist',
		);
	});
});
