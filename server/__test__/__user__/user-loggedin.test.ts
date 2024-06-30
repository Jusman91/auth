import request from 'supertest';
import {
	mockPrisma,
	mockUser,
	mockVerifyToken,
} from '../__mocks__';
import createServer from '../../lib/utils/server';
import { BASE_URL } from '../../config';

jest.mock('../../lib/prisma', () => ({
	user: mockPrisma.user,
}));
jest.mock('../../middleware', () => {
	const originalMiddleware = jest.requireActual(
		'../../middleware',
	);
	return {
		...originalMiddleware,
		verifyToken: mockVerifyToken,
	};
});
const app = createServer();

describe('User controller - LoggedIn', () => {
	it('should login user and return 200', async () => {
		const token = 'activeToken';

		mockPrisma.user.findUnique.mockResolvedValue(mockUser);

		const response = await request(app)
			.get(`${BASE_URL}/users/me`)
			.set('Authorization', `Bearer ${token}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			...mockUser,
			createdAt: mockUser.createdAt.toISOString(),
			updatedAt: mockUser.updatedAt.toISOString(),
		});
	});

	it('should return 404 if user is not found', async () => {
		const token = 'activeToken';

		mockPrisma.user.findUnique.mockResolvedValueOnce(null);

		const response = await request(app)
			.get(`${BASE_URL}/users/me`)
			.set('Authorization', `Bearer ${token}`);
		console.log(response.body, 'RES');

		expect(response.status).toBe(404);
		expect(response.body.message).toBe('User not Allowed');
	});

	it('should return 404 if user ID is invalid', async () => {
		const token = 'activeToken';
		const invalidID = 'invalidId';

		mockVerifyToken.mockImplementationOnce(
			(req, res, next) => {
				req.user = { id: invalidID };
				next();
			},
		);

		const response = await request(app)
			.get(`${BASE_URL}/users/me`)
			.set('Authorization', `Bearer ${token}`);
		console.log(response.body, 'RES');

		expect(response.status).toBe(404);
		expect(response.body.message).toBe('User not allowed');
	});
});
