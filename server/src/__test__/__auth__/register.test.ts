import request from 'supertest';
import {
	mockEncrypPassword,
	mockPrisma,
	mockValidationBody,
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

const app = createServer();

describe('Auth controller - Register', () => {
	const sendDataUser = {
		username: 'user',
		email: 'user@example.com',
		password: 'password',
	};
	it('should create a new user and return 200', async () => {
		mockPrisma.user.findUnique.mockResolvedValue(null);
		mockPrisma.user.create.mockResolvedValue({});

		const response = await request(app)
			.post(`${BASE_URL}/auth/register`)
			.send(sendDataUser);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			message: 'User created successfully',
		});
	});
	it('should return 400 if email already exists', async () => {
		mockPrisma.user.findUnique.mockResolvedValue(
			sendDataUser.email,
		);
		const response = await request(app)
			.post(`${BASE_URL}/auth/register`)
			.send(sendDataUser);
		expect(response.status).toBe(400);
		expect(response.body.message).toBe(
			'Email already exists',
		);
	});

	it('should return 422 if validation fails', async () => {
		const invalidData = {
			username: '',
			email: '',
			password: '',
		};
		mockPrisma.user.findUnique.mockResolvedValue(null);

		mockValidationBody.auth.register.mockImplementation(
			() => {
				throw createError(422, [
					'Username is required',
					'Email is required',
					'Password is required',
				] as unknown as string);
			},
		);

		const response = await request(app)
			.post(`${BASE_URL}/auth/register`)
			.send(invalidData);

		expect(response.status).toBe(422);
		expect(response.body.message).toEqual(
			expect.arrayContaining([
				'Username is required',
				'Email is required',
				'Password is required',
			]),
		);
	});
});
