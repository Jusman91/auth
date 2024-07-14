import { useLoginMutation } from '@/lib/react-query';
import { saveAccessTokenToStorage } from '@/lib/utils/storage';
import { IHandleLoginProps } from '@/types';
import useLoggedIn from './use-loggedin';

const useLogin = () => {
	const {
		mutate: userLogin,
		data,
		error,
		isSuccess,
		isPending: loading,
	} = useLoginMutation();
	const { handleLoggedIn } = useLoggedIn();
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
				await handleLoggedIn({ formFields });
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
