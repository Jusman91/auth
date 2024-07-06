import {
	AuthForm,
	AuthModal,
} from '@/components/organisms';
import {
	useFormContext,
	useModal,
	useResetPassword,
} from '@/hooks';
import { IResetPasswordFields } from '@/types';
import { isTokenExpired } from '@/validations';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
	const navigate = useNavigate();
	const params = useParams();
	const id = params.id ?? '';
	const token = params.token ?? '';
	const { form, name, values } =
		useFormContext<IResetPasswordFields>();
	const { isOpen, closeModal, openModal } = useModal();
	const {
		handleResetPassword,
		data,
		loading,
		isSuccess,
		error,
	} = useResetPassword();

	const handleFinish = () => {
		handleResetPassword({
			formFields: values,
			openModal,
			id,
			token,
		});
	};
	const handleAfterClose = () => {
		if (isSuccess) {
			navigate('/auth/login');
		}
	};

	const response = data?.message || error?.message;
	const description = response ?? '';

	useEffect(() => {
		const expToken = isTokenExpired(token);
		if (expToken) {
			navigate('/auth/token-expired');
		}
	}, [navigate, token]);

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

export default ResetPassword;
