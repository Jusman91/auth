import * as Yup from 'yup';
import { authValidationSchema } from '../../lib/utils/validations/auth-validation-schema';

describe('authValidationSchema', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return register schema', () => {
		const schema = authValidationSchema(
			'register',
		) as Yup.ObjectSchema<any>;
		console.log('register schema', schema);
		expect(schema).toBeInstanceOf(Yup.ObjectSchema);
		expect(schema.fields).toHaveProperty('username');
		expect(schema.fields).toHaveProperty('email');
		expect(schema.fields).toHaveProperty('password');
	});

	it('should return login schema', () => {
		const schema = authValidationSchema(
			'login',
		) as Yup.ObjectSchema<any>;

		expect(schema).toBeInstanceOf(Yup.ObjectSchema);

		expect(schema.fields).toHaveProperty('email');
		expect(schema.fields).toHaveProperty('password');
		expect(schema.fields).not.toHaveProperty('username');
	});

	it('should return forgot-password schema', () => {
		const schema = authValidationSchema(
			'forgot-password',
		) as Yup.ObjectSchema<any>;

		expect(schema).toBeInstanceOf(Yup.ObjectSchema);

		expect(schema.fields).toHaveProperty('email');

		expect(() =>
			schema.validateSync({
				email: '',
			}),
		).toThrow('Email is required');
	});

	it('should return reset-password schema', () => {
		const schema = authValidationSchema(
			'reset-password',
		) as Yup.ObjectSchema<any>;

		expect(schema).toBeInstanceOf(Yup.ObjectSchema);

		expect(schema.fields).toHaveProperty('password');

		expect(() =>
			schema.validateSync({
				password: '',
			}),
		).toThrow('Password is required');
	});
});
