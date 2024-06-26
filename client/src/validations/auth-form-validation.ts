import { FormName, IRulesAuth } from '@/types';

const baseRules: IRulesAuth = {
	// some use the default message
	username: [
		{ required: true },
		{ min: 3 },
		{ max: 15 },
		{ whitespace: true },
	],
	email: [{ type: 'email' }, { required: true }],
	password: [{ required: true }, { min: 6 }],
	confirmPassword: [
		{ required: true },
		({ getFieldValue }) => ({
			validator(_, value) {
				if (!value || getFieldValue('password') === value) {
					return Promise.resolve();
				}
				return Promise.reject('Password not match');
			},
		}),
	],
};

export const getAuthFormValidations = (
	formName: FormName,
): IRulesAuth => {
	const rules = { ...baseRules };

	if (formName === 'login') {
		rules.password = [{ required: true }];
	}

	return rules;
};
