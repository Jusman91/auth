import { IFieldHidden } from '@/types';

export function isFieldHidden({
	fieldName,
	formName,
}: IFieldHidden): boolean {
	switch (formName) {
		// return true if the field name includes a hidden field
		case 'register':
			return ['rememberMe'].includes(fieldName);
		case 'login':
			return ['username', 'confirmPassword'].includes(
				fieldName,
			);
		case 'forgot-password':
			return [
				'username',
				'password',
				'confirmPassword',
				'rememberMe',
			].includes(fieldName);
		case 'reset-password':
			return ['username', 'email', 'rememberMe'].includes(
				fieldName,
			);
		default:
			return false;
	}
}
