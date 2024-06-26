import { objectHedarAuthForm } from '../../../static';
import { FormName } from '@/types';

export function getHeaderAuthFormData(formName: FormName) {
	switch (formName) {
		case 'register':
			return objectHedarAuthForm.register;
		case 'login':
			return objectHedarAuthForm.login;
		case 'forgot-password':
			return objectHedarAuthForm.forgotPassword;
		case 'reset-password':
			return objectHedarAuthForm.resetPassword;
	}
}
