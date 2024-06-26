import { IHandleLoginProps } from '@/types';
import { saveAccessTokenToStorage } from '../../storage';
import { handleLoggedIn } from './handle-loggedin';

export async function handleLogin({
	userLogin,
	formFields,
	userLoggedIn,
	openModal,
}: IHandleLoginProps) {
	userLogin(formFields, {
		onSuccess: async (res) => {
			const rememberMe = formFields.rememberMe ?? false;
			saveAccessTokenToStorage({
				accessToken: res?.accessToken ?? '',
				rememberMe: rememberMe,
			});
			await handleLoggedIn({ userLoggedIn, formFields });
			openModal();
		},
		onError: (err) => {
			console.log(err);
			openModal();
		},
	});
}
