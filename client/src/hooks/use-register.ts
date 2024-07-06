import { useRegisterMutation } from '@/lib/react-query';
import { IHandleRegisterProps } from '@/types';

const useRegister = () => {
	const {
		mutate: userRegister,
		data,
		error,
		isPending: loading,
		isSuccess,
	} = useRegisterMutation();

	const handleRegister = ({
		formFields,
		openModal,
	}: IHandleRegisterProps) => {
		userRegister(formFields, {
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
		handleRegister,
	};
};

export default useRegister;
