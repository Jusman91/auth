import * as Yup from 'yup';
import { Request } from 'express';
import { authValidationSchema } from '../../lib/utils/validations/auth-validation-schema';
import { customValidationReqBody } from '../../lib/utils/validations/custom-validation-req-body';
import { createError } from '../../middleware';

jest.mock('../../middleware', () => ({
	createError: jest.fn((status, message) => ({
		status,
		message,
	})),
}));

describe('customValidationReqBody', () => {
	const registerSchema = authValidationSchema(
		'register',
	) as Yup.ObjectSchema<any>;

	const validData: Partial<Request> = {
		body: {
			username: 'validuser',
			email: 'user@example.com',
			password: 'validpassword',
		},
	};

	const invalidData: Partial<Request> = {
		body: {
			username: '',
			email: 'invalidemail',
			password: '123',
		},
	};

	it('should validate data successfully', async () => {
		const validate =
			customValidationReqBody(registerSchema);

		await expect(
			validate(validData.body as Request),
		).resolves.toBeNull();
	});

	it('should throw validation errors', async () => {
		const validate =
			customValidationReqBody(registerSchema);
		try {
			await validate(invalidData.body as Request);
		} catch (error: any) {
			const { status, message } = error;
			expect(status).toBe(422);
			expect(message).toEqual([
				'Username must be at least 3 characters',
				'Username is required',
				'Invalid email address',
				'Password must be at least 6 characters',
			]);
		}
		expect(createError).toHaveBeenCalledWith(
			422,
			expect.arrayContaining([
				'Username must be at least 3 characters',
				'Username is required',
				'Invalid email address',
				'Password must be at least 6 characters',
			]),
		);
	});
});
