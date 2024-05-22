import { AuthContext } from '@/contexts/auth-context';
import { FormContext } from '@/contexts/form-context';
import { ThemeContext } from '@/contexts/theme-context';
import {
	IAuthContext,
	IErrorUseContext,
	IFormContext,
	IThemeContext,
} from '@/types';
import { useContext } from 'react';

const throwError = ({
	context,
	message,
}: IErrorUseContext) => {
	if (!context) {
		throw Error(
			`use${message} must be used inside an ${message}Provider`,
		);
	}
};

export function useThemeContext(): IThemeContext {
	const context = useContext(ThemeContext);
	throwError({ context, message: 'ThemeContext' });
	return context as IThemeContext;
}

export function useFormContext(): IFormContext {
	const context = useContext(FormContext);
	throwError({ context, message: 'FormContext' });
	return context as IFormContext;
}

export function useAuthContext(): IAuthContext {
	const context = useContext(AuthContext);
	throwError({ context, message: 'AuthContext' });
	return context as IAuthContext;
}
