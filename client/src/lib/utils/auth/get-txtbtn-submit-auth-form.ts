import { FormName } from '@/types';

export function getTxtBtnSubmitAuthForm(
	formName: FormName,
) {
	let txtBtn = '';
	switch (formName) {
		case 'register':
			return (txtBtn = 'Register');
		case 'login':
			return (txtBtn = 'Login');
		case 'forgot-password':
			return (txtBtn = 'Send');
		case 'reset-password':
			return (txtBtn = 'Reset');
		default:
			return txtBtn;
	}
}
