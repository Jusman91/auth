import * as Yup from 'yup';
import { customValidationReqBody } from './custom-validation-req-body';
import { authValidationSchema } from './auth-validation-schema';

export const validation = {
	auth: {
		register: customValidationReqBody(
			authValidationSchema(
				'register',
			) as unknown as Yup.ObjectSchema<any>,
		),
		login: customValidationReqBody(
			authValidationSchema(
				'login',
			) as unknown as Yup.ObjectSchema<any>,
		),
		forgotPassword: customValidationReqBody(
			authValidationSchema(
				'forgot-password',
			) as unknown as Yup.ObjectSchema<any>,
		),
		resetPassword: customValidationReqBody(
			authValidationSchema(
				'reset-password',
			) as unknown as Yup.ObjectSchema<any>,
		),
	},
};
