import { useLoggedInQuery } from '@/lib/react-query';
import {
	saveAuthenticatedToStorage,
	saveUserToStorage,
} from '@/lib/utils/storage';
import { IHandleLoggedInProps } from '@/types';

const useLoggedIn = () => {
	const { refetch } = useLoggedInQuery();
	const handleLoggedIn = async ({
		formFields,
	}: IHandleLoggedInProps) => {
		const rememberMe = formFields.rememberMe ?? false;
		const { data: user } = await refetch();
		try {
			if (user) {
				saveUserToStorage({
					user: user,
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
	};
	return {
		handleLoggedIn,
	};
};

export default useLoggedIn;
