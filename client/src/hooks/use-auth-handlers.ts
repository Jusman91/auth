import { useLoggedIn } from '@/lib/react-query/auth-query-mutation';
import { useAuthContext } from './use-context';
import { useNavigate } from 'react-router-dom';
import { ILoginInput } from '@/types';
import { saveAccessToken } from '@/lib/utils/local-storage';

export function useAuthHandlers() {
	const { userLogin } = useAuthContext();
	const { refetch } = useLoggedIn();
	const navigate = useNavigate();

	const handleSubmit = (value: ILoginInput) => {
		userLogin(value, {
			onSuccess: async (data) => {
				saveAccessToken({
					accessToken: data?.accessToken ?? '',
					rememberMe: value.rememberMe,
				});
				await refetch();
				navigate('/');
			},
		});
	};

	return { handleSubmit };
}
