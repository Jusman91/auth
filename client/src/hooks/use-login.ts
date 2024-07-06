import {
	useLoggedInQuery,
	useLoginMutation,
} from '@/lib/react-query';
import { handleLoggedIn } from '@/lib/utils/handlers';
import { saveAccessTokenToStorage } from '@/lib/utils/storage';
import { IHandleLoginProps } from '@/types';

const useLogin = () => {
	const {
		mutate: userLogin,
		data,
		error,
		isSuccess,
		isPending: loading,
	} = useLoginMutation();
	const { refetch: userLoggedIn } = useLoggedInQuery();

	const handleLogin = ({
		formFields,
		openModal,
	}: IHandleLoginProps) => {
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
	};

	return {
		data,
		error,
		isSuccess,
		loading,
		handleLogin,
	};
};

export default useLogin;
