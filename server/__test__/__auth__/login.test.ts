import request from 'supertest';
import {
	mockComparePassword,
	mockGenerateAccessToken,
	mockPrisma,
	mockValidationBody,
} from '../mocks';
import { BASE_URL } from '../../config';
import createServer from '../../lib/utils/server';

jest.mock('../../lib/prisma', () => ({
	user: mockPrisma.user,
}));
jest.mock('../../lib/utils', () => ({
	comparePassword: mockComparePassword,
	generateAccessToken: mockGenerateAccessToken,
	validation: mockValidationBody,
}));

const app = createServer();

describe('Auth controller - Login', () => {
	it('should login the user and return 200 with access token', async () => {
		mockPrisma.user.findUnique.mockResolvedValue({
			email: 'user@example.com',
			password: 'password',
			id: 'userId',
			role: 'user',
		});
		mockComparePassword.mockResolvedValue(true);
		mockGenerateAccessToken.mockReturnValue('accessToken');

		const response = await request(app)
			.post(`${BASE_URL}/auth/login`)
			.send({
				email: 'user@example.com',
				password: 'password',
			});
		console.log('Response body:', response.body);
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			message: 'Login successful',
			accessToken: 'accessToken',
		});
	});

	it('should return 404 if user does not exist', async () => {
		mockPrisma.user.findUnique.mockResolvedValue(null);
		const response = await request(app)
			.post(`${BASE_URL}/auth/login`)
			.send({
				email: 'user@example.com',
				password: 'password',
			});

		expect(response.status).toBe(404);
		expect(response.body.message).toBe(
			'User does not exist',
		);
	});
});
