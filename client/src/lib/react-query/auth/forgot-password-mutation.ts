import { forgotPassword } from '@/api';
import { IForgotPasswordUser, keys } from '@/types';
import { useMutation } from '@tanstack/react-query';

export default function useForgotPasswordMutation() {
	const mutate = useMutation({
		mutationKey: [keys.FORGOT_PASSWORD],
		mutationFn: (value: IForgotPasswordUser) =>
			forgotPassword(value),
		retry: false,
	});
	return mutate;
}
