import {
	AuthForm,
	AuthModal,
} from '@/components/organisms';
import { useFormContext, useModal } from '@/hooks';
import { useRegister } from '@/lib/react-query';
import { handleRegister } from '@/lib/utils/handlers';
import { IRegisterFields } from '@/types';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const navigate = useNavigate();
	const { form, name, values } =
		useFormContext<IRegisterFields>();
	const {
		mutate: userRegister,
		data,
		error,
		isPending: loading,
		isSuccess,
	} = useRegister();
	const response = data?.message || error?.message;
	const description = response ?? '';
	const { isOpen, closeModal, openModal } = useModal();
	const handleFinish = () => {
		handleRegister({
			userRegister,
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
