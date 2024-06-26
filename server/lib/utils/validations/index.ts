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
	},
};
