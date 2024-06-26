import { FormName, ISwitchAuthData } from '@/types';

export function getSwitchAuthFormData(
	formName: FormName,
): ISwitchAuthData {
	const login = 'login';
	const register = 'register';
	const pathLogin = `/auth/${login}`;
	const pathRegister = `/auth/${register}`;
	const data: ISwitchAuthData = {
		path: '',
		desc: '',
		txtLink: '',
	};
	switch (formName) {
		case 'register':
			return {
				...data,
				path: pathLogin,
				desc: 'Already have an account?',
				txtLink: login,
			};
		case 'login':
			return {
				...data,
				path: pathRegister,
				desc: "Don't have an account?",
				txtLink: register,
			};

		case 'forgot-password':
		case 'reset-password':
			return {
				...data,
				path: pathLogin,
				desc: '\u{21b5}Back to',
				txtLink: login,
			};
		default:
			return data;
	}
}
