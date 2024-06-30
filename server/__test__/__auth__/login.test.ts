import request from 'supertest';
import {
	mockComparePassword,
	mockGenerateAccessToken,
	mockPrisma,
	mockUser,
	mockValidationBody,
} from '../__mocks__';
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
	const sendDataUser = {
		email: 'user@example.com',
		password: 'password',
	};
	it('should login the user and return 200 with access token', async () => {
		mockPrisma.user.findUnique.mockResolvedValue(mockUser);
		mockGenerateAccessToken.mockReturnValue('accessToken');

		const response = await request(app)
			.post(`${BASE_URL}/auth/login`)
			.send(sendDataUser);
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
			.send(sendDataUser);

		expect(response.status).toBe(404);
		expect(response.body.message).toBe(
			'User does not exist',
		);
	});
});
