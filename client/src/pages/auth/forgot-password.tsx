import {
	AuthForm,
	AuthModal,
} from '@/components/organisms';
import { useFormContext, useModal } from '@/hooks';
import { useForgotPassword } from '@/lib/react-query';
import { handleForgotPassword } from '@/lib/utils/handlers';
import { IForgotPasswordFields } from '@/types';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
	const navigate = useNavigate();
	const { form, name, values } =
		useFormContext<IForgotPasswordFields>();
	const { isOpen, closeModal, openModal } = useModal();
	const {
		mutate: sendRequest,
		data,
		error,
		isPending: loading,
		isSuccess,
	} = useForgotPassword();
	const response = data?.message || error?.message;
	const handleFinish = () => {
		handleForgotPassword({
			sendRequest,
			formFields: values,
			openModal,
		});
	};
	const handleAfterClose = () => {
		if (isSuccess) {
			navigate('/auth/login');
		}
	};
	const description = response ?? '';
	return (
		<>
			<AuthForm
				form={form}
				onFinish={handleFinish}
				loading={loading}
			/>
			<AuthModal
				title={name}
				description={description}
				open={isOpen}
				onCancel={closeModal}
				afterClose={handleAfterClose}
				isSuccess={isSuccess}
			/>
		</>
	);
};

export default ForgotPassword;
