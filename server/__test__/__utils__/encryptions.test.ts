import bcrypt from 'bcryptjs';
import { mockHashedPassword } from '../__mocks__';
import {
	comparePassword,
	encrypPassword,
} from '../../lib/utils';
import { createError } from '../../middleware';
jest.mock('bcryptjs', () => ({
	hash: jest.fn(),
	compare: jest.fn(),
}));

jest.mock('../../middleware', () => ({
	createError: jest
		.fn()
		.mockImplementation((status, message) => ({
			status,
			message,
		})),
}));

describe('Encryption and Password Comparison Utilities', () => {
	const plainPassword = 'password123';
	const invalidPassword = 'wrongpassword';

	beforeEach(() => {
		(bcrypt.hash as jest.Mock).mockResolvedValue(
			mockHashedPassword,
		);
		(bcrypt.compare as jest.Mock).mockImplementation(
			(password, hash) =>
				password === plainPassword &&
				hash === mockHashedPassword,
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('encrypPassword', () => {
		it('should hash password correctly', async () => {
			const result = await encrypPassword(plainPassword);
			expect(result).toBe(mockHashedPassword);
			expect(bcrypt.hash).toHaveBeenCalledWith(
				plainPassword,
				10,
			);
		});
	});

	describe('comparePassword', () => {
		it('should validate password correctly', async () => {
			await expect(
				comparePassword(plainPassword, mockHashedPassword),
			).resolves.toBeUndefined();
			expect(bcrypt.compare).toHaveBeenCalledWith(
				plainPassword,
				mockHashedPassword,
			);
		});

		it('should throw an error if password is invalid', async () => {
			await expect(
				comparePassword(
					invalidPassword,
					mockHashedPassword,
				),
			).rejects.toEqual(
				createError(400, 'Invalid password'),
			);
			expect(bcrypt.compare).toHaveBeenCalledWith(
				invalidPassword,
				mockHashedPassword,
			);
		});
	});
});
