import * as Yup from 'yup';
import { AuthValidationName } from '../../../types';

export const authValidationSchema = (
	validationName: AuthValidationName,
) => {
	let schema = {};
	switch (validationName) {
		case 'register':
			return (schema = Yup.object().shape({
				username: Yup.string()
					.required('Username is required')
					.min(3, 'Username must be at least 3 characters')
					.max(15, 'Username is up to 15 characters'),
				email: Yup.string()
					.email('Invalid email address')
					.required('Email is required'),
				password: Yup.string()
					.min(6, 'Password must be at least 6 characters')
					.required('password is required'),
			}));
		case 'login':
			return (schema = Yup.object().shape({
				email: Yup.string()
					.email('Invalid email address')
					.required('Email is required'),
				password: Yup.string().required(
					'Password is required',
				),
			}));
		case 'forgot-password':
			return (schema = Yup.object().shape({
				email: Yup.string().email('Invalid email address'),
			}));
		default:
			return schema;
	}
};
