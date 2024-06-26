import { IInitialValues } from '@/types';

export const objectInitialValues: IInitialValues = {
	register: {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	},
	login: {
		email: '',
		password: '',
		rememberMe: true,
	},
	forgotPassword: {
		email: '',
	},
	resetPassword: {
		password: '',
		confirmPassword: '',
	},
};
