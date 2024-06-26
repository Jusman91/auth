import { useContext } from 'react';
import {
	IErrorUseContext,
	IFormContext,
	IThemeContext,
} from '@/types';
import { FormContext, ThemeContext } from '@/contexts';

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
export function useFormContext<
	TValues,
>(): IFormContext<TValues> {
	const context = useContext(FormContext);
	throwError({ context, message: 'FormContext' });
	return context as IFormContext<TValues>;
}
