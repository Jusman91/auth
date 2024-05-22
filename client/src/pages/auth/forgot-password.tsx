import AuthForm from '@/components/form/auth';
import { useForm } from '@/hooks/use-form';

const ForgotPassword = () => {
	const { FormName } = useForm();
	FormName('forgot-password');
	return (
		<div className='min-h-max'>
			<AuthForm />
		</div>
	);
};

export default ForgotPassword;
