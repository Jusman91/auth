import { resetPassword } from '@/api';
import { IResetPasswordUser, keys } from '@/types';
import { useMutation } from '@tanstack/react-query';

export default function useResetPassword() {
	const mutate = useMutation({
		mutationKey: [keys.RESET_PASSWORD],
		mutationFn: ({
			formFields,
			id,
			token,
		}: IResetPasswordUser) =>
			resetPassword({ formFields, id, token }),
		retry: false,
	});
	return mutate;
}
