import {
	AuthForm,
	AuthModal,
} from '@/components/organisms';
import {
	useFormContext,
	useLogin,
	useModal,
} from '@/hooks';
import { ILoginFields } from '@/types';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const { form, name, values } =
		useFormContext<ILoginFields>();
	const { isOpen, closeModal, openModal } = useModal();
	const { data, error, isSuccess, loading, handleLogin } =
		useLogin();
	const response = data?.message || error?.message;
	const description = response ?? '';
	const handleFinish = () => {
		handleLogin({
			formFields: values,
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
