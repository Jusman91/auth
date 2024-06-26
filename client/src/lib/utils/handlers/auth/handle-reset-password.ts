import { IHandleResetPasswordProps } from '@/types';
import axios, { AxiosError } from 'axios';

export function handleResetPassword({
	userResetPassword,
	formFields,
	openModal,
	id,
	token,
}: IHandleResetPasswordProps) {
	userResetPassword(
		{ formFields, id, token },
		{
			onSuccess: () => {
				openModal();
			},
			onError: (err) => {
				console.log(err);
				if (axios.isAxiosError<AxiosError>(err)) {
					if (err?.status !== 401) {
						console.log('OPEN ERROR');
						openModal();
					}
				}
			},
		},
	);
}
