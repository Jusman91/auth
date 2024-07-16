import jwt from 'jsonwebtoken';
import {
	generateAccessToken,
	generateForgotPasswordToken,
} from '../../lib/utils';
import {
	ACCESS_TOKEN_SECRET_KEY,
	FORGOT_PASSWORD_TOKEN_SECRET_KEY,
} from '../../config';

jest.mock('jsonwebtoken', () => ({
	sign: jest.fn(),
}));

describe('Token Generation Utilities', () => {
	const payload = { id: 1, role: 'user' };

	beforeEach(() => {
		(jwt.sign as jest.Mock).mockImplementation(
			(payload, secret, options) => {
				if (secret === 'invalid') {
					throw new Error('Invalid secret key');
				}
				return `${payload.id}-${payload.role}-token`;
			},
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('generateAccessToken', () => {
		it('should generate access token correctly', () => {
			const token = generateAccessToken(payload);
			console.log(token);
			expect(token).toBe('1-user-token');
			expect(jwt.sign).toHaveBeenCalledWith(
				payload,
				ACCESS_TOKEN_SECRET_KEY,
				{ expiresIn: '1h' },
			);
		});
	});

	describe('generateForgotPasswordToken', () => {
		it('should generate forgot password token correctly', () => {
			const token = generateForgotPasswordToken(payload);
			console.log(token);
			expect(token).toBe('1-user-token');
			expect(jwt.sign).toHaveBeenCalledWith(
				payload,
				FORGOT_PASSWORD_TOKEN_SECRET_KEY,
				{ expiresIn: '5m' },
			);
		});
	});
});
