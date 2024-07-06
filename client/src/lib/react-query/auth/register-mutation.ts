import { registerUser } from '@/api';
import { IRegisterUser, keys } from '@/types';
import { useMutation } from '@tanstack/react-query';

export default function useRegisterMutation() {
	const mutate = useMutation({
		mutationKey: [keys.REGISTER],
		mutationFn: (user: IRegisterUser) => registerUser(user),
		retry: false,
	});
	return mutate;
}
