import AuthForm from '@/components/form/auth';
import { useForm } from '@/hooks/use-form';

const ResetPassword = () => {
	const { FormName } = useForm();
	FormName('reset-password');
	return <AuthForm />;
};

export default ResetPassword;
