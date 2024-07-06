import { useForgotPasswordMutation } from '@/lib/react-query';
import { IHandleForgotPasswordProps } from '@/types';

const useForgotPassword = () => {
	const {
		mutate: sendRequest,
		data,
		error,
		isPending: loading,
		isSuccess,
	} = useForgotPasswordMutation();

	const handleForgotPassword = ({
		formFields,
		openModal,
	}: IHandleForgotPasswordProps) => {
		sendRequest(formFields, {
			onSuccess: () => {
				openModal();
			},
			onError: () => {
				openModal();
			},
		});
	};

	return {
		data,
		error,
		loading,
		isSuccess,
		handleForgotPassword,
	};
};

export default useForgotPassword;
