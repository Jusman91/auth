import AuthForm from '@/components/form/auth';
import AuthModal from '@/components/modal/auth/auth-modal';
import { useForm } from '@/hooks/use-form';

const Login = () => {
	const { FormName } = useForm();
	FormName('login');
	return (
		<div className='max-w-[750px] w-full h-[688px] lg:h-[826px]'>
			<AuthForm />
			{/* <AuthModal success /> */}
		</div>
	);
};

export default Login;
