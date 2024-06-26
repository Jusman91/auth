import { IHandleLoggedInProps } from '@/types';
import {
	saveAuthenticatedToStorage,
	saveUserToStorage,
} from '../../storage';

export async function handleLoggedIn({
	userLoggedIn,
	formFields,
}: IHandleLoggedInProps) {
	const rememberMe = formFields.rememberMe ?? false;

	try {
		const { data: user } = await userLoggedIn();

		if (user) {
			saveUserToStorage({
				user,
				rememberMe: rememberMe,
			});
		}
		saveAuthenticatedToStorage({
			authenticated: true,
			rememberMe: rememberMe,
		});
	} catch (error) {
		console.error('Error logging in user:', error);
		throw error;
	}
}
