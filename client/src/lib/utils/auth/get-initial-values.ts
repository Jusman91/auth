import { objectInitialValues } from '../../../static';
import { FormName } from '@/types';

export function getInitialValues(formName: FormName) {
	switch (formName) {
		case 'register':
			return objectInitialValues.register;
		case 'login':
			return objectInitialValues.login;
		case 'forgot-password':
			return objectInitialValues.forgotPassword;
		case 'reset-password':
			return objectInitialValues.resetPassword;
	}
}
