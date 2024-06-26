import { loginUser } from '@/api';
import { ILoginUser, keys } from '@/types';
import { useMutation } from '@tanstack/react-query';

export default function useLogin() {
	const mutate = useMutation({
		mutationKey: [keys.LOGIN],
		mutationFn: (user: ILoginUser) => loginUser(user),
		retry: false,
	});
	return mutate;
}
