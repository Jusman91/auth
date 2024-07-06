import { useResetPasswordMutation } from '@/lib/react-query';
import { IHandleResetPasswordProps } from '@/types';
import axios, { AxiosError } from 'axios';

const useResetPassword = () => {
	const {
		mutate: userResetPassword,
		data,
		isPending: loading,
		isSuccess,
		error,
	} = useResetPasswordMutation();

	const handleResetPassword = ({
		formFields,
		openModal,
		id,
		token,
	}: IHandleResetPasswordProps) => {
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
	};

	return {
		data,
		error,
		loading,
		isSuccess,
		handleResetPassword,
	};
};

export default useResetPassword;
