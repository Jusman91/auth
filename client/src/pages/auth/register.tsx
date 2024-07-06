import {
	AuthForm,
	AuthModal,
} from '@/components/organisms';
import {
	useFormContext,
	useModal,
	useRegister,
} from '@/hooks';
import { IRegisterFields } from '@/types';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const navigate = useNavigate();
	const { form, name, values } =
		useFormContext<IRegisterFields>();
	const {
		handleRegister,
		data,
		error,
		loading,
		isSuccess,
	} = useRegister();
	const response = data?.message || error?.message;
	const description = response ?? '';
	const { isOpen, closeModal, openModal } = useModal();
	const handleFinish = () => {
		handleRegister({
			formFields: values,
			openModal,
		});
	};
	const handleAfterClose = () => {
		if (isSuccess) {
			navigate('/auth/login');
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

export default Register;
