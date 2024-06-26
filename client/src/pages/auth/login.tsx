import {
	AuthForm,
	AuthModal,
} from '@/components/organisms';
import { useFormContext, useModal } from '@/hooks';
import { useLoggedIn, useLogin } from '@/lib/react-query';
import { handleLogin } from '@/lib/utils/handlers';
import { ILoginFields } from '@/types';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const { form, name, values } =
		useFormContext<ILoginFields>();
	const { isOpen, closeModal, openModal } = useModal();
	const {
		mutate: userLogin,
		data,
		error,
		isSuccess,
		isPending: loading,
	} = useLogin();
	const { refetch: userLoggedIn } = useLoggedIn();
	const response = data?.message || error?.message;
	const description = response ?? '';
	const handleFinish = () => {
		handleLogin({
			userLogin,
			formFields: values,
			userLoggedIn,
			openModal,
		});
	};
	const handleAfterClose = () => {
		if (isSuccess) {
			navigate('/');
		}
	};

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

export default Login;
