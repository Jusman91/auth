import jwt from 'jsonwebtoken';
import { mockUser } from '../__mocks__';
import {
	createError,
	verifyToken,
	verifyTokenResetPassword,
	verifyUser,
} from '../../middleware';
import { IUserRequest } from '../../types';

jest.mock('jsonwebtoken');

describe('Authorization test', () => {
	let req: Partial<IUserRequest>;
	let res: any;
	let next: jest.Mock;

	beforeEach(() => {
		req = {
			headers: {
				authorization: 'Bearer testtoken',
			},
			params: {
				id: mockUser.id,
			},
			user: {
				id: mockUser.id,
				role: mockUser.role,
			},
		};
		res = {};
		next = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
	describe('verifyToken', () => {
		it('should call next with user data if token is valid', () => {
			(jwt.verify as jest.Mock).mockReturnValue(
				mockUser.id,
			);

			verifyToken(req as IUserRequest, res, next);

			expect(jwt.verify).toHaveBeenCalledWith(
				'testtoken',
				expect.any(String),
			);
			expect(req.user).toEqual(mockUser.id);
			expect(next).toHaveBeenCalled();
		});

		it('should call next with an Unauthorized error if token is invalid', () => {
			(jwt.verify as jest.Mock).mockImplementation(() => {
				throw new Error('Invalid token');
			});

			verifyToken(req as IUserRequest, res, next);

			expect(next).toHaveBeenCalledWith(
				createError(401, 'Unauthorized'),
			);
		});

		it('should call next with an Unauthorized error if auth header is missing', () => {
			req.headers = {};

			verifyToken(req as IUserRequest, res, next);

			expect(next).toHaveBeenCalledWith(
				createError(401, 'Unauthorized'),
			);
		});
	});

	describe('verifyUser', () => {
		it('should call next if user id matches', () => {
			verifyUser(req as IUserRequest, res, next);

			expect(next).toHaveBeenCalled();
			expect(next).not.toHaveBeenCalledWith(
				expect.any(Error),
			);
		});

		it('should call next with a Forbidden error if user id does not match', () => {
			const invalidID = 'invalidId';
			req.user = { id: invalidID, role: mockUser.role };

			verifyUser(req as IUserRequest, res, next);

			expect(next).toHaveBeenCalledWith(
				createError(403, 'You are not authorized'),
			);
		});
	});

	describe('verifyTokenResetPassword', () => {
		it('should throw an error if token is invalid', async () => {
			(jwt.verify as jest.Mock).mockImplementation(() => {
				throw new Error('Invalid token');
			});

			await expect(
				verifyTokenResetPassword(
					'invalidToken',
					mockUser.id,
				),
			).rejects.toEqual(
				createError(401, 'Invalid or expired token'),
			);
		});

		it('should throw an error if decoded ID does not match provided ID', async () => {
			const invalidID = { id: 'invalidID' };
			(jwt.verify as jest.Mock).mockReturnValue(invalidID);

			await expect(
				verifyTokenResetPassword(
					'validToken',
					'testUserId',
				),
			).rejects.toEqual(
				createError(401, 'Invalid or expired token'),
			);
		});

		it('should pass if token is valid and ID matches', async () => {
			const mockDecoded = { id: mockUser.id };
			(jwt.verify as jest.Mock).mockReturnValue(
				mockDecoded,
			);

			await expect(
				verifyTokenResetPassword('validToken', mockUser.id),
			).resolves.toBeUndefined();
		});
	});
});
